"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";

const LINE_ONE = "Skills, but with";
const LINE_TWO = "context";

const TYPE_START_DELAY = 0.15;
const TYPE_STAGGER = 0.045;
const PAUSE_BEFORE_BURST = 0.25;
const BURST_STAGGER = 0.028;

type Phase = "idle" | "typing" | "typed" | "burst";

export default function SkillsHeading() {
    const ref = useRef<HTMLHeadingElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
    const prefersReducedMotion = useReducedMotion();

    const [phase, setPhase] = useState<Phase>("idle");
    const startedRef = useRef(false);

    useEffect(() => {
        if (!isInView || startedRef.current) return;
        startedRef.current = true;

        if (prefersReducedMotion) {
            setPhase("burst");
            return;
        }

        setPhase("typing");

        const typingDuration = TYPE_START_DELAY + LINE_ONE.length * TYPE_STAGGER + 0.25;

        const typedTimer = setTimeout(() => setPhase("typed"), typingDuration * 1000);
        const burstTimer = setTimeout(
            () => setPhase("burst"),
            (typingDuration + PAUSE_BEFORE_BURST) * 1000
        );

        return () => {
            clearTimeout(typedTimer);
            clearTimeout(burstTimer);
        };
    }, [isInView, prefersReducedMotion]);

    const started = phase !== "idle";
    const showCursor = phase === "typing";
    const burstDone = phase === "burst";

    return (
        <h2 ref={ref} className="mt-5 font-serif text-5xl leading-[1.05]">
            <span className="inline-flex flex-wrap">
                {LINE_ONE.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        initial={prefersReducedMotion ? false : { opacity: 0 }}
                        animate={{ opacity: started ? 1 : 0 }}
                        transition={{
                            duration: 0.01,
                            delay: prefersReducedMotion ? 0 : TYPE_START_DELAY + i * TYPE_STAGGER,
                        }}
                    >
                        {char === " " ? " " : char}
                    </motion.span>
                ))}

                <AnimatePresence>
                    {showCursor && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.2 } }}
                            className="animate-blink-caret ml-1 inline-block h-[0.85em] w-[2px] translate-y-[0.1em] bg-burgundy align-middle"
                        />
                    )}
                </AnimatePresence>
            </span>

            <br />

            <span className="inline-flex text-burgundy">
                {LINE_TWO.split("").map((char, i) => (
                    <motion.span
                        key={i}
                        initial={
                            prefersReducedMotion
                                ? false
                                : { opacity: 0, scale: 0.3, y: 10, letterSpacing: "0.35em" }
                        }
                        animate={
                            burstDone
                                ? { opacity: 1, scale: 1, y: 0, letterSpacing: "0em" }
                                : { opacity: 0, scale: 0.3, y: 10, letterSpacing: "0.35em" }
                        }
                        transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 13,
                            mass: 0.6,
                            delay: prefersReducedMotion ? 0 : i * BURST_STAGGER,
                        }}
                        className="inline-block"
                    >
                        {char}
                    </motion.span>
                ))}
            </span>
        </h2>
    );
}
