"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { skillGroups } from "@/constants/skills";


const currentlyLearning: string[] = [];

export default function Skills() {
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
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const rows = [
    ...skillGroups.map(({ key, label, skills }) => ({ key, label, skills })),
    ...(currentlyLearning.length
      ? [{ key: "learning", label: "Learning", skills: currentlyLearning }]
      : []),
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden bg-[#2D2F33] px-5 py-14 sm:px-10 sm:py-16 lg:px-16 xl:px-[132px]"
    >
      <div
        aria-hidden
        className="grid-background pointer-events-none absolute inset-0 opacity-[0.05]"
      />

      <div
        className={`relative mx-auto grid w-full max-w-8xl gap-8 transition-all duration-700 ease-out motion-reduce:transition-none lg:grid-cols-[minmax(0,340px)_1fr] lg:gap-16 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        } motion-reduce:translate-y-0 motion-reduce:opacity-100`}
      >
        <div>
          <h2 className="font-mono text-[28px] font-bold leading-[1.15] tracking-tight text-[#F8F8F8] sm:text-[34px]">
            What I work with
          </h2>
          <p className="mt-4 max-w-[38ch] font-mono text-[14px] leading-[1.7] text-[#A4A5A9]">
            I&apos;d rather know a few tools well than list everything
            I&apos;ve touched once.
          </p>
          <Link
            href="#contacts"
            className="group mt-5 inline-block py-1 font-mono text-[13px] text-[#F8F8F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EF2C6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2F33]"
          >
            Don&apos;t see your stack? Tell me what you use.
            <span className="mt-1 block h-px w-full origin-left scale-x-0 bg-[#9EF2C6] transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none" />
          </Link>
        </div>

        <dl className="border-b border-[#9EF2C6]">
          {rows.map(({ key, label, skills }) => (
            <div
              key={key}
              className="grid gap-1.5 border-t border-[#9EF2C6] py-3.5 sm:grid-cols-[130px_1fr] sm:gap-6"
            >
              <dt className="font-mono text-[13px] font-bold text-[#9EF2C6]">
                {label}
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13.5px] text-[#F8F8F8]/90">
                  {skills.map((skill) => (
                    <li
                      key={skill}
                      className="transition-colors duration-200 hover:text-[#9EF2C6]"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}