"use client";

import type { ReactNode } from "react";

export default function SectionLabel({
  index,
  children,
  className = "",
}: {
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="flex shrink-0 items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-black/40 uppercase">
        {index && <span className="text-burgundy/60 font-bold">{index}</span>}
        {children}
      </span>
      <span aria-hidden="true" className="h-px flex-1 bg-black/10" />
    </div>
  );
}
