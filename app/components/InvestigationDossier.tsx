"use client";

import { useRef } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import CaseFileSheet from "./CaseFileSheet";
import EvidencePolaroid from "./EvidencePolaroid";
import InvestigationNote from "./InvestigationNote";
import EvidenceChart from "./EvidenceChart";

function Layer({
  className,
  parallax,
  children,
}: {
  className: string;
  parallax?: MotionValue<number>;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={parallax ? { y: parallax } : undefined}
    >
      {children}
    </motion.div>
  );
}

function DossierBase({
  className,
  parallax,
  clipPath,
  dropShadow = true,
}: {
  className: string;
  parallax?: MotionValue<number>;
  /** Reveals only a strip of the photo (same image, same position) so a
   * second copy can sit in front of another layer — faking real depth
   * (paper edges occluding a prop tucked "underneath" them) out of one
   * flat image. */
  clipPath?: string;
  dropShadow?: boolean;
}) {
  return (
    <Layer className={className} parallax={parallax}>
      <motion.div
        initial={{ opacity: 0, x: 36 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="h-full w-full"
        style={clipPath ? { clipPath } : undefined}
      >
        {/* the box's own aspect ratio only matches the photo's at lg+
            (fixed-size canvas there, sized so the two line up); on the
            portrait mobile layout the container is much taller/narrower
            than the photo, so object-contain would letterbox it down to
            a sliver — cover (anchored top, to keep the clip/tab in
            frame) fills the box completely instead. */}
        <Image
          src="/prop-dossier-base.png"
          alt=""
          width={1122}
          height={1402}
          className={`h-full w-full object-cover object-top lg:object-contain ${dropShadow ? "drop-shadow-[0_12px_18px_rgba(64,45,35,0.12)]" : ""}`}
        />
      </motion.div>
    </Layer>
  );
}

const FINGERPRINT_RINGS = Array.from({ length: 8 }, (_, i) => 26 + i * 8);

function FingerprintStamp({ className }: { className: string }) {
  return (
    <div className={`text-ink pointer-events-none absolute ${className}`} aria-hidden="true">
      <svg viewBox="0 0 220 260" className="h-full w-full">
        {FINGERPRINT_RINGS.map((r) => (
          <path
            key={r}
            d={`M ${110 - r} 130 A ${r} ${r * 1.25} 0 1 1 ${110 + r} 130`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

function MagnifyingGlass({
  className,
  delay,
  parallax,
}: {
  className: string;
  delay: number;
  parallax?: MotionValue<number>;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute hidden sm:block ${className}`}
      style={parallax ? { y: parallax } : undefined}
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, x: 30, rotate: -10 }
      }
      whileInView={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, x: 0, rotate: 10 }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.03, rotate: 6 }}
    >
      <Image
        src="/prop-magnifying-glass.png"
        alt=""
        width={1254}
        height={1254}
        className="h-full w-full object-contain drop-shadow-[0_12px_18px_rgba(64,45,35,0.12)]"
      />
    </motion.div>
  );
}

function DriedFlowers({
  className,
  delay,
  rotate = -6,
  parallax,
}: {
  className: string;
  delay: number;
  rotate?: number;
  parallax?: MotionValue<number>;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`absolute ${className}`}
      style={parallax ? { y: parallax } : undefined}
      initial={
        prefersReducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -18, rotate: rotate - 8 }
      }
      whileInView={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, rotate }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 130, damping: 16, delay }}
    >
      <Image
        src="/prop-dried-flowers.png"
        alt=""
        width={1086}
        height={1448}
        className="h-full w-full object-contain drop-shadow-[0_12px_18px_rgba(64,45,35,0.12)]"
      />
    </motion.div>
  );
}

export default function InvestigationDossier({
  onOpenCase,
}: {
  onOpenCase?: () => void;
}) {
  const dossierRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: dossierRef,
    offset: ["start end", "end start"],
  });

  const folderParallax = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const polaroidParallax = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const noteParallax = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const magnifierParallax = useTransform(scrollYProgress, [0, 1], [-5, 5]);
  const flowerParallax = useTransform(scrollYProgress, [0, 1], [-4, 4]);

  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const glowX = useSpring(pointerX, { stiffness: 50, damping: 22 });
  const glowY = useSpring(pointerY, { stiffness: 50, damping: 22 });
  const glowBackground = useMotionTemplate`radial-gradient(460px circle at ${glowX}% ${glowY}%, rgba(244,241,235,0.5), transparent 72%)`;

  function handlePointerMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - rect.left) / rect.width) * 100);
    pointerY.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <div
      ref={dossierRef}
      onMouseMove={handlePointerMove}
      className="relative mx-auto w-full max-w-[480px] min-h-[820px] sm:min-h-[960px] lg:max-w-[760px] lg:min-h-[798px] xl:max-w-[860px] xl:min-h-[908px] 2xl:max-w-[970px] 2xl:min-h-[1016px]"
    >
      {/* cursor-follow light, like light moving over paper */}
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-40 mix-blend-overlay"
          style={{ background: glowBackground }}
        />
      )}

      {/* scaled composition — the whole dossier is authored once at a
          fixed px size and rendered as one unit via transform: scale, so
          every fixed-px text size and offset stays in proportion as the
          canvas grows across breakpoints instead of drifting. At lg+ the
          canvas turns landscape (wide folder scene, reference-matched)
          instead of the portrait mobile stack. */}
      <div className="absolute top-0 left-0 h-full w-full lg:h-[1050px] lg:w-[1000px] lg:origin-top-left lg:scale-[0.76] xl:h-[1134px] xl:w-[1080px] xl:scale-[0.8] 2xl:h-[1239px] 2xl:w-[1180px] 2xl:scale-[0.82]">
      {/* everything except the main case sheet */}
      <div className="absolute inset-0">
        {/* folder + paper stack + paperclip + torn note + second card, all
            one photo. The canvas is sized generously enough (tall for its
            width) that the real CaseFileSheet's actual rendered height
            fits inside the photo's own illustrated page — so the note
            and chart below land precisely on that photo's own blank
            note/card art instead of floating beside it. */}
        <DossierBase
          className="-left-[6%] top-0 z-0 h-[92%] w-[110%] lg:left-[15%] lg:top-[2%] lg:h-[93%] lg:w-[78%]"
          parallax={prefersReducedMotion ? undefined : folderParallax}
        />

        {/* fingerprint watermark — subtle, grounds the folder as "evidence" */}
        <FingerprintStamp className="top-[58%] -left-[4%] z-[2] h-[26%] w-[20%] opacity-[0.12] lg:top-[68%] lg:left-[18%] lg:h-[16%] lg:w-[13%] lg:opacity-[0.12]" />

        {/* evidence polaroid — the "map" prop. Its right portion sits
            underneath the real "Financial Crime" sheet below (that
            sheet is z-20, well above the polaroid's z-5), so it reads
            as genuinely pulled out from between those pages rather than
            just laid beside them. No fake clipped-image trick needed
            here — real z-index stacking against real content. */}
        <Layer
          className="top-[14%] -left-[3%] z-[15] w-[24%] lg:top-[19%] lg:left-[21%] lg:z-[5] lg:w-[21%]"
          parallax={prefersReducedMotion ? undefined : polaroidParallax}
        >
          <EvidencePolaroid delay={0.42} rotate={-16} />
        </Layer>

        {/* handwritten investigative note — least essential on small
            screens. At lg+ it's plain content, no card of its own (the
            torn-note shape and tape are baked into DossierBase),
            aligned to sit on top of that photo's own blank note. */}
        <Layer
          className="pointer-events-none top-[80%] left-[14%] z-[25] hidden w-[38%] sm:block lg:top-[63.5%] lg:left-[19%] lg:z-[19] lg:w-[34%]"
          parallax={prefersReducedMotion ? undefined : noteParallax}
        >
          <InvestigationNote delay={0.5} rotate={-9} />
        </Layer>

        {/* anomaly evidence chart — least essential on small screens. At
            lg+ it's plain content, no card of its own (the second blank
            card and its tape are baked into DossierBase), aligned to
            sit on top of that photo's own blank card. */}
        <Layer className="right-[2%] bottom-[6%] z-[22] hidden w-[32%] sm:block lg:top-[69%] lg:left-[55%] lg:right-auto lg:bottom-auto lg:z-[18] lg:w-[33%] lg:px-[3%]">
          <EvidenceChart delay={0.62} rotate={2} />
        </Layer>

        {/* magnifying glass — pulled in close to the folder's right edge
            rather than floating off in empty space, still cropped by the
            viewport's own right edge */}
        <MagnifyingGlass
          className="top-[76%] -right-[2%] z-[35] w-[17%] lg:top-[22%] lg:right-[3%] lg:w-[22%]"
          delay={1.1}
          parallax={prefersReducedMotion ? undefined : magnifierParallax}
        />

        {/* dried flower stem — lower down, beside the torn note and its
            pink tape, rather than up by the folder */}
        <DriedFlowers
          className="hidden -top-[7%] -right-[1%] z-[32] w-[22%] sm:block lg:top-[50%] lg:-left-[4%] lg:right-auto lg:w-[26%]"
          rotate={-10}
          delay={1.0}
          parallax={prefersReducedMotion ? undefined : flowerParallax}
        />

      </div>

      {/* main case file sheet — aligned to sit right on top of
          DossierBase's own blank main-sheet area */}
      <Layer className="top-[2%] left-[16%] z-20 w-[80%] sm:left-[20%] sm:w-[74%] lg:top-[15%] lg:left-[34%] lg:w-[48%]">
        <CaseFileSheet delay={0.28} onOpen={onOpenCase} />
      </Layer>
      </div>
    </div>
  );
}
