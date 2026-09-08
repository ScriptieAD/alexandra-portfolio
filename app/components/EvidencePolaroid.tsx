"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export default function EvidencePolaroid({
  className = "",
  rotate = -4,
  delay = 0.42,
}: {
  className?: string;
  rotate?: number;
  delay?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, rotate: rotate - 14 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 140, damping: 18, delay }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : { rotate: rotate / 4, y: -5 }
      }
      className={`relative w-full ${className}`}
    >
      <Image
        src="/prop-map-polaroid.png"
        alt="A pinned map, threaded together like an investigation board"
        width={1086}
        height={1448}
        className="h-auto w-full drop-shadow-[0_12px_18px_rgba(64,45,35,0.12)]"
      />

      {/* caption, overlaid on the polaroid's own blank strip. Lives inside
          the same rotated element as the photo (not a sibling), so it's
          pinned to it and rotates/moves as one rigid piece — the
          position here is calibrated to the photo's actual printed
          rectangle, not just an eyeballed guess. */}
      <p className="absolute inset-x-[18%] bottom-[17%] hidden text-center font-mono text-[10px] leading-[1.6] font-semibold tracking-[0.18em] text-black/55 uppercase lg:block">
        Pattern
        <br />
        Recognition
      </p>
    </motion.div>
  );
}
