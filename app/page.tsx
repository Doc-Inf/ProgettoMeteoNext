"use client";
import { useRef } from "react";

import {
  Tabs,
  TabsList,
  TabsContent,
  TabsTrigger,
} from "../components/ui/tabs";

import { motion, useInView, useScroll } from "framer-motion";

import { Cloud, CloudRain, Droplet, ParkingMeter } from "lucide-react";
import Info from "@/components/cards/info";
import HeroHeading from "@/components/headings/hero-heading";
import InfoTabs from "@/components/infoTabs";
import { Container, ContainerCols } from "@/components/container";
import WeekOverview from "@/components/week-overview";
import dynamic from "next/dynamic";

const MyChart = dynamic(() => import("@/components/myChart"), { ssr: false });
export default function Home() {
  // scroll animations
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 2", "2 1"],
  });
  // menu onclick animation

  // load graph only when in view
  const graph = useRef(null);
  const IsInViewGraph = useInView(graph);

  return (
    <>
      <HeroHeading />
      {/* CARDS OVERVIEW */}
      <motion.div
        ref={ref}
        style={{
          scale: scrollYProgress,
        }}
      >
        <ContainerCols>
          <InfoTabs
            tabs={[
              { key: "Minima", value: 10.2 },
              { key: "Media", value: 15.2 },
              { key: "Massima", value: 18.2 },
            ]}
            title="Temperatura"
            icon={<Cloud stroke="#17A34A" />}
            unit="°C"
          />

          <InfoTabs
            tabs={[
              { key: "Minima", value: 50.2 },
              { key: "Media", value: 71.1 },
              { key: "Massima", value: 87.5 },
            ]}
            title="Umidità"
            icon={<Droplet stroke="#17A34A" />}
            unit="%"
          />
          <InfoTabs
            title="Pressione"
            icon={<ParkingMeter stroke="#17A34A" />}
            tabs={[
              { key: "Minima", value: 1005 },
              { key: "Media", value: 1026 },
              { key: "Massima", value: 1047 },
            ]}
            unit="hPa"
          />
          <Info
            title="Precipitazini"
            icon={<CloudRain stroke="#17A34A" />}
            value={8.2}
            unit="mm"
            subtitle="+52.5% da ieri"
          />
        </ContainerCols>
      </motion.div>
      {/* WEEK INFO */}
      <div className="justify-center max-w-screen-lg px-5 m-auto mt-10 lg:grid-cols-5 lg:grid lg:gap-x-4 lg:px-0">
        <WeekOverview />
        {/* GRAPHS OVERVIEW */}
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
                data={[10, 12, 7, 9, 8, 10, 15, 12]}
                unit="°C"
              />
            </TabsContent>
            <TabsContent value="humidity">
              {" "}
              <MyChart
                IsInView={IsInViewGraph}
                name="umidità"
                data={[80, 74, 82, 64, 72, 76, 54, 91]}
                unit="%"
              />
            </TabsContent>
            <TabsContent value="pressure">
              {" "}
              <MyChart
                IsInView={IsInViewGraph}
                name="pressione"
                data={[1004, 1020, 1012, 1018, 1008, 1028, 1011, 1012]}
                unit="hPa"
              />
            </TabsContent>
            <TabsContent value="rain">
              {" "}
              <MyChart
                IsInView={IsInViewGraph}
                name="precipitazioni"
                data={[0, 2, 0, 0, 8, 10, 7]}
                unit="mm"
              />
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </>
  );
}
