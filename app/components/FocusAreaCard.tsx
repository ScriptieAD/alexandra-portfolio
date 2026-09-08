"use client";

import { motion, useReducedMotion } from "motion/react";

export type FocusAreaVariant = "dark" | "burgundy" | "ivory";

export type FocusArea = {
    number: string;
    title: string;
    description: string;
    variant: FocusAreaVariant;
    span: string;
    microLine: string;
    badge?: string;
};

const cardStyles: Record<FocusAreaVariant, string> = {
    dark: "bg-paper-dark text-white border border-black/10",
    burgundy: "bg-velvet text-white border border-burgundy",
    ivory: "bg-white/60 text-ink border border-black/10",
};

const SCATTER_POINTS: [number, number, number][] = [
    [4, 34, 2],
    [16, 20, 1.4],
    [26, 30, 1.8],
    [38, 8, 1.4],
    [48, 24, 2],
    [58, 4, 1.4],
];

function CornerDetail({ title, variant }: { title: string; variant: FocusAreaVariant }) {
    const base = "pointer-events-none absolute bottom-5 right-5 transition-opacity duration-300 select-none";

    if (title === "Data") {
        return (
            <svg
                viewBox="0 0 64 40"
                className={`${base} h-8 w-14 opacity-20 group-hover:opacity-40`}
                fill="none"
            >
                {SCATTER_POINTS.map(([x, y, r], i) => (
                    <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={r}
                        fill={variant === "dark" ? "#ffffff" : "currentColor"}
                    />
                ))}
            </svg>
        );
    }

    if (title === "Financial Crime") {
        return (
            <div className={`${base} flex w-14 flex-col items-end gap-1.5 opacity-25 group-hover:opacity-45`}>
                <span className="h-[3px] w-14 rounded-full bg-white" />
                <span className="h-[3px] w-9 rounded-full bg-white" />
                <span className="h-[3px] w-11 rounded-full bg-white" />
            </div>
        );
    }

    if (title === "Technology") {
        return (
            <div
                className={`${base} flex items-center gap-1 font-mono text-sm text-burgundy/50 opacity-60 group-hover:opacity-90`}
            >
                <span>{"{"}</span>
                <span className="animate-blink-caret inline-block h-3 w-[2px] bg-burgundy/60" />
                <span>{"}"}</span>
            </div>
        );
    }

    return (
        <span
            className={`${base} -rotate-12 font-serif text-3xl italic text-black/15 opacity-70 group-hover:opacity-100`}
        >
            ?
        </span>
    );
}

export default function FocusAreaCard({
    item,
    index,
}: {
    item: FocusArea;
    index: number;
}) {
    const isIvory = item.variant === "ivory";
    const prefersReducedMotion = useReducedMotion();

    return (
        <article
            className={`group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[24px] p-8 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl motion-reduce:transition-colors motion-reduce:hover:translate-y-0 motion-reduce:hover:shadow-none ${cardStyles[item.variant]}`}
        >
            <div className="flex items-start justify-between">
                <motion.span
                    className={`text-xs tracking-[0.2em] ${isIvory ? "text-burgundy" : "text-white/60"}`}
                    initial={{ opacity: 1 }}
                    whileInView={
                        prefersReducedMotion
                            ? undefined
                            : { opacity: [0.25, 1, 0.4, 1] }
                    }
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                >
                    {item.number}
                </motion.span>

                <div className="flex items-center gap-2">
                    {item.badge && (
                        <span className="rounded-full border border-white/25 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/80">
                            {item.badge}
                        </span>
                    )}

                    <div
                        className={`h-2 w-2 rounded-full transition ${
                            isIvory
                                ? "bg-burgundy/40 group-hover:bg-burgundy"
                                : "bg-white/30 group-hover:bg-white/70"
                        }`}
                    />
                </div>
            </div>

            <div>
                <h3 className="font-serif text-3xl">{item.title}</h3>

                <p
                    className={`mt-4 max-w-sm text-sm leading-7 ${
                        isIvory ? "text-black/60" : "text-white/75"
                    }`}
                >
                    {item.description}
                </p>

                <p
                    className={`mt-4 border-t pt-3 font-mono text-[11px] tracking-tight ${
                        isIvory
                            ? "border-black/10 text-black/50"
                            : "border-white/15 text-white/55"
                    }`}
                >
                    {item.microLine}
                </p>
            </div>

            <CornerDetail title={item.title} variant={item.variant} />
        </article>
    );
}
