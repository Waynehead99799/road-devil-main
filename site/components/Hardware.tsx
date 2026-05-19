"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import SectionHead from "./SectionHead";
import Tilt from "./ui/Tilt";
import Magnetic from "./ui/Magnetic";

const partnerModes = [
  "Deploy the reference device directly.",
  "Manufacture under licence.",
  "Use it as a blueprint for in-house hardware.",
  "Deploy Road Devil on existing or OEM devices.",
];

export default function Hardware() {
  const ref = useRef<HTMLDivElement>(null);

  // Mouse-tracked 3D
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const cfg = { stiffness: 90, damping: 18, mass: 0.5 };
  const sx = useSpring(mx, cfg);
  const sy = useSpring(my, cfg);
  const rotY = useTransform(sx, [0, 1], [-10, 10]);
  const rotX = useTransform(sy, [0, 1], [8, -8]);

  // Scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const halo = useTransform(scrollYProgress, [0.2, 0.6, 0.9], [0, 1, 0.6]);

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
    <section
      id="hardware"
      className="relative py-24 lg:py-36 bg-section-alt border-y border-rule overflow-hidden"
    >
      <div className="max-w-page mx-auto px-6 lg:px-10">
        <SectionHead
          eyebrow="— Hardware IP · Controlled Device Architecture"
          title={
            <>
              The <span className="display-it text-rd">reference device</span>,
              <br className="hidden sm:block" /> not a re-branded camera.
            </>
          }
        />

        {/* === 3D device hero stage === */}
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-12 items-center mb-16 lg:mb-20">
          <div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="col-span-12 lg:col-span-7 relative perspective-2000"
          >
            <motion.div
              style={{
                rotateX: rotX,
                rotateY: rotY,
                transformStyle: "preserve-3d",
              }}
              className="relative will-change-transform"
            >
              {/* Halo / aura */}
              <motion.div
                aria-hidden
                style={{ opacity: halo, transform: "translateZ(-80px)" }}
                className="absolute inset-0 pointer-events-none"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] aspect-square rounded-full bg-rd/15 blur-[100px]" />
              </motion.div>

              {/* Concentric rings — slow rotation */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
                style={{ transform: "translateZ(-40px)" }}
              >
                <div className="w-[85%] aspect-square rounded-full border border-rule2/60 animate-slow" />
              </div>
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none flex items-center justify-center"
                style={{ transform: "translateZ(-20px)" }}
              >
                <div
                  className="w-[60%] aspect-square rounded-full border border-dashed border-rule2/50"
                  style={{ animation: "spin360 60s linear infinite reverse" }}
                />
              </div>

              {/* Device card */}
              <Tilt max={3} scale={1} glare={false}>
                <div className="card overflow-hidden bg-paper relative" style={{ transform: "translateZ(20px)" }}>
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src="/hardware-device.png"
                      alt="RD-1418 forward AI camera with annotated capabilities"
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-contain float-y"
                    />
                  </div>

                  {/* Top hud bar */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono tracking-[0.2em] uppercase text-mute pointer-events-none">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rd blink" />
                      RD-1418
                    </span>
                    <span>Reference Device</span>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          </div>

          {/* Top positioning card — dark glass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-5"
          >
            <Tilt max={4}>
              <div className="card card-dark card-hover p-7 lg:p-9 relative overflow-hidden">
                {/* Glow accent */}
                <div
                  aria-hidden
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-rd/20 blur-[60px] pointer-events-none"
                />
                <div className="relative">
                  <span className="eyebrow !text-paper/50">— Top Positioning</span>
                  <h3 className="display text-[1.35rem] lg:text-[1.6rem] text-paper mt-5 mb-5 leading-tight">
                    Proprietary device architecture — not white-label overlay.
                  </h3>
                  <p className="text-[0.95rem] leading-[1.7] text-paper/70">
                    Unlike software overlays reliant on third-party white-label hardware,
                    Road Devil&rsquo;s platform is built upon proprietary device architecture.
                    Hardware ownership enables long-term strategic flexibility and defensible
                    IP positioning.
                  </p>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>

        {/* === Why + How grid === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 perspective-1400">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tilt max={5}>
              <div className="card card-hover p-7 lg:p-9 h-full">
                <div className="flex items-baseline justify-between mb-5">
                  <span className="eyebrow">— Why hardware IP matters</span>
                  <span className="num-chip num-chip-red">A</span>
                </div>
                <h3 className="display text-[1.3rem] lg:text-[1.5rem] text-ink mb-4 leading-tight">
                  Vertical integration without operational burden.
                </h3>
                <p className="text-[0.95rem] leading-[1.7] text-mute">
                  Owning the device layer can eliminate third-party dependency, improve margin
                  control, increase innovation velocity, and reduce supply-chain risk. For partners,
                  this represents optional vertical integration rather than operational burden.
                </p>
              </div>
            </Tilt>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tilt max={5}>
              <div className="card card-hover p-7 lg:p-9 h-full">
                <div className="flex items-baseline justify-between mb-5">
                  <span className="eyebrow">— How partners use hardware</span>
                  <span className="num-chip num-chip-red">B</span>
                </div>
                <h3 className="display text-[1.3rem] lg:text-[1.5rem] text-ink mb-5 leading-tight">
                  All deployment models supported.
                </h3>
                <ul className="space-y-3.5">
                  {partnerModes.map((m, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                      className="flex gap-3.5 text-[0.95rem] leading-[1.55] text-ink2"
                    >
                      <span className="font-mono text-[10px] text-rd mt-1.5 shrink-0 tabular-nums">
                        M.0{i + 1}
                      </span>
                      <span>{m}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </Tilt>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-14 flex justify-center"
        >
          <Magnetic strength={0.25}>
            <a href="#contact" className="btn btn-ghost">
              Download reference device — technical data sheet
              <span aria-hidden>↓</span>
            </a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
