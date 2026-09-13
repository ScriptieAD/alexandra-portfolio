"use client";

import { useId } from "react";
import { motion } from "motion/react";

export type NetworkNode = {
  id: string;
  x: number;
  y: number;
  /** Only nodes worth calling out should carry a label — keeps dense graphs legible. */
  label?: string;
  role?: "default" | "highlight" | "focus" | "muted";
};

export type NetworkEdge = {
  from: string;
  to: string;
  highlighted?: boolean;
  /** Perpendicular bow offset (svg units) — lets reciprocal edges between the same two nodes stay visually distinct. */
  curve?: number;
};

const ROLE_RADIUS: Record<NonNullable<NetworkNode["role"]>, number> = {
  default: 4,
  highlight: 5.5,
  focus: 8,
  muted: 3.5,
};

const ROLE_OPACITY: Record<NonNullable<NetworkNode["role"]>, number> = {
  default: 0.55,
  highlight: 1,
  focus: 1,
  muted: 0.22,
};

export default function NetworkDiagram({
  nodes,
  edges,
  viewBox = "0 0 300 200",
  delay = 0,
  className = "",
  ariaLabel = "Transaction network diagram",
}: {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  viewBox?: string;
  delay?: number;
  className?: string;
  ariaLabel?: string;
}) {
  const uid = useId();
  const arrowId = `nd-arrow-${uid}`;
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <motion.svg
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      viewBox={viewBox}
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <defs>
        <marker
          id={arrowId}
          viewBox="0 0 10 10"
          refX={8}
          refY={5}
          markerWidth={4.5}
          markerHeight={4.5}
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#8f2138" fillOpacity={0.55} />
        </marker>
      </defs>

      {edges.map((edge, i) => {
        const a = byId[edge.from];
        const b = byId[edge.to];
        if (!a || !b) return null;

        const mx = (a.x + b.x) / 2;
        const my = (a.y + b.y) / 2;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const len = Math.hypot(dx, dy) || 1;
        const offset = edge.curve ?? 0;
        const cx = mx + (-dy / len) * offset;
        const cy = my + (dx / len) * offset;

        return (
          <motion.path
            key={`${edge.from}-${edge.to}-${i}`}
            d={`M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`}
            fill="none"
            stroke="#8f2138"
            strokeOpacity={edge.highlighted ? 0.6 : 0.28}
            strokeWidth={edge.highlighted ? 1.6 : 1}
            markerEnd={`url(#${arrowId})`}
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              show: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.55, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            <title>{`${edge.from} → ${edge.to}`}</title>
          </motion.path>
        );
      })}

      {nodes.map((node, i) => {
        const role = node.role ?? "default";
        const r = ROLE_RADIUS[role];
        const nodeDelay = delay + 0.15 + i * 0.03;
        return (
          <g key={node.id}>
            {role === "focus" && (
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={r + 6}
                fill="none"
                stroke="#8f2138"
                strokeOpacity={0.3}
                strokeWidth={1}
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  show: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: nodeDelay, ease: [0.22, 1, 0.36, 1] } },
                }}
              />
            )}

            <motion.circle
              cx={node.x}
              cy={node.y}
              r={r}
              fill={role === "muted" ? "#171717" : "#8f2138"}
              fillOpacity={role === "default" || role === "muted" ? ROLE_OPACITY[role] : 1}
              stroke={role === "focus" ? "#faf8f4" : "none"}
              strokeWidth={role === "focus" ? 1.5 : 0}
              variants={{
                hidden: { scale: 0, opacity: 0 },
                show: { scale: 1, opacity: 1, transition: { duration: 0.4, delay: nodeDelay, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <title>{node.label ?? node.id}</title>
            </motion.circle>

            {node.label && (
              <motion.text
                x={node.x}
                y={node.y - r - 6}
                textAnchor="middle"
                fontSize={7.5}
                className="font-mono uppercase"
                fill={role === "focus" || role === "highlight" ? "#8f2138" : "#171717"}
                fillOpacity={0.75}
                variants={{
                  hidden: { opacity: 0 },
                  show: { opacity: 1, transition: { duration: 0.4, delay: nodeDelay + 0.15 } },
                }}
              >
                {node.label}
              </motion.text>
            )}
          </g>
        );
      })}
    </motion.svg>
  );
}
