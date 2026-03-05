"use client";

import { useGameRound } from "@/hooks/useGameRound";
import { useMultiplayer } from "@/hooks/useMultiplayer";
import { useTypingGame } from "@/hooks/useTypingGame";
import { DataTable } from "./DataTable";
import { columns } from "./columns";

export function PlayersTable({ username }: { username: string }) {
  const { currentRound } = useGameRound();
  const { userInput, wpm, accuracy } = useTypingGame(currentRound);
  const { players } = useMultiplayer(
    currentRound?.id,
    username,
    userInput,
    wpm,
    accuracy,
  );

  return <DataTable columns={columns} data={players || []} />;
}
