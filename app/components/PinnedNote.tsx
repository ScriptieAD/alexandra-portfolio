"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactNode } from "react";

type PinnedNoteProps = {
  variant?: "paper" | "mini";
  rotate?: number;
  activeRotate?: number;
  active?: boolean;
  className?: string;
  children: ReactNode;
};

export default function PinnedNote({
  variant = "mini",
  rotate = -2,
  activeRotate,
  active = false,
  className = "",
  children,
}: PinnedNoteProps) {
  if (variant === "paper") {
    return (
      <motion.div
        className={`relative ${className}`}
        style={{ rotate }}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
      >
        <Image
          src="/torn-paper-pink.png"
          alt=""
          width={1122}
          height={1402}
          className="h-auto w-full drop-shadow-[0_16px_28px_rgba(0,0,0,0.15)]"
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center px-[18%] text-center">
          {children}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`relative rounded-lg border border-black/10 bg-white/70 px-3.5 py-2.5 font-mono text-[11px] leading-relaxed text-black/55 ${className}`}
      animate={{ rotate: active ? (activeRotate ?? rotate - 1) : rotate }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <span
        aria-hidden="true"
        className="absolute -top-1.5 left-3 h-3 w-5 -rotate-6 rounded-[2px] bg-pink-300/70"
      />
      <span
        aria-hidden="true"
        className="absolute -top-1.5 right-3 h-3 w-5 rotate-6 rounded-[2px] bg-pink-300/70"
      />
      {children}
    </motion.div>
  );
}
