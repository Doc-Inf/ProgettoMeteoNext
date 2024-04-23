"use client";

import * as React from "react";
import { Month, format } from "date-fns";
import { Calendar as CalendarIcon, Search, Sunrise } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { it } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  ArchiveResDaily,
  ArchiveResMonthly,
  WeatherData,
  WeatherDataMonthly,
} from "./archive-res";
import { WeatherRes } from "@/lib/db";

export function formatDBWeather(
  data: WeatherRes[],
  mode = "overview" as "overview" | "graph"
) {
  const getAvg = (key: string, arr = data as WeatherRes[]) => {
    return Number(
      // @ts-ignore
      (arr.reduce((a, b) => a + Number(b[key]), 0) / arr.length).toFixed(1)
    );
  };
  const getDayMap = () => {
    const res: Record<string, WeatherRes[]> = {};

    for (const d of data) {
      const day = format(new Date(d.data), "yyyy-MM-dd");
      if (!res[day]) res[day] = [];
      res[day].push(d);
    }
    return res;
  };

  if (mode === "overview") {
    const res: WeatherData[] = [
      {
        title: "Temperatura",
        tabs: [
          {
            key: "Minima",
            value: getAvg("lowTemp"),
          },
          {
            key: "Media",
            value: getAvg("tempOut"),
          },
          {
            key: "Massima",
            value: getAvg("hiTemp"),
          },
        ],
        unit: "°C",
      },
      {
        title: "Umidita'",
        tabs: [
          {
            key: "Media",
            value: getAvg("outHum"),
          },
        ],
        unit: "%",
      },
      {
        title: "Precipitazioni",
        tabs: [
          {
            key: "Media",
            value: getAvg("rain"),
          },
        ],
        unit: "mm",
      },
      {
        title: "Pressione",
        tabs: [
          {
            key: "Media",
            value: getAvg("bar"),
          },
        ],
        unit: "hPa",
      },
    ];
    return res;
  }
  if (mode === "graph") {
    const days = getDayMap();
    const res: WeatherDataMonthly["graphs"] = [
      {
        name: "Temperatura",
        data: Object.values(days).map((d) => getAvg("tempOut", d)),
        unit: "°C",
      },
      {
        name: "Umidità",
        data: Object.values(days).map((d) => getAvg("outHum", d)),
        unit: "%",
      },
      {
        name: "Pressione",
        data: Object.values(days).map((d) => getAvg("bar", d)),
        unit: "hPa",
      },
      {
        name: "Precipitazioni",
        data: Object.values(days).map((d) => getAvg("rain", d)),
        unit: "mm",
      },
    ];
    return res;
  }
}
export function ArchiveForm() {
  const [date, setDate] = React.useState<Date>();
  const [mode, setMode] = React.useState<"day" | "month" | null>(null);
  const [data, setData] = React.useState<
    WeatherData[] | WeatherDataMonthly | null
  >(null);
  async function onSubmit() {
    if (!date || !mode) return;
    if (mode === "day") {
      await fetch(`/api/day`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: format(date, "yyyy-MM-dd"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setData(formatDBWeather(data) as WeatherData[]);
        });
    }
    if (mode === "month") {
      await fetch(`/api/month`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          day: format(date, "yyyy-MM-dd"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const resOverview = formatDBWeather(data) as WeatherData[];
          const resGraphs = formatDBWeather(
            data,
            "graph"
          ) as WeatherDataMonthly["graphs"];
          setData({ overview: resOverview, graphs: resGraphs });
          console.log(data);
        });
    }
  }
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal rounded-3xl shadow-md shadow-input dark:shadow-none dark:bg-stone-900/[0.5] dark:border-border/20 bg-white border border-zinc-200/50",
                !date && "text-muted-foreground "
              )}
            >
              <CalendarIcon className="w-4 h-4 mr-2" />
              {date ? (
                format(date, "PPP", {
                  locale: it,
                })
              ) : (
                <span>Scegli una data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select onValueChange={(value: "day" | "month") => setMode(value)}>
          <SelectTrigger className="w-[180px] rounded-3xl shadow-md shadow-input dark:shadow-none dark:bg-stone-900/[0.5] dark:border-border/20 bg-white border border-zinc-200/50">
            <SelectValue placeholder="Modalità" className="text-white" />
            <p className="sr-only">Modalità di ricerca </p>
          </SelectTrigger>
          <SelectContent className="w-[180px] rounded-xl shadow-md shadow-input dark:shadow-none dark:bg-stone-900 dark:border-border/20 bg-white border border-zinc-200/50 pb-3">
            <SelectGroup className="px-2">
              <SelectLabel className="-px-1">Modalità</SelectLabel>
              <SelectItem className="text-md" value="month">
                <div className="flex items-center justify-between">
                  <CalendarIcon className="w-3 h-3 me-2" />
                  Mensile
                </div>
              </SelectItem>
              <SelectItem className="text-md" value="day">
                <div className="flex items-center justify-between">
                  <Sunrise className="w-3 h-3 me-2" />
                  Giornaliera
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="border shadow-md rounded-2xl shadow-input dark:shadow-none dark:border-border/20 border-zinc-200/50"
          onClick={onSubmit}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
      {data && mode === "day" ? (
        <ArchiveResDaily data={(data as WeatherData[]) || []} day={date} />
      ) : (
        data &&
        mode === "month" && (
          <ArchiveResMonthly
            data={data as WeatherDataMonthly}
            day={date ? date : new Date()}
          />
        )
      )}
    </>
  );
}
