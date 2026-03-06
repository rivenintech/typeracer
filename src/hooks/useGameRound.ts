"use client";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { createNewRound } from "../app/(index)/actions";

export type Round = {
  id: string;
  sentence: string;
  ends_at: string;
};

export function useGameRound() {
  const supabase = createClient();
  const [currentRound, setCurrentRound] = useState<Round | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const requestNewRound = async () => {
    await createNewRound();
  };

  // Fetch initial round
  useEffect(() => {
    const fetchLatestRound = async () => {
      const { data } = await supabase
        .from("rounds")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (data) setCurrentRound(data);
      else requestNewRound();
    };

    fetchLatestRound();
  }, []);

  // Listen for new rounds via Supabase Realtime
  useEffect(() => {
    const channel = supabase
      .channel("public:rounds")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "rounds" }, (payload) => {
        setCurrentRound(payload.new as Round);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Handle the countdown timer
  useEffect(() => {
    if (!currentRound) return;

    const interval = setInterval(() => {
      const remaining = Math.max(0, new Date(currentRound.ends_at).getTime() - Date.now());
      setTimeLeft(Math.floor(remaining / 1000));

      // If time runs out, request a new round
      if (remaining <= 0) {
        clearInterval(interval);
        requestNewRound();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentRound]);

  return { currentRound, timeLeft };
}
