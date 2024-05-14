"use client";
import HeroHeading from "@/components/headings/hero-heading";
import HeroWeek from "@/components/hero/hero-week-temp";
import HeroOverview from "@/components/hero/hero-overview";
import HeroGraphs from "@/components/hero/hero-graphs";
import AnimationWrapper from "@/components/ui/anim-wrapper";
import { useRef } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import HeroSkeleton from "@/components/hero/hero-skeleton";
import { useQuery } from "@tanstack/react-query";
import {
  type WeatherOverviewData,
  type WeatherGraphs,
  RilevazioniGiornaliere,
} from "@/constants/weather-types";
import {
  getTabs,
  getDelta,
  getGraphs,
  getDailyGraphs,
} from "@/constants/functions";

const fetchWeather = async () => {
  const res = await fetch("./php/datiHome.php", {
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
    console.error(error);
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
    rain: getGraphs(data, "pioggia"),
    pressure: getGraphs(data, "pressione"),
  };

  const lastUpdate = format(
    data.ultimaRilevazione.dataOraUltimaRilevazione,
    "dd MMMM, HH:mm",
    {
      locale: it,
    }
  );

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

        <HeroGraphs
          title="settimana"
          graphs={{
            temp: weekData?.temp,
            humidity: weekData?.humidity,
            pressure: weekData?.pressure,
            rain: weekData?.rain,
          }}
          days={weekDays}
        />
      </div>
    </>
  );
}
