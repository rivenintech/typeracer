"use client";

import CurrentPlayers from "@/components/CurrentPlayers";
import { useGameRound } from "@/hooks/useGameRound";
import { useMultiplayer } from "@/hooks/useMultiplayer";
import { useTypingGame } from "@/hooks/useTypingGame";
import { useEffect } from "react";
import { saveUserResult } from "../../actions";
import { Stats } from "./Stats";
import { TextDisplay } from "./TextDisplay";

export function TypingArea({ username }: { username: string }) {
  const { currentRound, timeLeft } = useGameRound();
  const { userInput, handleInput, wpm, accuracy, isFinished } =
    useTypingGame(currentRound);
  const { players } = useMultiplayer(
    currentRound?.id,
    username,
    userInput,
    wpm,
    accuracy,
  );

  useEffect(() => {
    if (isFinished && wpm > 0 && currentRound) {
      saveUserResult(currentRound.id, wpm, accuracy);
    }
  }, [isFinished, wpm, accuracy, currentRound]);

  return (
    <>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
        <Stats stats={{ wpm, accuracy, timeLeft }} />
        <TextDisplay text={currentRound?.sentence} userInput={userInput} />

        <input
          type="text"
          className="w-full p-4 text-xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400 text-gray-500"
          placeholder="Start typing to begin..."
          value={userInput}
          onChange={(e) => handleInput(e.target.value)}
          disabled={isFinished}
          autoFocus
        />

        {isFinished && (
          <div className="text-center text-green-600 font-bold text-xl animate-pulse">
            Round completed! Wait for the next round...
          </div>
        )}
      </div>
      <CurrentPlayers players={players} />
    </>
  );
}
