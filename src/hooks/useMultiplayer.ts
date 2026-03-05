import { supabase } from "@/lib/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

export type PlayerState = {
  playerName: string;
  userInput: string;
  wpm: number;
  accuracy: number;
};

export function useMultiplayer(
  roundId: string | undefined,
  playerName: string,
  userInput: string,
  wpm: number,
  accuracy: number,
) {
  const [players, setPlayers] = useState<PlayerState[]>([]);
  const channelRef = useRef<RealtimeChannel | null>(null);
  console.log(roundId, playerName, userInput, wpm, accuracy);

  // Join the room for the current round
  useEffect(() => {
    if (!roundId || !playerName) return;

    // Create a channel unique to this round
    const channel = supabase.channel(`round-${roundId}`, {
      config: {
        presence: {
          key: playerName, // Identifies the user in the presence state
        },
      },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const state = channel.presenceState();
        // Flatten the presence object into a simple array of players
        const activePlayers = Object.values(state).map((presenceArray) => {
          return presenceArray[0] as unknown as PlayerState;
        });

        // Sort by WPM descending so the fastest player is on top
        activePlayers.sort((a, b) => b.wpm - a.wpm);
        setPlayers(activePlayers);
      })
      .subscribe();

    channelRef.current = channel;

    return () => {
      supabase.removeChannel(channel);
    };
  }, [roundId, playerName]);

  // Broadcast local changes to everyone else
  useEffect(() => {
    // Only track if the channel is fully joined
    if (channelRef.current && channelRef.current.state === "joined") {
      // Note: In a production app, we would debounce this track() call
      // by ~200ms to save bandwidth, but for a hackathon MVP, this works!
      channelRef.current.track({
        playerName,
        userInput,
        wpm,
        accuracy,
      });
    }
  }, [userInput, wpm, accuracy, playerName]);

  return { players };
}
