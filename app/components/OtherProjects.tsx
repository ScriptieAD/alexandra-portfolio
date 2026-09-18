"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { caseFiles } from "../projects-data";

export default function OtherProjects({ currentHref }: { currentHref: string }) {
  const prefersReducedMotion = useReducedMotion();
  const others = caseFiles.filter((item) => item.href !== currentHref);

  return (
    <div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.95 }}
        className="font-mono text-[10px] tracking-[0.28em] text-black/40 uppercase"
      >
        Other case files
      </motion.p>

      <div className="mt-4 flex flex-col gap-3">
        {others.map((item, index) => (
          <motion.div
            key={item.id}
            initial={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 28 }
            }
            whileInView={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }
            }
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.55,
              delay: 1.05 + index * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={item.href}
              className="group bg-paper-card shadow-paper-xs hover:border-burgundy/30 hover:shadow-paper-md flex items-center justify-between gap-4 rounded-[3px] border border-black/10 px-4 py-3.5 transition-all duration-300"
            >
              <div className="min-w-0">
                <p className="font-mono text-[9px] tracking-[0.16em] text-black/40 uppercase">
                  Case {item.id} · {item.category}
                </p>
                <p className="mt-1 truncate font-serif text-lg leading-tight">
                  {item.title}
                </p>
              </div>

              <ArrowUpRight
                aria-hidden="true"
                className="text-burgundy/70 h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
