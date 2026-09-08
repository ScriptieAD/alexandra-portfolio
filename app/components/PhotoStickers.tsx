"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type Sticker = {
    src: string;
    alt: string;
    width: number;
    /** Responsive size + position classes — tuned so every sticker stays
     * fully on-screen even at narrow (~375px) viewports, then flares out
     * with more offset and rotation as the viewport grows. */
    className: string;
    rotate: number;
    from: "left" | "right";
    travel: number;
    delay: number;
};

const stickers: Sticker[] = [
    {
        src: "/sticker-goose.png",
        alt: "Off to collect some data sticker",
        width: 190,
        className:
            "w-24 -left-3 -top-6 sm:w-32 sm:-left-6 sm:-top-8 md:w-40 md:-left-10 md:-top-11 lg:w-[190px] lg:-left-14 lg:-top-14",
        rotate: -8,
        from: "left",
        travel: 90,
        delay: 0.45,
    },
    {
        src: "/sticker-talk-data.png",
        alt: "Talk data to me sticker",
        width: 230,
        className:
            "w-28 -right-3 -top-3 sm:w-36 sm:-right-6 sm:top-4 md:w-44 md:-right-12 md:top-8 lg:w-[230px] lg:-right-20 lg:top-12",
        rotate: 7,
        from: "right",
        travel: 100,
        delay: 0.6,
    },
    {
        src: "/sticker-phantom.png",
        alt: "Normal distribution vs paranormal distribution sticker",
        width: 250,
        className:
            "w-20 top-[44%] -left-3 -translate-y-1/2 sm:w-28 sm:top-1/2 sm:-left-8 md:w-40 md:-left-16 lg:w-[250px] lg:-left-24",
        rotate: 13,
        from: "left",
        travel: 100,
        delay: 0.75,
    },
    {
        src: "/sticker-sql-syringe.png",
        alt: "SQL injection syringe sticker",
        width: 190,
        className:
            "w-20 top-[60%] -right-3 -translate-y-1/2 sm:w-28 sm:-right-6 md:w-32 md:-right-14 lg:w-[190px] lg:-right-20",
        rotate: 9,
        from: "right",
        travel: 100,
        delay: 0.9,
    },
    {
        src: "/sticker-socrates.png",
        alt: "All I know is that I know nothing sticker",
        width: 170,
        className:
            "w-20 -left-2 bottom-3 sm:w-28 sm:-left-6 sm:bottom-5 md:w-32 md:-left-10 lg:w-[170px] lg:-left-14",
        rotate: 8,
        from: "left",
        travel: 90,
        delay: 1.05,
    },
    {
        src: "/sticker-pandas.png",
        alt: "Import pandas sticker",
        width: 170,
        className:
            "w-20 -right-2 bottom-16 sm:w-28 sm:-right-6 sm:bottom-20 md:w-32 md:-right-10 md:bottom-24 lg:w-[170px] lg:-right-14",
        rotate: -7,
        from: "right",
        travel: 90,
        delay: 1.2,
    },
];

export default function PhotoStickers() {
    const prefersReducedMotion = useReducedMotion();

    return (
        <>
            {stickers.map((sticker) => {
                const startX = sticker.from === "left" ? -sticker.travel : sticker.travel;

                const initial = prefersReducedMotion
                    ? { opacity: 0 }
                    : {
                          opacity: 0,
                          x: startX,
                          rotate: sticker.rotate + (sticker.from === "left" ? -18 : 18),
                          scale: 0.9,
                      };

                const animate = prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 1, x: 0, rotate: sticker.rotate, scale: 1 };

                const transition = prefersReducedMotion
                    ? { duration: 0.4, delay: sticker.delay * 0.3 }
                    : {
                          type: "spring" as const,
                          stiffness: 190,
                          damping: 15,
                          mass: 0.7,
                          delay: sticker.delay,
                      };

                return (
                    <motion.div
                        key={sticker.src}
                        initial={initial}
                        animate={animate}
                        transition={transition}
                        style={prefersReducedMotion ? { rotate: sticker.rotate } : undefined}
                        className={`pointer-events-none absolute z-10 select-none drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] ${sticker.className}`}
                    >
                        <Image
                            src={sticker.src}
                            alt={sticker.alt}
                            width={sticker.width}
                            height={sticker.width}
                            className="h-auto w-full select-none"
                        />
                    </motion.div>
                );
            })}
        </>
    );
}
