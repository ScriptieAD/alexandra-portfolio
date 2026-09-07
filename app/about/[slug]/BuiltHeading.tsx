"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;
const STAMP_EASE = [0.16, 1, 0.3, 1] as const;

// See SelectedImpactSection for why hidden/visible collapse to the same
// values under reduced motion instead of conditionally omitting the
// animation — it avoids a race with useReducedMotion() resolving after
// the first paint.
function pair<T extends object>(reduceMotion: boolean, hidden: T, visible: T) {
    return { hidden: reduceMotion ? visible : hidden, visible };
}

export default function BuiltHeading() {
    const reduceMotion = Boolean(useReducedMotion());

    const label = pair(reduceMotion, { opacity: 0, y: 10 }, { opacity: 1, y: 0 });
    const firstPhrase = pair(reduceMotion, { opacity: 0, y: 10 }, { opacity: 1, y: 0 });
    const stamp = pair(
        reduceMotion,
        { opacity: 0, scale: 1.06, rotate: -1, y: 8 },
        { opacity: 1, scale: 1, rotate: 0, y: 0 }
    );

    return (
        <>
            <motion.p
                className="text-xs font-semibold uppercase tracking-[0.25em] text-burgundy"
                initial={label.hidden}
                whileInView={label.visible}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: EASE }}
            >
                Things I actually built
            </motion.p>

            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.05] sm:text-5xl">
                <motion.span
                    className="inline-block"
                    initial={firstPhrase.hidden}
                    whileInView={firstPhrase.visible}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: 0.15, duration: 0.45, ease: EASE }}
                >
                    Not case studies. Just{" "}
                </motion.span>

                <motion.span
                    className="inline-block"
                    initial={stamp.hidden}
                    whileInView={stamp.visible}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: 0.42, duration: 0.35, ease: STAMP_EASE }}
                >
                    what got shipped.
                </motion.span>
            </h2>
        </>
    );
}
