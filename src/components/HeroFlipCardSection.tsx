"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FileClock,
  FileCheck,
  Wand2,
  UserMinus,
  UserCheck,
  Zap,
  Send,
  Siren,
  MessageCircle,
  Bot,
  CreditCard,
  Hourglass,
  Receipt,
  BellRing,
  MailQuestion,
  Inbox,
  MailCheck,
  Route,
  TrendingDown,
  PauseCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CARDS = [
  // Row 1
  {
    key: "speed-to-lead",
    front: {
      icon: Zap,
      label: "Leads Cooling Fast?",
      desc: "Leads cooling off? Losing out by slow connections?",
    },
    back: {
      icon: Zap,
      headline: "Speed to Lead",
      desc: "Instantly engage prospects, turning interest into opportunities before competitors react!",
      cta: "Discover How →",
    },
  },
  {
    key: "lead-enrichment",
    front: {
      icon: UserCheck,
      label: "Chasing Shadows?",
      desc: "Wasting time on dead-end leads? Sketchy data blurring focus?",
    },
    back: {
      icon: UserCheck,
      headline: "Lead Enrichment & Qualify",
      desc: "Turn vague data into rich profiles. Chase only golden leads!",
      cta: "See the Clarity →",
    },
  },
  {
    key: "invoice-followup",
    front: {
      icon: Receipt,
      label: "Late Payment Headaches?",
      desc: "Late payments draining energy? Cash flow unpredictable?",
    },
    back: {
      icon: Receipt,
      headline: "Invoice Follow-Up",
      desc: "Automated reminders & tracking ensure prompt, hassle-free payments.",
      cta: "Automate Collections →",
    },
  },
  // Row 2
  {
    key: "proposal-gen",
    front: {
      icon: FileCheck,
      label: "Proposal Bottleneck?",
      desc: "Deals stalled by slow proposals? 'Proposal paralysis' hitting hard?",
    },
    back: {
      icon: FileCheck,
      headline: "Proposal Gen",
      desc: "AI crafts compelling proposals in minutes, wowing clients & closing deals fast!",
      cta: "Generate Proposals Faster →",
    },
  },
  {
    key: "client-onboarding",
    front: {
      icon: UserCheck,
      label: "Clunky Client Welcome?",
      desc: "Client welcome confusing, not five-star? First impressions matter.",
    },
    back: {
      icon: UserCheck,
      headline: "Client Onboarding",
      desc: "Craft seamless, impressive journeys. Make new clients feel valued from day one!",
      cta: "Perfect Onboarding →",
    },
  },
  {
    key: "competitor-analysis",
    front: {
      icon: TrendingUp,
      label: "Flying Blind?",
      desc: "Navigating blind while competitors see all? Gain your X-ray vision.",
    },
    back: {
      icon: TrendingUp,
      headline: "Competitor Analysis",
      desc: "Get automated insights into rivals. Outsmart, outmaneuver, and lead!",
      cta: "Gain Your Edge →",
    },
  },
];

function FlipCard({ front, back, isFlipped, onFlip, tabIndex }: any) {
  return (
    <div
      className="flip-card w-full h-full focus:outline-none"
      tabIndex={tabIndex}
      onClick={onFlip}
      onKeyDown={e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFlip();
        }
      }}
      aria-pressed={isFlipped}
      role="button"
    >
      <motion.div
        className="relative w-full h-full flip-card-inner"
        style={{ perspective: 1200 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Front Face */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-md flex flex-col items-center justify-center transition-all border border-slate-200 z-10
            hover:scale-103 hover:shadow-lg hover:border-primary focus-within:border-primary`}
          style={{
            transform: "rotateY(0deg)",
            zIndex: isFlipped ? 0 : 2,
            visibility: isFlipped ? "hidden" : "visible",
          }}
        >
          <front.icon className="min-w-[40px] min-h-[40px] w-10 h-10 text-primary mb-4" aria-hidden />
          <div className="font-bold text-lg md:text-xl text-secondary mb-1 text-center">{front.label}</div>
          <div className="text-secondary/80 text-sm text-center">{front.desc}</div>
        </div>
        {/* Back Face */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl p-6 bg-gradient-to-br from-white to-slate-50 shadow-md flex flex-col items-center justify-center border border-slate-200 z-20`}
          style={{
            transform: "rotateY(180deg)",
            zIndex: isFlipped ? 2 : 0,
            visibility: isFlipped ? "visible" : "hidden",
          }}
        >
          <back.icon className="min-w-[40px] min-h-[40px] w-10 h-10 text-blue-600 mb-4" aria-hidden />
          <div className="font-bold text-lg md:text-xl text-secondary mb-1 text-center">{back.headline}</div>
          <div className="text-secondary/80 text-sm text-center mb-2">{back.desc}</div>
          <button
            className="text-xs font-semibold text-primary hover:underline focus:outline-none"
            tabIndex={0}
            onClick={e => { e.stopPropagation(); onFlip(); }}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); e.stopPropagation(); onFlip(); } }}
            aria-label="Flip card back"
          >
            {back.cta}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function HeroFlipCardSection() {
  const [flipped, setFlipped] = useState(Array(CARDS.length).fill(false));

  const handleFlip = (idx: number) => {
    setFlipped(f => f.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <section
      id="solutions"
      className="relative w-full flex flex-col items-center justify-center min-h-[80vh] py-20 px-4 overflow-hidden bg-gradient-to-br from-white to-slate-50"
      aria-label="Hero Section"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-secondary text-center mb-4">
        What Manual Task is Slowing You Down?
      </h1>
      <p className="text-lg md:text-xl text-secondary/80 text-center mb-10 max-w-xl">
        InnCloud.ai: Automate Your Bottlenecks.<br />
        <span className="font-medium text-primary">
          AI-powered workflows that accelerate revenue, streamline operations, and eliminate manual work.
        </span>
      </p>
      {/* Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 w-full max-w-4xl mb-12 items-stretch">
        {CARDS.map((card, idx) => (
          <div className="flex flex-1 h-full min-h-[200px]" key={card.key}>
            <FlipCard
              front={card.front}
              back={card.back}
              isFlipped={flipped[idx]}
              onFlip={() => handleFlip(idx)}
              tabIndex={0}
            />
          </div>
        ))}
      </div>
      {/* Main CTA Button */}
      <Button className="bg-primary text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-primary/90 transition-all focus-visible:ring-2 focus-visible:ring-primary">
        Let's Find My Automation
      </Button>
    </section>
  );
}

/* Flip card styles (add to global CSS if needed)
.flip-card-inner {
  transform-style: preserve-3d;
  position: relative;
  width: 100%;
  height: 100%;
}
.backface-hidden {
  backface-visibility: hidden;
}
*/
