interface Props {
  value: number; // 0–100
  label?: string;
  className?: string;
}

export default function ProgressBar({ value, label, className }: Props) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={["progress-track", className].filter(Boolean).join(" ")}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div className="progress-fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}
