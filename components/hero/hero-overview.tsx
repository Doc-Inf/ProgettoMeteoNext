import { Clock, Cloud, CloudRain, Droplet, ParkingMeter } from "lucide-react";
import { Container, ContainerCols } from "../container";
import InfoTabs from "../infoTabs";
import Info from "../cards/info";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Separator } from "../ui/separator";
import React, { forwardRef, useEffect, useState } from "react";

/*
type Tab = { key: "Attuale" | "Massima" | "Media"; value: number };

interface WeatherOverviewData {
  temp: Tab[];
  humidity: Tab[];
  rain: number;
  pressure: Tab[];
  delta: {
    temp: string;
    humidity: string;
    rain: string;
    pressure: string;
  };
}
const KEYMATCHER: Record<string, keyof WeatherOverviewData["delta"]> = {
  temperaturaUltimaRilevazione: "temp",
  umiditaUltimaRilevazione: "humidity",
  pressioneUltimaRilevazione: "pressure",
} as const;
const TITLEMATCHER: Record<keyof WeatherOverviewData["delta"], string> = {
  temp: "Temperatura",
  humidity: "Umidita'",
  rain: "Precipitazioni",
  pressure: "Pressione",
} as const;
const UNITMATCHER: Record<keyof WeatherOverviewData["delta"], string> = {
  temp: "°C",
  humidity: "%",
  rain: "mm",
  pressure: "hPa",
} as const;
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

    curr[key] = Number(curr[key]);
    before[key] = Number(before[key]);

    delta[deltaKey] =
      (((curr[key] - before[key]) / before[key]) * 100).toFixed(2) + " %";

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
    { key: "Media", value: data["min" + capKey + "Settimanale"][6] },
  ];
}*/
type vals = {
  min: number;
  max: number;
  curr: number;
  delta: string;
};
interface HeroOverviewProps {
  data: {
    temp: vals;
    humidity: vals;
    rain: number;
    pressure: vals;
  };
  lastUpdate: string;
}
const HeroOverview = forwardRef<HTMLDivElement, HeroOverviewProps>(
  ({ data, lastUpdate }: HeroOverviewProps, ref) => {
    /* optional version
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);
  const [todayData, setTodayData] = useState<WeatherOverviewData | null>(null);

  useEffect(() => {
    setLoading(true);
    try {
      fetch("http://localhost:80/TestMeteo3/php/datiHome.php")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch");
          return res.json();
        })
        .then((data): void => {
          console.log(data);
          setLastUpdate(
            format(data.giorniSettimanaCorrente[6], "dd MMMM, hh:mm", {
              locale: it,
            })
          );
          setTodayData({
            temp: getTabs(data, "temperatura"),
            humidity: getTabs(data, "umidita"),
            pressure: getTabs(data, "pressione"),
            rain: data.pressioneSettimanale,
            delta: getDelta(data),
          });
        });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []); */
    return (
      <ContainerCols>
        <div className="col-span-full" ref={ref}>
          <Container>
            <div className="relative flex justify-between w-full">
              <div className="flex items-center gap-2">
                <Cloud className="text-primary" />
                <h4 className="text-lg font-normal tracking-tight scroll-m-20">
                  Il meteo è attualmente{" "}
                  <span className="font-semibold">nuvoloso</span>
                </h4>
              </div>
              <Separator
                orientation="vertical"
                className="absolute h-8 -translate-x-1/2 -translate-y-1/2 bg-primary/20 left-1/2 top-1/2"
              />
              <div className="flex items-center gap-2">
                <Clock className="text-primary" />
                <h4 className="text-lg font-normal tracking-tight scroll-m-20">
                  {" "}
                  Ultima rilevazione:{" "}
                  <span className="font-semibold">{lastUpdate}</span>
                </h4>
              </div>
            </div>
          </Container>
        </div>
        {/*Object.keys(todayData || {}).map((k) => {
        if (!todayData) return;
        const key = k as keyof WeatherOverviewData;
        if (key === "delta") return;
        if (key === "rain")
          return (
            <Info
              title={TITLEMATCHER[key]}
              value={todayData[key]}
              icon={<CloudRain stroke="#17A34A" />}
              unit={UNITMATCHER[key]}
              subtitle="Pioggia odierna"
            />
          );

        return (
          <InfoTabs
            key={key}
            tabs={todayData[key]}
            unit={UNITMATCHER[key]}
            title={TITLEMATCHER[key]}
            sub={todayData.delta[key]}
          />
        );
      })*/}

        <InfoTabs
          tabs={[
            { key: "Attuale", value: data.temp.curr },
            { key: "Minima", value: data.temp.min },
            { key: "Massima", value: data.temp.max },
          ]}
          title="Temperatura"
          icon={<Cloud stroke="#17A34A" />}
          sub={data.temp.delta}
          unit="°C"
        />

        <InfoTabs
          tabs={[
            { key: "Attuale", value: data.humidity.curr },
            { key: "Minima", value: data.humidity.min },
            { key: "Massima", value: data.humidity.max },
          ]}
          title="Umidità"
          icon={<Droplet stroke="#17A34A" />}
          sub={data.humidity.delta}
          unit="%"
        />
        <InfoTabs
          title="Pressione"
          icon={<ParkingMeter stroke="#17A34A" />}
          tabs={[
            { key: "Attuale", value: data.pressure.curr },
            { key: "Minima", value: data.pressure.min },
            { key: "Massima", value: data.pressure.max },
          ]}
          sub={data.pressure.delta}
          unit="hPa"
        />
        <Info
          title="Precipitazini"
          icon={<CloudRain stroke="#17A34A" />}
          value={data.rain}
          unit="mm"
          subtitle="Pioggia odierna"
        />
      </ContainerCols>
    );
  }
);
export default HeroOverview;
