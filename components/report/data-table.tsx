"use client";

import * as React from "react";
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
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
import { it } from "date-fns/locale";
import { Button } from "../ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function ReportTable<TData, TValue>({
  columns,
  data,
  type,
}: DataTableProps<TData, TValue> & { type: "day" | "month" | "year" }) {
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
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      rowSelection,
      columnVisibility,
    },
  });

  return (
    <>
      <div className="px-4 md:px-10">
        <Table className="md:w-full lg:w-[1200px]  md:overflow-x-hidden m-auto w-[562px] overflow-x-scroll ">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  if (header.id === "type")
                    return (
                      <TableHead key={headerGroup.id} className="font-bold">
                        {type === "month"
                          ? "Mese"
                          : type === "day"
                          ? "Giorno"
                          : "Anno"}
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
                    return (
                      cell.column.columnDef.header !== "hide" && (
                        <TableCell key={cell.id}>
                          {cell.column.id === "type" ? (
                            <span className="font-bold">
                              {" "}
                              {format(
                                type === "month"
                                  ? new Date().setMonth(
                                      (cell.getValue() as number) - 1
                                    )
                                  : type === "year"
                                  ? new Date().setFullYear(
                                      cell.getValue() as number
                                    )
                                  : new Date().setDate(
                                      cell.getValue() as number
                                    ),
                                type == "month"
                                  ? "MMMM"
                                  : type === "day"
                                  ? "dd"
                                  : "yyyy",
                                { locale: it }
                              )}{" "}
                            </span>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
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

        <div className="flex 2xl:w-[1200px] items-center justify-end py-4 m-auto space-x-2 lg:w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Precedente
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Prossima
          </Button>
        </div>
      </div>
    </>
  );
}
