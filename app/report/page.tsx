import ReportHeading from "@/components/headings/report-heading";
import { WeatherInfo } from "@/components/report/columns";
import ReportTableWrapper from "@/components/report/report-table-wrapper";

const createMockObj = (id: number) => {
  return {
    id,
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
  };
};

const dataYear: WeatherInfo[] = Array.from({ length: 4 }, (_, index) => {
  return createMockObj(index + 2021);
});

const dataMonth: WeatherInfo[] = Array.from({ length: 12 }, (_, index) => {
  return createMockObj(index + 1);
});
const dataDay: WeatherInfo[] = Array.from({ length: 30 }, (_, index) => {
  return createMockObj(index + 1);
});

export default function Page() {
  return (
    <>
      <ReportHeading />

      <ReportTableWrapper data={dataYear} type="year" />

      <ReportTableWrapper data={dataMonth} type="month" />

      <ReportTableWrapper data={dataDay} type="day" />
    </>
  );
}
