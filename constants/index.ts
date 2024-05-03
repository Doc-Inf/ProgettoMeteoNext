export const NAV_LINKS = [
  {
    name: "Home",
    href: "https://www.itisvallauri.net/meteo3/",
  },
  {
    name: "Chi siamo",
    href: "/chi-siamo",
  },
  {
    name: "Storico",
    href: "/storico",
  },
  {
    name: "Report",
    href: "/report",
  },
];

export type Tab = { key: "Attuale" | "Massima" | "Minima"; value: number };
export interface WeatherOverviewData {
  temp: Tab[];
  humidity: Tab[];
  rain: number;
  windDir: string;
  windSpeed: number;
  pressure: Tab[];
  delta: {
    temp: string;
    humidity: string;
    rain: string;
    pressure: string;
    windSpeed: string;
    windDir: string;
  };
}
export const KEYMATCHER: Record<string, keyof WeatherOverviewData["delta"]> = {
  temperaturaUltimaRilevazione: "temp",
  umiditaUltimaRilevazione: "humidity",
  pressioneUltimaRilevazione: "pressure",
  direzioneVentoUltimaRilevazione: "windDir",
} as const;
export const TITLEMATCHER: Record<keyof WeatherOverviewData["delta"], string> =
  {
    temp: "Temperatura",
    humidity: "Umidita'",
    rain: "Precipitazioni",
    pressure: "Pressione",
    windSpeed: "Velocità del vento",
    windDir: "Direzione del vento",
  } as const;
export const UNITMATCHER: Record<keyof WeatherOverviewData["delta"], string> = {
  temp: "°C",
  humidity: "%",
  rain: "mm",
  pressure: "hPa",
  windSpeed: "km/h",
  windDir: "",
} as const;
export interface WeatherGraphs {
  temp: number[];
  humidity: number[];
  rain: number[];
  pressure: number[];
  minTemp: number[];
  maxTemp: number[];
}
