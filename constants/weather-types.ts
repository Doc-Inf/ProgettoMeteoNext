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
 */
export interface WeatherGraphs {
  temp: number[];
  humidity: number[];
  rain: number[];
  pressure: number[];
  minTemp: number[];
  maxTemp: number[];
}

// temp type for fixed length
type ArrayLengthMutationKeys = "splice" | "push" | "pop" | "shift" | "unshift";
type FixedLengthArray<T, L extends number, TObj = [T, ...Array<T>]> = Pick<
  TObj,
  Exclude<keyof TObj, ArrayLengthMutationKeys>
> & {
  readonly length: L;
  [I: number]: T;
  [Symbol.iterator]: () => IterableIterator<T>;
};

/**
 * Represents a weather observation.
 *
 * @property {string} dataOraUltimaRilevazione - the date and time of the last observation
 * @property {string} temperaturaUltimaRilevazione - the temperature at the last observation
 * @property {number} umiditaUltimaRilevazione - the humidity at the last observation
 * @property {string} pressioneUltimaRilevazione - the pressure at the last observation
 * @property {string} direzioneVentoUltimaRilevazione - the wind direction at the last observation
 * @property {string} velocitaVentoUltimaRilevazione - the wind speed at the last observation
 * @property {string} data - the date of the observation
 * @property {string} maxTemperatura - the maximum temperature for the day
 * @property {string} oraMaxTemperatura - the time of the maximum temperature
 * @property {string} minTemperatura - the minimum temperature for the day
 * @property {string} oraMinTemperatura - the time of the minimum temperature
 * @property {string} temperaturaMedia - the average temperature for the day
 * @property {number} maxUmidita - the maximum humidity for the day
 * @property {string} oraMaxUmidita - the time of the maximum humidity
 * @property {number} minUmidita - the minimum humidity for the day
 * @property {string} oraMinUmidita - the time of the minimum humidity
 * @property {string} umiditaMedia - the average humidity for the day
 * @property {string} maxPressione - the maximum pressure for the day
 * @property {string} oraMaxPressione - the time of the maximum pressure
 * @property {string} minPressione - the minimum pressure for the day
 * @property {string} oraMinPressione - the time of the minimum pressure
 * @property {string} pressioneMedia - the average pressure for the day
 * @property {string} maxVelocitaVento - the maximum wind speed for the day
 * @property {string} oraMaxVelocitaVento - the time of the maximum wind speed
 * @property {string} minVelocitaVento - the minimum wind speed for the day
 * @property {string} oraMinVelocitaVento - the time of the minimum wind speed
 * @property {string} mediaVelocitaVento - the average wind speed for the day
 * @property {string} direzioneMaxVento - the direction of the maximum wind speed
 */
export type Rilevazione = {
  dataOraUltimaRilevazione: string;
  temperaturaUltimaRilevazione: string;
  umiditaUltimaRilevazione: number;
  pressioneUltimaRilevazione: string;
  direzioneVentoUltimaRilevazione: string;
  velocitaVentoUltimaRilevazione: string;
  data: string;
  maxTemperatura: string;
  oraMaxTemperatura: string;
  minTemperatura: string;
  oraMinTemperatura: string;
  temperaturaMedia: string;
  maxUmidita: number;
  oraMaxUmidita: string;
  minUmidita: number;
  oraMinUmidita: string;
  umiditaMedia: string;
  maxPressione: string;
  oraMaxPressione: string;
  minPressione: string;
  oraMinPressione: string;
  pressioneMedia: string;
  maxVelocitaVento: string;
  oraMaxVelocitaVento: string;
  minVelocitaVento: string;
  oraMinVelocitaVento: string;
  mediaVelocitaVento: string;
  direzioneMaxVento: string;
  pioggiaGiornaliera: string;
};

/**
 * Represents an object containing arrays of weather data for the current week.
 * Each property is an array of length 7, where the first element is the data
 * for the current day and the last element is the data for the day a week ago.
 * @interface DBArrays
 * @property {string[]} giorniSettimanaCorrente - the names of the days of the week
 * @property {string[]} temperaturaSettimanale - the temperatures for each day of the week
 * @property {number[]} umiditaSettimanale - the humidities for each day of the week
 * @property {string[]} pressioneSettimanale - the pressures for each day of the week
 * @property {string[]} pioggiaSettimanale - the rainfalls for each day of the week
 * @property {string[]} maxTemperaturaSettimanale - the maximum temperatures for each day of the week
 * @property {string[]} minTemperaturaSettimanale - the minimum temperatures for each day of the week
 * @property {string[]} maxPressioneSettimanale - the maximum pressures for each day of the week
 * @property {string[]} minPressioneSettimanale - the minimum pressures for each day of the week
 */
export interface DBArrays {
  giorniSettimanaCorrente: FixedLengthArray<string, 7>;
  temperaturaSettimanale: FixedLengthArray<string, 7>;
  umiditaSettimanale: FixedLengthArray<string, 7>;
  pressioneSettimanale: FixedLengthArray<string, 7>;
  pioggiaSettimanale: FixedLengthArray<string, 7>;
  maxTemperaturaSettimanale: FixedLengthArray<string, 7>;
  minTemperaturaSettimanale: FixedLengthArray<string, 7>;
  maxPressioneSettimanale: FixedLengthArray<string, 7>;
  minPressioneSettimanale: FixedLengthArray<string, 7>;
}

/**
 * Represents an object containing arrays of weather data for the current week and
 * weather observations of the current day and the day before.
 * @interface DBResult
 * @extends DBArrays
 * @property {Rilevazione} ultimaRilevazione - the last recorded weather data
 * @property {Rilevazione} rilevazioneGiornoPrimaUltima - the weather data from the day before the last recorded data
 */
export interface DBResult extends DBArrays {
  ultimaRilevazione: Rilevazione;
  rilevazioneGiornoPrimaUltima: Rilevazione;
  rilevazioniGiornaliere: RilevazioniGiornaliere[];
}

export type RilevazioniGiornaliere = {
  id: number;
  data: string;
  tempOut: string;
  hiTemp: string;
  lowTemp: string;
  outHum: number;
  devPt: string;
  windSpeed: string;
  windDir: string;
  windRun: string;
  hiSpeed: string;
  hiDir: string;
  chillWind: string;
  heatIndex: string;
  thwIndex: string;
  bar: string;
  rain: string;
  rainRate: string;
  heatDD: string;
  coolDD: string;
  inTemp: string;
  inHum: number;
  inDew: string;
  inHeat: string;
  inEMC: string;
  inAirDensity: string;
  windSamp: number;
  windTx: number;
  issRecept: string;
  arcInt: number;
};

export type RilevazioneMese = {
  data: string;
  maxTemperatura: string;
  minTemperatura: string;
  mediaTemperatura: string;
  maxUmidita: number;
  minUmidita: number;
  mediaUmidita: string;
  maxPressione: string;
  minPressione: string;
  mediaPressione: string;
  maxVelocitaVento: string;
  minVelocitaVento: string;
  mediaVelocitaVento: string;
  pioggiaGiornaliera: string;
};

export interface WeatherHistory {
  rilevazioniGiornaliere: RilevazioniGiornaliere[];
  rilevazioniUltimi30Giorni: RilevazioneMese[];
}
