"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

export type TimelineTx = {
  date: string;
  fullDate: string;
  amount: string;
  type: string;
  typeRaw: string;
  channel: string;
  route: string;
  receiver: string;
  dominant?: boolean;
};

function fadeUpVariant(delay: number, distance = 14) {
  return {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
    },
  };
}

export default function TransactionTimeline({
  transactions,
  onHighlight,
  delay = 0,
  className = "",
}: {
  transactions: TimelineTx[];
  onHighlight?: (index: number, hovering: boolean) => void;
  delay?: number;
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className}>
      <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
        Transaction timeline
      </p>

      <div className="relative mt-5 flex flex-col gap-8">
        <motion.div
          aria-hidden="true"
          variants={{
            hidden: { scaleY: 0 },
            show: {
              scaleY: 1,
              transition: { duration: 0.9, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] as const },
            },
          }}
          style={{ transformOrigin: "top" }}
          className="absolute top-1 bottom-1 left-[7px] w-px bg-black/15"
        />

        {transactions.map((tx, i) => (
          <motion.div
            key={tx.fullDate + tx.amount}
            variants={fadeUpVariant(delay + 0.15 + i * 0.15)}
            onMouseEnter={() => onHighlight?.(i, true)}
            onMouseLeave={() => onHighlight?.(i, false)}
            onFocus={() => onHighlight?.(i, true)}
            onBlur={() => onHighlight?.(i, false)}
            tabIndex={0}
            className="relative pl-7 transition-transform duration-300 hover:-translate-y-0.5 focus:outline-none"
          >
            <span
              aria-hidden="true"
              className={`absolute top-1 left-0 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 ${
                tx.dominant ? "border-burgundy bg-burgundy/20" : "bg-paper border-black/30"
              }`}
            />

            <p className="font-mono text-[10px] tracking-[0.16em] text-black/40 uppercase">
              {tx.date}
            </p>

            <p
              className={`mt-1 font-mono font-bold ${
                tx.dominant ? "text-burgundy text-3xl sm:text-4xl" : "text-ink text-lg"
              }`}
            >
              {tx.amount}
            </p>

            <p className="mt-1 text-xs text-black/50">
              {tx.type} · {tx.route}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div variants={fadeUpVariant(delay + 0.5)} className="mt-7">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="case-spotlight-tx-panel"
          className="text-burgundy group inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-[0.1em] uppercase"
        >
          <span className="border-burgundy/50 flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-300 group-hover:bg-burgundy/10">
            <ChevronDown
              aria-hidden="true"
              className={`h-3 w-3 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </span>
          {open ? "Close transactions" : "Inspect transactions"}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="case-spotlight-tx-panel"
              role="region"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="bg-ivory-deep/50 border-t border-r border-b border-l-2 border-t-black/10 border-r-black/10 border-b-black/10 border-l-burgundy/40 mt-4 overflow-x-auto">
                <table className="w-full min-w-[480px] border-collapse font-mono text-[11px]">
                  <thead>
                    <tr className="text-black/40 uppercase tracking-[0.08em]">
                      <th className="px-3 py-2 text-left font-semibold">Timestamp</th>
                      <th className="px-3 py-2 text-left font-semibold">Receiver</th>
                      <th className="px-3 py-2 text-right font-semibold">Amount</th>
                      <th className="px-3 py-2 text-left font-semibold">Type</th>
                      <th className="px-3 py-2 text-left font-semibold">Channel</th>
                      <th className="px-3 py-2 text-left font-semibold">Route</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx) => (
                      <tr
                        key={tx.fullDate + tx.amount}
                        className="border-t border-black/10 text-black/70"
                      >
                        <td className="px-3 py-2">{tx.fullDate}</td>
                        <td className="px-3 py-2">{tx.receiver}</td>
                        <td className="px-3 py-2 text-right">{tx.amount}</td>
                        <td className="px-3 py-2">{tx.typeRaw}</td>
                        <td className="px-3 py-2">{tx.channel}</td>
                        <td className="px-3 py-2">{tx.route}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
