"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  glare?: boolean;
};

export default function Tilt({
  children,
  className = "",
  max = 8,
  scale = 1.012,
  glare = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const springCfg = { stiffness: 220, damping: 22, mass: 0.5 };
  const sx = useSpring(mx, springCfg);
  const sy = useSpring(my, springCfg);

  const rotX = useTransform(sy, [0, 1], [max, -max]);
  const rotY = useTransform(sx, [0, 1], [-max, max]);
  const glareX = useTransform(sx, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(sy, [0, 1], ["0%", "100%"]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale }}
      transition={{ scale: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      {glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-overlay transition-opacity duration-300 hover:opacity-100"
          style={{
            background: useTransform(
              [glareX, glareY] as any,
              ([x, y]: any) =>
                `radial-gradient(420px circle at ${x} ${y}, rgba(255,255,255,0.35), transparent 60%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
}
