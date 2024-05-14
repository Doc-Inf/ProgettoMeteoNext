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

const ArchiveOverview = ({
  data,
  lastUpdate,
  monthData,
}: {
  data: WeatherOverviewData;
  lastUpdate: string;
  monthData?: {
    graphs: {
      temp: number[];
      humidity: number[];
      pressure: number[];
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
            <div className="flex w-full justify-center items-center gap-2 text-center">
              <Clock className="text-primary" />
              <h4 className="font-normal tracking-tight text-md md:text-lg scroll-m-20">
                {" "}
                Rilevazione del mese:{" "}
                <span className="font-semibold">{lastUpdate}</span>
              </h4>
            </div>
          ) : (
            <div className="relative w-full space-y-4 md:flex md:justify-between md:space-y-0 ">
              <div className="flex items-center gap-2">
                {weatherIcon}
                <h4 className="text-lg font-normal tracking-tight scroll-m-20">
                  Il meteo è{" "}
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
                  <span className="font-semibold">{lastUpdate}</span>
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
                subtitle="Pioggia totale mese"
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

      {monthData ? null : (
        <ContainerCols className="grid-cols-1 py-4  md:!grid-cols-5">
          <div className="col-span-3 *:mt-0 *:h-full row-span-2">
            <HeroGraphs
              title="giornata"
              inViewLoad={false}
              // UPDATE THIS!!!
              graphs={{
                temp: Object.values(data.temp).map((v) => v.value),
                humidity: Object.values(data.humidity).map((v) => v.value),
                pressure: Object.values(data.pressure).map((v) => v.value),
                rain: [data.rain],
              }}
              days={[
                "3:00",
                "6:00",
                "9:00",
                "12:00",
                "15:00",
                "18:00",
                "21:00",
              ]}
            />
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
      )}

      {monthData && <HeroGraphs {...monthData} title="mese" />}
    </>
  );
};
ArchiveOverview.displayName = "ArchiveOverview";
export default ArchiveOverview;
