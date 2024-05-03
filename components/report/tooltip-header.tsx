import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

export default function TooltipHeader({
  children,
  text,
}: {
  children: ReactNode | string;
  text: string;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="rotate-0
 "
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
