"use client";
import { motion } from "framer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Container } from "../container";
import { ChevronDown, Cloud } from "lucide-react";
import Day from "../cards/day";
import { Button } from "../ui/button";
import { useState } from "react";

export default function HeroWeek({
  title,
  min,
  max,
  days,
}: {
  title: "giornata" | "settimana";
  min: number[];
  max: number[];
  days: string[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  const btnVariant = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
  };
  return (
    <Container className="order-2 col-span-2 lg:m-0 lg:h-full">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="flex flex-col space-y-3 lg:h-full lg:justify-between"
      >
        <div className="flex items-center justify-between">
          {/* TAB TITLE */}
          <h4 className="text-2xl font-semibold">Informazioni sulla {title}</h4>
        </div>
        {/* CONTENT CONTAINER */}
        <motion.div
          className="space-y-3"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* ALWAYS SHOWN */}
          <Day
            icon={<Cloud stroke="#17A34A" />}
            max={max[6]}
            min={min[6]}
            day={days[6]}
          />
          <Day
            icon={<Cloud stroke="#17A34A" />}
            max={max[5]}
            min={min[5]}
            day={days[5]}
          />
          <Day
            icon={<Cloud stroke="#17A34A" />}
            max={max[4]}
            min={min[4]}
            day={days[4]}
          />

          {/* COLLAPSED */}
          <CollapsibleContent>
            <motion.div
              variants={{
                hidden: { opacity: 0, scaleY: 0 },
                visible: { opacity: 1, scaleY: 1 },
              }}
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              transition={{ duration: 0.5, type: "spring" }}
              className="space-y-3"
            >
              <Day
                icon={<Cloud stroke="#17A34A" />}
                max={max[3]}
                min={min[3]}
                day={days[3]}
              />
              <Day
                icon={<Cloud stroke="#17A34A" />}
                max={max[2]}
                min={min[2]}
                day={days[2]}
              />
              <Day
                icon={<Cloud stroke="#17A34A" />}
                max={max[1]}
                min={min[1]}
                day={days[1]}
              />
              <Day
                icon={<Cloud stroke="#17A34A" />}
                max={max[0]}
                min={min[0]}
                day={days[0]}
              />
            </motion.div>
          </CollapsibleContent>
        </motion.div>
        {/* TRIGGER CONTAINER */}
        <div className="flex justify-center">
          <CollapsibleTrigger asChild>
            <Button>
              {/* ANIMATED WITH ROTATION */}
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={btnVariant}
              >
                <ChevronDown />
              </motion.div>
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </Container>
  );
}
