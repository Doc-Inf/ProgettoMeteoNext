import type {
  RilevazioneAnno,
  RilevazioneMese,
  RilevazionePerMese,
  RilevazioniGiornaliere,
} from "./measurement-types";

/**
 * An interface that describes a tab in the weather overview
 *
 * @property {string} key - the key of the tab, it can be "Attuale" (current), "Massima" (maximum) or "Minima" (minimum)
 * @property {number} value - the value of the tab, it's the temperature, humidity, wind speed, rainfall or pressure
 */
export type Tab = { key: "Attuale" | "Massima" | "Minima"; value: number };

/**
 * An interface that describes the weather data for the current overview
 *
 * @property {Tab[]} temp - an array of temperature tabs, each containing a key and a value
 * @property {Tab[]} humidity - an array of humidity tabs, each containing a key and a value
 * @property {number} rain - the amount of rain in millimeters
 * @property {string} windDir - the direction of the wind
 * @property {number} windSpeed - the speed of the wind in kilometers per hour
 * @property {Tab[]} pressure - an array of pressure tabs, each containing a key and a value
 * @property {Object} delta - an object containing the difference between the current reading and the previous one
 * @property {string} delta.temp - the difference in temperature
 * @property {string} delta.humidity - the difference in humidity
 * @property {string} delta.rain - the difference in rainfall
 * @property {string} delta.pressure - the difference in pressure
 * @property {WeatherGraphs & { times: Array<string> }} daily - the weather data for the daily graph
 */
export interface WeatherOverviewData {
  temp: Tab[];
  humidity: Tab[];
  rain: number;
  windDir: string;
  windSpeed: number;
  pressure: Tab[];
  daily?: WeatherGraphs & {
    times: Array<string>;
  };
  delta: {
    temp: string;
    humidity: string;
    rain: string;
    pressure: string;
    windSpeed: string;
    windDir: string;
  };
}

/**
 * Interface that represents the weather data for graphs.
 * It contains the necessary data to generate the graphs in the UI.
 *
 * @property {number[]} temp - array of temperature values
 * @property {number[]} humidity - array of humidity values
 * @property {number[]} rain - array of rainfall values
 * @property {number[]} pressure - array of pressure values
 * @property {number[]} minTemp - array of minimum temperature values
 * @property {number[]} maxTemp - array of maximum temperature values
 * @property {number[]} minHumidity - array of minimum humidity values
 * @property {number[]} maxHumidity - array of maximum humidity values
 * @property {number[]} minPressure - array of minimum pressure values
 * @property {number[]} maxPressure - array of maximum pressure values
 */
export interface WeatherGraphs {
  temp: number[];
  humidity: number[];
  rain: number[];
  pressure: number[];
  minTemp: number[];
  maxTemp: number[];
  minHumidity: number[];
  maxHumidity: number[];
  minPressure: number[];
  maxPressure: number[];
}

/**
 * Interface that represents the weather history data.
 * It contains the necessary data to generate the weather history page.
 *
 * @property {RilevazioniGiornaliere[]} rilevazioniGiornaliere - array of RilevazioneGiornaliere objects
 * @property {RilevazioneMese[]} rilevazioniUltimi30Giorni - array of RilevazioneMese objects
 */
export interface WeatherHistory {
  rilevazioniGiornaliere: RilevazioniGiornaliere[];
  rilevazioniUltimi30Giorni: RilevazioneMese[];
}

/**
 * Interface that represents the weather archive data.
 * It contains the necessary data to generate the weather archive page.
 *
 * @property {RilevazioneAnno[]} reportAnnuale - array of RilevazioneAnno objects
 * @property {RilevazionePerMese[]} rilevazioniAnnualiPerMese - array of RilevazionePerMese objects
 * @property {RilevazioneMese[]} rilevazioniMese - array of RilevazioneMese objects
 */
export interface WeatherArchive {
  reportAnnuale: RilevazioneAnno[];
  rilevazioniAnnualiPerMese: RilevazionePerMese[];
  rilevazioniMese: RilevazioneMese[];
}

/**
 * This object maps the keys of the Rilevazione interface to the keys of the delta object in the WeatherOverviewData interface.
 * This is used to match the keys of the data obtained from the database with the keys of the UI.
 *
 * @property {string} temperaturaUltimaRilevazione - maps to the temp key of the delta object
 * @property {string} umiditaUltimaRilevazione - maps to the humidity key of the delta object
 * @property {string} pressioneUltimaRilevazione - maps to the pressure key of the delta object
 * @property {string} direzioneVentoUltimaRilevazione - maps to the windDir key of the delta object
 */
export const KEYMATCHER: Record<string, keyof WeatherOverviewData["delta"]> = {
  temperaturaUltimaRilevazione: "temp",
  umiditaUltimaRilevazione: "humidity",
  pressioneUltimaRilevazione: "pressure",
  direzioneVentoUltimaRilevazione: "windDir",
} as const;

/**
 * This object maps the keys of the delta object in the WeatherOverviewData interface to their corresponding titles.
 * This is used to map the keys of the data obtained from the database with their corresponding titles in the UI.
 *
 * @property {string} temp - maps to the temperature title
 * @property {string} humidity - maps to the humidity title
 * @property {string} rain - maps to the rainfall title
 * @property {string} pressure - maps to the pressure title
 * @property {string} windSpeed - maps to the wind speed title
 * @property {string} windDir - maps to the wind direction title
 */
export const TITLEMATCHER: Record<keyof WeatherOverviewData["delta"], string> =
  {
    temp: "Temperatura",
    humidity: "Umidita'",
    rain: "Precipitazioni",
    pressure: "Pressione",
    windSpeed: "Velocità del vento",
    windDir: "Direzione del vento",
  } as const;

/**
 * This object maps the keys of the delta object in the WeatherOverviewData interface to their corresponding units.
 * This is used to map the keys of the data obtained from the database with their corresponding units in the UI.
 *
 * @property {string} temp - maps to the temperature unit
 * @property {string} humidity - maps to the humidity unit
 * @property {string} rain - maps to the rainfall unit
 * @property {string} pressure - maps to the pressure unit
 * @property {string} windSpeed - maps to the wind speed unit
 * @property {string} windDir - maps to the wind direction unit
 */
export const UNITMATCHER: Record<keyof WeatherOverviewData["delta"], string> = {
  temp: "°C",
  humidity: "%",
  rain: "mm",
  pressure: "hPa",
  windSpeed: "km/h",
  windDir: "",
} as const;
