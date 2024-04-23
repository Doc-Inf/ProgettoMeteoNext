import { motion } from "framer";
import ScrollDown from "../scroll-down";

export default function HeroHeading() {
  return (
    <motion.div
      className="relative flex items-center justify-center h-[75vh] md:h-dvh flex-col"
      initial={{ scale: 0, y: 100 }}
      animate={{ scale: 1, y: 0 }}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-8xl md:text-6xl">
          Meteo <span className="text-primary"> Vallauri</span> Velletri
        </h1>
        <p className="text-lg text-center lg:text-3xl md:text-xl text-muted-foreground">
          Benvenuto. Su questo sito potrai trovare le condizioni climatiche di
          Velletri.
        </p>
      </div>
      <ScrollDown />
    </motion.div>
  );
}
