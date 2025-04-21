"use client";
import { BarChartBig, MonitorSmartphone, School } from "lucide-react";
import CountUp from "react-countup";
import React from "react";

const resultsData = [
  { topNumber: 52, unit: "%↑", headline: "Higher Lead Response Rate", text: "Instant outreach increased form response rates by 52%.", businessType: "Digital Coaching Business", icon: School },
  { topNumber: 8, unit: "x Faster", headline: "Proposal Delivery Time", text: "Went from 7-day turnaround to same-day proposal submission.", businessType: "Marketing Agency", icon: BarChartBig },
  { topNumber: 63, unit: "%↑", headline: "Faster Payments Collected", text: "Automated reminders helped accelerate overdue payments.", businessType: "Managed IT Provider", icon: MonitorSmartphone },
];

function ResultTile({ topNumber, unit, headline, text, businessType, icon: Icon }: any) {
  return (
    <div className="rounded-xl p-6 bg-white/20 backdrop-blur-lg border border-white/10 shadow-lg flex flex-col items-center text-center min-h-[270px]">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-5xl font-extrabold text-primary">
          <CountUp end={topNumber} duration={2.5} enableScrollSpy scrollSpyDelay={300} />
        </span>
        <span className="text-2xl font-bold text-primary/80">{unit}</span>
      </div>
      <h3 className="text-xl font-bold text-secondary mb-1">{headline}</h3>
      <p className="text-secondary/80 mb-3">{text}</p>
      <div className="flex items-center justify-center gap-2 text-sm text-secondary/70 mt-auto">
        <Icon className="w-5 h-5 text-secondary/50" aria-hidden />
        <span>{businessType}</span>
      </div>
    </div>
  );
}

export default function ResultsSection() {
  return (
    <section id="results" className="w-full py-20 px-4 flex flex-col items-center bg-background">
      <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3 text-center">
        Results That Speak for Themselves
      </h2>
      <p className="text-lg text-secondary/70 text-center mb-8 max-w-xl">
        Real businesses. Real revenue unlocked.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8 md:mt-12 w-full max-w-5xl">
        {resultsData.map((props, idx) => (
          <ResultTile key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}
