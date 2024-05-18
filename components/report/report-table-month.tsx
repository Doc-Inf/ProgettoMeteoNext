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
import { useEffect } from "react";
import { Skeleton } from "../ui/skeleton";

export default function ReportTableMonth() {
  const currMonth = new Date().getMonth();

  const mutation = useMutation({
    mutationFn: async (month: string) => {
      const res = await fetch(
        `api/report/month?anno=${new Date().getFullYear()}&mese=${month}`,
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
    mutation.mutate((currMonth + 1).toString());
  }, []);
  return (
    <div className="mt-40">
      <div className="lg:w-[1200px] m-auto grid md:grid-cols-2 *:m-auto  gap-2 items-center mb-4">
        <p className="text-lg text-center lg:text-3xl md:text-xl text-foreground">
          Rilevamenti mensili
        </p>

        <Select
          defaultValue={currMonth.toString()}
          onValueChange={(d) => mutation.mutate((Number(d) + 1).toString())}
        >
          <SelectTrigger className="w-[280px] rounded-xl shadow-md shadow-input border-primary/20 dark:shadow-none">
            <SelectValue
              placeholder="Mese"
              className="text-white"
              aria-label="Seleziona un mese"
            />
            <p className="sr-only">Anno da cercare</p>
          </SelectTrigger>
          <SelectContent className="w-[280px] rounded-xl  shadow-input dark:shadow-none pb-3">
            <SelectGroup className="px-2">
              <SelectLabel className="-px-1">Mese</SelectLabel>

              {new Array(12).fill(0).map(
                (_, i) =>
                  i <= currMonth && (
                    <SelectItem
                      className="text-md"
                      value={i.toString()}
                      key={i + 1}
                    >
                      {format(new Date().setMonth(i), "MMMM", {
                        locale: it,
                      })}
                    </SelectItem>
                  )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
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
          <p className="text-center text-lg mt-8 md:text-xl text-destructive">
            {mutation.error.message}
          </p>
        )}
      </div>
    </div>
  );
}
