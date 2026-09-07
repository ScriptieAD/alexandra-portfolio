export default function RuleMetric({
  metric,
  className = "",
}: {
  metric: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[10px] font-semibold tracking-[0.2em] text-black/40 uppercase">
        Metric
      </p>
      <p className="mt-1.5 max-w-[240px] font-mono text-[13px] leading-[1.6] text-black/70">
        {metric}
      </p>
    </div>
  );
}
