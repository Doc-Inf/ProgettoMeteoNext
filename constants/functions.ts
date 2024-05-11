import {
  type DBArrays,
  type DBResult,
  KEYMATCHER,
  type Rilevazione,
  type Tab,
  type WeatherOverviewData,
} from "./weather-types";

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
        data[("max" + capKey + "Settimanale") as keyof DBArrays][6]
      ),
    },
    {
      key: "Minima",
      value: Number(
        data[("min" + capKey + "Settimanale") as keyof DBArrays][6]
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
  return data[k].map((x: string | null) => (x !== null ? Number(x) : 0));
}
