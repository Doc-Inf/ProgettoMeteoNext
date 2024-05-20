"use client";

import React, { useState } from "react";

import Link from "next/link";

import { NAV_LINKS } from "@/constants/links";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import Links from "./links";

export default function NavBar() {
  const [menu, setMenu] = useState(false);
  const handleMenu = () => {
    setMenu((prev) => !prev);
  };
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 z-50 w-screen border backdrop-blur-sm bg-background/90 border-zinc-700/45">
      <div className="flex items-center justify-between px-4 py-4 m-auto bg-transparent gap-4 md:justify-normal md:px-8">
        {/* LOGO */}
        <Link
          href="https://www.itisvallauri.edu.it/"
          className="flex items-center text-xl space-x-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h- text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15a4.5 4.5 0 0 0 4.5 4.5H18a3.75 3.75 0 0 0 1.332-7.257 3 3 0 0 0-3.758-3.848 5.25 5.25 0 0 0-10.233 2.33A4.502 4.502 0 0 0 2.25 15Z"
            />
          </svg>
          <span className="font-bold">Meteo Vallauri</span>
        </Link>

        {/* NAV */}
        <Links pathname={pathname} />

        {/* MOBILE ICON */}
        <div className="flex md:hidden">
          <Button onClick={handleMenu}>
            <HamburgerMenuIcon />
            <p className="sr-only">Menu navigazione</p>
          </Button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`${
          !menu ? "hidden" : ""
        } mobile-menu p-4 space-y-2 bg-accent rounded-sm rounded-b-none`}
      >
        <div className="flex flex-col *:font-bold *:text-xl *:border *:bg-muted-foreground/20 *:rounded-sm">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              className={cn(
                "!text-secondary-foreground",
                buttonVariants({ variant: "link" })
              )}
              onClick={() => setMenu(false)}
              href={l.href}
            >
              {l.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
