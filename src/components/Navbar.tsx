"use client";

import { useEffect, useState } from "react";
import { Mail, Github, Linkedin, Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contacts" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Close the menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="relative w-full">
      <div className="mx-auto flex max-w-[1450px] items-center justify-between px-5 py-5 sm:px-10 sm:py-6 lg:px-16 xl:px-[132px]">
        {/* Logo */}
        <Link href="/" className="font-mono text-base tracking-tight sm:text-lg">
          <span className="font-bold text-foreground">Ruth</span>{" "}
          <span className="font-normal text-muted-foreground">UWAMAHORO</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 font-mono text-sm lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground/90 transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop right side */}
        <div className="hidden items-center gap-6 font-mono text-sm lg:flex">
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-foreground/90 transition-colors hover:text-primary"
          >
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Link>
          <Link
            href="https://github.com/Ruthuwamahoro"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-foreground/90 transition-colors hover:text-primary"
          >
            <Github className="h-4 w-4" />
            Github
          </Link>
          <Link
            href="mailto:ruthuwamahoro250@gmail.com"
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:bg-primary/10"
          >
            <Mail className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile / tablet menu button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/40 text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile / tablet panel */}
      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full z-30 border-t border-white/10 bg-[#2D2F33]/95 px-5 pb-6 pt-2 backdrop-blur sm:px-10 lg:hidden"
        >
          <nav className="flex flex-col font-mono text-base">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3 text-foreground/90 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-5 flex items-center gap-6 font-mono text-sm">
            <Link
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-foreground/90 hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Link>
            <Link
              href="https://github.com/Ruthuwamahoro"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-foreground/90 hover:text-primary"
            >
              <Github className="h-4 w-4" />
              Github
            </Link>
            <Link
              href="mailto:ruthuwamahoro250@gmail.com"
              aria-label="Email"
              className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 text-primary hover:bg-primary/10"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}