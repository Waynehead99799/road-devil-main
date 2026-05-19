"use client";

import { motion } from "motion/react";
import Tilt from "./ui/Tilt";

const proofs = [
  {
    title: "Full-Stack IP Ownership",
    body: "Algorithms, firmware, software, and reference hardware designs — all engineered and owned by Road Devil.",
    icon: "◆",
  },
  {
    title: "Embedded Edge AI",
    body: "Inference operating directly on-device — reducing cloud dependency, lowering latency, supporting fleet-scale deployment.",
    icon: "◐",
  },
  {
    title: "Integration-Ready Data",
    body: "Structured behavioural outputs aligned with telematics, OEM, and insurance ecosystems already in use.",
    icon: "▦",
  },
  {
    title: "Commercial Risk Alignment",
    body: "Built around FNOR and FNOL workflows and behavioural risk patterns mapping to insurer-grade claims logic.",
    icon: "◇",
  },
];

export default function Proof() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-page mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-12 gap-x-6 lg:gap-x-12 mb-14 lg:mb-20"
        >
          <div className="col-span-12 lg:col-span-9">
            <span className="eyebrow">— Proof Points</span>
            <h2 className="display-xl text-[clamp(1.9rem,3.6vw,3rem)] text-ink mt-5 leading-[1.06]">
              A complete stack — from{" "}
              <span className="display-it text-rd">proprietary AI</span> to owned hardware IP —
              transforming video and driver data into actionable insight.
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 perspective-1400">
          {proofs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tilt max={6} className="h-full">
                <div className="card card-hover p-7 h-full group relative overflow-hidden">
                  {/* Hover gradient sweep */}
                  <div
                    aria-hidden
                    className="absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(360px circle at var(--x,50%) var(--y,0%), rgba(220,34,51,0.08), transparent 60%)",
                    }}
                  />

                  <div className="flex items-start justify-between mb-8 relative">
                    <span className="num-chip num-chip-red">0{i + 1}</span>
                    <span className="text-[20px] text-rule2 group-hover:text-rd transition-colors duration-500">
                      {p.icon}
                    </span>
                  </div>
                  <h3 className="display text-[1.2rem] lg:text-[1.3rem] text-ink mb-3 leading-tight relative">
                    {p.title}
                  </h3>
                  <p className="text-[0.93rem] leading-[1.6] text-mute relative">{p.body}</p>

                  {/* Bottom accent line — animates on hover */}
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
    </section>
  );
}
