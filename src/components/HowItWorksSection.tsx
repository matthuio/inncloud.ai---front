"use client";

import { motion } from "framer-motion";
import { Link, BrainCircuit, CheckCircle2 } from "lucide-react";

const STEPS = [
  {
    icon: Link,
    title: "Connect Tools",
    description: "Securely link your CRM, email, and more in seconds.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analyzes & Triggers",
    description: "AI understands your workflows and identifies automation opportunities.",
  },
  {
    icon: CheckCircle2,
    title: "Tasks Automated",
    description: "Manual work disappears. You reclaim hours and close deals faster.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="w-full py-20 px-4 flex flex-col items-center bg-white">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Effortless Automation in 3 Steps
      </motion.h2>
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center justify-center w-full max-w-5xl">
        {STEPS.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            className="flex flex-col items-center text-center bg-background rounded-xl shadow-card p-8 flex-1 min-w-[220px] max-w-xs"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
          >
            <motion.span
              className="mb-4"
              whileHover={{ scale: 1.1, rotate: 6 }}
              transition={{ type: "spring", stiffness: 200 }}
              aria-hidden
            >
              <Icon className="w-12 h-12 text-primary" />
            </motion.span>
            <h3 className="text-xl font-bold text-secondary mb-2">{title}</h3>
            <p className="text-secondary/80 text-base">{description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
