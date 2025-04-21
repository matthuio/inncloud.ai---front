"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// IMPORTANT: Move 'InnCloud.svg' to 'public/images/InnCloud.svg'

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "#solutions" },
  { label: "Who We Help", href: "#who-we-help" },
  { label: "Results", href: "#results" },
  { label: "About Us", href: "/about-us" },
];

export default function Header() {
  const [open, setOpen] = useState(false); // Mobile menu state

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 mt-0 my-0 transition-all duration-300 bg-transparent py-0"
      style={{ backgroundColor: 'transparent', WebkitBackdropFilter: 'none', boxShadow: 'none', border: 'none', paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0 }}
    >
      <nav className="flex items-center justify-between px-2 md:px-6 h-full min-h-0">
        {/* Logo */}
        <Link href="/" className="flex items-start z-50 h-full -mt-6 pt-0">
          <span className="sr-only">InnCloud.ai Home</span>
          <Image src="/images/InnCloud.svg" alt="InnCloud Logo" width={144} height={144} className="w-36 h-36 md:w-48 md:h-48 object-contain mt-0 pt-0" />
        </Link>
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-start gap-x-6 h-full m-0 p-0 -mt-6 pt-0">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-secondary/90 hover:text-primary font-extrabold font-sans text-lg md:text-xl transition-colors px-1 py-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary align-middle"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Desktop CTA Button */}
        <div className="hidden md:block ml-2 h-full flex items-center">
          <Button
            className="bg-primary text-white font-bold px-8 py-2 rounded-full hover:bg-primary/90 transition-all h-12 text-lg flex items-center"
            style={{ lineHeight: 1 }}
          >
            Rev Up My Revenue
          </Button>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary z-50"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          {/* Hamburger icon */}
          <span className="block w-6 h-0.5 bg-secondary mb-1 rounded"></span>
          <span className="block w-6 h-0.5 bg-secondary mb-1 rounded"></span>
          <span className="block w-6 h-0.5 bg-secondary rounded"></span>
        </button>
        {/* Mobile Menu Overlay */}
        {open && (
          <div className="fixed inset-0 bg-white/90 backdrop-blur z-40 flex flex-col items-center justify-center">
            <button
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              {/* Close icon (X) */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <ul className="flex flex-col gap-8 text-center mt-10">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-2xl font-semibold text-secondary hover:text-primary transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Button
              className="bg-primary text-white font-bold px-8 py-3 rounded-full shadow-lg hover:bg-primary/90 transition-all mt-10 text-xl"
              onClick={() => setOpen(false)}
            >
              Rev Up My Revenue
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
