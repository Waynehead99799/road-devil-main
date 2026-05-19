"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";
import Magnetic from "./ui/Magnetic";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const cfg = { stiffness: 60, damping: 18 };
  const sx = useSpring(mx, cfg);
  const sy = useSpring(my, cfg);
  const tx = useTransform(sx, [0, 1], [40, -40]);
  const ty = useTransform(sy, [0, 1], [30, -30]);
  const tx2 = useTransform(sx, [0, 1], [-30, 30]);
  const ty2 = useTransform(sy, [0, 1], [-20, 20]);

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
      id="contact"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative py-28 lg:py-36 bg-ink text-paper overflow-hidden"
    >
      {/* Atmospheric aurora */}
      <motion.div
        aria-hidden
        style={{ x: tx, y: ty }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-rd/25 blur-[140px] pointer-events-none"
      />
      <motion.div
        aria-hidden
        style={{ x: tx2, y: ty2 }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-rd/10 blur-[140px] pointer-events-none"
      />

      {/* Fine grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-page mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-x-6 lg:gap-x-12 gap-y-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-12 lg:col-span-7"
          >
            <span className="eyebrow !text-paper/50">— Engagement</span>
            <h2 className="display-xl text-[clamp(2.2rem,5vw,4.4rem)] text-paper mt-5 leading-[1.0]">
              {["Request a", null, "discussion."].map((line, i) =>
                line === null ? (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "110%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.2 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="block display-it text-rd"
                    >
                      strategic
                    </motion.span>
                  </span>
                ) : (
                  <span key={i} className="block overflow-hidden">
                    <motion.span
                      initial={{ y: "110%" }}
                      whileInView={{ y: "0%" }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.1 + i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="block"
                    >
                      {line}
                    </motion.span>
                  </span>
                )
              )}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 max-w-prose text-[1.0625rem] leading-[1.75] text-paper/70"
            >
              If you are an OEM, telematics provider, insurer, or fleet technology company
              exploring safety intelligence integration, we&rsquo;d welcome a confidential
              discussion. Engagement is selective and focused on long-term integration alignment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-9 max-w-xl"
            >
              <div>
                <div className="text-[11px] text-paper/40 uppercase tracking-[0.2em] mb-2.5 font-mono">
                  Phone
                </div>
                <a
                  href="tel:+442034881869"
                  className="text-[1.05rem] text-paper hover:text-rd transition-colors"
                >
                  +44 (0) 203 488 1869
                </a>
              </div>
              <div>
                <div className="text-[11px] text-paper/40 uppercase tracking-[0.2em] mb-2.5 font-mono">
                  Email
                </div>
                <a
                  href="mailto:welcome@road-devil.com"
                  className="text-[1.05rem] text-paper hover:text-rd transition-colors"
                >
                  welcome@road-devil.com
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — form on glass-dark card */}
          <motion.form
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="col-span-12 lg:col-span-5"
          >
            <div className="glass-dark rounded-2xl p-7 lg:p-8 relative overflow-hidden">
              {/* Corner accent */}
              <div
                aria-hidden
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-rd/20 blur-3xl pointer-events-none"
              />

              <div className="relative">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="py-12 text-paper/90"
                  >
                    <span className="eyebrow !text-rd">— Transmitted</span>
                    <p className="display text-[1.6rem] mt-4 leading-snug">
                      Thank you. We&apos;ll be in touch shortly.
                    </p>
                    <p className="text-[0.95rem] text-paper/60 mt-3 leading-relaxed">
                      A member of the Road Devil team will respond within one working day.
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-6 text-paper/90">
                    <Field label="Full Name" id="name" required />
                    <Field label="Company Name" id="company" required />
                    <Field label="Job Title" id="title" />
                    <Field label="Email" id="email" type="email" required />
                    <Field label="Phone Number" id="phone" type="tel" />
                    <Field label="Area of Interest / Message" id="message" textarea />

                    <Magnetic strength={0.15} className="!block w-full">
                      <button
                        type="submit"
                        className="w-full mt-3 btn btn-primary !bg-rd !text-paper hover:!bg-paper hover:!text-ink justify-center"
                      >
                        Send Message
                        <span className="arrow" aria-hidden>→</span>
                      </button>
                    </Magnetic>
                  </div>
                )}
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <label htmlFor={id} className="block group">
      <span className="block text-[11px] uppercase tracking-[0.2em] text-paper/50 mb-2 font-mono">
        {label}
        {required && <span className="text-rd ml-2">●</span>}
      </span>
      {textarea ? (
        <textarea
          id={id}
          required={required}
          rows={3}
          className="w-full bg-transparent border-0 border-b border-paper/25 focus:border-rd outline-none py-2 text-paper placeholder:text-paper/30 resize-none transition-colors"
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          className="w-full bg-transparent border-0 border-b border-paper/25 focus:border-rd outline-none py-2 text-paper placeholder:text-paper/30 transition-colors"
        />
      )}
    </label>
  );
}
