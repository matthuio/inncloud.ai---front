"use client";

import { Button } from "@/components/ui/button";

export default function FooterSection() {
  return (
    <footer className="w-full bg-white border-t border-neutral py-12 px-4 flex flex-col items-center">
      <h2 className="text-2xl md:text-3xl font-bold text-secondary text-center mb-4">
        Ready to Eliminate Your Biggest Bottleneck?
      </h2>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Button className="bg-primary text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-primary/90 transition-all">
          Book a Personalized Demo
        </Button>
        <Button variant="outline" className="border-primary text-primary px-8 py-3 rounded-lg font-bold text-lg hover:bg-primary/10 transition-all">
          See Pricing
        </Button>
      </div>
      <div className="text-secondary/60 text-sm mb-2">
        © {new Date().getFullYear()} InnCloud.ai. All rights reserved.
      </div>
      <div className="flex gap-4 text-secondary/40 text-xs">
        <a href="#" className="hover:text-primary underline">Privacy Policy</a>
        <span>|</span>
        <a href="#" className="hover:text-primary underline">Terms of Service</a>
      </div>
    </footer>
  );
}
