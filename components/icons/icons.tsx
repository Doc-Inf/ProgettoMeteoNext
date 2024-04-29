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
} from "lucide-react";

export const Cloudy = (props: LucideProps) => <Cloud {...props} />;
export const Sunny = (props: LucideProps) => <Sun {...props} />;
export const Rainy = (props: LucideProps) => <CloudRain {...props} />;
export const PartialyCloudy = (props: LucideProps) => <CloudSun {...props} />;
export const NightClear = (props: LucideProps) => <Moon {...props} />;

export const Weather = attachSubComponents("Weather", () => <></>, {
  Cloudy,
  Sunny,
  Rainy,
  PartialyCloudy,
  NightClear,
});

export const Temperature = (props: LucideProps) => <Thermometer {...props} />;
export const Humidity = (props: LucideProps) => <Droplet {...props} />;
export const Pressure = (props: LucideProps) => <ParkingMeter {...props} />;
export const Rain = (props: LucideProps) => <CloudRain {...props} />;
export const Wind = (props: LucideProps) => <LucideWind {...props} />;

export const WeatherDetails = attachSubComponents(
  "WeatherDetails",
  () => <></>,
  {
    Temperature,
    Humidity,
    Pressure,
    Rain,
    Wind,
  }
);
