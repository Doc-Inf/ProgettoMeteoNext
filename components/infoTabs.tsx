"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";

export default function InfoTabs({
  tabs,
  title,
  icon,
  unit,
}: {
  tabs: { value: number; key: string }[];
  title: string;
  icon?: React.ReactNode;
  unit?: string;
}) {
  const [key, setKey] = useState(tabs[0].key);

  return (
    <Tabs value={key} onValueChange={setKey}>
      <Card className="bg-accent border-zinc-700/50">
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold tracking-tight scroll-m-20">
                {title}
              </h3>
              <TabsList className="flex items-center bg-transparent">
                {tabs.map((tab, idx) => (
                  <TabsTrigger
                    key={idx}
                    value={tab.key}
                    className="!bg-transparent !shadow-none"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className={`w-4 h-4 rounded-full ${
                        tab.key === key && "bg-primary hover:bg-primary"
                      }`}
                    />
                  </TabsTrigger>
                ))}
              </TabsList>
              {icon || " "}
            </div>
            <p className="text-sm font-normal text-muted-foreground ms-0.5"></p>
          </CardTitle>
        </CardHeader>
        {tabs.map((tab, idx) => (
          <TabsContent key={idx} value={tab.key}>
            <CardContent className="pb-3">
              <h4 className="text-3xl font-semibold tracking-tight scroll-m-20">
                {tab.value}
                <sup className="font-normal ms-2">{unit}</sup>
              </h4>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-muted-foreground">
                Valore di {key.toLocaleLowerCase()}
              </p>
            </CardFooter>
          </TabsContent>
        ))}
      </Card>
    </Tabs>
  );
}
