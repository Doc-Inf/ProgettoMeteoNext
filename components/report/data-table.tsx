"use client";

import * as React from "react";
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ReportTable<TData, TValue>({
  columns,
  data,
  type,
}: DataTableProps<TData, TValue> & { type: "month" | "year" }) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      rowSelection,
      columnVisibility,
    },
  });
  async function onSubmit() {}
  console.log("start");
  return (
    <>
      <div className="md:px-10">
        <Table className="md:w-full w-[562px] overflow-x-scroll">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  if (header.id === "type")
                    return (
                      <TableHead>
                        {type === "month" ? "Mese" : "Anno"}
                      </TableHead>
                    );
                  return (
                    header.column.columnDef.header !== "hide" && (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-0 border-b bg-background hover:bg-neutral-200/50 dark:hover:bg-neutral-900"
                >
                  {row.getVisibleCells().map((cell) => {
                    console.log(cell.getValue());
                    return (
                      cell.column.columnDef.header !== "hide" && (
                        <TableCell key={cell.id}>
                          {cell.column.id === "type"
                            ? format(
                                type === "month"
                                  ? new Date().setMonth(
                                      (cell.getValue() as number) - 1
                                    )
                                  : new Date().setFullYear(
                                      cell.getValue() as number
                                    ),
                                type == "month" ? "MMMM" : "yyyy"
                              )
                            : flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                        </TableCell>
                      )
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
