"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { DossierEvidence } from "../projects-data";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CaseDossierVisual({
  evidence,
  active,
}: {
  evidence: DossierEvidence;
  active: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[620px]" style={{ aspectRatio: "4 / 3" }}>
      <Image
        aria-hidden="true"
        src="/projects/aml-transaction-monitoring/dossier/coffee-stain.png"
        alt=""
        width={1254}
        height={1254}
        className="pointer-events-none absolute -top-10 -left-12 h-[220px] w-[220px] opacity-40 mix-blend-multiply"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ transform: "translate(4%, 6%) rotate(4deg)" }}
      >
        <Image
          src={evidence.paper}
          alt=""
          fill
          sizes="(min-width: 1024px) 550px, 90vw"
          className="object-contain opacity-90 drop-shadow-[0_10px_18px_rgba(64,45,35,0.12)]"
        />
      </div>

      <div className="absolute inset-0 -rotate-1">
        <Image
          src={evidence.folder}
          alt={evidence.alt}
          fill
          sizes="(min-width: 1024px) 550px, 90vw"
          className="object-contain drop-shadow-[0_22px_38px_rgba(64,45,35,0.22)]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10, rotate: -9 }}
        animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ duration: 0.4, delay: 0.12, ease: EASE }}
        className="absolute bottom-[-1%] left-[-2%] w-[38%]"
      >
        <Image
          src={evidence.photo}
          alt=""
          width={1086}
          height={1448}
          className="h-auto w-full drop-shadow-[0_14px_26px_rgba(64,45,35,0.22)]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10, rotate: 8 }}
        animate={{ opacity: 1, y: 0, rotate: 5 }}
        transition={{ duration: 0.4, delay: 0.18, ease: EASE }}
        className="absolute top-[7%] right-[-1%] w-[58%]"
      >
        <Image
          src={evidence.note}
          alt=""
          width={1448}
          height={1086}
          className="h-auto w-full drop-shadow-[0_16px_28px_rgba(64,45,35,0.2)]"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 1.35, rotate: -20 }}
        animate={
          active
            ? { opacity: 1, scale: 1, rotate: -9 }
            : { opacity: 0, scale: 1.35, rotate: -20 }
        }
        transition={{ duration: 0.35, delay: 0.3, ease: "easeOut" }}
        className="absolute bottom-[-2%] right-[1%] w-[40%] mix-blend-multiply"
      >
        <Image src={evidence.stamp} alt="" width={2172} height={724} className="h-auto w-full" />
      </motion.div>
    </div>
  );
}
