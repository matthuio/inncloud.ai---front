import type { Metadata } from 'next';
import AutomationCategoriesSection from '@/components/AutomationCategoriesSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FooterSection from '@/components/FooterSection';
import HomePageClient from './home-page-client';

export const metadata: Metadata = {
  title: 'InnCloud.ai: Automate Your Bottlenecks',
  description: 'AI-powered workflows that accelerate revenue, streamline operations, and eliminate manual work.',
};

// Server component that handles metadata
export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center w-full overflow-x-hidden">
      <HomePageClient />
      <AutomationCategoriesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
