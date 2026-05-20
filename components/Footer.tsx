"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const rotX = useTransform(scrollYProgress, [0, 1], [12, 0]);

  return (
    <footer className="section-dark relative overflow-hidden">
      {/* Top hairline glow */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rd to-transparent opacity-50"
      />

      <div className="border-t border-paper/10 max-w-page mx-auto px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-6"
          >
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: -8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
              >
                <Image
                  src="/rd-mark.png"
                  alt=""
                  width={36}
                  height={36}
                  className="brightness-110"
                  aria-hidden
                />
              </motion.div>
              <span className="font-bold text-[17px] tracking-tight uppercase">
                Road Devil<span className="text-rd">®</span>
              </span>
            </div>
            <p className="mt-7 max-w-md text-[0.95rem] leading-[1.7] text-paper/60">
              A vertically integrated vehicle intelligence platform. UK registered trade mark
              (No. UK00004311142), covering vehicle camera systems, software platforms, and
              licensing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-6 lg:col-span-3"
          >
            <div className="text-[11px] uppercase tracking-[0.22em] text-paper/40 mb-5 font-mono">
              — Navigate
            </div>
            <ul className="space-y-3">
              {[
                ["Stack", "#stack"],
                ["Technology", "#technology"],
                ["Hardware", "#hardware"],
                ["Deployment", "#deployment"],
                ["Contact", "#contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-[14px] text-paper/80 hover:text-rd transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-0 h-px bg-rd group-hover:w-3 transition-all duration-300" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-6 lg:col-span-3"
          >
            <div className="text-[11px] uppercase tracking-[0.22em] text-paper/40 mb-5 font-mono">
              — Contact
            </div>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+442034881869"
                  className="text-[14px] text-paper hover:text-rd transition-colors"
                >
                  +44 (0) 203 488 1869
                </a>
              </li>
              <li>
                <a
                  href="mailto:welcome@road-devil.com"
                  className="text-[14px] text-paper hover:text-rd transition-colors"
                >
                  welcome@road-devil.com
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* === Massive 3D wordmark === */}
      <div ref={ref} className="border-t border-paper/10 max-w-page mx-auto px-6 lg:px-10 py-12 select-none perspective-2000 overflow-hidden">
        <motion.div
          style={{ y, rotateX: rotX, transformStyle: "preserve-3d" }}
          className="display-xl leading-[0.85] tracking-tightest flex items-baseline justify-center"
        >
          <span className="text-[clamp(3.5rem,15vw,13rem)] text-paper">ROAD</span>
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-rd text-[clamp(3.5rem,15vw,13rem)]"
          >
            .
          </motion.span>
          <span className="text-[clamp(3.5rem,15vw,13rem)] text-paper">DEVIL</span>
        </motion.div>
      </div>

      <div className="border-t border-paper/10 max-w-page mx-auto px-6 lg:px-10 py-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[12px] text-paper/40">
        <span>
          Road Devil<span className="text-rd">®</span> is a registered trade mark of Road Devil Designs Limited.
        </span>
        <span className="font-mono tracking-[0.18em] uppercase text-[10.5px]">
          © 2026 — All rights reserved
        </span>
      </div>
    </footer>
  );
}
