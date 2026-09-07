const ITEMS = [
  "PYTHON",
  "SQL",
  "FRAUD ANALYTICS",
  "DATA",
  "FINANCIAL CRIME",
  "TECHNOLOGY",
  "CURIOSITY",
];

export default function MarqueeBand() {
  return (
    <div className="w-full overflow-hidden border-y border-white/10 bg-ink py-4">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center gap-8 pr-8">
            {ITEMS.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.32em] text-white/45"
              >
                {item}
                <span className="text-white/20">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
