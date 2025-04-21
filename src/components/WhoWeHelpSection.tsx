"use client";
import { Briefcase, MonitorSmartphone, BrainCircuit } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

const whoWeHelpData = [
  { icon: Briefcase, industry: 'Digital Marketing Agencies', tagline: 'Automate the boring, follow up faster.', problem: 'From form fills to proposals in minutes.' },
  { icon: MonitorSmartphone, industry: 'Managed IT Providers', tagline: 'Stop revenue leaks from overdue billing & ghosted leads.', problem: 'Smart follow-ups, instant replies, auto-sorted inbox.' },
  { icon: BrainCircuit, industry: 'Digital Coaches', tagline: 'Respond to every lead before they ghost.', problem: 'Convert fast, stay top-of-mind, nurture cold leads.' },
];

function HelpTile({ icon: Icon, industry, tagline, problem }: any) {
  return (
    <div className="rounded-xl p-6 bg-white/20 backdrop-blur-lg border border-white/10 shadow-lg flex flex-col items-center text-center min-h-[230px]">
      <Icon className="w-10 h-10 mb-4 text-primary" aria-hidden />
      <h3 className="text-xl font-bold text-secondary mb-1">{industry}</h3>
      <p className="text-secondary/80 mb-2">{tagline}</p>
      <p className="text-secondary/60 text-sm">{problem}</p>
    </div>
  );
}

export default function WhoWeHelpSection() {
  return (
    <section id="who-we-help" className="w-full py-16 lg:py-24 flex flex-col items-center bg-background">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3 text-center">
        Who We Work With
      </h2>
      <p className="text-lg text-secondary/70 text-center mb-8 max-w-xl">
        Real AI automation for real revenue teams.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8 md:mt-12 w-full max-w-5xl">
        {whoWeHelpData.map((props, idx) => (
          <HelpTile key={idx} {...props} />
        ))}
      </div>
      <p className="text-center mt-8 md:mt-12 text-secondary/80">
        Don’t see your role? InnCloud adapts to any team that earns revenue.
      </p>
      <div className="flex justify-center mt-4">
        <Button className="bg-primary text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-primary/90 transition-all">
          Book a Fit Call →
        </Button>
      </div>
    </section>
  );
}
