import { WeatherInfo, columns } from "@/components/report/columns";
import { ReportTable } from "@/components/report/data-table";

const data: WeatherInfo[] = [
  {
    id: 2022,
    temp: {
      min: Math.floor(Math.random() * 30),
      max: Math.floor(Math.random() * 30),
      avg: Math.floor(Math.random() * 30),
    },
    hum: {
      min: Math.floor(Math.random() * 100),
      max: Math.floor(Math.random() * 100),
      avg: Math.floor(Math.random() * 100),
    },
    wind: {
      min: Math.floor(Math.random() * 50),
      max: Math.floor(Math.random() * 50),
      avg: Math.floor(Math.random() * 50),
    },
    rain: {
      min: Math.floor(Math.random() * 10),
      max: Math.floor(Math.random() * 10),
      avg: Math.floor(Math.random() * 10),
    },
    pressure: {
      min: Math.floor(Math.random() * 1100),
      max: Math.floor(Math.random() * 1100),
      avg: Math.floor(Math.random() * 1100),
    },
  },
  {
    id: 2023,
    temp: {
      min: Math.floor(Math.random() * 30),
      max: Math.floor(Math.random() * 30),
      avg: Math.floor(Math.random() * 30),
    },
    hum: {
      min: Math.floor(Math.random() * 100),
      max: Math.floor(Math.random() * 100),
      avg: Math.floor(Math.random() * 100),
    },
    wind: {
      min: Math.floor(Math.random() * 50),
      max: Math.floor(Math.random() * 50),
      avg: Math.floor(Math.random() * 50),
    },
    rain: {
      min: Math.floor(Math.random() * 10),
      max: Math.floor(Math.random() * 10),
      avg: Math.floor(Math.random() * 10),
    },
    pressure: {
      min: Math.floor(Math.random() * 1100),
      max: Math.floor(Math.random() * 1100),
      avg: Math.floor(Math.random() * 1100),
    },
  },
  {
    id: 2024,
    temp: {
      min: Math.floor(Math.random() * 30),
      max: Math.floor(Math.random() * 30),
      avg: Math.floor(Math.random() * 30),
    },
    hum: {
      min: Math.floor(Math.random() * 100),
      max: Math.floor(Math.random() * 100),
      avg: Math.floor(Math.random() * 100),
    },
    wind: {
      min: Math.floor(Math.random() * 50),
      max: Math.floor(Math.random() * 50),
      avg: Math.floor(Math.random() * 50),
    },
    rain: {
      min: Math.floor(Math.random() * 10),
      max: Math.floor(Math.random() * 10),
      avg: Math.floor(Math.random() * 10),
    },
    pressure: {
      min: Math.floor(Math.random() * 1100),
      max: Math.floor(Math.random() * 1100),
      avg: Math.floor(Math.random() * 1100),
    },
  },
];
export default function Page() {
  return (
    <div className="mt-40">
      <ReportTable data={data} columns={columns} type="year" />
    </div>
  );
}
