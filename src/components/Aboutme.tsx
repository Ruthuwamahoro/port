"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { highlights, services } from "@/constants/services";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    transition: `opacity 0.5s ease-out ${delayMs}ms, transform 0.5s ease-out ${delayMs}ms`,
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#1F2124] px-6 py-14 sm:px-10 sm:py-16 lg:px-16">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-fade-up] { transition: none !important; }
          .about-float { animation: none !important; }
        }
        @keyframes about-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <div
        aria-hidden
        className="grid-background pointer-events-none absolute inset-0 opacity-[0.04]"
      />

      <div className="relative mx-auto grid w-full max-w-[1250px] grid-cols-1 gap-6 md:grid-cols-2 md:items-center md:gap-12">
        <div data-fade-up style={fadeUp(0)} className="flex flex-col justify-center xl:pl-6">
          <div className="flex items-center gap-4">
            <div>
              <span className="font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-[#9EF2C6]">
                Introduce
              </span>
              <h2 className="font-mono text-[26px] font-bold leading-[1.1] tracking-tight text-[#F8F8F8] sm:text-[30px]">
                About me
              </h2>
            </div>
          </div>

          <p className="mt-5 max-w-[480px] font-mono text-[13px] leading-[1.65] text-[#A4A5A9]">
          Hi! I&apos;m Ruth UWAMAHORO, a passionate Software Developer with over 4 years of experience creating innovative digital solutions. I specialize in full-stack development using modern technologies.

My journey in tech started with a curiosity about how things work behind the scenes. Today, I&apos;m driven by the challenge of solving complex problems and creating user-friendly applications that make a real impact.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2.5">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 rounded-full bg-[#2D2F33] py-1.5 pl-1.5 pr-3 font-mono text-[12px] text-[#F8F8F8] ring-1 ring-white/5"
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#9EF2C6]">
                  <Check className="h-2.5 w-2.5 text-[#10240F]" strokeWidth={3.5} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          data-fade-up
          style={fadeUp(120)}
          className="rounded-2xl bg-[#2D2F33] px-6 py-5 ring-1 ring-white/5 sm:px-8 sm:py-6"
        >
          <div className="divide-y divide-white/10">
            {services.map(({ title, description, href, Icon, project }) => (
              <div
                key={title}
                className="group flex items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#333438] text-[#9EF2C6] ring-1 ring-white/5 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#9EF2C6] group-hover:text-[#10240F]">
                  <Icon className="h-4 w-4" strokeWidth={2} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="font-mono text-[14px] font-bold text-[#F8F8F8]">
                    {title}
                  </h3>
                  <p className="mt-0.5 truncate font-mono text-[12px] leading-[1.4] text-[#A4A5A9]">
                    {description}
                  </p>
                </div>

                <Link
                  href={href}
                  className="flex shrink-0 items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-wide text-[#9EF2C6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EF2C6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2F33]"
                >
                  {project}
                  <ArrowUpRight
                    className="h-3 w-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2.5}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}