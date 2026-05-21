"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Magnetic from "./ui/Magnetic";

const sensors = [
  { top: "30%", left: "44%", label: "Forward AI", code: "RD-1418", side: "right", delay: 1.4 },
  { top: "20%", left: "62%", label: "GNSS · 4G", code: "Telemetry", side: "right", delay: 1.65 },
  { top: "48%", left: "70%", label: "Driver DMS", code: "rdDMS", side: "right", delay: 1.9 },
  { top: "58%", left: "34%", label: "Edge Inference", code: "On-Device", side: "left", delay: 2.15 },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Mouse-tracked 3D parallax — pinned to 0 when prefers-reduced-motion is set
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const cfg = { stiffness: 80, damping: 18, mass: 0.6 };
  const sx = useSpring(mx, cfg);
  const sy = useSpring(my, cfg);

  const rotY = useTransform(sx, [0, 1], reduce ? [0, 0] : [-5, 5]);
  const rotX = useTransform(sy, [0, 1], reduce ? [0, 0] : [5, -5]);
  const tx = useTransform(sx, [0, 1], reduce ? [0, 0] : [-12, 12]);
  const ty = useTransform(sy, [0, 1], reduce ? [0, 0] : [-8, 8]);
  const txBg = useTransform(sx, [0, 1], reduce ? [0, 0] : [20, -20]);
  const tyBg = useTransform(sy, [0, 1], reduce ? [0, 0] : [12, -12]);

  // Scroll parallax — collapsed under reduced motion
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scrollY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -80]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.8], reduce ? [1, 1] : [1, 0]);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }
  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <section
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative pt-32 lg:pt-36 pb-20 lg:pb-28 overflow-hidden"
    >
      {/* Ambient aurora — soft, no grid */}
      <motion.div
        aria-hidden
        style={{ x: txBg, y: tyBg }}
        className="aurora bg-[radial-gradient(ellipse_at_top_right,rgba(220,34,51,0.18),transparent_60%)]"
      />
      <motion.div
        aria-hidden
        style={{ x: useTransform(txBg, (v: number) => -v), y: useTransform(tyBg, (v: number) => -v) }}
        className="aurora bg-[radial-gradient(ellipse_at_bottom_left,rgba(220,34,51,0.10),transparent_55%)]"
      />

      <motion.div
        style={{ y: scrollY, opacity: scrollOpacity }}
        className="max-w-page mx-auto px-6 lg:px-10 relative perspective-2000"
      >
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-12 items-center">
          {/* === Left — copy === */}
          <div className="col-span-12 lg:col-span-5 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-rule bg-paper/60 backdrop-blur-md shadow-soft1"
            >
              <span className="relative w-1.5 h-1.5">
                <span className="absolute inset-0 rounded-full bg-rd blink" />
                <span className="absolute inset-0 rounded-full bg-rd animate-ping opacity-75" />
              </span>
              <span className="eyebrow !text-[10px]">
                Road Devil<span className="text-rd">®</span> · Live Production
              </span>
            </motion.div>

            <h1 className="display-xl text-[clamp(2rem,4.4vw,4.2rem)] text-ink mt-7 leading-[1.0]">
              {["A vertically", "integrated", null, "platform."].map((line, i) =>
                line === null ? (
                  // The italic phrase uses a fade-up reveal instead of overflow-hidden + slide,
                  // so it can wrap to a second line at narrow column widths without being clipped.
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.95, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="block display-it text-rd"
                  >
                    vehicle intelligence
                  </motion.span>
                ) : (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.95, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      className="block"
                    >
                      {line}
                    </motion.span>
                  </span>
                )
              )}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="mt-7 text-[1.0625rem] leading-[1.7] text-ink2 max-w-prose"
            >
              A proprietary vehicle safety and intelligence stack — combining hardware,
              firmware and AI within a single, controlled architecture.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-9 flex flex-wrap gap-3"
            >
              <Magnetic strength={0.25}>
                <a href="#contact" className="btn btn-primary">
                  Request a strategic discussion
                  <span className="arrow" aria-hidden>→</span>
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a href="#hardware" className="btn btn-ghost">
                  See hardware
                  <span className="arrow" aria-hidden>→</span>
                </a>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-12 grid grid-cols-3 gap-6 pt-7 border-t border-rule"
            >
              {[
                ["3", "Stack layers"],
                ["4", "Modules"],
                ["UK", "Engineered"],
              ].map(([k, v]) => (
                <div key={v}>
                  <div className="display-xl text-[1.7rem] text-ink leading-none tnum">{k}</div>
                  <div className="text-[10.5px] uppercase tracking-[0.2em] text-mute mt-2">{v}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* === Right — clean 3D truck stage === */}
          <div className="col-span-12 lg:col-span-7 relative">
            <motion.div
              style={{
                rotateX: rotX,
                rotateY: rotY,
                transformPerspective: 1400,
                transformStyle: "preserve-3d",
              }}
              className="relative will-change-transform"
            >
              {/* Soft circular pedestal — sits behind the truck */}
              <motion.div
                aria-hidden
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-[8%] bottom-[6%] aspect-[2.4/1] pointer-events-none"
                style={{ transform: "translateZ(-60px)" }}
              >
                <div className="absolute inset-0 rounded-[50%] bg-gradient-to-b from-rd/15 to-transparent blur-2xl" />
                <div className="absolute inset-x-[8%] bottom-0 h-[40%] rounded-[50%] bg-ink/15 blur-2xl" />
              </motion.div>

              {/* Radar rings — concentric, subtle */}
              <div
                aria-hidden
                className="absolute left-1/2 bottom-[14%] -translate-x-1/2 pointer-events-none"
                style={{ width: "65%", aspectRatio: "3 / 1", transform: "translateZ(-40px)" }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`absolute inset-0 rounded-[50%] border ${
                      i === 0 ? "radar-ping-a" : i === 1 ? "radar-ping-b" : "radar-ping-c"
                    }`}
                    style={{ borderColor: "rgba(220, 34, 51, 0.45)" }}
                  />
                ))}
              </div>

              {/* Truck — front-most */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ x: tx, y: ty, transform: "translateZ(40px)" }}
                className="relative"
              >
                <div className="relative aspect-[5/4] lg:aspect-[6/5] w-full float-y">
                  <Image
                    src="/hero-truck.png"
                    alt="Road Devil intelligence-equipped commercial vehicle"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain select-none drop-shadow-[0_30px_50px_rgba(10,10,9,0.18)]"
                  />
                </div>
              </motion.div>

              {/* Floating sensor callouts — desktop & tablet only */}
              <div
                className="absolute inset-0 pointer-events-none hidden md:block"
                style={{ transform: "translateZ(60px)" }}
              >
                {sensors.map((s) => (
                  <SensorCallout
                    key={s.label}
                    top={s.top}
                    left={s.left}
                    label={s.label}
                    code={s.code}
                    side={s.side as "left" | "right"}
                    delay={s.delay}
                  />
                ))}
              </div>
            </motion.div>

            {/* Mobile sensor legend — compact stacked list shown when floating callouts are hidden */}
            <div className="md:hidden mt-7 grid grid-cols-2 gap-2.5" aria-label="Sensor coverage">
              {sensors.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.55 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-2.5 rounded-lg border border-rule bg-paper/60 backdrop-blur-md px-3 py-2.5"
                >
                  <span className="relative w-2 h-2 mt-1.5 shrink-0" aria-hidden>
                    <span className="absolute inset-0 rounded-full bg-rd shadow-[0_0_6px_rgba(220,34,51,0.6)]" />
                    <span className="absolute -inset-1 rounded-full border border-rd/40" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-rd leading-none">
                      {s.code}
                    </div>
                    <div className="text-[12px] text-ink font-medium leading-tight mt-1">
                      {s.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Trade-mark footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-16 lg:mt-20 pt-6 border-t border-rule flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[12px] text-mute"
        >
          <span>
            Road Devil<span className="text-rd">®</span> · UK trade mark No.&nbsp;UK00004311142
          </span>
          <span className="font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.12em] sm:tracking-[0.18em] uppercase">
            Vehicle Camera Systems · Software Platforms · Licensing
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.8 }}
        style={{ opacity: scrollOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="font-mono text-[9.5px] tracking-[0.24em] uppercase text-mute">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="block w-px h-8 bg-gradient-to-b from-mute to-transparent"
        />
      </motion.div>
    </section>
  );
}

function SensorCallout({
  top,
  left,
  label,
  code,
  side,
  delay,
}: {
  top: string;
  left: string;
  label: string;
  code: string;
  side: "left" | "right";
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="absolute pointer-events-auto"
      style={{ top, left }}
    >
      <div className="relative" style={{ transform: "translate(-50%, -50%)" }}>
        <div className="relative w-3 h-3">
          <span className="absolute inset-0 rounded-full bg-rd shadow-[0_0_10px_rgba(220,34,51,0.7)]" />
          <span className="absolute inset-0.5 rounded-full bg-white opacity-90" />
          <span className="ping-ring ping-ring-a" />
          <span className="ping-ring ping-ring-b" />
        </div>

        <div
          className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-3 ${
            side === "right" ? "left-5" : "right-5 flex-row-reverse"
          }`}
        >
          <span
            className={`block h-px bg-gradient-to-r ${
              side === "right" ? "from-rd to-rule2" : "from-rule2 to-rd"
            }`}
            style={{ width: 32 }}
          />
          <motion.div
            initial={{ opacity: 0, x: side === "right" ? -8 : 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="glass rounded-lg px-3 py-2 whitespace-nowrap"
          >
            <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-rd leading-none">
              {code}
            </div>
            <div className="text-[12.5px] text-ink font-medium leading-tight mt-1">{label}</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
