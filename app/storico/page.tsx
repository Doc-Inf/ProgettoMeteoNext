import { ArchiveForm } from "@/components/archive-form";
import { ArchiveResMonthly } from "@/components/archive-res";
import ArchiveHeading from "@/components/headings/archive-heading";

const mockData = {
  overview: [
    {
      title: "Temperatura",
      tabs: [
        { key: "Minima", value: 10.1 },
        { key: "Media", value: 20.6 },
        { key: "Massima", value: 30.2 },
      ],
      unit: "°C",
    },
    {
      title: "Umidita'",
      tabs: [
        { key: "Minima", value: 50.1 },
        { key: "Media", value: 60.6 },
        { key: "Massima", value: 90.2 },
      ],
      unit: "%",
    },
    {
      title: "Precipitazioni",
      tabs: [
        { key: "Minima", value: 0.0 },
        { key: "Media", value: 0.1 },
        { key: "Massima", value: 8.2 },
      ],
      unit: "mm",
    },
    {
      title: "Pressione",
      tabs: [
        { key: "Minima", value: 981.2 },
        { key: "Media", value: 1021.6 },
        { key: "Massima", value: 1049.9 },
      ],
      unit: "hPa",
    },
  ],
  graphs: [
    {
      name: "temperatura",
      data: new Array(30).fill(0).map((_) => Math.floor(Math.random() * 30)),
      unit: "°C",
    },
    {
      name: "umidità",
      data: new Array(30).fill(0).map((_) => Math.floor(Math.random() * 100)),
      unit: "%",
    },
    {
      name: "precipitazioni",
      data: new Array(30).fill(0).map((_) => Math.floor(Math.random() * 10)),
      unit: "mm",
    },
    {
      name: "pressione",
      data: new Array(30)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 30) + 1000),
      unit: "hPa",
    },
  ],
};
export default function Page() {
  return (
    <>
      <ArchiveHeading />
      <ArchiveForm />
    </>
  );
}
