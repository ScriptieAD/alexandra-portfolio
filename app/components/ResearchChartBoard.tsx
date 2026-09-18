"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Paperclip } from "lucide-react";

export default function ResearchChartBoard({
  src,
  width,
  height,
  alt,
  active,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  active: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <Image
        aria-hidden="true"
        src="/projects/aml-transaction-monitoring/dossier/coffee-stain.png"
        alt=""
        width={1254}
        height={1254}
        className="pointer-events-none absolute -top-10 -right-8 h-[210px] w-[210px] opacity-40 mix-blend-multiply"
      />

      <div
        aria-hidden="true"
        className="bg-paper-card shadow-paper-xs absolute top-2 -left-2 h-[95%] w-[97%] rotate-1 rounded-[2px]"
      />

      <div className="relative -rotate-1">
        <span
          aria-hidden="true"
          className="absolute -top-2.5 left-8 z-10 h-4 w-9 -rotate-6 rounded-[2px] bg-pink-300/70"
        />

        <div className="relative">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full shadow-[0_18px_32px_rgba(64,45,37,0.18)]"
          />

          <svg
            viewBox={`0 0 ${width} ${height}`}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full"
          >
            <g fill="none" stroke="#8f2138" strokeOpacity={0.55} strokeWidth={1.3} strokeLinecap="round">
              <ellipse cx={430} cy={80} rx={40} ry={52} transform="rotate(-8 430 80)" />
              <ellipse cx={434} cy={76} rx={37} ry={55} transform="rotate(7 434 76)" />
            </g>
            <path
              d="M492,146 Q468,118 452,96"
              fill="none"
              stroke="#8f2138"
              strokeOpacity={0.5}
              strokeWidth={1}
            />
          </svg>

          <p
            aria-hidden="true"
            className="font-hand text-burgundy/60 absolute max-w-[90px] text-sm leading-snug"
            style={{ left: "76%", top: "34%" }}
          >
            volatility spike
          </p>
        </div>

        <div className="absolute -bottom-7 -left-5 w-[38%] rotate-3">
          <Paperclip
            aria-hidden="true"
            className="text-black/25 absolute -top-3 left-4 h-5 w-5 -rotate-12"
            strokeWidth={1.5}
          />
          <div className="bg-paper-card relative rounded-[2px] border border-black/10 px-3 py-2.5 shadow-[0_10px_18px_rgba(64,45,35,0.18)]">
            <p className="font-mono text-[9px] leading-snug text-black/70 uppercase">
              ARIMA(2,0,2)
            </p>
            <p className="font-mono text-[9px] leading-snug text-black/70 uppercase">
              GARCH volatility
            </p>
            <p className="font-mono text-[9px] leading-snug text-black/70 uppercase">
              Trend forecasting
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.35, rotate: -20 }}
          animate={
            active
              ? { opacity: 1, scale: 1, rotate: -9 }
              : { opacity: 0, scale: 1.35, rotate: -20 }
          }
          transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
          className="absolute -right-2 -bottom-10 w-[34%] mix-blend-multiply"
        >
          <Image
            src="/projects/aml-transaction-monitoring/dossier/evidence-stamp.png"
            alt=""
            width={2172}
            height={724}
            className="h-auto w-full"
          />
        </motion.div>
      </div>

      <p className="mt-5 text-center font-mono text-[10px] tracking-[0.16em] text-black/40 uppercase">
        {alt}
      </p>
    </div>
  );
}
