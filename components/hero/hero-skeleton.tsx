import React, { forwardRef, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { ContainerCols } from "../container";

const HeroSkeleton = forwardRef<HTMLDivElement>(({}, ref) => {
  return (
    <>
      <div
        className="px-5 m-auto mb-8 grid max-w-screen-md gap-4 lg:max-w-screen-lg md:px-0"
        ref={ref}
      >
        <Skeleton className="w-full m-auto h-[50px]" />
      </div>
      <ContainerCols>
        <Skeleton className="w-full h-[230px]" />
        <Skeleton className="w-full h-[230px]" />
        <Skeleton className="w-full h-[230px]" />
        <Skeleton className="w-full h-[230px]" />
      </ContainerCols>
    </>
  );
});
export default HeroSkeleton;
HeroSkeleton.displayName = "HeroSkeleton";
