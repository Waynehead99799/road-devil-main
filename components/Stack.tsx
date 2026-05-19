"use client";

import { motion } from "motion/react";
import { useState } from "react";
import SectionHead from "./SectionHead";
import Tilt from "./ui/Tilt";

const layers = [
  {
    code: "L1",
    name: "Hardware Layer",
    body: "Proprietary device architecture engineered for commercial vehicle deployment. Maintains architectural control while supporting integration flexibility.",
    color: "#DC2233",
    bg: "linear-gradient(135deg, #ffffff, #f6f5f1)",
    isDark: false,
  },
  {
    code: "L2",
    name: "Data Layer",
    body: "Structured data architecture enabling controlled ingestion into telematics systems, OEM software environments and insurance analytics platforms.",
    color: "#DC2233",
    bg: "linear-gradient(135deg, #1f1f1c, #0a0a09)",
    isDark: true,
  },
  {
    code: "L3",
    name: "Edge Processing Layer",
    body: "Embedded inference models operating directly on-device, reducing cloud dependency and supporting scalable fleet deployment.",
    color: "#ffffff",
    bg: "linear-gradient(135deg, #DC2233, #A8141F)",
    isDark: true,
  },
];

const outcomes = [
  { title: "Earlier intervention", body: "Measurable risk reduction across active fleets." },
  { title: "Defensible claims", body: "Faster, evidence-backed FNOL and FNOR workflows." },
  { title: "Cleaner integration", body: "Drop-in fit for existing fleet and insurance ecosystems." },
  { title: "Compliance alignment", body: "Deployment in evolving commercial vehicle environments." },
];

export default function Stack() {
  // Default active = top of stack (L1)
  const [active, setActive] = useState(0);

  return (
    <section
      id="stack"
      className="relative py-24 lg:py-36 bg-section-alt border-y border-rule overflow-hidden"
    >
      <div className="max-w-page mx-auto px-6 lg:px-10">
        <SectionHead
          eyebrow="— The Stack"
          title={
            <>
              <span className="display-it text-rd">Three-layer</span> architecture.
            </>
          }
          lede="A modular hardware-intelligence stack that unifies behavioural AI, real-time risk notification, and edge-based data capture into a single, scalable architecture."
        />

        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-12 items-center">
          {/* === 3D stack visualization === */}
          <div className="col-span-12 lg:col-span-7 relative perspective-2000">
            <motion.div
              initial={{ rotateX: -15, rotateY: -14, opacity: 0 }}
              whileInView={{ rotateX: -8, rotateY: -14, opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative preserve-3d w-full aspect-[5/4] flex items-center justify-center"
            >
              {/* Floor glow */}
              <div
                aria-hidden
                className="absolute left-1/2 -translate-x-1/2 bottom-[6%] w-[70%] h-12 rounded-[50%] bg-rd/25 blur-3xl"
              />

              {/* 3 stacked tiles — z-position responds to `active` */}
              {layers.map((l, i) => {
                const distance = i - active;
                // active layer floats to front-top, others fan out behind/below
                const z = -Math.abs(distance) * 90 + (i === active ? 60 : 0);
                const y = distance * 60;
                const x = distance * 22;
                const scale = i === active ? 1 : 0.96 - Math.abs(distance) * 0.02;
                const opacity = i === active ? 1 : 0.78 - Math.abs(distance) * 0.06;

                return (
                  <motion.div
                    key={l.code}
                    onHoverStart={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    tabIndex={0}
                    animate={{ x, y, z, scale, opacity }}
                    transition={{
                      type: "spring",
                      stiffness: 110,
                      damping: 18,
                      mass: 0.6,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      zIndex: 10 - Math.abs(distance),
                    }}
                    className="absolute w-[72%] h-[44%] cursor-pointer focus:outline-none"
                  >
                    <div
                      className={`relative w-full h-full rounded-2xl overflow-hidden border shadow-soft3 ${
                        i === active ? "border-rd/40" : "border-rule"
                      }`}
                      style={{ background: l.bg }}
                    >
                      {/* Inner content */}
                      <div className="absolute inset-0 p-6 lg:p-7 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                          <span
                            className={`font-mono text-[10.5px] tracking-[0.22em] uppercase ${
                              l.isDark ? "text-paper/55" : "text-mute"
                            }`}
                          >
                            Layer {l.code}
                          </span>
                          <motion.span
                            animate={{
                              scale: i === active ? 1.4 : 1,
                              boxShadow:
                                i === active
                                  ? `0 0 16px ${l.color}`
                                  : `0 0 6px ${l.color}`,
                            }}
                            transition={{ duration: 0.4 }}
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ background: l.color }}
                          />
                        </div>

                        <div>
                          <div
                            className={`display text-[1.25rem] lg:text-[1.4rem] leading-tight ${
                              l.isDark ? "text-paper" : "text-ink"
                            }`}
                          >
                            {l.name}
                          </div>
                          {i === active && (
                            <motion.div
                              initial={{ opacity: 0, y: 4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.4, delay: 0.15 }}
                              className={`mt-2 font-mono text-[10px] tracking-[0.2em] uppercase ${
                                l.isDark ? "text-rd" : "text-rd"
                              }`}
                            >
                              ● Active
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Decorative grid */}
                      <div
                        aria-hidden
                        className="absolute inset-0 opacity-[0.07] pointer-events-none"
                        style={{
                          backgroundImage: l.isDark
                            ? "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)"
                            : "linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)",
                          backgroundSize: "24px 24px",
                        }}
                      />

                      {/* Edge highlight when active */}
                      {i === active && (
                        <motion.div
                          aria-hidden
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 rounded-2xl pointer-events-none"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(220,34,51,0.12), transparent 60%)",
                          }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Layer descriptions — synced with stack */}
          <div className="col-span-12 lg:col-span-5 space-y-3">
            {layers.map((l, i) => (
              <motion.div
                key={l.code}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <Tilt max={4}>
                  <div
                    className={`card p-5 lg:p-6 group cursor-pointer transition-all duration-500 ${
                      active === i
                        ? "border-rd/60 shadow-red bg-paper"
                        : "card-hover"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`num-chip shrink-0 mt-0.5 transition-colors duration-500 ${
                          active === i ? "num-chip-red" : ""
                        }`}
                      >
                        {l.code}
                      </span>
                      <div className="flex-1">
                        <h3
                          className={`display text-[1.1rem] mb-1.5 leading-tight transition-colors duration-500 ${
                            active === i ? "text-rd" : "text-ink"
                          }`}
                        >
                          {l.name}
                        </h3>
                        <p className="text-[0.9rem] leading-[1.6] text-mute">{l.body}</p>
                      </div>
                      <motion.span
                        animate={{ opacity: active === i ? 1 : 0, x: active === i ? 0 : -4 }}
                        transition={{ duration: 0.3 }}
                        className="text-rd font-mono text-[14px] mt-1"
                      >
                        →
                      </motion.span>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Outcomes */}
        <div className="mt-20 lg:mt-28">
          <div className="flex items-baseline justify-between mb-8">
            <span className="eyebrow">— Outcomes</span>
            <span className="hidden md:block flex-1 h-px bg-rule mx-6" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
              4 outcomes
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 perspective-1400">
            {outcomes.map((o, i) => (
              <motion.div
                key={o.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt max={5}>
                  <div className="card card-hover p-6 h-full">
                    <span className="num-chip num-chip-red mb-5">0{i + 1}</span>
                    <h4 className="display text-[1.05rem] text-ink mb-2 leading-tight mt-1">
                      {o.title}
                    </h4>
                    <p className="text-[0.875rem] leading-[1.55] text-mute">{o.body}</p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
