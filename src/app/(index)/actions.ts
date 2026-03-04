"use server";
import { supabase } from "@/src/lib/supabase";

const SENTENCES = [
  "The quick brown fox jumps over the lazy dog.",
  "To be or not to be, that is the question.",
  "All that glitters is not gold.",
  "I think, therefore I am.",
  "A journey of a thousand miles begins with a single step.",
];

export async function createNewRound() {
  // Get the most recent round
  const { data: latestRound } = await supabase
    .from("rounds")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  const now = new Date();

  // Check if the round is still active to prevent race conditions
  if (latestRound && new Date(latestRound.ends_at) > now) {
    return { message: "A round is already active" };
  }

  // Create a new round (60 seconds from now)
  const endsAt = new Date(now.getTime() + 60 * 1000);
  const randomSentence =
    SENTENCES[Math.floor(Math.random() * SENTENCES.length)];

  const { data: newRound, error } = await supabase
    .from("rounds")
    .insert([{ sentence: randomSentence, ends_at: endsAt.toISOString() }])
    .select()
    .single();

  if (error) return { message: error.message };

  return { message: "New round created", round: newRound };
}

export async function saveUserResult(
  roundId: string,
  wpm: number,
  accuracy: number,
) {
  const { error } = await supabase.from("results").insert({
    round_id: roundId,
    player_name: "Anonymous",
    wpm: wpm,
    accuracy: accuracy,
  });

  if (error) {
    console.error("Error saving result:", error);
    return { message: error.message };
  }

  return { message: "Result saved successfully" };
}
