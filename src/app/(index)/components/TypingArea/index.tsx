"use client";

import { Input } from "@/components/ui/input";
import { useGameRound } from "@/hooks/useGameRound";
import { useTypingGame } from "@/hooks/useTypingGame";
import { useEffect } from "react";
import { saveUserResult } from "../../actions";
import { Stats } from "./Stats";
import { TextDisplay } from "./TextDisplay";

export function TypingArea() {
  const { currentRound, timeLeft } = useGameRound();
  const { userInput, handleInput, wpm, accuracy, isFinished } =
    useTypingGame(currentRound);

  useEffect(() => {
    if (isFinished && wpm > 0 && currentRound) {
      saveUserResult(currentRound.id, wpm, accuracy);
    }
  }, [isFinished, wpm, accuracy, currentRound]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      <Stats stats={{ wpm, accuracy, timeLeft }} />
      <TextDisplay text={currentRound?.sentence} userInput={userInput} />

      {!isFinished ? (
        <Input
          type="text"
          className="p-6 md:text-xl"
          placeholder="Start typing to begin..."
          value={userInput}
          onChange={(e) => handleInput(e.target.value)}
          disabled={isFinished}
          autoFocus
        />
      ) : (
        <div className="text-center text-green-600 font-bold text-xl animate-pulse">
          Round completed! Wait for the next round...
        </div>
      )}
    </div>
  );
}
