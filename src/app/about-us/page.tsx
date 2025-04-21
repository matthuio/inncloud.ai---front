'use client';
import Header from '@/components/Header';
import LottieAnimation from '@/components/LottieAnimation';
// IMPORTANT: Move 'Animation - 1744731691664.json' to 'public/lottie/Animation-1744731691664.json' if not already done.
import FooterSection from '@/components/FooterSection';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Zap,
  Send,
  Receipt,
  Mail,
  UserCheck,
  Briefcase,
  MonitorSmartphone,
  School,
  BarChartBig,
} from 'lucide-react';

// IMPORTANT: Move 'innovera logo.svg' to 'public/images/innovera-logo.svg'
// IMPORTANT: Move 'Brian Headshot SVG.svg' to 'public/images/brian-headshot.svg'

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main className="px-4 py-8 md:py-16 max-w-7xl mx-auto space-y-24">
        {/* Lottie Animation Hero */}
        <div className="w-full flex justify-center items-center mb-4 md:mb-8">
          <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl aspect-[2/1] md:aspect-[3/1]">
            <LottieAnimation src="/lottie/Animation-1744731691664.json" className="w-full h-full" />
          </div>
        </div>
        {/* Why We Exist */}
        <motion.section
          className="space-y-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold mb-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Why We Exist
          </motion.h1>
          <p className="text-lg text-secondary max-w-prose mx-auto">
            Revenue is the lifeblood of every business—and the #1 source of stress for business leaders worldwide. Deals fall through. Invoices get missed. Leads go cold. Not because of lack of effort, but because of too much friction.
          </p>
          <p className="text-2xl font-semibold text-primary">InnCloud.ai exists to eliminate that friction.</p>
          <p className="text-lg text-secondary max-w-prose mx-auto">
            We’re here to help you close faster, follow up smarter, and automate the revenue-critical tasks that slow your team down. When revenue flows faster, your team wins more, your product gets better, and your business scales sustainably.
          </p>
          <p className="text-lg text-secondary max-w-prose mx-auto">
            We believe every business should have the power to automate like the top 1%—without needing a team of engineers.
          </p>
        </motion.section>

        {/* What We Do */}
        <motion.section
  className="space-y-8"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
>
  <motion.h2
    className="text-3xl font-bold text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.1 }}
  >
    What We Do
  </motion.h2>
          <p className="text-xl font-semibold text-center">InnCloud.ai is a RevOps automation platform.</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-none max-w-2xl mx-auto">
  {[
    { icon: <Zap className="w-6 h-6 text-primary shrink-0" />, label: 'Instant Proposal Generation' },
    { icon: <Send className="w-6 h-6 text-primary shrink-0" />, label: 'Speed-to-Lead Outreach' },
    { icon: <Receipt className="w-6 h-6 text-primary shrink-0" />, label: 'Invoice Follow-ups' },
    { icon: <Mail className="w-6 h-6 text-primary shrink-0" />, label: 'Email Routing' },
    { icon: <UserCheck className="w-6 h-6 text-primary shrink-0" />, label: 'Lead Enrichment' },
    { icon: <Briefcase className="w-6 h-6 text-primary shrink-0" />, label: 'Deal Nurturing' },
  ].map(({ icon, label }) => (
    <li key={label} className="flex items-center gap-4 bg-white rounded-xl shadow-card px-6 py-4">
      {icon}
      <span className="text-lg text-secondary font-medium">{label}</span>
    </li>
  ))}
</ul>
          <p className="text-lg text-secondary text-center max-w-prose mx-auto">
            All powered by AI. All tailored to your funnel.
          </p>
          <p className="text-lg text-secondary text-center max-w-prose mx-auto">
            Whether you’re a team of 5 or 500, InnCloud.ai makes your revenue engine faster, more responsive, and more predictable.
          </p>
        </motion.section>

        {/* Who We Are */}
        <motion.section
  className="space-y-8"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
>
  <motion.h2
    className="text-3xl font-bold text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.1 }}
  >
    Who We Are
  </motion.h2>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <a href="https://goinnovera.com" target="_blank" rel="noopener noreferrer" className="inline-block mb-4">
                <Image src="/images/innovera-logo.svg" alt="Innovera Logo" width={200} height={60} />
              </a>
              <p className="text-lg text-secondary">
                InnCloud.ai is a division of <strong>Innovera</strong>, one of the Caribbean’s most established and trusted technology service providers.
              </p>
              <p className="text-lg text-secondary">
                Founded in <strong>1977</strong> by Mr. <strong>Edgar Maurice Bailey</strong>, Innovera began as a handheld radio and enterprise telecommunications company. Today, we’re Jamaica’s premier IT solutions provider—spanning AI, cloud, cybersecurity, and 5G innovation.
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center space-y-4">
              <Image src="/images/brian-headshot.svg" alt="Brian Bailey" width={240} height={240} className="rounded-full" />
              <p className="text-lg text-secondary text-center">
                <strong>Brian Bailey</strong>, Innovera’s Chief Engineer and the visionary behind InnCloud.ai, brings over a decade of technical experience and firsthand insight into running revenue-driven teams. After successfully applying AI-powered automation within his own family business, he launched InnCloud.ai to bring the same speed and intelligence to RevOps teams everywhere.
              </p>
            </div>
          </div>
          <p className="text-lg text-secondary text-center max-w-prose mx-auto">
            We know the cost of doing things manually. We've lived it. That's why we're building the future.
          </p>
        </motion.section>

        {/* Who We Help */}
        <motion.section
  className="space-y-8"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
>
  <motion.h2
    className="text-3xl font-bold text-center"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.1 }}
  >
    Who We Help
  </motion.h2>
          <p className="text-lg text-secondary text-center max-w-prose mx-auto">
            We build specifically for three types of businesses:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  <div className="p-8 bg-white rounded-2xl shadow-card flex flex-col items-center space-y-4">
    <BarChartBig className="w-10 h-10 text-primary mb-2" />
    <h3 className="text-xl font-semibold text-center">Digital Marketing Agencies</h3>
    <p className="italic text-secondary text-center">
      “Struggling with slow proposals and lost leads? We help you respond faster, close sooner, and impress clients before the competition blinks.”
    </p>
  </div>
  <div className="p-8 bg-white rounded-2xl shadow-card flex flex-col items-center space-y-4">
    <MonitorSmartphone className="w-10 h-10 text-primary mb-2" />
    <h3 className="text-xl font-semibold text-center">Managed IT Providers</h3>
    <p className="italic text-secondary text-center">
      “Too many overdue payments or tickets slipping through the cracks? Our automations keep revenue flowing and inquiries sorted—without the admin burden.”
    </p>
  </div>
  <div className="p-8 bg-white rounded-2xl shadow-card flex flex-col items-center space-y-4">
    <School className="w-10 h-10 text-primary mb-2" />
    <h3 className="text-xl font-semibold text-center">Digital Coaches & Online Educators</h3>
    <p className="italic text-secondary text-center">
      “Missing form fills, ghosted leads, late follow-ups? We help you stay responsive, professional, and fully booked without lifting a finger.”
    </p>
  </div>
</div>
          <p className="text-lg text-secondary text-center max-w-prose mx-auto">
            We understand these pain points because we’ve been there. That’s why every automation we build is designed to give you your time, margin, and momentum back.
          </p>
        </motion.section>


        {/* CTA */}
        <motion.section
          className="space-y-8 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <motion.h2
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ready to Rev Up Your Revenue?
          </motion.h2>
          <p className="text-lg text-secondary max-w-prose mx-auto">
            We’d love to help you eliminate your biggest bottleneck.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Button className="bg-primary text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-primary/90 transition-all">
              Book a Personalized Demo
            </Button>
            <Button variant="outline" className="border-primary text-primary px-8 py-3 rounded-lg font-bold text-lg hover:bg-primary/10 transition-all">
              Explore Solutions →
            </Button>
          </div>
        </motion.section>
      </main>
      <FooterSection />
    </>
  );
}
