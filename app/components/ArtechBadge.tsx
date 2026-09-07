"use client";

import { motion } from "motion/react";
import { Flower2, Laptop, Sparkles } from "lucide-react";

export default function ArtechBadge() {
    return (
        <motion.span
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="artech-badge relative mx-0.5 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-br from-[#f6dfe6] to-[#f0d3dd] px-3 py-0.5 align-baseline shadow-[0_1px_6px_rgba(143,33,56,0.12)]"
        >
            <motion.span
                variants={{
                    rest: { rotate: 0, scale: 1 },
                    hover: { rotate: -18, scale: 1.12 },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className="relative flex shrink-0 items-center justify-center text-burgundy/70"
            >
                <Flower2 size={14} strokeWidth={1.75} />

                <motion.span
                    variants={{
                        rest: { opacity: 0, scale: 0.6 },
                        hover: { opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.25 }}
                    className="absolute -right-1.5 -top-1.5 text-burgundy/60"
                >
                    <Sparkles size={9} strokeWidth={2} />
                </motion.span>
            </motion.span>

            <em className="artech-word relative font-serif text-[0.95em] font-semibold italic text-burgundy">
                Artech
            </em>

            <motion.span
                variants={{
                    rest: { y: 0 },
                    hover: { y: -2 },
                }}
                transition={{ type: "spring", stiffness: 300, damping: 12 }}
                className="flex shrink-0 items-center justify-center text-burgundy/70"
            >
                <Laptop size={14} strokeWidth={1.75} />
            </motion.span>
        </motion.span>
    );
}
