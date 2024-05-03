import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Info({
  title,
  icon,
  value,
  unit,
  subtitle,
}: {
  title: string;
  icon?: React.ReactNode;
  value: number | string;
  unit?: string;
  subtitle: string;
}) {
  return (
    <Card className="flex flex-col justify-between bg-accent border-zinc-700/50">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
              {title}
            </h3>
            {icon || " "}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <h4 className="text-3xl font-semibold tracking-tight scroll-m-20">
          {value}
          <sup className="font-normal ms-2">{unit}</sup>
        </h4>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardFooter>
    </Card>
  );
}
