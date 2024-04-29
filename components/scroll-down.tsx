"use client";

import { ArrowDown } from "lucide-react";
import { useTheme } from "next-themes";
import { Ref, RefObject } from "react";
// @ts-expect-error
import ReactCurvedText from "react-curved-text";

export default function ScrollDown({
  scrollRef,
}: {
  scrollRef: RefObject<HTMLDivElement>;
}) {
  const { theme } = useTheme();
  return (
    <div
      className="absolute bottom-0 hover:cursor-pointer"
      onClick={() =>
        scrollRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    >
      <ReactCurvedText
        width="300"
        height={300}
        cx="150"
        cy={150}
        rx="30"
        ry="30"
        startOffset={0}
        reversed={false}
        text="SCROLL - SCROLL - SCROLL -"
        textProps={{
          style: { fontSize: 12 },
        }}
        textPathProps={{ fill: theme === "dark" ? "#ffffff" : "#000" }}
        tspanProps={{ dy: "13" }}
        ellipseProps={null}
        svgProps={{ className: "rotating-curved-text" }}
      />
      <ArrowDown className="absolute transform -translate-x-1/2 -translate-y-1/2 text-primary top-1/2 left-1/2" />
      <span className="sr-only">Scroll to weather info</span>
    </div>
  );
}
