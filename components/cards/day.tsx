import React from "react";
import TooltipHeader from "../report/tooltip-header";

export default function Day({
  icon,
  max,
  min,
  day,
  day2,
}: {
  icon: React.ReactNode;
  max: number;
  min: number;
  day: string;
  day2?: string;
}) {
  return (
    <div className="flex items-center justify-between text-primary-foregroud">
      <div className="flex items-center justify-between">
        {icon}
        <TooltipHeader text="Max / Min">
          <div className="cursor-pointer grid items-baseline grid-cols-[1fr_0.3fr_1fr] ms-3">
            <h2 className="w-[60px] text-3xl md:text-4xl md:w-[80px] font-semibold tracking-tight scroll-20">
              {max}
              <sup>°</sup>
            </h2>
            <p className="text-lg text-muted-foreground w-[20px] text-center">
              /
            </p>
            <p className="text-lg text-muted-foreground">
              {min}
              <sup>°</sup>
            </p>
          </div>
        </TooltipHeader>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline">
          <h2 className="text-2xl font-semibold tracking-tight md:text-4xl scroll-m-20">
            {day}
          </h2>
          <p className="text-sm ms-2 text-muted-foreground">{day2}</p>
        </div>
      </div>
    </div>
  );
}
