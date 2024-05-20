import { Cloud, CloudRain, Sun, SunDim } from "lucide-react";

export function useWeather({
  temperature,
  pressure,
  humidity,
}: {
  temperature: number;
  pressure: number;
  humidity: number;
}) {
  let status = "Limpido";

  if (humidity > 80 && temperature > 0 && temperature < 30) status = "Pioggia";
  if (humidity > 50 && humidity < 80 && pressure >= 1000 && pressure <= 1020)
    status = "Nuvoloso";
  if (humidity < 50 && pressure >= 1010 && pressure <= 1020)
    status = "Soleggiato";
  if (pressure > 1020) status = "Limpido";

  return {
    icon: <Icon status={status} />,
    status,
  };
}
export const Icon: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case "Limpido":
      return <SunDim stroke="#17A34A" />;
    case "Pioggia":
      return <CloudRain stroke="#17A34A" />;
    case "Nuvoloso":
      return <Cloud stroke="#17A34A" />;
    case "Soleggiato":
      return <Sun stroke="#17A34A" />;
    default:
      return <SunDim stroke="#17A34A" />;
  }
};

// WeatherZ algo found here: https://earthscience.stackexchange.com/questions/16366/weather-forecast-based-on-pressure-temperature-and-humidity-only-for-implement
const ZMAP = [
  "Settled Fine",
  "Fine Weather",
  "Fine Becoming Less Settled",
  "Fairly Fine Showery Later",
  "Showery Becoming more unsettled",
  "Unsettled, Rain later",
  "Rain at times, worse later.",
  "Rain at times, becoming very unsettled",
  "Very Unsettled, Rain",
  "Settled Fine",
  "Fine Weather",
  "Fine, Possibly showers",
  "Fairly Fine, Showers likely",
  "Showery Bright Intervals",
  "Changeable some rain",
  "Unsettled, rain at times",
  "Rain at Frequent Intervals",
  "Very Unsettled, Rain",
  "Stormy, much rain",
  "Settled Fine",
  "Fine Weather",
  "Becoming Fine",
  "Fairly Fine, Improving",
  "Fairly Fine, Possibly showers, early",
  "Showery Early, Improving",
  "Changeable Mending",
  "Rather Unsettled Clearing Later",
  "Unsettled, Probably Improving",
  "Unsettled, short fine Intervals",
  "Very Unsettled, Finer at times",
  "Stormy, possibly improving",
  "Stormy, much rain",
];
// NOT USED, only for future forecasts
export function useWeatherZ({
  altitude,
  temperature,
  pressure,
  yesterdayPressure,
  windDir,
  date,
}: {
  altitude: number;
  temperature: number;
  pressure: number;
  yesterdayPressure: number;
  windDir: string;
  date: string;
}) {
  const adjH = altitude * 0.0065;
  const p0: number =
    pressure * (1 - Math.pow(adjH / (temperature + adjH + 273.15), -5.257));

  const isIncreasing = pressure - yesterdayPressure > 0;
  let z = isIncreasing ? 179 - (2 * p0) / 129 : 130 - p0 / 81;

  if (windDir.includes("N")) z += 1;
  if (windDir.includes("S")) z -= 2;

  const month = new Date(date).getMonth();
  const season = ["summer", "autumn", "winter", "spring"][
    ((month / 12) * 4) % 4
  ];

  if (season === "summer") z += 1;
  if (season === "winter") z -= 1;

  const res = ZMAP[z];

  // TODO: convert weather status from ZMAP
  return {
    status: "",
  };
}
