import { formatTimeLeft } from "@/utils/formatTimeLeft";

type StatsProps = {
  stats: { wpm: number; accuracy: number; timeLeft: number };
};

export function Stats({ stats }: StatsProps) {
  return (
    <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border">
      <div className="flex gap-5">
        <div className="text-lg font-semibold text-gray-700">
          WPM: <span className="text-blue-600">{stats.wpm}</span>
        </div>
        <div className="text-lg font-semibold text-gray-700">
          Accuracy:{" "}
          <span className="text-blue-600">
            {(stats.accuracy * 100).toFixed(1)}%
          </span>
        </div>
      </div>
      <p className="text-lg font-semibold text-gray-700">
        Time left:{" "}
        <span className="text-blue-600">{formatTimeLeft(stats.timeLeft)}</span>
      </p>
    </div>
  );
}
