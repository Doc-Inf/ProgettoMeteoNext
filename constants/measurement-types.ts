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
 * @property {string} pioggiaGiornaliera - the rainfall for the day
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
 * Represents an array of weather data for each day of the week
 * @type {object}
 * @property {number} id - the id of the record
 * @property {string} data - the date of the record
 * @property {string} tempOut - the temperature outside
 * @property {string} hiTemp - the highest temperature
 * @property {string} lowTemp - the lowest temperature
 * @property {number} outHum - the humidity outside
 * @property {string} devPt - the dew point
 * @property {string} windSpeed - the wind speed
 * @property {string} windDir - the wind direction
 * @property {string} windRun - the wind run
 * @property {string} hiSpeed - the highest wind speed
 * @property {string} hiDir - the wind direction of the highest wind speed
 * @property {string} chillWind - the chill wind
 * @property {string} heatIndex - the heat index
 * @property {string} thwIndex - the THW index
 * @property {string} bar - the pressure
 * @property {string} rain - the rain
 * @property {string} rainRate - the rain rate
 * @property {string} heatDD - the heating degree days
 * @property {string} coolDD - the cooling degree days
 * @property {string} inTemp - the temperature inside
 * @property {number} inHum - the humidity inside
 * @property {string} inDew - the dew point inside
 * @property {string} inHeat - the heat index inside
 * @property {string} inEMC - the equivalent temperature inside
 * @property {string} inAirDensity - the air density inside
 * @property {number} windSamp - the wind sample
 * @property {number} windTx - the wind transmission
 * @property {string} issRecept - the ISS reception
 * @property {number} arcInt - the arc intensity
 */
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

export interface RilevazioneExtra {
  maxTemperatura: string;
  minTemperatura: string;
  temperaturaMedia: string;
  maxUmidita: number;
  minUmidita: number;
  umiditaMedia: string;
  maxPressione: string;
  minPressione: string;
  pressioneMedia: string;
  maxVelocitaVento: string;
  minVelocitaVento: string;
  mediaVelocitaVento: string;
  pioggiaGiornaliera: string;
}

export interface RilevazioneMese extends RilevazioneExtra {
  data: string;
}

export interface RilevazioneAnno extends RilevazioneExtra {
  anno: string;
}

export interface RilevazionePerMese extends RilevazioneAnno {
  mese: Number;
}
