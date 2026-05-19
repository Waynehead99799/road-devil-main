"use client";

import { motion } from "motion/react";
import Tilt from "./ui/Tilt";

const strengths = [
  "Full intellectual property ownership across algorithms, software, firmware, and reference hardware designs",
  "Hardware-agnostic architecture reducing margin and supply-chain constraints",
  "Regulatory alignment with evolving safety mandates",
  "Multiple commercial pathways enabling scalable deployment",
  "UK-based engineering and IP control supporting global expansion",
];

export default function Strategic() {
  return (
    <section
      id="strategic"
      className="relative py-24 lg:py-36 bg-section-alt border-y border-rule overflow-hidden"
    >
      <div className="max-w-page mx-auto px-6 lg:px-10">
        {/* Opening */}
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-10 mb-14 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-8"
          >
            <span className="eyebrow">— Strategic Value</span>
            <h2 className="display-xl text-[clamp(1.9rem,3.8vw,3rem)] text-ink mt-5 mb-7 leading-[1.06]">
              A ready-built stack — positioned at the intersection of{" "}
              <span className="display-it text-rd">AI, regulation, insurance, and mobility</span>.
            </h2>
            <p className="text-[1.0625rem] leading-[1.75] text-ink2 max-w-prose">
              Road Devil&rsquo;s® platform enables established fleet technology organisations
              to expand safety intelligence capabilities without rebuilding core infrastructure.
              Core platform development is complete and the company is positioned for structured
              commercial engagement.
            </p>
          </motion.div>
        </div>

        {/* Strengths grid */}
        <div className="mb-14 lg:mb-20">
          <div className="flex items-baseline justify-between mb-7">
            <span className="eyebrow">— Key Strengths</span>
            <span className="hidden md:block flex-1 h-px bg-rule mx-6" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
              5 pillars
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 perspective-1400">
            {strengths.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 18, rotateX: -6 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt max={5}>
                  <div className="card card-hover p-6 lg:p-7 h-full relative overflow-hidden group">
                    <span className="num-chip num-chip-red mb-5">0{i + 1}</span>
                    <p className="text-[0.95rem] leading-[1.6] text-ink2 mt-1">{s}</p>
                    <div
                      aria-hidden
                      className="absolute bottom-0 left-0 h-px bg-rd w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing statement — dark glass with 3D depth */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="perspective-1400"
        >
          <Tilt max={3} scale={1.005}>
            <div className="card card-dark p-9 lg:p-14 relative overflow-hidden">
              {/* Background glow */}
              <div
                aria-hidden
                className="absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full bg-rd/20 blur-[100px] pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute -bottom-24 -left-24 w-[320px] h-[320px] rounded-full bg-rd/10 blur-[100px] pointer-events-none"
              />

              <div className="relative">
                <span className="eyebrow !text-paper/50">— Closing Statement</span>
                <p className="display text-[clamp(1.3rem,2.4vw,2rem)] text-paper mt-5 leading-[1.3] max-w-4xl">
                  Road Devil<span className="text-rd">®</span> represents a compelling opportunity to integrate a ready-built vehicle
                  safety intelligence stack — positioned at the intersection of{" "}
                  <span className="display-it text-rd">AI, regulation, insurance, and mobility</span>{" "}
                  — into your existing ecosystem.
                </p>
              </div>
            </div>
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
}
