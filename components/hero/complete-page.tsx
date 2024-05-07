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
  TITLEMATCHER,
  KEYMATCHER,
  UNITMATCHER,
  type Tab,
} from "@/constants";

const fetchWeather = async () => {
  const res = await fetch("api/db", {
    method: "GET",
    //revalidate every 5 minutes
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
};

// TBD: db res type
function getDelta(data: any): WeatherOverviewData["delta"] {
  const curr = data.ultimaRilevazione;
  const before = data.rilevazioneGiornoPrimaUltima;

  const delta = {} as WeatherOverviewData["delta"];

  Object.keys(curr).forEach((key) => {
    if (!(key in KEYMATCHER)) return;
    const deltaKey = KEYMATCHER[key as keyof typeof KEYMATCHER];

    if (before[key] === null || curr[key] === null) {
      delta[deltaKey] = "";
      return;
    }
    if (deltaKey === "rain") {
      delta[deltaKey] = "Pioggia odierna";
      return;
    }
    if (deltaKey === "windDir" || deltaKey === "windSpeed") {
      delta[deltaKey] = "Informazioni vento odierne";
      return;
    }

    curr[key] = Number(curr[key]);
    before[key] = Number(before[key]);

    delta[deltaKey] =
      (((curr[key] - before[key]) / before[key]) * 100).toFixed(2) +
      " % da ieri";

    if (!delta[deltaKey].startsWith("-"))
      delta[deltaKey] = "+" + delta[deltaKey];
    return;
  });

  return delta;
}

function getTabs(data: any, key: string): Tab[] {
  const capKey = key[0].toUpperCase() + key.substring(1);
  return [
    {
      key: "Attuale",
      value: data.ultimaRilevazione[key + "UltimaRilevazione"],
    },
    { key: "Massima", value: data["max" + capKey + "Settimanale"][6] },
    { key: "Minima", value: data["min" + capKey + "Settimanale"][6] },
  ];
}

function getGraphs(data: any, key: string): number[] {
  if (key === "pressione")
    return data[key + "Settimanale"].map((x: string) => x.replaceAll(",", ""));
  return data[key + "Settimanale"];
}
export default function Home() {
  const ref = useRef(null);

  const { data, error, isLoading, status } = useQuery({
    queryKey: ["fetchWeather"],
    queryFn: fetchWeather,
  });

  if (isLoading) {
    return (
      <>
        {" "}
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
      <div className="justify-center max-w-screen-lg px-5 m-auto mt-10 lg:grid-cols-5 lg:grid lg:gap-x-4 lg:px-0">
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