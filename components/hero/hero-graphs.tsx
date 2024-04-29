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
}: {
  graphs: {
    temp: number[];
    humidity: number[];
    pressure: number[];
    rain: number[];
  };
  days: string[];
}) {
  // load graph only when in view
  const graph = useRef(null);
  const IsInViewGraph = useInView(graph);

  return (
    <Container className="order-1 w-full col-span-3 lg:h-full lg:mt-0">
      {/* TABS FOR THE GRAPHS */}
      <Tabs defaultValue="temperature">
        {/* TITLE */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-2xl font-semibold" ref={graph}>
            Grafici della settimana
          </h4>
        </div>
        <TabsList className="grid grid-cols-4 w-[100%] *:text-xs md:text-sm dark:bg-background/20">
          <TabsTrigger value="temperature">Temperatura</TabsTrigger>
          <TabsTrigger value="humidity">Umidità</TabsTrigger>
          <TabsTrigger value="pressure">Pressione</TabsTrigger>
          <TabsTrigger value="rain">Precipitazioni</TabsTrigger>
        </TabsList>
        <TabsContent value="temperature">
          {" "}
          <MyChart
            IsInView={IsInViewGraph}
            name="temperatura"
            data={graphs.temp}
            days={days}
            unit="°C"
          />
        </TabsContent>
        <TabsContent value="humidity">
          {" "}
          <MyChart
            IsInView={IsInViewGraph}
            name="umidità"
            data={graphs.humidity}
            days={days}
            unit="%"
          />
        </TabsContent>
        <TabsContent value="pressure">
          {" "}
          <MyChart
            IsInView={IsInViewGraph}
            name="pressione"
            data={graphs.pressure}
            days={days}
            unit="hPa"
          />
        </TabsContent>
        <TabsContent value="rain">
          {" "}
          <MyChart
            IsInView={IsInViewGraph}
            name="precipitazioni"
            data={graphs.rain}
            days={days}
            unit="mm"
          />
        </TabsContent>
      </Tabs>
    </Container>
  );
}
