"use client";

import HeroHeading from "@/components/headings/hero-heading";
import Home from "@/components/hero/complete-page";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
}
