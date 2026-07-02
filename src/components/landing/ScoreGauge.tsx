interface ScoreGaugeProps {
  score: number;
  max?: number;
  label: string;
  color?: string;
  size?: "sm" | "lg";
}

export default function ScoreGauge({
  score,
  max = 100,
  label,
  color = "var(--accent)",
  size = "sm",
}: ScoreGaugeProps) {
  const percent = Math.min(100, Math.round((score / max) * 100));
  const radius = size === "lg" ? 70 : 40;
  const stroke = size === "lg" ? 10 : 6;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const dimension = (radius + stroke) * 2;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: dimension, height: dimension }}>
        <svg
          width={dimension}
          height={dimension}
          className="-rotate-90"
          aria-hidden="true"
        >
          <circle
            cx={radius + stroke}
            cy={radius + stroke}
            r={radius}
            fill="none"
            stroke="#e2e6ed"
            strokeWidth={stroke}
          />
          <circle
            cx={radius + stroke}
            cy={radius + stroke}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`font-bold text-navy ${size === "lg" ? "text-4xl" : "text-lg"}`}
          >
            {score}
          </span>
          {size === "lg" && (
            <span className="text-sm text-muted">/ {max}</span>
          )}
        </div>
      </div>
      <span
        className={`font-semibold text-navy ${size === "lg" ? "text-base" : "text-xs"}`}
      >
        {label}
      </span>
    </div>
  );
}
