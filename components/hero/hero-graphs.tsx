"use client";
import { Container } from "@/components/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useRef } from "react";
import { useInView } from "framer";
import dynamic from "next/dynamic";

const MyChart = dynamic(() => import("@/components/myChart"), { ssr: false });

export default function HeroGraphs({
  graphs,
  days,
  title,
  inViewLoad = true,
  lessX,
}: {
  graphs: {
    temp: number[];
    humidity: number[];
    pressure: number[];
    rain: number[];
  };
  days: string[];
  title: "giornata" | "settimana" | "mese";
  lessX?: boolean;
  inViewLoad?: boolean;
}) {
  // load graph only when in view
  const graph = useRef(null);
  const IsInViewGraph = useInView(graph, { once: true });

  return (
    <Container className="order-1 w-full col-span-3 lg:h-full lg:mt-0">
      {/* TABS FOR THE GRAPHS */}
      <Tabs defaultValue="temperature">
        {/* TITLE */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-2xl font-semibold" ref={graph}>
            Grafici della {title}
          </h4>
        </div>
        <TabsList className="grid md:grid-cols-4 grid-cols-2 mb-8 h-20 md:h-10 w-[100%] *:text-xs md:text-sm dark:bg-background/20 bg-foreground/5">
          <TabsTrigger value="temperature">Temperatura</TabsTrigger>
          <TabsTrigger value="humidity">Umidità</TabsTrigger>
          <TabsTrigger value="pressure">Pressione</TabsTrigger>
          <TabsTrigger value="rain">Precipitazioni</TabsTrigger>
        </TabsList>
        <TabsContent value="temperature">
          {" "}
          <MyChart
            IsInView={inViewLoad ? IsInViewGraph : true}
            name="temperatura"
            data={graphs.temp}
            lessX={lessX}
            days={days}
            unit="°C"
          />
        </TabsContent>
        <TabsContent value="humidity">
          {" "}
          <MyChart
            IsInView={inViewLoad ? IsInViewGraph : true}
            name="umidità"
            data={graphs.humidity}
            days={days}
            unit="%"
            lessX={lessX}
          />
        </TabsContent>
        <TabsContent value="pressure">
          {" "}
          <MyChart
            IsInView={inViewLoad ? IsInViewGraph : true}
            name="pressione"
            data={graphs.pressure}
            days={days}
            unit="hPa"
            lessX={lessX}
          />
        </TabsContent>
        <TabsContent value="rain">
          {" "}
          <MyChart
            IsInView={inViewLoad ? IsInViewGraph : true}
            name="precipitazioni"
            data={graphs.rain}
            days={days}
            unit="mm"
            lessX={lessX}
          />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
