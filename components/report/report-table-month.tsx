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
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import MonthPicker from "./report-month-picker";

export default function ReportTableMonth() {
  const [currMonth, setCurrMonth] = useState(new Date());
  const [currYear, setCurrYear] = useState(format(new Date(), "yyyy"));

  const mutation = useMutation({
    mutationFn: async (month: string) => {
      const res = await fetch(
        `api/report/month?anno=${currYear}&mese=${month}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok)
        throw new Error(
          "Nessuna rilevazione trovata per l'anno selezionato, riprova più tardi"
        );

      const data: WeatherArchive = await res.json();

      const info: WeatherInfo[] = data.rilevazioniMese.map((x) => {
        return {
          id: Number(format(x.data, "dd")),
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
      return info;
    },
  });

  useEffect(() => {
    mutation.mutate((currMonth.getMonth() + 1).toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="mt-40">
      <div className="lg:w-[1200px] m-auto grid md:grid-cols-2 *:m-auto  gap-2 items-center mb-4">
        <p className="text-lg text-center lg:text-3xl md:text-xl text-foreground">
          Rilevamenti {format(currMonth, "LLLL", { locale: it })} {currYear}
        </p>

        <MonthPicker
          currentMonth={currMonth}
          currentYear={currYear}
          onMonthChange={(m) => {
            setCurrMonth(m);
            mutation.mutate((m.getMonth() + 1).toString());
          }}
          onYearChange={setCurrYear}
        />
      </div>

      <div className="h-[650px]">
        {" "}
        {mutation.status === "success" && (
          <ReportTable data={mutation.data} columns={columns} type={"day"} />
        )}
        {mutation.isPending && (
          <Skeleton className=" md:px-10 w-[90%] m-auto h-full" />
        )}
        {mutation.isError && (
          <p className="mt-8 text-lg text-center md:text-xl text-destructive">
            {mutation.error.message}
          </p>
        )}
      </div>
    </div>
  );
}
