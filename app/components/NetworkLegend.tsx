"use client";

import type { ReactNode } from "react";

export type NetworkLegendItem = {
  id: string;
  swatch: ReactNode;
  label: string;
};

function FocusSwatch() {
  return (
    <span
      aria-hidden="true"
      className="bg-burgundy border-paper-card inline-block h-3 w-3 shrink-0 rounded-full border-2"
    />
  );
}

function CounterpartySwatch() {
  return (
    <span
      aria-hidden="true"
      className="bg-burgundy/55 inline-block h-2 w-2 shrink-0 rounded-full"
    />
  );
}

function FlaggedSwatch() {
  return (
    <span aria-hidden="true" className="bg-burgundy inline-block h-2 w-2 shrink-0 rounded-full" />
  );
}

function OtherSwatch() {
  return (
    <span
      aria-hidden="true"
      className="bg-burgundy/25 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
    />
  );
}

function DirectionSwatch() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 10" className="h-2.5 w-6 shrink-0">
      <path
        d="M1 5 H18"
        stroke="#8f2138"
        strokeOpacity={0.6}
        strokeWidth={1.4}
        fill="none"
      />
      <path d="M15 1 L21 5 L15 9 Z" fill="#8f2138" fillOpacity={0.6} />
    </svg>
  );
}

export const NETWORK_LEGEND_SWATCH = {
  focus: <FocusSwatch />,
  counterparty: <CounterpartySwatch />,
  flagged: <FlaggedSwatch />,
  other: <OtherSwatch />,
  direction: <DirectionSwatch />,
};

export default function NetworkLegend({
  items,
  notes,
  className = "",
}: {
  items: NetworkLegendItem[];
  notes?: string[];
  className?: string;
}) {
  return (
    <div className={`border-t border-black/10 pt-5 ${className}`}>
      <div className="flex flex-wrap gap-x-6 gap-y-2.5">
        {items.map((item) => (
          <span
            key={item.id}
            className="flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] text-black/50 uppercase"
          >
            {item.swatch}
            {item.label}
          </span>
        ))}
      </div>

      {notes && notes.length > 0 && (
        <div className="mt-4 space-y-1.5 border-t border-black/5 pt-4">
          {notes.map((note) => (
            <p key={note} className="text-[11px] leading-relaxed text-black/40 italic">
              {note}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
