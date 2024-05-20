import { ChevronDown, Clock } from "lucide-react";
import { Container, ContainerCols } from "../container";
import InfoTabs from "../infoTabs";
import Info from "../cards/info";
import { Separator } from "../ui/separator";
import React, { forwardRef, useState } from "react";
import { Collapsible, CollapsibleContent } from "../ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { motion } from "framer";
import { Button } from "../ui/button";
import HeroGraphs from "./hero-graphs";
import { Weather, WeatherDetails } from "../icons/icons";
import TooltipHeader from "../report/tooltip-header";
import {
  TITLEMATCHER,
  UNITMATCHER,
  type WeatherOverviewData,
} from "@/constants/weather-types";
import { useWeather } from "@/lib/useWeather";

type vals = {
  min: number;
  max: number;
  curr: number;
  delta: string;
};

const HeroOverview = forwardRef<
  HTMLDivElement,
  { data: WeatherOverviewData; lastUpdate: string }
>(({ data, lastUpdate }, ref) => {
  const { status: weather, icon: weatherIcon } = useWeather({
    temperature: data.temp[0].value,
    humidity: data.humidity[0].value,
    pressure: data.pressure[0].value,
  });

  const btnVariant = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="px-4 mb-8 col-span-full" ref={ref}>
        <Container>
          <div className="relative w-full space-y-4 md:flex md:justify-between md:space-y-0 ">
            <div className="flex items-center gap-2">
              {weatherIcon}
              <h4 className="text-lg font-normal tracking-tight scroll-m-20">
                Il meteo è attualmente{" "}
                <span className="font-semibold">{weather.toLowerCase()}</span>
              </h4>
            </div>
            <Separator
              orientation="vertical"
              className="absolute hidden h-8 -translate-x-1/2 -translate-y-1/2 md:block bg-primary/20 left-1/2 top-1/2"
            />
            <Separator
              orientation="horizontal"
              className="block md:hidden absolute w-full -translate-x-1/2 -translate-y-1/2 bg-primary/20 left-1/2 top-1/2 !-mt-0"
            />
            <div className="flex items-center gap-2">
              <Clock className="text-primary" />
              <h4 className="font-normal tracking-tight text-md md:text-lg scroll-m-20">
                {" "}
                Ultima rilevazione:{" "}
                <span className="font-semibold">{lastUpdate}</span>
              </h4>
            </div>
          </div>
        </Container>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <ContainerCols>
          {Object.keys(data).map((k, idx) => {
            const key = k as keyof WeatherOverviewData;
            if (
              key === "delta" ||
              key === "windDir" ||
              key === "windSpeed" ||
              key === "daily"
            )
              return;

            const iconKey = (key[0].toUpperCase() +
              key.slice(1)) as keyof typeof WeatherDetails;

            const icon = WeatherDetails[iconKey]({ stroke: "#17A34A" });

            if (key === "rain")
              return (
                <Info
                  key={key + idx}
                  title={TITLEMATCHER[key]}
                  value={data[key]}
                  icon={<Weather.Rainy stroke="#17A34A" />}
                  unit={UNITMATCHER[key]}
                  subtitle="Pioggia odierna"
                />
              );

            return (
              <InfoTabs
                title={TITLEMATCHER[key]}
                key={key + idx}
                tabs={data[key]}
                unit={UNITMATCHER[key]}
                icon={icon}
                sub={data.delta[key]}
              />
            );
          })}
        </ContainerCols>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          transition={{ duration: 0.6, type: "just" }}
          className="mt-4 space-y-3"
        >
          <CollapsibleContent>
            <ContainerCols className="grid-cols-1  md:!grid-cols-5">
              <div className="col-span-3 *:mt-0 *:h-full row-span-2">
                {data.daily && (
                  <HeroGraphs
                    title="giornata"
                    graphs={data.daily}
                    lessX={true}
                    days={data.daily.times}
                  />
                )}
              </div>

              {["windDir", "windSpeed"].map((k, idx) => {
                const key = k as "windDir" | "windSpeed";
                return (
                  <div className="col-span-3 *:h-full md:col-span-2 " key={idx}>
                    <Info
                      key={key + idx}
                      title={TITLEMATCHER[key]}
                      value={data[key]}
                      icon={<WeatherDetails.Wind stroke="#17A34A" />}
                      unit={UNITMATCHER[key]}
                      subtitle="Informazioni vento odierne"
                    />
                  </div>
                );
              })}
            </ContainerCols>
          </CollapsibleContent>
        </motion.div>
        <CollapsibleTrigger className="w-full mt-4">
          <Button>
            {/* ANIMATED WITH ROTATION */}
            <TooltipHeader
              text={
                isOpen ? "Mostra meno informazioni" : "Mostra più informazioni"
              }
            >
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={btnVariant}
              >
                <ChevronDown />
              </motion.div>
            </TooltipHeader>
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </Collapsible>
    </>
  );
});
HeroOverview.displayName = "HeroOverview";
export default HeroOverview;
