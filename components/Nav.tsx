"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Magnetic from "./ui/Magnetic";
import ThemeToggle from "./ui/ThemeToggle";

const links = [
  { label: "Stack", href: "#stack" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Console", href: "#console" },
  { label: "Hardware", href: "#hardware" },
  { label: "Deployment", href: "#deployment" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-paper/70 backdrop-blur-xl backdrop-saturate-150 border-b border-rule"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-page mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[68px]">
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              whileHover={{ rotate: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="relative"
            >
              <Image src="/rd-mark.png" alt="Road Devil" width={32} height={32} priority />
            </motion.div>
            <span className="hidden sm:inline font-sans font-bold text-[14px] tracking-tight text-ink uppercase">
              Road Devil<span className="text-rd">®</span>
            </span>
          </motion.a>

          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full border border-rule bg-paper/50 backdrop-blur-md"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-4 py-1.5 text-[13px] text-ink2 hover:text-ink transition-colors rounded-full hover:bg-paper2/80"
              >
                {l.label}
              </a>
            ))}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3"
          >
            <ThemeToggle />
            <Magnetic strength={0.25} className="hidden md:inline-block">
              <a href="#contact" className="btn btn-primary !py-2.5 !px-5 !text-[13px]">
                Request discussion
                <span className="arrow" aria-hidden>→</span>
              </a>
            </Magnetic>
            <button
              className="lg:hidden p-2 -mr-2 relative w-10 h-10 flex flex-col items-end justify-center gap-1.5"
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
            >
              <motion.span
                animate={open ? { rotate: 45, y: 7, width: 20 } : { rotate: 0, y: 0, width: 20 }}
                className="block h-px bg-ink"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block w-3 h-px bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7, width: 20 } : { rotate: 0, y: 0, width: 12 }}
                className="block h-px bg-ink"
              />
            </button>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden border-t border-rule bg-paper/95 backdrop-blur-xl"
          >
            <div className="max-w-page mx-auto px-6 py-4 flex flex-col">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="py-3.5 text-[15px] text-ink2 border-b border-rule last:border-0 flex items-center justify-between group"
                >
                  <span>{l.label}</span>
                  <span className="text-rd opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: links.length * 0.05 + 0.05 }}
                className="mt-5 btn btn-primary justify-center w-full"
              >
                Request a strategic discussion
                <span className="arrow" aria-hidden>→</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
