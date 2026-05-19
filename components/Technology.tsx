"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
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
    name: "rdDMS — Driver Monitoring",
    body: "Behavioural monitoring to identify distraction, fatigue, unsafe actions, and in-cab risk behaviours. Built to support preventative intervention.",
  },
  {
    code: "03",
    name: "FNOR / FNOL Modules",
    body: "FNOR identifies emerging risk patterns and enables proactive notifications. FNOL automates incident intelligence and evidence packaging for rapid claims workflows.",
  },
  {
    code: "04",
    name: "Integration Language",
    body: "API-led architecture designed to integrate cleanly within larger fleet and telematics ecosystems.",
  },
];

export default function Technology() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotX = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -10]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="technology" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-page mx-auto px-6 lg:px-10">
        <SectionHead
          eyebrow="— Platform Capabilities"
          title={
            <>
              Core value resides in{" "}
              <span className="display-it text-rd">proprietary intelligence</span> and stack architecture.
            </>
          }
          lede="Designed to be licensed, white-labelled, or embedded within partner ecosystems. Four modules running on a unified console."
        />

        {/* === 3D scroll-tilted dashboard === */}
        <div ref={ref} className="relative perspective-2000 mb-16 lg:mb-24">
          <motion.div
            style={{ rotateX: rotX, y }}
            className="relative preserve-3d"
          >
            <div className="relative card overflow-hidden bg-paper shadow-soft3 border-rule2">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/technology-dashboard.png"
                  alt="rdHub platform — Live Map, Overview dashboard, and Event Review"
                  fill
                  sizes="(max-width: 1024px) 100vw, 90vw"
                  className="object-contain"
                />

                {/* Reflective shine overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.15) 100%)",
                  }}
                />
              </div>
            </div>

            {/* Floating top label */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -top-4 left-6 lg:left-10 glass rounded-full px-4 py-1.5 flex items-center gap-2"
              style={{ transform: "translateZ(40px)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rd blink" />
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink">
                rdHub · Live Console
              </span>
            </motion.div>

            {/* Floating bottom badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-4 right-6 lg:right-10 glass rounded-full px-4 py-1.5 flex items-center gap-3"
              style={{ transform: "translateZ(40px)" }}
            >
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-mute">
                4 Modules
              </span>
              <span className="w-px h-3 bg-rule2" />
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-rd">
                Unified
              </span>
            </motion.div>

            {/* Floor reflection */}
            <div
              aria-hidden
              className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-20 rounded-[50%] bg-ink/15 blur-3xl"
              style={{ transform: "translateZ(-40px)" }}
            />
          </motion.div>
        </div>

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
                  {/* number watermark */}
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
                  <p className="text-[0.93rem] leading-[1.65] text-mute relative">{m.body}</p>

                  {/* hover bottom rule */}
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
