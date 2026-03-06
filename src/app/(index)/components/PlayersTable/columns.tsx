"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type PlayerStats = {
  playerName: string;
  wpm: number;
  accuracy: number;
  userInput: string;
};

export const columns: ColumnDef<PlayerStats>[] = [
  {
    accessorKey: "playerName",
    header: "Player",
  },
  {
    accessorKey: "wpm",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-semibold text-gray-700"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          WPM
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="px-4 py-2 font-bold text-blue-600">{row.getValue("wpm")}</div>,
  },
  {
    accessorKey: "accuracy",
    cell: ({ row }) => (
      <div className="px-4 py-2 font-bold text-blue-600">
        {(parseFloat(row.getValue("accuracy")) * 100).toFixed(1)}%
      </div>
    ),
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="font-semibold text-gray-700"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Accuracy
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "userInput",
    header: "Live Progress",
    cell: ({ row }) => {
      const progress = row.getValue("userInput") as string;
      return (
        <div className="truncate font-mono text-sm text-gray-500">
          {/* Show the last 20 characters the user typed so it looks like a live feed */}
          {progress.length > 20 ? "..." + progress.slice(-20) : progress || "-"}
          <span className="ml-1 inline-block h-4 w-1.5 animate-pulse bg-gray-400 align-middle" />
        </div>
      );
    },
  },
];
