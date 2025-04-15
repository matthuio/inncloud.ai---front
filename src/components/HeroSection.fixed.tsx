"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileClock,
  UserMinus,
  MailOpen,
  CalendarX,
  ClipboardList,
  Database,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const TILES = [
  {
    key: "proposals",
    icon: FileClock,
    label: "Slow Proposals",
    aria: "Automate slow proposals with AI",
    cta: "Automate My Proposals →",
  },
  {
    key: "leads",
    icon: UserMinus,
    label: "Missed Leads",
    aria: "Never miss leads again",
    cta: "Capture More Leads →",
  },
  {
    key: "emails",
    icon: MailOpen,
    label: "Manual Email Sorting",
    aria: "Stop sorting emails manually",
    cta: "Automate My Email Sorting →",
  },
  {
    key: "followups",
    icon: CalendarX,
    label: "Forgotten Follow-ups",
    aria: "Never forget a follow-up",
    cta: "Automate My Follow-ups →",
  },
  {
    key: "actions",
    icon: ClipboardList,
    label: "Meeting Actions Lost",
    aria: "Capture meeting actions automatically",
    cta: "Automate Meeting Actions →",
  },
  {
    key: "crm",
    icon: Database,
    label: "Manual CRM Updates",
    aria: "Automate CRM updates",
    cta: "Automate CRM Updates →",
  },
];

const PRIMARY_BLUE = "#4C8AFF";

export default function HeroSection() {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedTile = TILES.find((t) => t.key === selected);
  const feedback = selectedTile
    ? `Okay, let's automate ${selectedTile.label}.`
    : "Select your biggest bottleneck below. InnCloud.ai uses AI to automate it instantly.";

  return (
    <section
      className="relative w-full flex flex-col items-center justify-center min-h-[80vh] py-20 px-4 overflow-hidden bg-gradient-to-br from-white to-slate-50"
      aria-label="Hero Section"
    >
      {/* Animated abstract background */}
      <motion.div
        aria-hidden
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[80vw] h-[60vw] max-w-5xl blur-2xl opacity-40 bg-primary-gradient"
          animate={{
            scale: [1, 1.04, 1],
            rotate: [0, 6, -6, 0],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/3 bottom-0 w-[40vw] h-[20vw] max-w-lg blur-3xl opacity-30 bg-accent-gradient"
          animate={{
            scale: [1, 1.03, 1],
            x: [0, 16, -16, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-secondary text-center mb-4">
          What Manual Task is Slowing You Down?
        </h1>
        <p className="text-lg md:text-xl text-secondary/80 text-center mb-10 max-w-xl">
          InnCloud.ai: Automate Your Bottlenecks.<br />
          <span className="font-medium text-primary">
            AI-powered workflows that accelerate revenue, streamline operations, and eliminate manual work.
          </span>
        </p>
        {/* Tiles Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 w-full mb-6"
          role="group"
          aria-label="Pain Point Selection"
        >
          {TILES.map(({ key, icon: Icon, label, aria }, i) => {
            const isSelected = selected === key;
            return (
              <motion.button
                key={key}
                type="button"
                aria-pressed={isSelected}
                aria-label={aria}
                tabIndex={0}
                className={`relative flex flex-col items-center justify-center p-6 rounded-lg shadow-md bg-gradient-to-br from-white to-slate-50 border transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary font-semibold text-secondary text-base group
                  ${isSelected ? "border-2 border-primary bg-primary text-white shadow-lg scale-105" : "hover:scale-105 hover:shadow-lg hover:border-primary/70"}
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(key)}
              >
                <motion.span
                  className={`mb-2 transition-colors ${isSelected ? "text-white" : "text-primary"}`}
                  whileHover={{ rotate: isSelected ? 0 : 6 }}
                  whileTap={{ scale: 1.1 }}
                  aria-hidden
                >
                  <Icon className="w-8 h-8" />
                </motion.span>
                {label}
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      className="absolute top-2 right-2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-white bg-primary rounded-full shadow" aria-label="Selected" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
        {/* Dynamic Feedback */}
        <div
          className="min-h-[2.5rem] text-center text-lg font-medium mb-6"
          aria-live="polite"
          aria-atomic="true"
        >
          {feedback}
        </div>
        {/* CTA Button */}
        <Button
          className="bg-primary text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-primary/90 transition-all focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={selectedTile ? selectedTile.cta : "Let's Find My Automation"}
        >
          {selectedTile ? selectedTile.cta : "Let's Find My Automation"}
        </Button>
      </div>
    </section>
  );
}
