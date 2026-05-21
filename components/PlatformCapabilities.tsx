"use client";

import { motion } from "motion/react";
import SectionHead from "./SectionHead";
import Tilt from "./ui/Tilt";

const modules = [
  {
    code: "01",
    name: "rdADAS & Behavioural Intelligence",
    body: "AI models tailored for commercial fleet safety use cases, producing structured behavioural outputs aligned with operational and insurance frameworks.",
  },
  {
    code: "02",
    name: "rdDMS (Driver Monitoring)",
    body: "Behavioural monitoring to identify distraction, fatigue, unsafe actions, and in-cab risk behaviours. Built to support preventative intervention, not just evidence capture.",
  },
  {
    code: "03",
    name: "FNOR / FNOL Modules",
    body: "FNOR (First Notification of Risk) identifies emerging risk patterns and enables proactive notifications and intervention. FNOL (First Notification of Loss) automates incident intelligence and evidence packaging for rapid review and claims workflows.",
  },
  {
    code: "04",
    name: "Integration Language",
    body: "API-led architecture designed to integrate cleanly within larger fleet and telematics ecosystems.",
  },
];

export default function PlatformCapabilities() {
  return (
    <section id="capabilities" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-page mx-auto px-6 lg:px-10">
        <SectionHead
          eyebrow="— Platform Capabilities"
          title={
            <>
              Road Devil&rsquo;s<span className="text-rd">®</span> core value —{" "}
              <span className="display-it text-rd">proprietary intelligence</span> and stack architecture.
            </>
          }
          lede="Designed to be licensed, white-labelled, or embedded within partner ecosystems."
        />

        {/* === Modules grid === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 perspective-1400">
          {modules.map((m, i) => (
            <motion.div
              key={m.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Tilt max={5}>
                <div className="card card-hover p-7 lg:p-8 h-full group relative overflow-hidden">
                  {/* Oversize number watermark */}
                  <div
                    aria-hidden
                    className="absolute -top-4 -right-2 text-[7rem] font-bold leading-none text-rule/40 select-none pointer-events-none"
                    style={{ fontVariationSettings: '"wdth" 100' }}
                  >
                    {m.code}
                  </div>

                  <div className="flex items-start justify-between mb-6 relative">
                    <span className="num-chip num-chip-red">{m.code}</span>
                    <span className="text-[10px] uppercase tracking-[0.18em] text-mute font-mono opacity-60 group-hover:text-rd group-hover:opacity-100 transition-all">
                      Module
                    </span>
                  </div>

                  <h3 className="display text-[1.25rem] lg:text-[1.4rem] text-ink mb-3 leading-tight relative">
                    {m.name}
                  </h3>
                  <p className="text-[0.93rem] leading-[1.65] text-mute relative">
                    {m.body}
                  </p>

                  {/* Hover bottom rule */}
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
