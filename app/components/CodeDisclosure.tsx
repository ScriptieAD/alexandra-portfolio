"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export default function CodeDisclosure({
  code,
  label = "Inspect logic",
  className = "",
}: {
  code: string;
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const lines = code.split("\n");

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={id}
        className="text-burgundy group inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.1em] uppercase"
      >
        <span className="border-burgundy/50 flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-300 group-hover:bg-burgundy/10">
          <ChevronDown
            aria-hidden="true"
            className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </span>
        {open ? "Close logic" : label}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-ivory-deep/50 border-t border-r border-b border-l-2 border-t-black/10 border-r-black/10 border-b-black/10 border-l-burgundy/40 mt-4 py-3.5 pr-3 pl-4 font-mono text-[12px] leading-[1.8]">
              {lines.map((line, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-4 shrink-0 text-right text-black/25 select-none">
                    {i + 1}
                  </span>
                  <span className="whitespace-pre text-black/70">{line}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
