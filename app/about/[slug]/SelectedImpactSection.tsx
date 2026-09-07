"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const IMPACT = [
    {
        keyword: "Automation",
        label: "recurring reports turned into automated workflows",
    },
    {
        keyword: "Data",
        label: "multiple sources cleaned, standardized and connected",
    },
    {
        keyword: "Tools",
        label: "internal dashboards, APIs and database systems",
    },
    {
        keyword: "Business",
        label: "data translated into useful answers for stakeholders",
    },
];

const LABEL_DELAY = 0;
const SENTENCE_DELAY = 0.13;
const FLORAL_DELAY = 0.3;
const FLORAL_DURATION = 0.65;
const CARDS_BASE_DELAY = FLORAL_DELAY + FLORAL_DURATION;
const CARD_STAGGER = 0.1;
const TITLE_EXTRA_DELAY = 0.08;
const DESCRIPTION_EXTRA_DELAY = 0.2;

// `useReducedMotion` returns null on the very first render (before it can
// read the media query) which Boolean()-coerces to false. If entrance
// animations only decide to skip themselves *conditionally* on that flag,
// a "hidden" inline style can get committed before the flag flips to true —
// and since nothing ever re-fires afterwards, the element stays stuck.
// Instead, every hidden/visible pair below collapses to identical values
// when reduced motion is on, so it doesn't matter when the flag resolves —
// there is simply nothing to animate.
function pair<T extends object>(reduceMotion: boolean, hidden: T, visible: T) {
    return { hidden: reduceMotion ? visible : hidden, visible };
}

function ImpactCard({
    item,
    index,
    parallaxY,
    reduceMotion,
}: {
    item: (typeof IMPACT)[number];
    index: number;
    parallaxY: ReturnType<typeof useTransform<number, number>>;
    reduceMotion: boolean;
}) {
    const cardDelay = CARDS_BASE_DELAY + index * CARD_STAGGER;

    // The panel is the single viewport-observed element. Its clipped
    // descendants (the title sits inside an overflow-hidden mask) can never
    // satisfy their own IntersectionObserver check — a clipped element's
    // intersection ratio is always 0 — so title/description read their
    // "visible" state from the panel via variant propagation instead of
    // running their own whileInView.
    const panel = pair(
        reduceMotion,
        { opacity: 0, y: 18, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1 }
    );

    const title = pair(reduceMotion, { y: "100%" }, { y: 0 });

    const description = pair(
        reduceMotion,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0 }
    );

    const panelVariants = {
        hidden: panel.hidden,
        visible: {
            ...panel.visible,
            transition: { delay: cardDelay, duration: 0.5, ease: EASE },
        },
    };

    const titleVariants = {
        hidden: title.hidden,
        visible: {
            ...title.visible,
            transition: {
                delay: cardDelay + TITLE_EXTRA_DELAY,
                duration: 0.5,
                ease: EASE,
            },
        },
    };

    const descriptionVariants = {
        hidden: description.hidden,
        visible: {
            ...description.visible,
            transition: {
                delay: cardDelay + DESCRIPTION_EXTRA_DELAY,
                duration: 0.4,
                ease: EASE,
            },
        },
    };

    return (
        <div className="group relative h-full px-2 py-8 sm:px-6">
            <motion.div
                className="bg-paper-bloom absolute inset-0 transition-transform duration-200 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
                style={reduceMotion ? undefined : { y: parallaxY }}
            />

            <motion.div
                className="relative z-10 inline-block"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={panelVariants}
                whileHover={reduceMotion ? undefined : { y: -5 }}
            >
                <div className="rounded-md bg-ivory/92 px-3 py-2.5 shadow-sm transition-shadow duration-200 group-hover:shadow-md">
                    <div className="overflow-hidden">
                        <motion.p
                            className="font-serif text-4xl leading-none text-ink transition-transform duration-200 group-hover:-translate-y-0.5"
                            variants={titleVariants}
                        >
                            {item.keyword}
                        </motion.p>
                    </div>

                    <motion.p
                        className="mt-4 font-mono text-[11px] leading-relaxed tracking-tight text-black/60 transition-colors duration-200 group-hover:text-black/80"
                        variants={descriptionVariants}
                    >
                        {item.label}
                    </motion.p>
                </div>
            </motion.div>
        </div>
    );
}

export default function SelectedImpactSection() {
    const stripRef = useRef<HTMLDivElement>(null);
    const reduceMotion = Boolean(useReducedMotion());

    const { scrollYProgress } = useScroll({
        target: stripRef,
        offset: ["start end", "end start"],
    });

    const parallaxY = useTransform(
        scrollYProgress,
        [0, 1],
        reduceMotion ? [0, 0] : [-4, 4]
    );

    const fadeUp = pair(reduceMotion, { opacity: 0, y: 10 }, { opacity: 1, y: 0 });
    const strip = pair(
        reduceMotion,
        { opacity: 0, x: 30, scale: 0.99 },
        { opacity: 1, x: 0, scale: 1 }
    );

    return (
        <section className="border-t border-black/10">
            <div className="mx-auto max-w-[1100px] px-6 py-24 md:px-10">
                <motion.p
                    className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy"
                    initial={fadeUp.hidden}
                    whileInView={fadeUp.visible}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: LABEL_DELAY, duration: 0.45, ease: EASE }}
                >
                    Selected impact
                </motion.p>

                <motion.p
                    className="mt-5 max-w-lg leading-7 text-black/50"
                    initial={fadeUp.hidden}
                    whileInView={fadeUp.visible}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: SENTENCE_DELAY, duration: 0.45, ease: EASE }}
                >
                    Less about big numbers. More about what genuinely got better.
                </motion.p>

                <motion.div
                    ref={stripRef}
                    className="mt-14 grid grid-cols-1 divide-y divide-black/10 border-y border-black/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4"
                    initial={strip.hidden}
                    whileInView={strip.visible}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                        delay: FLORAL_DELAY,
                        duration: FLORAL_DURATION,
                        ease: EASE,
                    }}
                >
                    {IMPACT.map((item, index) => (
                        <ImpactCard
                            key={item.keyword}
                            item={item}
                            index={index}
                            parallaxY={parallaxY}
                            reduceMotion={reduceMotion}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
