"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import SectionHead from "./SectionHead";

type Screen = {
  code: string;
  label: string;
  src: string;
  alt: string;
  body: string;
};

const screens: Screen[] = [
  {
    code: "01",
    label: "Operational overview",
    src: "/detail-1.png",
    alt: "rdHub overview — welcome panel, KPI cards and live fleet map",
    body: "Welcome panel, KPI surfaces, and a live fleet map — the operator's first screen on shift. Devices online, organisations under management, miles protected and hours driven, all in one view.",
  },
  {
    code: "02",
    label: "Multi-channel event review",
    src: "/main.png",
    alt: "Multi-channel video review — six camera channels with accelerometer trace",
    body: "Six camera channels per event paired with accelerometer trace and incident notes. Evidence-grade composition for claims workflows and behavioural review.",
  },
  {
    code: "03",
    label: "Behavioural analytics",
    src: "/detail-2.png",
    alt: "Driver analytics — hours per day, harsh events, score and journey metrics",
    body: "Hours per day, harsh-event clusters, safety score and journey-level statistics — structured behavioural outputs keyed to risk patterns insurers actually use.",
  },
];

const features = [
  { code: "F.01", label: "Real-time fleet map" },
  { code: "F.02", label: "Multi-channel video review" },
  { code: "F.03", label: "Driver behaviour scoring" },
  { code: "F.04", label: "Harsh-event clustering" },
  { code: "F.05", label: "Insurer-grade exports" },
];

const stats: [string, string][] = [
  ["6+", "Camera channels"],
  ["<1s", "Real-time refresh"],
  ["24/7", "Live monitoring"],
  ["EU", "Multi-region map"],
];

const AUTO_ADVANCE_MS = 6500;

export default function Console() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % screens.length);
      setCycleKey((k) => k + 1);
    }, AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [reduce, paused, active]);

  function selectTab(i: number) {
    if (i === active) return;
    setActive(i);
    setCycleKey((k) => k + 1);
  }

  const current = screens[active];

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

        {/* === Showcase: image canvas (left) + step rail (right) === */}
        <div
          className="grid grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* --- Image canvas --- */}
          <div className="col-span-12 lg:col-span-8 relative">
            <div className="section-dark relative rounded-2xl overflow-hidden border border-rule2 shadow-soft3">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.src}
                  role="tabpanel"
                  id={`console-panel-${active}`}
                  aria-labelledby={`console-tab-${active}`}
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.012 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.992 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full aspect-[16/10]"
                >
                  <Image
                    src={current.src}
                    alt={current.alt}
                    fill
                    priority={active === 0}
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-contain object-center"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Hairline auto-advance progress at the bottom edge of the canvas */}
              {!reduce && !paused && (
                <motion.div
                  key={cycleKey}
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                  className="absolute bottom-0 left-0 right-0 h-px bg-rd origin-left"
                />
              )}
            </div>

            {/* Step counter floats below the canvas on the left */}
            <div className="mt-5 flex items-center gap-2.5 font-mono text-[10px] tracking-[0.22em] uppercase text-mute">
              <span className="tnum text-ink">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="block w-8 h-px bg-rule2" />
              <span className="tnum">
                {String(screens.length).padStart(2, "0")}
              </span>
              <span className="ml-3 text-mute2">rdHub surfaces</span>
            </div>
          </div>

          {/* --- Step rail --- */}
          <div
            className="col-span-12 lg:col-span-4 lg:pt-2"
            role="tablist"
            aria-label="Console surfaces"
          >
            <ul className="flex flex-col">
              {screens.map((s, i) => {
                const isActive = active === i;
                return (
                  <li key={s.code}>
                    <button
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`console-panel-${i}`}
                      id={`console-tab-${i}`}
                      onClick={() => selectTab(i)}
                      className="group relative block w-full text-left py-5 lg:py-6"
                    >
                      {/* Left accent rail — red when active, faint rule otherwise */}
                      <span
                        aria-hidden
                        className={`absolute left-0 top-0 bottom-0 w-px transition-colors duration-300 ${
                          isActive ? "bg-rd" : "bg-rule"
                        }`}
                      />
                      {/* Animated active marker — slightly thicker, scales down when inactive */}
                      <motion.span
                        aria-hidden
                        animate={{
                          scaleY: isActive ? 1 : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-rd origin-center"
                      />

                      <div className="pl-6">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-baseline gap-3">
                            <span
                              className={`font-mono text-[10px] tracking-[0.22em] uppercase transition-colors duration-300 ${
                                isActive ? "text-rd" : "text-mute"
                              }`}
                            >
                              {s.code}
                            </span>
                            <span
                              className={`display text-[1.05rem] lg:text-[1.15rem] leading-tight transition-colors duration-300 ${
                                isActive
                                  ? "text-ink"
                                  : "text-ink/55 group-hover:text-ink"
                              }`}
                            >
                              {s.label}
                            </span>
                          </div>
                          <motion.span
                            aria-hidden
                            animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -4 }}
                            transition={{ duration: 0.3 }}
                            className="text-rd font-mono text-[14px] leading-none"
                          >
                            →
                          </motion.span>
                        </div>

                        {/* Body copy — collapsible, only the active item shows it */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: isActive ? "auto" : 0,
                            opacity: isActive ? 1 : 0,
                          }}
                          transition={{
                            height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                            opacity: { duration: 0.3, delay: isActive ? 0.1 : 0 },
                          }}
                          className="overflow-hidden"
                        >
                          <p className="mt-3 text-[0.92rem] leading-[1.65] text-mute">
                            {s.body}
                          </p>
                        </motion.div>
                      </div>
                    </button>
                    {i < screens.length - 1 && (
                      <div className="ml-6 h-px bg-rule" aria-hidden />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* === Feature pills row === */}
        <div className="mt-16 lg:mt-20 flex flex-wrap items-center justify-center gap-2.5">
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
