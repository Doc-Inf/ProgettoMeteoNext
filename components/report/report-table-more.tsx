import { columns, type WeatherInfo } from "@/components/report/columns";
import { format } from "date-fns";
import { ReportTable } from "./data-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { it } from "date-fns/locale";
import { WeatherArchive } from "@/constants/weather-types";
import { Skeleton } from "../ui/skeleton";

export default async function ReportTableMore() {
  let err = "";
  const res = await fetch(
    "https://www.itisvallauri.net/meteo4/php/datiReport.php",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) err = "Nessuna rilevazione trovata, riprova più tardi";

  const data: WeatherArchive = await res.json();

  const info: WeatherInfo[] = data.reportAnnuale.map((x) => {
    return {
      id: Number(x.anno),
      temp: {
        max: Number(x.maxTemperatura),
        min: Number(x.minTemperatura),
        avg: Number(x.temperaturaMedia),
      },
      hum: {
        max: Number(x.maxUmidita),
        min: Number(x.minUmidita),
        avg: Number(x.umiditaMedia),
      },
      pressure: {
        max: Number(x.maxPressione),
        min: Number(x.minPressione),
        avg: Number(x.pressioneMedia),
      },
      rain: Number(x.pioggiaGiornaliera),
      wind: {
        max: Number(x.maxVelocitaVento),
        min: Number(x.minVelocitaVento),
        avg: Number(x.mediaVelocitaVento),
      },
    };
  });
  return (
    <div className="mt-40">
      <p className="text-lg text-center lg:text-3xl md:text-xl text-foreground">
        Rivelamenti Annuali
      </p>

      {
        <div className="h-[380px]">
          {info && <ReportTable data={info} columns={columns} type={"year"} />}
          {!info && <Skeleton className=" md:px-10 w-[90%] m-auto h-full" />}
          {err !== "" && (
            <p className="mt-8 text-lg text-center md:text-xl text-destructive">
              {err}
            </p>
          )}
        </div>
      }
    </div>
  );
}
