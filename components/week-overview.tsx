"use client";
import { motion } from "framer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Container } from "./container";
import { ChevronDown, Cloud } from "lucide-react";
import Day from "./cards/day";
import { Button } from "./ui/button";
import { useState } from "react";

export default function WeekOverview() {
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
          <h4 className="text-2xl font-semibold">
            Informazioni sulla settimana
          </h4>
        </div>
        {/* CONTENT CONTAINER */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* ALWAYS SHOWN */}
          <Day
            icon={<Cloud stroke="#17A34A" />}
            max={10}
            min={7}
            day={21}
            day2="Gen, Sab"
          />
          <Day
            icon={<Cloud stroke="#17A34A" />}
            max={12}
            min={2}
            day={20}
            day2="Gen, Ven"
          />
          <Day
            icon={<Cloud stroke="#17A34A" />}
            max={7}
            min={6}
            day={19}
            day2="Gen, Gio"
          />

          {/* COLLAPSED */}
          <CollapsibleContent>
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              className="space-y-3"
            >
              <Day
                icon={<Cloud stroke="#17A34A" />}
                max={9}
                min={0}
                day={18}
                day2="Gen, Mer"
              />
              <Day
                icon={<Cloud stroke="#17A34A" />}
                max={8}
                min={6}
                day={17}
                day2="Gen, Mar"
              />
              <Day
                icon={<Cloud stroke="#17A34A" />}
                max={10}
                min={4}
                day={16}
                day2="Gen, Lun"
              />
              <Day
                icon={<Cloud stroke="#17A34A" />}
                max={15}
                min={6}
                day={15}
                day2="Gen, Dom"
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
