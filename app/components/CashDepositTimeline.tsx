"use client";

import { motion } from "motion/react";

export type CashDeposit = {
  day: string;
  time: string;
  amount: string;
  channel: "ATM" | "Branch";
};

export default function CashDepositTimeline({
  deposits,
  delay = 0,
  className = "",
}: {
  deposits: CashDeposit[];
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-black/40 uppercase">
        Cash deposit timeline · 09–12 May 2026
      </p>

      <div className="relative mt-4">
        <div
          aria-hidden="true"
          className="bg-black/15 absolute top-2 bottom-2 left-[3px] w-px"
        />

        <div className="flex flex-col">
          {deposits.map((d) => (
            <div
              key={`${d.day}-${d.time}`}
              className="group relative flex items-baseline gap-4 py-2 pl-6 transition-colors duration-200 hover:bg-burgundy/[0.03]"
            >
              <span
                aria-hidden="true"
                className="border-paper absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full border-2 bg-black/30 group-hover:bg-burgundy"
              />

              <span className="w-[92px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-black/45 uppercase">
                {d.day} · {d.time}
              </span>

              <span className="text-ink flex-1 font-mono text-sm font-semibold sm:text-base">
                €{d.amount}
              </span>

              <span
                className={`shrink-0 rounded-sm border px-2 py-0.5 font-mono text-[9px] tracking-[0.1em] uppercase ${
                  d.channel === "Branch"
                    ? "border-burgundy/40 text-burgundy/70"
                    : "border-black/15 text-black/45"
                }`}
              >
                {d.channel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
