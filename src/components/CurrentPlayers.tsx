import { PlayerState } from "../hooks/useMultiplayer";

export default function CurrentPlayers({
  players,
}: {
  players: PlayerState[];
}) {
  if (players.length === 0) {
    return (
      <div className="text-gray-500 text-center mt-8">
        Waiting for players...
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="p-4 font-semibold text-gray-700">Player</th>
            <th className="p-4 font-semibold text-gray-700">WPM</th>
            <th className="p-4 font-semibold text-gray-700">Accuracy</th>
            <th className="p-4 font-semibold text-gray-700 w-1/2">
              Live Progress
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr
              key={player.playerName}
              className="border-b border-gray-100 last:border-0 hover:bg-gray-50"
            >
              <td className="p-4 font-medium text-gray-900">
                {player.playerName}
              </td>
              <td className="p-4 text-blue-600 font-bold">{player.wpm}</td>
              <td className="p-4 text-gray-600">
                {(player.accuracy * 100).toFixed(1)}%
              </td>
              <td className="p-4 text-gray-500 font-mono text-sm truncate max-w-xs">
                {/* Show the last 20 characters they typed so it looks like a live feed */}
                {player.userInput.length > 20
                  ? "..." + player.userInput.slice(-20)
                  : player.userInput || "-"}
                <span className="animate-pulse bg-gray-400 w-1.5 h-4 inline-block ml-1 align-middle"></span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
