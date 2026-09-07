"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export default function InvestigationNote({
  className = "",
  rotate = -2,
  delay = 0.5,
}: {
  className?: string;
  rotate?: number;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 34, rotate: rotate - 6 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 150, damping: 18, delay }}
      whileHover={
        prefersReducedMotion ? undefined : { rotate: rotate + 1, y: -4 }
      }
      className={`relative ${className}`}
    >
      <Image
        src="/torn-paper-note.png"
        alt=""
        width={1254}
        height={1254}
        className="h-auto w-full drop-shadow-[0_18px_30px_rgba(60,42,24,0.22)]"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-[16%] text-center">
        <p className="text-burgundy font-mono text-[9px] font-semibold tracking-[0.16em] uppercase">
          Investigative note
        </p>

        <p className="font-hand text-ink/85 mt-2 text-[15px] leading-[1.15] sm:text-lg">
          &ldquo;The outliers aren&apos;t noise.
          <br />
          They&apos;re where the{" "}
          <span className="relative inline-block">
            story hides.
            <svg
              aria-hidden="true"
              viewBox="0 0 100 14"
              className="text-burgundy/70 absolute -bottom-1 left-0 h-2.5 w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M2 8 Q 25 2 50 7 T 98 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
          &rdquo;
        </p>

        <p className="font-hand text-ink/70 mt-1.5 text-base">— A.C.</p>
      </div>
    </motion.div>
  );
}
