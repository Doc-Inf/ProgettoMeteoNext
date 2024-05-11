import { NAV_LINKS } from "@/constants/links";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

export default function Links({ pathname }: { pathname: string }) {
  return (
    <div className="hidden space-x-2 md:items-center md:flex">
      {NAV_LINKS.map((l) => (
        <Link
          key={l.href}
          className={cn(
            pathname === l.href ? "!text-foreground" : "!text-foreground/60",
            buttonVariants({ variant: "link" })
          )}
          href={l.href}
        >
          {l.name}
        </Link>
      ))}
    </div>
  );
}
