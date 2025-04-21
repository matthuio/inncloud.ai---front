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

import HeroFlipCardSection from "./HeroFlipCardSection";

export default function HeroSection() {
  return <HeroFlipCardSection />;
}
