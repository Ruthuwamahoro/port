"use client";

import Link from "next/link";
import { Github, Linkedin, ArrowUp } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contacts" },
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/Ruthuwamahoro" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/ruth-uwamahoro" }
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#1A1B1E] px-6 pt-14 pb-8 sm:px-10 lg:px-16">
      <div
        aria-hidden
        className="grid-background pointer-events-none absolute inset-0 opacity-[0.04]"
      />

      <div className="relative mx-auto flex w-full max-w-[1450px] flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/5 pb-10 sm:flex-row sm:items-center">

          <nav className="flex flex-wrap gap-x-7 gap-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-mono text-[12.5px] uppercase tracking-wide text-[#A4A5A9] transition-colors duration-200 hover:text-[#9EF2C6]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#26282B] text-[#A4A5A9] ring-1 ring-white/5 transition-all duration-200 hover:text-[#9EF2C6] hover:ring-[#9EF2C6]/40"
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
          <p className="font-mono text-[12px] text-[#6C6E72]">
            &copy; {year} Ruth UWAMAHORO. All rights reserved.
          </p>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="group flex items-center gap-2 font-mono text-[12px] uppercase tracking-wide text-[#A4A5A9] transition-colors duration-200 hover:text-[#9EF2C6]"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#26282B] ring-1 ring-white/5 transition-transform duration-200 group-hover:-translate-y-0.5">
              <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}