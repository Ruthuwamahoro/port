"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

export default function Testimonials() {
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
    transition: `opacity 0.5s ease-out ${delayMs}ms, transform 0.5s ease-out ${delayMs}ms`,
  });

  const current = testimonials[active];
  const columnWidth = 100 / testimonials.length;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#2D2F33] px-6 py-16 sm:px-10 sm:py-20 lg:px-16"
      id="testimonials"
    >
      <style>{`
        @keyframes testi-in {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .testi-in { animation: testi-in 0.35s ease-out; }
        @media (prefers-reduced-motion: reduce) {
          [data-fade-up] { transition: none !important; }
          .testi-in { animation: none !important; }
        }
      `}</style>

      <div
        aria-hidden
        className="grid-background pointer-events-none absolute inset-0 opacity-[0.05]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/2 top-0 -z-0 h-[380px] w-[380px] translate-x-1/2 rounded-full bg-[#9EF2C6]/10 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1250px]">
        <div data-fade-up style={fadeUp(0)} className="text-left">
          <span className="font-mono text-[12.5px] font-bold uppercase tracking-[0.2em] text-[#9EF2C6]">
            what people are saying
          </span>
          <h2 className="mt-3 font-mono text-[28px] font-bold tracking-tight text-[#F8F8F8] sm:text-[32px]">
            Testimonials
          </h2>
        </div>

        <div
          data-fade-up
          style={fadeUp(120)}
          className="relative mt-8 overflow-hidden rounded-2xl bg-[#26282B] p-7 ring-1 ring-white/5"
        >
          <Quote
            aria-hidden
            className="absolute right-6 top-6 h-11 w-11 text-white/[0.06]"
            strokeWidth={1.5}
          />

          <div key={active} className="testi-in relative">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < current.rating ? "text-[#9EF2C6]" : "text-white/10"
                    }`}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <span className="font-mono text-[11px] text-[#A4A5A9]">
                {current.rating.toFixed(1)} Rating
              </span>
            </div>

            <p className="mt-5 font-mono text-[14.5px] leading-[1.7] text-[#F8F8F8]">
              {current.quote}
            </p>
          </div>
        </div>

        <div data-fade-up style={fadeUp(220)} className="mt-7">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-3">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setActive(i)}
                className="group flex items-center gap-2.5 text-left"
              >
                <div
                  className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-2 transition-all duration-300 ${
                    active === i ? "ring-[#9EF2C6]" : "ring-transparent"
                  }`}
                >
                  {t.avatar ? (
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#333438] font-mono text-[11px] font-bold text-[#9EF2C6]">
                      {initials(t.name)}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className={`truncate font-mono text-[12.5px] font-bold transition-colors duration-200 ${
                      active === i ? "text-[#F8F8F8]" : "text-[#A4A5A9] group-hover:text-[#F8F8F8]"
                    }`}
                  >
                    {t.name}
                  </p>
                  <p className="truncate font-mono text-[10.5px] text-[#6C6E72]">
                    {t.role}, <span className="font-bold text-[#9EF2C6]">{t.company}</span>
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="relative mt-4 h-px w-full bg-white/10">
            <span
              className="absolute left-0 top-0 h-[2px] rounded-full bg-[#9EF2C6] transition-transform duration-300 ease-out"
              style={{
                width: `${columnWidth}%`,
                transform: `translateX(${active * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}