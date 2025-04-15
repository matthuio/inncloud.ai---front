"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    logo: null, // Placeholder for client logo
    quote:
      "InnCloud.ai cut our proposal time by 80%. We close deals faster and never miss a lead.",
    name: "Alex Chen",
    title: "VP Revenue Operations",
    company: "Acme Corp",
    result: "Reduced proposal time by 80%",
  },
  {
    logo: null,
    quote:
      "The AI-powered meeting insights are a game changer. Our team is finally aligned after every call.",
    name: "Jamie Patel",
    title: "Director of BizOps",
    company: "Growthly",
    result: "Team alignment up 3x",
  },
  {
    logo: null,
    quote:
      "Manual CRM updates are history. InnCloud.ai saves us hours every week!",
    name: "Morgan Lee",
    title: "Sales Manager",
    company: "Pipeline.io",
    result: "Saved 10+ hours/week",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-20 px-4 bg-background flex flex-col items-center">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Don't Just Take Our Word For It
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
          >
            <Quote className="w-8 h-8 text-primary mb-2" aria-hidden />
            <p className="text-lg text-secondary/90 italic mb-4 text-center">"{t.quote}"</p>
            {/* Placeholder for logo */}
            <div className="w-14 h-14 bg-neutral rounded-full flex items-center justify-center mb-3">
              <span className="text-secondary/40 text-xl font-bold">{t.company[0]}</span>
            </div>
            <div className="text-secondary font-semibold">{t.name}</div>
            <div className="text-secondary/70 text-sm mb-2">{t.title}, {t.company}</div>
            <div className="text-success font-bold text-base">{t.result}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
