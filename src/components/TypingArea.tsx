"use client";

import { useTypingGame } from "../hooks/useTypingGame";

export default function TypingArea({ sentence }: { sentence: string }) {
  const { userInput, handleInput, wpm, accuracy, isFinished } =
    useTypingGame(sentence);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* Stats */}
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border">
        <div className="text-lg font-semibold text-gray-700">
          WPM: <span className="text-blue-600">{wpm}</span>
        </div>
        <div className="text-lg font-semibold text-gray-700">
          Accuracy:{" "}
          <span className="text-blue-600">{(accuracy * 100).toFixed(1)}%</span>
        </div>
      </div>

      {/* Sentence Display */}
      <div className="text-2xl font-medium leading-relaxed tracking-wide select-none p-4 bg-gray-100 rounded-md border border-gray-200">
        {sentence.split("").map((char, index) => {
          let colorClass = "text-gray-400";

          if (index < userInput.length) {
            const isCorrect = userInput[index] === char;
            colorClass = isCorrect
              ? "text-green-500"
              : "text-red-500 bg-red-100 rounded";
          }

          // Render a visible space for trailing spaces or typos on spaces
          const displayChar =
            char === " " && index < userInput.length && userInput[index] !== " "
              ? "_"
              : char;

          return (
            <span key={index} className={colorClass}>
              {displayChar}
            </span>
          );
        })}
      </div>

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
  );
}
