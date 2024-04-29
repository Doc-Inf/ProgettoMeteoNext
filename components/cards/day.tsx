import React from "react";

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
        <div className="flex items-baseline ms-3">
          <h2 className="text-4xl font-semibold tracking-tight scroll-20">
            {max >= 0 && "+"} {max}
            <sup>°</sup>
          </h2>
          <p className="text-lg text-muted-foreground">
            / {min >= 0 && "+"} {min}
            <sup>°</sup>
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-baseline">
          <h2 className="text-4xl font-semibold tracking-tight scroll-m-20">
            {day}
          </h2>
          <p className="text-sm ms-2 text-muted-foreground">{day2}</p>
        </div>
      </div>
    </div>
  );
}
