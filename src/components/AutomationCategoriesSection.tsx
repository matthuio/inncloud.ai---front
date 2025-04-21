"use client";

import { motion } from 'framer-motion';
import { Briefcase, DollarSign, TrendingUp, Workflow, Users, ClipboardList, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CATEGORIES = [
  {
    key: 'revops',
    title: 'Revenue Operations (RevOps)',
    subtitle: 'Speed to Close',
    icon: DollarSign,
    accent: 'primary',
    cta: 'Explore RevOps Automations',
    useCases: [
      { icon: Briefcase, text: 'AI Proposal Drafts: Meeting notes → proposals instantly.' },
      { icon: Users, text: 'Lead Routing: Never miss a hot lead.' },
      { icon: ClipboardList, text: 'Meeting Insights: Action items captured automatically.' },
    ],
  },
  {
    key: 'bizops',
    title: 'Business Operations (BizOps)',
    subtitle: 'Effortless Sync',
    icon: Workflow,
    accent: 'accent',
    cta: 'Explore BizOps Automations',
    useCases: [
      { icon: Zap, text: 'CRM Updates: No more manual entry.' },
      { icon: TrendingUp, text: 'Report Generation: Insights with zero effort.' },
      { icon: Users, text: 'Onboarding: Automate repetitive setup.' },
    ],
  },
];

function CategoryCard({ title, subtitle, icon: Icon, useCases, accent, cta }: any) {
  return (
    <motion.div
      className={`rounded-xl shadow-lg bg-white p-8 flex flex-col items-start border-t-8 border-${accent}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <Icon className={`w-10 h-10 mb-4 text-${accent}`} aria-hidden />
      <h3 className="text-2xl font-bold mb-1 text-secondary">{title}</h3>
      <p className={`mb-4 text-${accent} font-semibold`}>{subtitle}</p>
      <ul className="mb-6 space-y-2">
        {useCases.map(({ icon: UseIcon, text }: any, i: number) => (
          <li key={i} className="flex items-center gap-2 text-secondary/90">
            <UseIcon className="w-5 h-5 text-primary" aria-hidden /> {text}
          </li>
        ))}
      </ul>
      <Button
        className={`font-bold px-6 py-2 rounded-lg shadow-md transition-all 
          ${accent === 'primary' ? 'bg-primary text-white hover:bg-primary/90' : ''}
          ${accent === 'accent' ? 'bg-blue-500 text-white hover:bg-blue-600' : ''}
        `}
      >
        {cta}
      </Button>
    </motion.div>
  );
}

export default function AutomationCategoriesSection() {
  return (
    <section id="categories" className="w-full py-20 px-4 bg-background flex flex-col items-center">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-secondary mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        AI Automation Tailored for Your Ops Needs
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {CATEGORIES.map(({ key, ...rest }) => (
          <CategoryCard key={key} {...rest} />
        ))}
      </div>
    </section>
  );
}
