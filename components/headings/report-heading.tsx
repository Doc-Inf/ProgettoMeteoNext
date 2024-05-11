"use client";
import { motion } from "framer";

export default function ReportHeading() {
  return (
    <motion.div
      className="relative flex items-center justify-center lg:max-w-[80%] m-auto my-56"
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
    >
      <div className="flex flex-col items-center">
        <h1 className="mb-5 text-3xl tracking-tight text-center scroll-m-20 xl:text-8xl lg:text-7xl md:text-6xl">
          Report dei{" "}
          <span className={`font-bold tracking-wide text-primary mr-4`}>
            dati
          </span>
          meteorologici
        </h1>
        <p className="font-light text-center text-md lg:text-3xl md:text-xl text-muted-foreground">
          Seleziona anno/mese per visualizzare i dati meteologici
        </p>
      </div>
    </motion.div>
  );
}
