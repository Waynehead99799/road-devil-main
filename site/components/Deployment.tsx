"use client";

import { motion } from "motion/react";
import Image from "next/image";
import SectionHead from "./SectionHead";
import Tilt from "./ui/Tilt";

const pathways = [
  {
    code: "P.01",
    name: "Telematics & Fleet Platforms",
    body: "Embed intelligence within device or vehicle ecosystems.",
  },
  {
    code: "P.02",
    name: "OEM Collaboration",
    body: "Claims automation, behavioural analytics, and risk reduction.",
  },
  {
    code: "P.03",
    name: "Insurance & Risk Platforms",
    body: "API integration or white-label deployment.",
  },
];

const commercialModels = [
  { name: "IP licensing", code: "C.01" },
  { name: "Per-vehicle SaaS", code: "C.02" },
  { name: "Data / API access", code: "C.03" },
  { name: "White-label stack", code: "C.04" },
];

export default function Deployment() {
  return (
    <section id="deployment" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-page mx-auto px-6 lg:px-10">
        <SectionHead
          eyebrow="— Structured Deployment Model"
          title={
            <>
              Three pathways. Four{" "}
              <span className="display-it text-rd">commercial</span> models.
            </>
          }
          lede="The platform supports multiple structured integration pathways — purpose-built for partners to deploy at scale."
        />

        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-10 items-start">
          {/* Pathways — staircase 3D entrance */}
          <div className="col-span-12 lg:col-span-7 space-y-4 perspective-1400">
            {pathways.map((p, i) => (
              <motion.div
                key={p.code}
                initial={{ opacity: 0, x: -30, rotateY: -8 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt max={4}>
                  <div className="card card-hover p-6 lg:p-7 group relative overflow-hidden">
                    <div className="flex items-start gap-5">
                      <span className="num-chip num-chip-red shrink-0">{p.code}</span>
                      <div className="flex-1">
                        <h3 className="display text-[1.2rem] lg:text-[1.4rem] text-ink mb-2 leading-tight group-hover:text-rd transition-colors duration-500">
                          {p.name}
                        </h3>
                        <p className="text-[0.95rem] leading-[1.6] text-mute">{p.body}</p>
                      </div>
                      <motion.span
                        whileHover={{ x: 4 }}
                        className="text-rd font-mono text-[16px] opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        →
                      </motion.span>
                    </div>

                    {/* Bottom hover line */}
                    <div
                      aria-hidden
                      className="absolute bottom-0 left-0 h-px bg-rd w-0 group-hover:w-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>

          {/* Right column */}
          <div className="col-span-12 lg:col-span-5 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20, rotateX: -8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="perspective-1400"
            >
              <Tilt max={6}>
                <div className="card overflow-hidden bg-paper relative">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src="/deployment-vehicle.png"
                      alt="Reference vehicle with intelligence capabilities"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-mute pointer-events-none">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rd blink" />
                      Deployment Ready
                    </span>
                    <span>v2.4</span>
                  </div>
                </div>
              </Tilt>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="card p-6"
            >
              <div className="flex items-baseline justify-between mb-5">
                <span className="eyebrow">— Commercial Models</span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
                  4 options
                </span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {commercialModels.map((m, i) => (
                  <motion.li
                    key={m.code}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 py-3 px-3.5 border border-rule rounded-lg bg-paper2/50 text-[13px] text-ink2 hover:border-rd hover:bg-paper hover:shadow-soft1 transition-all cursor-default"
                  >
                    <span className="w-1.5 h-1.5 bg-rd rounded-full shrink-0 shadow-[0_0_8px_rgba(220,34,51,0.5)]" />
                    <span className="flex-1">{m.name}</span>
                    <span className="font-mono text-[9px] text-mute tracking-[0.1em]">{m.code}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
