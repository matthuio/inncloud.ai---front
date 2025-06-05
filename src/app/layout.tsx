import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InnCloud.ai: Automate Your Bottlenecks',
  description: 'AI-powered workflows that accelerate revenue, streamline operations, and eliminate manual work.',
  keywords: [
    'AI Automation',
    'Workflow Automation',
    'RevOps Automation',
    'BizOps Automation',
    'Proposal Automation',
    'Email Automation',
  ],
  openGraph: {
    title: 'InnCloud.ai: Automate Your Bottlenecks',
    description: 'AI-powered workflows that accelerate revenue, streamline operations, and eliminate manual work.',
    url: 'https://inncloud.ai',
    siteName: 'InnCloud.ai',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-background font-sans">
      <head>
        <link rel="icon" href="/images/inncloud favicon.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
