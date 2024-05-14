import { cn } from "@/lib/utils";
import React from "react";

export function ContainerCols({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        className,
        "px-5 m-auto grid max-w-screen-md gap-4 lg:max-w-screen-lg md:grid-cols-2 md:px-0"
      )}
    >
      {children}
    </div>
  );
}
export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        className,
        "max-w-screen-md p-4 bg-accent m-auto mt-10 border rounded-lg border-zinc-700/50 lg:max-w-screen-lg"
      )}
    >
      {children}
    </div>
  );
}
