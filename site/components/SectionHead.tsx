"use client";

import { motion } from "motion/react";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
};

export default function SectionHead({ eyebrow, title, lede }: Props) {
  return (
    <div className="grid grid-cols-12 gap-x-6 lg:gap-x-12 pb-12 lg:pb-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="col-span-12 lg:col-span-7"
      >
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="display-xl text-[clamp(1.85rem,3.6vw,3rem)] text-ink mt-5 leading-[1.06]">
          {title}
        </h2>
      </motion.div>

      {lede && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="col-span-12 lg:col-span-5 self-end mt-6 lg:mt-0 text-[1.0625rem] leading-[1.75] text-mute max-w-prose"
        >
          {lede}
        </motion.p>
      )}
    </div>
  );
}
