"use client";

import Image from "next/image";
import { useRef, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import SectionHead from "./SectionHead";

const features = [
  { code: "F.01", label: "Real-time fleet map" },
  { code: "F.02", label: "Multi-channel video review" },
  { code: "F.03", label: "Driver behaviour scoring" },
  { code: "F.04", label: "Harsh-event clustering" },
  { code: "F.05", label: "Insurer-grade exports" },
];

const stats = [
  ["6+", "Camera channels"],
  ["<1s", "Real-time refresh"],
  ["24/7", "Live monitoring"],
  ["EU", "Multi-region map"],
];

export default function Console() {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const cfg = { stiffness: 70, damping: 18, mass: 0.6 };
  const sx = useSpring(mx, cfg);
  const sy = useSpring(my, cfg);

  const rotY = useTransform(sx, [0, 1], [-4, 4]);
  const rotX = useTransform(sy, [0, 1], [3, -3]);

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
    <section id="console" className="relative py-24 lg:py-36 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 20%, rgba(220,34,51,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="max-w-page mx-auto px-6 lg:px-10 relative">
        <SectionHead
          eyebrow="— rdHub · The Console"
          title={
            <>
              Production console.{" "}
              <span className="display-it text-rd">Live</span> now.
            </>
          }
          lede="Real-time fleet visibility, multi-channel video review, and behavioural scoring — a unified operational console, deployed in production today."
        />

        {/* === 3-screen 3D bento === */}
        <div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="relative perspective-2000"
        >
          <motion.div
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            className="grid grid-cols-12 gap-4 lg:gap-5 relative preserve-3d"
          >
            {/* MAIN DASHBOARD — large left tile */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: "translateZ(20px)" }}
              className="col-span-12 lg:col-span-8 row-span-2 preserve-3d"
            >
              <BrowserScreen
                src="/console-main.png"
                alt="rdHub overview — fleet stats and live map"
                url="rdhub.road-devil.com/admin/dashboard"
                label="Dashboard"
                aspect="aspect-[16/9]"
                priority
              />
            </motion.div>

            {/* VIDEO REVIEW — top right */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateY: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: "translateZ(10px)" }}
              className="col-span-12 sm:col-span-6 lg:col-span-4 preserve-3d"
            >
              <BrowserScreen
                src="/console-video.png"
                alt="Multi-channel video review — main, in-cab and side cameras"
                url="rdhub / event-review"
                label="Event Review"
                aspect="aspect-[16/9]"
              />
            </motion.div>

            {/* DRIVER ANALYTICS — bottom right */}
            <motion.div
              initial={{ opacity: 0, y: 30, rotateY: 10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: "translateZ(10px)" }}
              className="col-span-12 sm:col-span-6 lg:col-span-4 preserve-3d"
            >
              <BrowserScreen
                src="/console-driver.png"
                alt="Live fleet tracking — 3D map view with vehicle markers"
                url="rdhub / live-map"
                label="Live Tracking"
                aspect="aspect-[16/9]"
              />
            </motion.div>

            {/* Floating feature chip — top-right of main */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: "translateZ(60px)" }}
              className="absolute hidden lg:flex left-[42%] -top-3 glass rounded-full px-3.5 py-1.5 items-center gap-2 z-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rd blink" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink">
                Live · 2 vehicles tracked
              </span>
            </motion.div>

            {/* Floating chip — bottom-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: "translateZ(60px)" }}
              className="absolute hidden lg:flex bottom-4 left-6 glass rounded-full px-3.5 py-1.5 items-center gap-2 z-10"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-rd">
                ✦ rdADAS
              </span>
              <span className="w-px h-3 bg-rule2" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-mute">
                Active
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* === Feature pills row === */}
        <div className="mt-14 lg:mt-16 flex flex-wrap items-center justify-center gap-2.5">
          {features.map((f, i) => (
            <motion.div
              key={f.code}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ scale: 1.04, y: -2 }}
              className="inline-flex items-center gap-2 pl-2.5 pr-4 py-1.5 rounded-full border border-rule bg-paper/60 backdrop-blur-md hover:border-rd hover:shadow-soft1 transition-all cursor-default"
            >
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-rd bg-rd-soft px-1.5 py-0.5 rounded">
                {f.code}
              </span>
              <span className="text-[13px] text-ink2">{f.label}</span>
            </motion.div>
          ))}
        </div>

        {/* === Stats strip === */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 lg:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px bg-rule rounded-2xl overflow-hidden border border-rule shadow-soft1"
        >
          {stats.map(([k, v]) => (
            <div key={v} className="bg-paper/80 backdrop-blur p-6 lg:p-7">
              <div className="display-xl text-[1.7rem] lg:text-[2rem] text-ink leading-none tnum">
                {k}
              </div>
              <div className="text-[10.5px] uppercase tracking-[0.2em] text-mute mt-3 font-mono">
                {v}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BrowserScreen({
  src,
  alt,
  url,
  label,
  aspect,
  priority,
}: {
  src: string;
  alt: string;
  url: string;
  label: string;
  aspect: string;
  priority?: boolean;
}) {
  return (
    <div className="section-dark relative h-full rounded-2xl overflow-hidden border border-rule2 shadow-soft3 group">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-b from-[#1a1a17] to-[#0e0e0c] border-b border-paper/8">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        <div className="flex-1 flex justify-center min-w-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-paper/8 max-w-full">
            <span className="w-1 h-1 rounded-full bg-rd blink" />
            <span className="font-mono text-[10px] tracking-[0.06em] text-paper/55 truncate">
              {url}
            </span>
          </div>
        </div>
        <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-paper/40 hidden md:inline">
          {label}
        </span>
      </div>

      {/* Screenshot — object-contain so any aspect screenshot fits without cropping */}
      <div className={`relative w-full ${aspect} bg-[#0e0e0c]`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-contain object-center transition-transform duration-700 group-hover:scale-[1.015]"
        />

        {/* Reflective shine */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.15) 100%)",
          }}
        />
      </div>
    </div>
  );
}
