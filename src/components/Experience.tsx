"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase } from "lucide-react";

type Role = {
  period: string;
  title: string;
  company: string;
  description: string;
  tags: string[];
};

const roles: Role[] = [
  {
    period: "2025 — Present",
    title: "Senior Full Stack Developer",
    company: "Northwind Labs",
    description:
      "Leading the rebuild of the core platform on Next.js and Postgres, mentoring two junior engineers, and owning delivery from architecture to deploy.",
    tags: ["Next.js", "PostgreSQL", "AWS"],
  },
  {
    period: "2023 — 2025",
    title: "Full Stack Developer",
    company: "Ridgeway Digital",
    description:
      "Built and shipped client applications end to end across fintech and logistics, from proposal through production support.",
    tags: ["React", "Node.js", "Docker"],
  },
  {
    period: "2022 — 2023",
    title: "Frontend Developer",
    company: "Fieldnote",
    description:
      "Owned the design system and rebuilt the dashboard for performance, cutting first-load time by more than half.",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    period: "2021 — 2022",
    title: "Junior Developer",
    company: "Freelance",
    description:
      "Took on small business sites and internal tools, learning to scope, estimate, and deliver on real deadlines.",
    tags: ["JavaScript", "WordPress"],
  },
];

const TAB_HEIGHT = 64;

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const fadeUp = (delayMs: number): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.6s ease-out ${delayMs}ms, transform 0.6s ease-out ${delayMs}ms`,
  });

  const role = roles[active];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#1F2124]  px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
      id="experience"
    >
      <style>{`
        @keyframes exp-panel-in {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .exp-panel { animation: exp-panel-in 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
        @media (prefers-reduced-motion: reduce) {
          [data-fade-up] { transition: none !important; }
          .exp-panel { animation: none !important; }
        }
      `}</style>

      <div
        aria-hidden
        className="grid-background pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#F8F8F8 1px, transparent 1px), linear-gradient(90deg, #F8F8F8 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] bottom-0 -z-0 h-[340px] w-[340px] rounded-full bg-[#9EF2C6]/10 blur-[120px]"
      /> */}

      <div className="relative mx-auto w-full max-w-[1450px]">
        <div data-fade-up style={fadeUp(0)} className="max-w-[560px]">
          <span className="font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-[#9EF2C6]">
            Where I&apos;ve worked
          </span>
          <h2 className="mt-3 font-mono text-[30px] font-bold leading-[1.15] tracking-tight text-[#F8F8F8] sm:text-[36px]">
            Experience
          </h2>
        </div>

        <div
          data-fade-up
          style={fadeUp(150)}
          className="mt-10 overflow-hidden rounded-2xl bg-[#2D2F33] ring-1 ring-white/5"
        >
          
          <div className="flex gap-2 overflow-x-auto border-b border-white/5 px-4 py-3 md:hidden">
            {roles.map((r, i) => (
              <button
                key={r.company}
                onClick={() => setActive(i)}
                className={`shrink-0 whitespace-nowrap rounded-md px-3.5 py-2 font-mono text-[12px] font-bold uppercase tracking-wide transition-colors duration-200 ${
                  active === i
                    ? "bg-[#9EF2C6] text-[#10240F]"
                    : "bg-[#333438] text-[#A4A5A9]"
                }`}
              >
                {r.company}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1px_1fr]">
            <div className="relative hidden py-3 pl-3 pr-1 md:block">
              <span
                aria-hidden
                className="absolute left-3 top-3 w-[3px] rounded-full bg-[#9EF2C6] transition-transform duration-300 ease-out"
                style={{
                  height: TAB_HEIGHT - 16,
                  transform: `translateY(${active * TAB_HEIGHT + 8}px)`,
                }}
              />
              {roles.map((r, i) => (
                <button
                  key={r.company}
                  onClick={() => setActive(i)}
                  style={{ height: TAB_HEIGHT }}
                  className="group flex w-full flex-col justify-center gap-0.5 rounded-lg pl-5 pr-3 text-left transition-colors duration-200"
                >
                  <span
                    className={`font-mono text-[13px] font-bold transition-colors duration-200 ${
                      active === i ? "text-[#F8F8F8]" : "text-[#A4A5A9] group-hover:text-[#F8F8F8]"
                    }`}
                  >
                    {r.company}
                  </span>
                  <span className="font-mono text-[11px] text-[#6C6E72]">{r.period}</span>
                </button>
              ))}
            </div>

            <div aria-hidden className="hidden bg-white/5 md:block" />

           
            <div key={active} className="exp-panel flex flex-col justify-center p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#333438] text-[#9EF2C6] ring-1 ring-white/5">
                  <Briefcase className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <span className="font-mono text-[11.5px] font-bold uppercase tracking-widest text-[#9EF2C6]">
                  {role.period}
                </span>
              </div>

              <h3 className="mt-4 font-mono text-[19px] font-bold text-[#F8F8F8]">
                {role.title}
              </h3>
              <p className="mt-0.5 font-mono text-[13px] text-[#A4A5A9]">{role.company}</p>

              <p className="mt-4 max-w-[560px] font-mono text-[13.5px] leading-[1.7] text-[#A4A5A9]">
                {role.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {role.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-[#333438] px-2.5 py-1 text-[11px] text-[#F8F8F8] ring-1 ring-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}