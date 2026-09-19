"use client";

import { Mail, Github, Twitter} from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contacts" },
];

export function Navbar() {
  return (
    <header className="w-full">
      <div className="flex items-center justify-between py-6 px-26 mx-auto max-w-[1450px]">
        {/* Logo */}
        <Link href="/" className="font-mono text-lg tracking-tight">
          <span className="font-bold text-foreground">Ruth</span>{" "}
          <span className="font-normal text-muted-foreground">UWAMAHORO</span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-8 font-mono text-sm">
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

        {/* Right side */}
        <div className="hidden md:flex items-center gap-6 font-mono text-sm">
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-foreground/90 transition-colors hover:text-primary"
          >
            <Twitter className="h-4 w-4" />
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
      </div>
    </header>
  );
}