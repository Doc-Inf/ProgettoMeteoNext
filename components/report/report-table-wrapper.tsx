import { columns, type WeatherInfo } from "@/components/report/columns";
import { format } from "date-fns";
import { ReportTable } from "./data-table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { it } from "date-fns/locale";

const MATCHTYPES = {
  day: "giornalieri",
  month: "mensili",
  year: "annuali",
};

export default function ReportTableWrapper({
  data,
  type,
}: {
  data: WeatherInfo[];
  type: "day" | "month" | "year";
}) {
  return (
    <div className="mt-40">
      {type === "year" ? (
        <p className="text-lg text-center lg:text-3xl md:text-xl text-foreground">
          Rivelamenti {MATCHTYPES[type]}
        </p>
      ) : (
        <div className="lg:w-[1200px] m-auto grid md:grid-cols-2 *:m-auto  gap-2 items-center mb-4">
          <p className="text-lg text-center lg:text-3xl md:text-xl text-foreground">
            Rilevamenti {MATCHTYPES[type]}
          </p>

          <Select
            defaultValue={
              type === "month" ? "2024" : new Date().getMonth().toString()
            }
          >
            <SelectTrigger className="w-[280px] rounded-xl shadow-md shadow-input border-primary/20 dark:shadow-none">
              <SelectValue
                placeholder={type === "month" ? "Anno" : "Mese"}
                className="text-white"
                aria-label="Seleziona un anno o un mese"
              />
              <p className="sr-only">
                {type === "month" ? "Anno" : "Mese"} da cercare{" "}
              </p>
            </SelectTrigger>
            <SelectContent className="w-[280px] rounded-xl  shadow-input dark:shadow-none pb-3">
              <SelectGroup className="px-2">
                <SelectLabel className="-px-1">
                  {type === "month" ? "Anno" : "Mese"}{" "}
                </SelectLabel>

                {type === "day"
                  ? new Array(12).fill(0).map((_, i) => (
                      <SelectItem
                        className="text-md"
                        value={i.toString()}
                        key={i + 1}
                      >
                        {format(new Date().setMonth(i), "MMMM", {
                          locale: it,
                        })}
                      </SelectItem>
                    ))
                  : new Array(4).fill(0).map((_, i) => (
                      <SelectItem
                        className="text-md"
                        value={(2021 + i).toString()}
                        key={i + 2021}
                      >
                        {format(new Date().setFullYear(2021 + i), "yyyy", {
                          locale: it,
                        })}
                      </SelectItem>
                    ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      <ReportTable data={data} columns={columns} type={type} />
    </div>
  );
}
