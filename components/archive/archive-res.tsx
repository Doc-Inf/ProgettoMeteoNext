"use client";
import { TabsList } from "@radix-ui/react-tabs";
import Info from "../cards/info";
import { Container, ContainerCols } from "../container";
import InfoTabs from "../infoTabs";
import { Tabs, TabsContent, TabsTrigger } from "../ui/tabs";
import dynamic from "next/dynamic";
import { format } from "date-fns";
import { it, tr } from "date-fns/locale";
import { useId, useRef } from "react";
import { useInView } from "framer";

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
  days: string[];
}
export function ArchiveResDaily({
  data,
  day,
}: {
  data: WeatherData[];
  day?: Date;
}) {
  return (
    <div className={day && "pt-20"}>
      {day && (
        <ContainerCols>
          <h3 className="py-4 mt-10 text-2xl font-semibold tracking-tight scroll-m-20 col-span-full">
            Dati del giorno {format(day, "dd MMMM", { locale: it })}
          </h3>
        </ContainerCols>
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
export function ArchiveResMonthly({ data }: { data: WeatherDataMonthly }) {
  return (
    <div className="pt-20">
      {data.days.length !== 0 ? (
        <>
          <ContainerCols>
            <h3 className="py-4 mt-10 text-2xl font-semibold tracking-tight scroll-m-20 col-span-full">
              Dati del mese {format(data.days[0], "dd MMMM", { locale: it })} /{" "}
              {format(data.days.at(-1) as string, "dd MMMM yyyy", {
                locale: it,
              })}
            </h3>
          </ContainerCols>
          <ArchiveResDaily data={data.overview} />
          <Container>
            <Tabs defaultValue={data.graphs[0].name}>
              <TabsList
                className={`grid grid-cols-${data.graphs.length} w-[100%] py-2 px-2 rounded-lg *:text-xs md:text-sm dark:bg-background/20`}
              >
                {data.graphs.map((item, idx) => (
                  <TabsTrigger key={idx} value={item.name}>
                    {item.name[0].toUpperCase()}
                    {item.name.slice(1)}
                  </TabsTrigger>
                ))}
              </TabsList>
              {/* TODO: find better key (just item.name / idx makes the graph not re render)*/}
              {data.graphs.map((item, idx) => (
                <TabsContent
                  key={
                    Math.random() * Number.MAX_SAFE_INTEGER +
                    "_" +
                    item.data.at(-1)
                  }
                  value={item.name}
                >
                  <MyChart
                    name={item.name}
                    data={item.data}
                    unit={item.unit}
                    IsInView={true}
                    days={data.days.map((date) => format(date, "dd/MM"))}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </Container>
        </>
      ) : (
        <h3 className="mt-10 text-2xl font-semibold tracking-tight text-center  text-red-600/80 scroll-m-20 col-span-full">
          Nessuna rilevazione trovata per la data selezionata
        </h3>
      )}
    </div>
  );
}
