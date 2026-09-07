"use client";

import { motion } from "motion/react";

export default function FlowConnector({
  orientation = "horizontal",
  highlighted = false,
  emphasized = false,
  delay = 0,
  className = "",
}: {
  orientation?: "horizontal" | "vertical";
  highlighted?: boolean;
  emphasized?: boolean;
  delay?: number;
  className?: string;
}) {
  const isHorizontal = orientation === "horizontal";
  const active = highlighted || emphasized;

  return (
    <div
      aria-hidden="true"
      className={`relative shrink-0 ${isHorizontal ? "h-px w-full" : "mx-auto h-full w-px"} ${className}`}
    >
      <motion.span
        initial={isHorizontal ? { scaleX: 0 } : { scaleY: 0 }}
        whileInView={isHorizontal ? { scaleX: 1 } : { scaleY: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        animate={{
          backgroundColor: active
            ? "rgba(143,33,56,0.55)"
            : "rgba(23,23,23,0.15)",
        }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: isHorizontal ? "left" : "top" }}
        className={
          isHorizontal
            ? "absolute top-1/2 left-0 h-px w-full -translate-y-1/2"
            : "absolute top-0 left-1/2 h-full w-px -translate-x-1/2"
        }
      />

      <motion.span
        aria-hidden="true"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        animate={{
          backgroundColor: active
            ? "rgba(143,33,56,0.8)"
            : "rgba(23,23,23,0.25)",
        }}
        transition={{ duration: 0.4, delay: delay + 0.5 }}
        className={
          isHorizontal
            ? "absolute top-1/2 right-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
            : "absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
        }
      />
    </div>
  );
}
