"use client";

interface Props {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export default function MatchScoreRing({ score, size = 72, strokeWidth = 6 }: Props) {
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 85
      ? "#6C3BFF"
      : score >= 65
      ? "#8B5FFF"
      : "#A78BFA";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#EDE9FF"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease" }}
        />
      </svg>
      <span
        className="absolute text-sm font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}
