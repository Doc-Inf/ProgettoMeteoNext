import { format } from "date-fns";
import {
  type Tab,
  type WeatherOverviewData,
  type WeatherHistory,
  KEYMATCHER,
} from "./weather-types";
import { DBArrays, DBResult } from "./db-types";
import { Rilevazione, RilevazioneMese } from "./measurement-types";

/**
 * Calculates the difference between the current weather data and the previous day's data.
 * - ⚠️ TBD: db res type
 * @param {any} data - The weather data containing the current and previous day's readings.
 * @return {WeatherOverviewData["delta"]} The delta object representing the difference in weather data.
 */
export function getDelta(data: any): WeatherOverviewData["delta"] {
  const curr = data.ultimaRilevazione;
  const before = data.rilevazioneGiornoPrimaUltima;

  const delta = {} as WeatherOverviewData["delta"];

  Object.keys(curr).forEach((key) => {
    if (!(key in KEYMATCHER)) return;
    const deltaKey = KEYMATCHER[key as keyof typeof KEYMATCHER];

    if (before[key] === null || curr[key] === null) {
      delta[deltaKey] = "";
      return;
    }
    if (deltaKey === "rain") {
      delta[deltaKey] = "Pioggia odierna";
      return;
    }
    if (deltaKey === "windDir" || deltaKey === "windSpeed") {
      delta[deltaKey] = "Informazioni vento odierne";
      return;
    }

    curr[key] = Number(curr[key]);
    before[key] = Number(before[key]);

    delta[deltaKey] =
      (((curr[key] - before[key]) / before[key]) * 100).toFixed(2) +
      " % da ieri";

    if (!delta[deltaKey].startsWith("-"))
      delta[deltaKey] = "+" + delta[deltaKey];
    return;
  });

  return delta;
}

/**
 * Returns an array of tabs containing the current, maximum, and minimum values for a given key.
 *
 * @param {DBResult} data - The database result object containing the data.
 * @param {string} key - The key to retrieve the values for.
 * @return {Tab[]} An array of tabs with the current, maximum, and minimum values.
 */
export function getTabs(data: DBResult, key: string): Tab[] {
  // key with first letter to upper
  const capKey = key[0].toUpperCase() + key.substring(1);

  return [
    {
      key: "Attuale",
      value: Number(
        data.ultimaRilevazione[(key + "UltimaRilevazione") as keyof Rilevazione]
      ),
    },
    {
      key: "Massima",
      value: Number(
        data[("max" + capKey + "Settimanale") as keyof DBArrays].at(-1)
      ),
    },
    {
      key: "Minima",
      value: Number(
        data[("min" + capKey + "Settimanale") as keyof DBArrays].at(-1)
      ),
    },
  ];
}

/**
 * Retrieves an array of numbers representing the graphs based on the provided data and key.
 *
 * @param {DBResult} data - The database result object containing the data.
 * @param {string} key - The key to retrieve the values for.
 * @return {number[]} An array of numbers representing the graphs.
 */
export function getGraphs(data: DBResult, key: string): number[] {
  // get key with correct type to avoid ts errors
  const k = (key + "Settimanale") as keyof DBArrays;
  // pressure value could be "9,999" so remove all ,
  // replace nulls with 0's
  if (key === "pressione")
    return data[k].map((x: string | null) =>
      x !== null ? Number(x.replaceAll(",", "")) : 0
    );
  return data[k].map((x: string | null) => Number(x) || 0);
}

/**
 * Returns an object containing daily graph weather data for a given set of daily weather observations.
 *
 * @param {DBResult["rilevazioniGiornaliere"]} data - An array of daily weather observations.
 * @return {WeatherOverviewData["daily"]} An object containing daily weather data, including temperature, humidity, rain, pressure, maximum and minimum temperature, and times.
 */
export function getDailyGraphs(
  data: DBResult["rilevazioniGiornaliere"]
): WeatherOverviewData["daily"] {
  return {
    temp: data.map((x) => Number(x.tempOut)),
    humidity: data.map((x) => Number(x.outHum)),
    rain: data.map((x) => Number(x.rain)),
    pressure: data.map((x) => Number(x.bar)),
    maxTemp: data.map((x) => Number(x.hiTemp)),
    minTemp: data.map((x) => Number(x.lowTemp)),
    // unused, kept for compatibility with types
    maxHumidity: [0],
    minHumidity: [0],
    maxPressure: [0],
    minPressure: [0],
    times: data.map((x) => format(x.data, "HH:mm")),
  };
}

/**
 * Returns an object containing daily weather data for a given set of daily weather observations.
 * Requires daily graphs to avoid redundant calculations.
 *
 * @param {WeatherHistory["rilevazioniGiornaliere"]} data - An array of daily weather observations.
 * @param {ReturnType<typeof getDailyGraphs>} daily - An object containing daily weather data, including temperature, humidity, rain, pressure, maximum and minimum temperature, and times.
 * @return {WeatherOverviewData} An object containing daily weather data, including temperature, humidity, rain, pressure, maximum and minimum temperature, and times.
 */
export function getArchiveDaily(
  data: WeatherHistory["rilevazioniGiornaliere"],
  daily: ReturnType<typeof getDailyGraphs>
): WeatherOverviewData {
  const windFreq = new Map();

  const tempObj = {
    temp: {
      max: 0,
      min: Infinity,
      avg: 0,
    },
    humidity: {
      max: 0,
      min: Infinity,
      avg: 0,
    },
    pressure: {
      max: 0,
      min: Infinity,
      avg: 0,
    },
    rain: 0,
    windSpeed: 0,
  };

  // get a counter of each wind direction
  // and max, min and sums for efficiency
  data.forEach((x) => {
    const dir = x.windDir;
    windFreq.set(dir, (windFreq.get(dir) || 0) + 1);
    tempObj.temp.max = Math.max(tempObj.temp.max, Number(x.tempOut));
    tempObj.temp.min = Math.min(tempObj.temp.min, Number(x.tempOut));
    tempObj.temp.avg += Number(x.tempOut);
    tempObj.humidity.max = Math.max(tempObj.humidity.max, Number(x.outHum));
    tempObj.humidity.min = Math.min(tempObj.humidity.min, Number(x.outHum));
    tempObj.humidity.avg += Number(x.outHum);
    tempObj.pressure.max = Math.max(tempObj.pressure.max, Number(x.bar));
    tempObj.pressure.min = Math.min(tempObj.pressure.min, Number(x.bar));
    tempObj.pressure.avg += Number(x.bar);
    tempObj.rain += Number(x.rain);
    tempObj.windSpeed += Number(x.windSpeed);
  });

  // reduce to most frequent wind
  const mostFreqWind = [...windFreq.entries()].reduce((a, b) =>
    a[1] > b[1] ? a : b
  );

  return {
    temp: [
      {
        key: "Attuale",
        value: Number((tempObj.temp.avg / data.length).toFixed(1)),
      },
      {
        key: "Massima",
        value: tempObj.temp.max,
      },
      {
        key: "Minima",
        value: tempObj.temp.min,
      },
    ],
    humidity: [
      {
        key: "Attuale",
        value: Number((tempObj.humidity.avg / data.length).toFixed(1)),
      },
      {
        key: "Massima",
        value: tempObj.humidity.max,
      },
      {
        key: "Minima",
        value: tempObj.humidity.min,
      },
    ],
    pressure: [
      {
        key: "Attuale",
        value: Number((tempObj.pressure.avg / data.length).toFixed(1)),
      },
      {
        key: "Massima",
        value: tempObj.pressure.max,
      },
      {
        key: "Minima",
        value: tempObj.pressure.min,
      },
    ],
    rain: Number(tempObj.rain.toFixed(1)),
    windDir: mostFreqWind[0],
    windSpeed: Number((tempObj.windSpeed / data.length).toFixed(1)),
    daily,
    delta: {
      temp:
        (
          ((tempObj.temp.max - tempObj.temp.min) / tempObj.temp.min) *
          100
        ).toFixed(1) + "% tra massimo e minimo",
      humidity:
        (
          ((tempObj.humidity.max - tempObj.humidity.min) /
            tempObj.humidity.min) *
          100
        ).toFixed(1) + "% tra massimo e minimo",
      rain: (((tempObj.rain - tempObj.rain) / tempObj.rain) * 100).toFixed(1),
      pressure:
        (
          ((tempObj.pressure.max - tempObj.pressure.min) /
            tempObj.pressure.min) *
          100
        ).toFixed(1) + "% tra massimo e minimo",
      windSpeed: "Informazioni vento del giorno",
      windDir: "Informazioni vento del giorno",
    },
  };
}

/**
 * Returns an array of tabs containing the current average, maximum, and minimum values of a given key from a list of weather history data.
 *
 * @param {WeatherHistory["rilevazioniUltimi30Giorni"]} data - The list of weather history data.
 * @param {string} key - The key to calculate the average, maximum, and minimum values for.
 * @return {Tab[]} An array of tabs containing the current average, maximum, and minimum values.
 */
export function getMonthlyTabs(
  data: WeatherHistory["rilevazioniUltimi30Giorni"],
  key: string
): Tab[] {
  const min = ("min" + key) as keyof RilevazioneMese;
  const max = ("max" + key) as keyof RilevazioneMese;
  const avg = (key.toLowerCase() + "Media") as keyof RilevazioneMese;

  return [
    {
      key: "Attuale",
      value: Number(
        (
          data
            .map((x) => Number(x[avg]))
            .reduce((total, num) => total + num, 0) / data.length
        ).toFixed(1)
      ),
    },
    {
      key: "Massima",
      value: Math.max(...data.map((x) => Number(x[max]))),
    },
    {
      key: "Minima",
      value: Math.min(...data.map((x) => Number(x[min]) || Infinity)),
    },
  ];
}

/**
 * Calculates the monthly delta for each tab in the given tabs object.
 *  - ⚠️ Can throw an error if a key of the tabs object is not iterable.
 * @param {Record<"temp" | "pressure" | "humidity", Tab[]>} tabs - An object containing tabs for temperature, pressure, and humidity.
 * @return {Record<"temp" | "pressure" | "humidity" | "rain", string>} - An object containing the monthly delta for each tab, including rain.
 */
export function getMonthlyDelta(
  tabs: Record<"temp" | "pressure" | "humidity", Tab[]>
) {
  const delta = {
    temp: "",
    humidity: "",
    pressure: "",
    rain: "Pioggia totale mese",
  };
  for (const key of Object.keys(tabs)) {
    const k = key as "temp" | "pressure" | "humidity";
    // avoid unecessary throwing
    if (!(k in delta) || key === "rain") continue;

    // check if tab is iterable, if not throw
    if (typeof tabs[k][Symbol.iterator] !== "function")
      throw new Error(`Tab ${k} not iterable`);

    const [_, max, min] = tabs[k];

    delta[k] = `+${(((max.value - min.value) / min.value) * 100).toFixed(
      1
    )}% tra massimo e minimo`;
  }

  return delta;
}
