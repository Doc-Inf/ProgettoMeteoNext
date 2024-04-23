import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PeopleCard({
  title,
  people,
  single,
  className,
}: {
  title: string;
  people: { name: string; subj: string }[];
  single?: boolean;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        `${
          single ? `m-auto lg:hidden` : `h-[36vh]`
        } shadow-sm shadow-primary shrink-0 overflow-hidden`,
        className
      )}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className={`${single ? " " : "h-60"}`}>
          {people.map((person, index) => (
            <div key={index} className="flex items-center my-2 space-x-4">
              <span className="flex w-2 h-2 translate-y-1 rounded-full bg-primary" />
              <div className="space-y-1">
                <p className="text-lg font-medium leading-none">
                  {person.name}
                </p>
                <p className="text-sm text-muted-foreground">{person.subj}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
