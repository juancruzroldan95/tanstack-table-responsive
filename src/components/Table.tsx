import React, { useEffect, useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";
import { Person } from "../types/types";
import { data } from "../mocks/data";

export function Table() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (rowId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };

  const hasHiddenColumns = (row: Row<Person>) => {
    return row.getAllCells().some((cell) => !cell.column.getIsVisible());
  };

  const columns: ColumnDef<Person>[] = [
    {
      id: "expander",
      header: () => null,
      cell: ({ row }) =>
        hasHiddenColumns(row) ? (
          <button onClick={() => toggleRow(row.id)}>
            {expandedRows[row.id] ? "➖" : "➕"}
          </button>
        ) : null,
      enableSorting: false,
      enableHiding: false,
    },
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "lastName", header: "Last Name" },
    { accessorKey: "position", header: "Position" },
    { accessorKey: "office", header: "Office" },
    { accessorKey: "age", header: "Age" },
    { accessorKey: "startDate", header: "Start Date" },
    { accessorKey: "salary", header: "Salary" },
    { accessorKey: "ext", header: "Ext" },
    { accessorKey: "email", header: "Email" },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Breakpoints
  const mediumBreakpoint = 640;
  const largeBreakpoint = 1024;
  const extraLargeBreakpoint = 1280;

  const updateColumnVisibility = () => {
    const columns = table.getAllColumns();
    columns.forEach((column, index) => {
      if (windowWidth < mediumBreakpoint) {
        column.toggleVisibility(index < 4);
      } else if (windowWidth < largeBreakpoint) {
        column.toggleVisibility(index < 6);
      } else if (windowWidth < extraLargeBreakpoint) {
        column.toggleVisibility(index < 8);
      } else {
        column.toggleVisibility(true);
      }
    });
  };

  useEffect(() => {
    updateColumnVisibility();
  }, [windowWidth]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              <tr>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
              {expandedRows[row.id] && (
                <tr>
                  <td />
                  <td colSpan={row.getVisibleCells().length - 1}>
                    <div>
                      {row.getAllCells()
                        .filter((cell) => !cell.column.getIsVisible())
                        .map((cell) => (
                          <div key={cell.id}>
                            <strong>{cell.column.columnDef.header}:</strong>{" "}
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        ))}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
