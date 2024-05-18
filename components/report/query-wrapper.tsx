"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReportTableYear from "./report-table-year";
import ReportTableMonth from "./report-table-month";

const queryClient = new QueryClient();

export default function QueryWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReportTableYear />
      <ReportTableMonth />
    </QueryClientProvider>
  );
}
