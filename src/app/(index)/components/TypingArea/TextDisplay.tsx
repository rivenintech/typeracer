type TextDisplayProps = {
  text?: string;
  userInput: string;
};

export function TextDisplay({ text, userInput }: TextDisplayProps) {
  return (
    <div className="text-2xl font-medium leading-relaxed tracking-wide select-none p-4 bg-gray-100 rounded-md border border-gray-200">
      {text ? (
        text.split("").map((char, index) => {
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
        })
      ) : (
        <span className="text-gray-400">Loading...</span>
      )}
    </div>
  );
}
