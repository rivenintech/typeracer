"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type PlayerStats = {
  player: string;
  wpm: number;
  accuracy: number;
  progress: string;
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
    cell: ({ row }) => (
      <div className="px-4 py-2 text-blue-600 font-bold">
        {row.getValue("wpm")}
      </div>
    ),
  },
  {
    accessorKey: "accuracy",
    cell: ({ row }) => (
      <div className="px-4 py-2 text-blue-600 font-bold">
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
        <div className="text-gray-500 font-mono text-sm truncate">
          {/* Show the last 20 characters the user typed so it looks like a live feed */}
          {progress.length > 20 ? "..." + progress.slice(-20) : progress || "-"}
          <span className="animate-pulse bg-gray-400 w-1.5 h-4 inline-block ml-1 align-middle" />
        </div>
      );
    },
  },
];
