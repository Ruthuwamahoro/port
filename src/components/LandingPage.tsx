"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "./Navbar";

const HIDDEN = "-999px";
const SPOTLIGHT =
  "radial-gradient(circle 170px at var(--mx) var(--my), #000 30%, transparent 100%)";

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(e: React.PointerEvent<HTMLElement>) {
    if (e.pointerType === "touch") return;
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    stage.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    stage.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  function handlePointerLeave() {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--mx", HIDDEN);
    stage.style.setProperty("--my", HIDDEN);
  }

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-[#2D2F33]"
    >
      <style>{`
        @keyframes hero-rise {
          from { opacity: 0; transform: translateY(105%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-fade {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-caret {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        .hero-rise  { opacity: 0; animation: hero-rise 0.8s cubic-bezier(0.2, 0.7, 0.2, 1) var(--d, 0ms) forwards; }
        .hero-fade  { opacity: 0; animation: hero-fade 0.7s ease-out var(--d, 0ms) forwards; }
        .hero-caret { animation: hero-caret 1s step-end infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-rise, .hero-fade, .hero-caret {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* Portrait */}
      <div
        ref={stageRef}
        style={{ "--mx": HIDDEN, "--my": HIDDEN } as React.CSSProperties}
        className="absolute inset-y-0 right-0 z-0 w-full sm:w-[62%]"
      >
        <Image
          src="/images/aboutus.jpeg"
          alt="Ruth Uwamahoro"
          fill
          priority
          sizes="(min-width: 640px) 62vw, 100vw"
          className="object-cover object-[center_15%] grayscale contrast-110 brightness-90"
        />
        <Image
          src="/images/aboutus.jpeg"
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 640px) 62vw, 100vw"
          className="object-cover object-[center_15%]"
          style={{ maskImage: SPOTLIGHT, WebkitMaskImage: SPOTLIGHT }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2F33] via-[#2D2F33]/60 to-[#2D2F33]/10 sm:bg-gradient-to-r sm:from-[#2D2F33] sm:via-[#2D2F33]/25 sm:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-[#2D2F33] to-transparent sm:block" />
      </div>

      <div
        aria-hidden
        className="grid-background pointer-events-none absolute inset-0 z-[1] opacity-[0.05]"
      />

      <div className="relative z-20">
        <Navbar />
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1450px] flex-1 flex-col justify-end px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-10 sm:justify-center sm:px-10 sm:pb-10 sm:pt-6 lg:px-16 xl:pl-[132px]">
        <div className="pointer-events-auto flex w-full flex-col">
          <div
            className="hero-fade flex flex-wrap items-center gap-x-4 gap-y-2"
            style={{ "--d": "0ms" } as React.CSSProperties}
          >
            <Badge className="w-fit rounded-md bg-[#9EF2C6] px-3.5 py-1.5 text-[13px] font-semibold leading-none text-[#10240F]">
              Full Stack Developer
            </Badge>
          </div>

          <h1 className="mt-6 font-mono text-[clamp(1.6rem,8.4vw,3.25rem)] font-bold leading-[1.04] tracking-tight sm:mt-8 sm:text-[clamp(2rem,5.6vw,5.25rem)]">
            <span className="block overflow-hidden pb-[0.12em]">
              <span
                className="hero-rise block text-[#A4A5A9]"
                style={{ "--d": "150ms" } as React.CSSProperties}
              >
                Talk is cheap.
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.12em]">
              <span
                className="hero-rise block text-[#F8F8F8]"
                style={{ "--d": "350ms" } as React.CSSProperties}
              >
                Show me the code
                <span
                  aria-hidden
                  className="hero-caret ml-1 inline-block h-[0.85em] w-[0.09em] translate-y-[0.06em] bg-[#9EF2C6] align-middle"
                />
              </span>
            </span>
          </h1>

          <p
            className="hero-fade mt-6 max-w-[34ch] font-mono text-[14px] leading-[1.6] text-[#F8F8F8]/80 sm:mt-8 sm:text-[15px] 2xl:text-base"
            style={{ "--d": "700ms" } as React.CSSProperties}
          >
            I build for the web and mobile from Rwanda. My favourite part is when
            someone actually uses the thing.
          </p>

          <Link
            href="#contacts"
            className="hero-fade group mt-6 w-fit py-2 font-mono text-[14px] font-bold uppercase tracking-wide text-[#9EF2C6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EF2C6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2F33] sm:mt-7 2xl:text-base"
            style={{ "--d": "850ms" } as React.CSSProperties}
          >
            <span className="relative">
              Let&apos;s talk
              <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[#9EF2C6] transition-transform duration-300 ease-out group-hover:scale-x-0 group-focus-visible:scale-x-0" />
              <span className="absolute -bottom-1 right-0 h-[2px] w-full origin-right scale-x-0 bg-[#9EF2C6] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100" />
            </span>
          </Link>

          <ul
            className="hero-fade mt-8 flex flex-wrap gap-x-8 gap-y-1 border-t border-[#F8F8F8]/10 pt-4 font-mono text-[12px] text-[#A4A5A9] sm:mt-12 sm:gap-x-10 sm:max-w-[560px] lg:mt-16 2xl:text-[13px] [@media(max-height:500px)]:hidden"
            style={{ "--d": "1000ms" } as React.CSSProperties}
          >
            <li>Kigali, Rwanda</li>
            <li>4 years of building</li>
            <li>20+ projects shipped</li>
          </ul>
        </div>
      </div>
    </section>
  );
}