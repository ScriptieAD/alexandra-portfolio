"use client";

import Image from "next/image";
import { motion } from "motion/react";

type Sticker = {
    src: string;
    alt: string;
    width: number;
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
        className: "-left-10 -top-10 md:-left-16 md:-top-14",
        rotate: -10,
        from: "left",
        travel: 260,
        delay: 0.45,
    },
    {
        src: "/sticker-talk-data.png",
        alt: "Talk data to me sticker",
        width: 230,
        className: "-right-10 top-12 md:-right-20",
        rotate: 8,
        from: "right",
        travel: 300,
        delay: 0.65,
    },
    {
        src: "/sticker-phantom.png",
        alt: "Normal distribution vs paranormal distribution sticker",
        width: 250,
        className: "top-1/2 -left-16 -translate-y-1/2 md:-left-24",
        rotate: 16,
        from: "left",
        travel: 280,
        delay: 0.85,
    },
    {
        src: "/sticker-sql-syringe.png",
        alt: "SQL injection syringe sticker",
        width: 190,
        className: "top-[58%] -right-12 -translate-y-1/2 md:-right-20",
        rotate: 10,
        from: "right",
        travel: 280,
        delay: 1.05,
    },
    {
        src: "/sticker-socrates.png",
        alt: "All I know is that I know nothing sticker",
        width: 170,
        className: "-left-8 bottom-6 md:-left-14",
        rotate: 9,
        from: "left",
        travel: 280,
        delay: 1.25,
    },
    {
        src: "/sticker-pandas.png",
        alt: "Import pandas sticker",
        width: 170,
        className: "-right-8 bottom-28 md:-right-14",
        rotate: -8,
        from: "right",
        travel: 260,
        delay: 1.45,
    },
];

export default function PhotoStickers() {
    return (
        <>
            {stickers.map((sticker) => {
                const startX = sticker.from === "left" ? -sticker.travel : sticker.travel;

                return (
                    <motion.div
                        key={sticker.src}
                        initial={{
                            opacity: 0,
                            x: startX,
                            rotate: sticker.rotate + (sticker.from === "left" ? -25 : 25),
                            scale: 0.85,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            rotate: sticker.rotate,
                            scale: 1,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 180,
                            damping: 13,
                            mass: 0.8,
                            delay: sticker.delay,
                        }}
                        className={`absolute z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.2)] ${sticker.className}`}
                        style={{ width: sticker.width }}
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
