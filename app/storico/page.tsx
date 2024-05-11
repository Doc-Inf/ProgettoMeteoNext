"use client";

import { ArchiveForm } from "@/components/archive/archive-form";
import ArchiveHeading from "@/components/headings/archive-heading";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Page() {
  return (
    <>
      <ArchiveHeading />
      <QueryClientProvider client={queryClient}>
        <ArchiveForm />
      </QueryClientProvider>
    </>
  );
}
