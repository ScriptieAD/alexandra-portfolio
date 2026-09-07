"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import type { Highlight } from "../about/experiences-data";

export default function WhatIDidAccordion({
    highlights,
}: {
    highlights: Highlight[];
}) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="mt-2 border-t border-black/10">
            {highlights.map((highlight, index) => {
                const isOpen = openIndex === index;

                return (
                    <div key={highlight.title} className="border-b border-black/10">
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            aria-expanded={isOpen}
                            className="group flex w-full items-center gap-4 py-5 text-left"
                        >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy" />

                            <span className="flex-1 leading-7 text-black/65 transition group-hover:text-black/85">
                                {highlight.title}
                            </span>

                            <motion.span
                                animate={{ rotate: isOpen ? 180 : 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="shrink-0 text-black/35 transition group-hover:text-burgundy"
                            >
                                <ChevronDown size={18} strokeWidth={1.75} />
                            </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="overflow-hidden"
                                >
                                    <ul className="ml-6 space-y-2.5 pb-6 pl-6 border-l border-black/10">
                                        {highlight.details.map((detail) => (
                                            <li
                                                key={detail}
                                                className="text-sm leading-6 text-black/45"
                                            >
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
