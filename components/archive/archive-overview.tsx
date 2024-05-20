import { Clock } from "lucide-react";
import { Container, ContainerCols } from "../container";
import InfoTabs from "../infoTabs";
import Info from "../cards/info";
import { Separator } from "../ui/separator";
import { Weather, WeatherDetails } from "../icons/icons";
import {
  TITLEMATCHER,
  UNITMATCHER,
  type WeatherOverviewData,
} from "@/constants/weather-types";
import { useWeather } from "@/lib/useWeather";
import HeroGraphs from "../hero/hero-graphs";
import { format } from "date-fns";
import { it } from "date-fns/locale";

import HeroGraphsMultiple from "../hero/hero-graphs-multiple";

type Series = {
  name: "max" | "min" | "med";
  color: string;
  data: number[];
};

const ArchiveOverview = ({
  data,
  lastUpdate,
  monthData,
}: {
  data: WeatherOverviewData;
  lastUpdate: string;
  monthData?: {
    graphs: {
      temp: Series[];
      humidity: Series[];
      pressure: Series[];
      rain: number[];
    };
    days: string[];
  };
}) => {
  const { status: weather, icon: weatherIcon } = useWeather({
    temperature: data.temp[0].value,
    humidity: data.humidity[0].value,
    pressure: data.pressure[0].value,
  });

  return (
    <>
      <div className="px-4 mb-8 col-span-full">
        <Container>
          {monthData ? (
            <div className="flex items-center justify-center w-full text-center gap-2">
              <Clock className="text-primary" />
              <h4 className="font-normal tracking-tight text-md md:text-lg scroll-m-20">
                {" "}
                Rilevazione del mese:{" "}
                <span className="font-semibold">
                  {format(lastUpdate.split("«")[0], "dd LLLL", {
                    locale: it,
                  })}{" "}
                  -{" "}
                  {format(lastUpdate.split("«")[1], "dd LLLL", {
                    locale: it,
                  })}
                </span>
              </h4>
            </div>
          ) : (
            <div className="relative w-full space-y-4 md:flex md:justify-between md:space-y-0 ">
              <div className="flex items-center gap-2">
                {weatherIcon}
                <h4 className="text-lg font-normal tracking-tight scroll-m-20">
                  Il meteo del giorno è{" "}
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
                  Rilevazione del:{" "}
                  <span className="font-semibold">
                    {format(lastUpdate, `dd MMMM yyyy`, {
                      locale: it,
                    })}
                  </span>
                </h4>
              </div>
            </div>
          )}
        </Container>
      </div>

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
                subtitle={
                  monthData ? "Pioggia totale mese" : "Pioggia del giorno"
                }
              />
            );

          return (
            <InfoTabs
              title={TITLEMATCHER[key]}
              key={key + idx}
              tabs={[
                { key: "Media", value: data[key][0].value },
                data[key][1],
                data[key][2],
              ]}
              unit={UNITMATCHER[key]}
              icon={icon}
              sub={data.delta[key]}
            />
          );
        })}
      </ContainerCols>

      {monthData ? null : (
        <>
          <ContainerCols className="!mt-4">
            {["windDir", "windSpeed"].map((k, idx) => {
              const key = k as "windDir" | "windSpeed";
              return (
                <Info
                  key={key + idx}
                  title={TITLEMATCHER[key]}
                  value={data[key]}
                  icon={<WeatherDetails.Wind stroke="#17A34A" />}
                  unit={UNITMATCHER[key]}
                  subtitle="Informazioni vento del giorno"
                />
              );
            })}
          </ContainerCols>
          <div className="px-5 mt-4 md:px-0 ">
            {data.daily && (
              <HeroGraphs
                title="giornata"
                graphs={{ ...data.daily }}
                days={data.daily?.times}
              />
            )}
          </div>
        </>
      )}
      <div className="justify-center px-5 m-auto mt-10 max-w-screen-lg lg:px-0">
        {monthData && <HeroGraphsMultiple {...monthData} title="mese" />}
      </div>
    </>
  );
};
ArchiveOverview.displayName = "ArchiveOverview";
export default ArchiveOverview;
