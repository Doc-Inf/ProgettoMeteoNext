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

export default function ReportTableYear() {
  const currYear = new Date().getFullYear();

  const mutation = useMutation({
    mutationFn: async (year: string) => {
      const res = await fetch(`api/report/year?anno=${year}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok)
        throw new Error(
          "Nessuna rilevazione trovata per l'anno selezionato, riprova più tardi"
        );

      const data: WeatherArchive = await res.json();

      const info: WeatherInfo[] = data.rilevazioniAnnualiPerMese.map((x) => {
        return {
          id: Number(x.mese),
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
    mutation.mutate(format(new Date(), "yyyy", { locale: it }));
  }, []);

  return (
    <div className="mt-40">
      <div className="lg:w-[1200px] m-auto grid md:grid-cols-2 *:m-auto  gap-2 items-center mb-4">
        <p className="text-lg text-center lg:text-3xl md:text-xl text-foreground">
          Rilevamenti mensili
        </p>

        <Select
          defaultValue={format(new Date(), "yyyy", { locale: it })}
          onValueChange={(d) => mutation.mutate(d)}
        >
          <SelectTrigger className="w-[280px] rounded-xl shadow-md shadow-input border-primary/20 dark:shadow-none">
            <SelectValue
              placeholder="Anno"
              className="text-white"
              aria-label="Seleziona un anno"
            />
            <p className="sr-only">Anno da cercare</p>
          </SelectTrigger>
          <SelectContent className="w-[280px] rounded-xl  shadow-input dark:shadow-none pb-3">
            <SelectGroup className="px-2">
              <SelectLabel className="-px-1">Anno</SelectLabel>

              {new Array(4).fill(0).map((_, i) => (
                <SelectItem
                  className="text-md"
                  value={(currYear - 3 + i).toString()}
                  key={i + currYear - 3}
                >
                  {format(new Date().setFullYear(currYear - 3 + i), "yyyy", {
                    locale: it,
                  })}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>{" "}
      {mutation.status === "success" && (
        <div
          className={` h-[${
            mutation.data.length > 7 ? mutation.data.length * 55 : 385
          }px]`}
        >
          <ReportTable data={mutation.data} columns={columns} type={"month"} />
        </div>
      )}
      {mutation.isPending && (
        <div className="h-[660px]">
          <Skeleton className=" md:px-10 w-[90%] m-auto h-full" />
        </div>
      )}
      {mutation.isError && (
        <p className="mt-8 text-lg text-center md:text-xl text-destructive">
          {mutation.error.message}
        </p>
      )}
    </div>
  );
}
