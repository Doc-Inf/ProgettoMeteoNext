import ReportHeading from "@/components/headings/report-heading";
import QueryWrapper from "@/components/report/query-wrapper";
import ReportTableMore from "@/components/report/report-table-more";

export default function Page() {
  return (
    <>
      <ReportHeading />

      <ReportTableMore />

      <QueryWrapper />
    </>
  );
}
