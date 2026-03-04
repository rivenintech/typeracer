import { useEffect, useMemo, useState } from "react";

export function useTypingGame(targetSentence: string) {
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [now, setNow] = useState<number>(Date.now());

  const isFinished = userInput === targetSentence;

  useEffect(() => {
    // Stop the interval if the game hasn't started or is already finished
    if (!startTime || isFinished) return;

    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [startTime, isFinished]);

  const handleInput = (val: string) => {
    // Prevent typing past the sentence length
    if (val.length > targetSentence.length) return;

    // Start timer on first keystroke
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
      setNow(Date.now());
    }

    setUserInput(val);

    if (val === targetSentence && !endTime) {
      setEndTime(Date.now());
    }
  };

  // Calculate stats
  const { wpm, accuracy } = useMemo(() => {
    if (!startTime || userInput.length === 0) return { wpm: 0, accuracy: 0 };

    // Accuracy: Correctly typed characters / Total characters in sentence
    let correctChars = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === targetSentence[i]) {
        correctChars++;
      }
    }
    const accuracyResult = correctChars / targetSentence.length;

    // WPM: Only count correct words
    const typedWords = userInput.split(" ");
    const targetWords = targetSentence.split(" ");
    let correctWords = 0;

    typedWords.forEach((word, index) => {
      const isTyping = index === typedWords.length - 1 && !isFinished;
      if (!isTyping && word === targetWords[index]) {
        correctWords++;
      }
    });

    // Use endTime if the user is done, otherwise use the live 'now' time
    const timeToUse = endTime || now;
    const minutesElapsed = Math.max((timeToUse - startTime) / 60000, 0.01);
    const wpmResult = Math.floor(correctWords / minutesElapsed);

    return { wpm: wpmResult, accuracy: accuracyResult };
  }, [userInput, targetSentence, startTime, now, endTime, isFinished]);

  return {
    userInput,
    handleInput,
    wpm,
    accuracy,
    isFinished,
  };
}
