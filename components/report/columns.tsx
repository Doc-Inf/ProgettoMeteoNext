"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import TooltipHeader from "./tooltip-header";

interface WeatherVals {
  min: number;
  max: number;
  avg: number;
}

type keys = "temp" | "hum" | "wind" | "pressure";
export type WeatherInfo = Record<keys, WeatherVals> & {
  // as day or month or year
  id: number;
  rain: number;
};
const hiddenCols = [
  {
    accessorKey: "x",
    header: "hide",
    cell: "hide",
  },
];

const columnHelper = createColumnHelper<WeatherInfo>();
export const columns: ColumnDef<WeatherInfo>[] = [
  {
    id: "type",
    accessorKey: "id",
    header: "",
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: "temp",
    header: () => (
      <TooltipHeader text="Max / Med / Min">
        <span className="cursor-pointer">Temperatura (°C)</span>
      </TooltipHeader>
    ),
    cell: (info) => {
      const { min, max, avg } = info.getValue<WeatherVals>();
      return `${min} / ${max} / ${avg}`;
    },
  },
  {
    accessorKey: "hum",
    header: () => (
      <TooltipHeader text="Max / Med / Min">
        <span className="cursor-pointer">Umidità (%)</span>
      </TooltipHeader>
    ),
    cell: (info) => {
      const { min, max, avg } = info.getValue<WeatherVals>();
      return `${min} / ${max} / ${avg}`;
    },
  },
  {
    accessorKey: "rain",
    header: () => (
      <TooltipHeader text="Media">
        <span className="cursor-pointer">Pioggia (mm)</span>
      </TooltipHeader>
    ),
    cell: (info) => {
      const rain = info.getValue<WeatherVals>();
      return rain;
    },
  },
];
