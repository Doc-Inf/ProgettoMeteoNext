import { attachSubComponents } from "@/lib/attachSub";
import {
  Cloud,
  type LucideProps,
  Sun,
  CloudRain,
  CloudSun,
  Moon,
  Droplet,
  ParkingMeter,
  LucideWind,
  Thermometer,
  SunDim,
} from "lucide-react";

export const Clear = (props: LucideProps) => <SunDim {...props} />;
export const Cloudy = (props: LucideProps) => <Cloudy {...props} />;
export const Sunny = (props: LucideProps) => <Sun {...props} />;
export const Rainy = (props: LucideProps) => <CloudRain {...props} />;
export const PartialyCloudy = (props: LucideProps) => <CloudSun {...props} />;
export const NightClear = (props: LucideProps) => <Moon {...props} />;

export const Weather = attachSubComponents("Weather", () => <></>, {
  Cloudy,
  Clear,
  Sunny,
  Rainy,
  PartialyCloudy,
  NightClear,
});

export const Temp = (props: LucideProps) => <Thermometer {...props} />;
export const Humidity = (props: LucideProps) => <Droplet {...props} />;
export const Pressure = (props: LucideProps) => <ParkingMeter {...props} />;
export const Rain = (props: LucideProps) => <CloudRain {...props} />;
export const Wind = (props: LucideProps) => <LucideWind {...props} />;

export const WeatherDetails = attachSubComponents(
  "WeatherDetails",
  () => <></>,
  {
    Temp,
    Humidity,
    Pressure,
    Rain,
    Wind,
  }
);
