import { Rilevazione, RilevazioniGiornaliere } from "./measurement-types";

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
 * @property {RilevazioniGiornaliere[]} rilevazioniGiornaliere - an array of weather data for each day of the week
 */
export interface DBResult extends DBArrays {
  ultimaRilevazione: Rilevazione;
  rilevazioneGiornoPrimaUltima: Rilevazione;
  rilevazioniGiornaliere: RilevazioniGiornaliere[];
}
