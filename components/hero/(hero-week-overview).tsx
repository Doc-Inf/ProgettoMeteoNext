"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";
import HeroWeek from "./hero-week-temp";
import HeroGraphs from "./hero-graphs";

type Graph = { name: string; data: number[]; unit: string };
interface WeekInfo {
  graphs: Graph[];
  tempMin: number[];
  tempMax: number[];
  days: string[7];
}

const UNITMATCHER = {
  temperatura: "°C",
  umidita: "%",
  pressione: "hPa",
  pioggia: "mm",
} as const;
function getGraphs(
  data: any,
  key: "temperatura" | "umidita" | "pressione" | "pioggia"
): Graph {
  return {
    name: key,
    data: data[key + "Settimanale"],
    unit: UNITMATCHER[key],
  };
}

export default function HeroWeekOverview() {
  const [weekInfo, setWeekInfo] = useState<WeekInfo | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:80/TestMeteo3/php/datiHome.php")
      .then((res) => res.json())
      .then((data) => {
        setWeekInfo({
          graphs: [
            getGraphs(data, "temperatura"),
            getGraphs(data, "umidita"),
            getGraphs(data, "pressione"),
            getGraphs(data, "pioggia"),
          ],
          tempMin: data.minTemperaturaSettimanale,
          tempMax: data.maxTemperaturaSettimanale,
          days: data.giorniSettimanaCorrente.map((d: string) =>
            format(d, "dd/MM")
          ),
        });
      });

    setLoading(false);
  }, []);
  return !loading && weekInfo ? <></> : <></>;
}
