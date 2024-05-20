"use client";
import HeroHeading from "@/components/headings/hero-heading";
import HeroWeek from "@/components/hero/hero-week-temp";
import HeroOverview from "@/components/hero/hero-overview";
import AnimationWrapper from "@/components/ui/anim-wrapper";
import { useRef } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import HeroSkeleton from "@/components/hero/hero-skeleton";
import { useQuery } from "@tanstack/react-query";
import type {
  WeatherOverviewData,
  WeatherGraphs,
} from "@/constants/weather-types";
import {
  getTabs,
  getDelta,
  getGraphs,
  getDailyGraphs,
} from "@/constants/functions";
import HeroGraphsMultiple from "./hero-graphs-multiple";
import type { RilevazioniGiornaliere } from "@/constants/measurement-types";

const fetchWeather = async () => {
  const res = await fetch("api/db", {
    method: "GET",
    //revalidate every 5 minutes
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
};

export default function Home() {
  const ref = useRef(null);

  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchWeather"],
    queryFn: fetchWeather,
  });

  if (isLoading) {
    return (
      <>
        <HeroHeading scrollRef={ref} />
        <HeroSkeleton ref={ref} />
      </>
    );
  }

  if (error) {
    return (
      <>
        <HeroHeading scrollRef={ref} />
        <HeroSkeleton ref={ref} />
      </>
    );
  }
  const todayData: WeatherOverviewData = {
    temp: getTabs(data, "temperatura"),
    humidity: getTabs(data, "umidita"),
    pressure: getTabs(data, "pressione"),
    windDir: data.ultimaRilevazione.direzioneVentoUltimaRilevazione as string,
    windSpeed: data.ultimaRilevazione.velocitaVentoUltimaRilevazione as number,
    rain: data.ultimaRilevazione.pioggiaGiornaliera,
    delta: getDelta(data),
    daily: getDailyGraphs(
      data.rilevazioniGiornaliere as RilevazioniGiornaliere[]
    ),
  };

  const weekData: WeatherGraphs = {
    temp: getGraphs(data, "temperatura"),
    minTemp: getGraphs(data, "minTemperatura"),
    maxTemp: getGraphs(data, "maxTemperatura"),
    humidity: getGraphs(data, "umidita"),
    minHumidity: getGraphs(data, "minUmidita"),
    maxHumidity: getGraphs(data, "maxUmidita"),
    rain: getGraphs(data, "pioggia"),
    pressure: getGraphs(data, "pressione"),
    minPressure: getGraphs(data, "minPressione"),
    maxPressure: getGraphs(data, "maxPressione"),
  };

  const date = new Date(data.ultimaRilevazione.data);
  date.setHours(data.ultimaRilevazione.ora.split(":")[0]);
  date.setMinutes(data.ultimaRilevazione.ora.split(":")[1]);
  const lastUpdate = format(date, "dd MMMM, HH:mm", {
    locale: it,
  });

  const weekDays = data.giorniSettimanaCorrente.map((d: string) =>
    format(d, "dd/MM")
  );

  return (
    <>
      <HeroHeading scrollRef={ref} />

      <AnimationWrapper>
        <HeroOverview ref={ref} data={todayData} lastUpdate={lastUpdate} />
      </AnimationWrapper>
      <div className="justify-center px-5 m-auto mt-10 max-w-screen-lg lg:grid-cols-5 lg:grid lg:gap-x-4 lg:px-0">
        <HeroWeek
          title="settimana"
          min={weekData?.minTemp}
          max={weekData?.maxTemp}
          days={weekDays}
        />

        <HeroGraphsMultiple
          inViewLoad={false}
          title="settimana"
          graphs={{
            temp: [
              {
                name: "max",
                color: "#f87171",
                data: weekData?.maxTemp,
              },
              {
                name: "med",
                color: "#17A34A",
                data: weekData?.temp,
              },
              {
                name: "min",
                color: "#22d3ee",
                data: weekData?.minTemp,
              },
            ],
            humidity: [
              {
                name: "max",
                color: "#f87171",
                data: weekData?.maxHumidity,
              },
              {
                name: "med",
                color: "#17A34A",
                data: weekData?.humidity,
              },
              {
                name: "min",
                color: "#22d3ee",
                data: weekData?.minHumidity,
              },
            ],
            pressure: [
              {
                name: "max",
                color: "#f87171",
                data: weekData?.maxPressure,
              },
              {
                name: "med",
                color: "#17A34A",
                data: weekData?.pressure,
              },
              {
                name: "min",
                color: "#22d3ee",
                data: weekData?.minPressure,
              },
            ],
            rain: weekData?.rain,
          }}
          days={weekDays}
        />
      </div>
    </>
  );
}
