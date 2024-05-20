import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function SubjCard({
  title,
  src,
  par,
  sub,
}: {
  title: string;
  src?: string;
  par: string;
  sub?: string;
}) {
  return (
    <Card className="relative px-4 pb-8 m-auto shadow-sm shadow-primary lg:max-w-screen-lg h-[300px]">
      <CardHeader className="flex flex-col items-center justify-between md:flex-row">
        <CardTitle
          className={` ${
            !src && `text-center w-full `
          } pb-2 mt-8 text-3xl font-normal tracking-tight md:text-3xl 2xl:text-4xl scroll-m-20 md:mt-0`}
        >
          {title}
        </CardTitle>
        {src && (
          <div className="absolute top-0 border-2 rounded-full -translate-y-1/2 md:-translate-y-px md:static border-primary">
            <Image
              src={src}
              width={0}
              height={0}
              objectFit="cover"
              className="p-0 m-0 rounded-full w-14 h-14 grayscale"
              alt={title}
            />
          </div>
        )}
      </CardHeader>
      <CardDescription className="px-4 text-justify w-[95%] overflow-scroll h-[120px] lg:overflow-hidden lg:h-full">
        <span
          className={`leading-6 [&:not(:first-child)]:mt-6 ${
            src ? `text-pretty` : `text-center`
          } text-foreground/95`}
        >
          {par}
        </span>
        {sub && (
          <span className="block pl-6 mt-6 italic text-center">{sub}</span>
        )}
      </CardDescription>
    </Card>
  );
}
