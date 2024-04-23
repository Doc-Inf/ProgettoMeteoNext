"use client";
import { TabsList } from "@radix-ui/react-tabs";
import Info from "./cards/info";
import { Container, ContainerCols } from "./container";
import InfoTabs from "./infoTabs";
import { Tabs, TabsContent, TabsTrigger } from "./ui/tabs";
import dynamic from "next/dynamic";
import { format } from "date-fns";

const MyChart = dynamic(() => import("@/components/myChart"), { ssr: false });
export interface WeatherData {
  title: string;
  tabs: { key: string; value: number }[];
  unit: string;
}
interface GraphData {
  name: string;
  data: number[];
  unit: string;
}
export interface WeatherDataMonthly {
  overview: WeatherData[];
  graphs: GraphData[];
}
export function ArchiveResDaily({
  data,
  day,
}: {
  data: WeatherData[];
  day?: Date;
}) {
  return (
    <div className="pt-20">
      {day && (
        <h3 className="mt-10 mb-3 text-2xl font-semibold tracking-tight scroll-m-20 md:px-16 lg:px-96">
          Dati del giorno {format(day, "dd-MM-yy")}
        </h3>
      )}
      <ContainerCols>
        {data.map((item, idx) =>
          item.tabs.length > 1 ? (
            <InfoTabs key={idx} {...item} />
          ) : (
            <Info
              title={item.title}
              value={item.tabs[0].value}
              unit={item.unit}
              key={idx}
              subtitle="Valore di media"
            />
          )
        )}
      </ContainerCols>
    </div>
  );
}
export function ArchiveResMonthly({
  data,
  day,
}: {
  data: WeatherDataMonthly;
  day: Date;
}) {
  console.log(data);
  const DAY_TIME = 24 * 60 * 60 * 1000;
  const dates = data.graphs[0].data
    .map((_, idx) => new Date(day.getTime() - DAY_TIME * (30 - idx)))
    .map((date) => format(date, "dd/MM"));

  return (
    <div className="pt-20">
      <h3 className="mt-10 mb-3 text-2xl font-semibold tracking-tight scroll-m-20 md:px-16 lg:px-96">
        Dati del mese di {format(day, "dd-MM")} /{" "}
        {format(new Date(day.getTime() - DAY_TIME * 30), "dd-MM")}
      </h3>
      <ArchiveResDaily data={data.overview} />
      <Container>
        <Tabs defaultValue={data.graphs[0].name}>
          <TabsList
            className={`grid grid-cols-${data.graphs.length} w-[100%] py-2 rounded-lg *:text-xs md:text-sm dark:bg-background/20`}
          >
            {data.graphs.map((item, idx) => (
              <TabsTrigger key={idx} value={item.name}>
                {item.name[0].toUpperCase()}
                {item.name.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          {data.graphs.map((item, idx) => (
            <TabsContent key={idx} value={item.name}>
              <MyChart {...item} IsInView={true} days={dates} />
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </div>
  );
}
