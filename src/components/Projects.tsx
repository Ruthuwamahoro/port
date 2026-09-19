"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetProjects } from "@/hooks/useGetProjects";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string; // comma-separated string from DB
  releaseTime: string;
  cover: string;
  livelink?: string;
  githubLink?: string;
};

const ITEMS_PER_PAGE = 3;

// helper: "next.js, tailwind, drizzle" -> ["next.js", "tailwind", "drizzle"]
function parseTechStack(techStack?: string): string[] {
  if (!techStack) return [];
  return techStack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

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
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { data, isPending, error } = useGetProjects();

  const projects: Project[] = useMemo(() => data?.data ?? [], [data]);

  const fadeUp = (delayMs: number): React.CSSProperties => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.6s ease-out ${delayMs}ms, transform 0.6s ease-out ${delayMs}ms`,
  });

  const totalPages = Math.max(1, Math.ceil(projects.length / ITEMS_PER_PAGE));
  const start = page * ITEMS_PER_PAGE;
  const currentItems = useMemo(
    () => projects.slice(start, start + ITEMS_PER_PAGE),
    [projects, start]
  );

  const showFeatured = page === 0;
  // BUG FIX: this was `projects` (the whole array). It should be a single project.
  const featured = showFeatured ? projects[0] : undefined;

  const gridItems = showFeatured ? currentItems.slice(1) : currentItems;

  function goTo(next: number) {
    if (next === page || next < 0 || next >= totalPages) return;
    setDirection(next > page ? "next" : "prev");
    setPage(next);
  }

  if (isPending) {
    return (
      <section className="relative overflow-hidden bg-[#1F2124] px-6 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="relative mx-auto w-full max-w-[1450px] animate-pulse">
          {/* header skeleton */}
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-[560px] space-y-3">
              <div className="h-3 w-32 rounded bg-[#2D2F33]" />
              <div className="h-8 w-48 rounded bg-[#2D2F33]" />
            </div>
            <div className="h-3 w-64 rounded bg-[#2D2F33]" />
          </div>
  
          {/* featured skeleton */}
          <div className="mt-12 grid grid-cols-1 overflow-hidden rounded-2xl bg-[#2D2F33] ring-1 ring-white/5 md:grid-cols-2">
            <div className="aspect-video bg-[#333438] md:aspect-auto md:min-h-[320px]" />
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-10">
              <div className="h-3 w-28 rounded bg-[#333438]" />
              <div className="h-6 w-3/4 rounded bg-[#333438]" />
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-[#333438]" />
                <div className="h-3 w-5/6 rounded bg-[#333438]" />
              </div>
              <div className="flex gap-2 pt-2">
                <div className="h-6 w-16 rounded-md bg-[#333438]" />
                <div className="h-6 w-16 rounded-md bg-[#333438]" />
                <div className="h-6 w-16 rounded-md bg-[#333438]" />
              </div>
            </div>
          </div>
  
          {/* grid skeleton */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col overflow-hidden rounded-2xl bg-[#2D2F33] ring-1 ring-white/5"
              >
                <div className="aspect-[16/10] bg-[#333438]" />
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="h-4 w-2/3 rounded bg-[#333438]" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-[#333438]" />
                    <div className="h-3 w-4/5 rounded bg-[#333438]" />
                  </div>
                  <div className="flex gap-1.5">
                    <div className="h-5 w-12 rounded-md bg-[#333438]" />
                    <div className="h-5 w-12 rounded-md bg-[#333438]" />
                  </div>
                  <div className="mt-2 h-4 w-1/3 rounded bg-[#333438] border-t border-white/5 pt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#1F2124] px-6 py-20 text-center text-red-400">
        Failed to load projects.
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#1F2124] px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
      id="projects"
    >
      <style>{`
        @keyframes proj-in-next {
          from { opacity: 0; transform: translateX(28px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes proj-in-prev {
          from { opacity: 0; transform: translateX(-28px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .proj-in-next { animation: proj-in-next 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
        .proj-in-prev { animation: proj-in-prev 0.45s cubic-bezier(0.22, 1, 0.36, 1); }
        @media (prefers-reduced-motion: reduce) {
          [data-fade-up] { transition: none !important; }
          .proj-in-next, .proj-in-prev { animation: none !important; }
        }
      `}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#F8F8F8 1px, transparent 1px), linear-gradient(90deg, #F8F8F8 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[4%] top-1/4 -z-0 h-[380px] w-[380px] rounded-full bg-[#9EF2C6]/10 blur-[120px]"
      />

      <div className="relative mx-auto w-full max-w-[1450px]">
        <div
          data-fade-up
          style={fadeUp(0)}
          className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-[560px]">
            <span className="font-mono text-[13px] font-bold uppercase tracking-[0.2em] text-[#9EF2C6]">
              Selected work
            </span>
            <h2 className="mt-4 font-mono text-[34px] font-bold leading-[1.15] tracking-tight text-[#F8F8F8] sm:text-[40px]">
              Projects
            </h2>
          </div>
          <p className="max-w-[320px] font-mono text-[13px] leading-[1.65] text-[#A4A5A9] sm:text-right">
            Every build I&apos;ve shipped to real users &mdash; browse the
            full list, page by page.
          </p>
        </div>

        <div key={page} className={`mt-12 ${direction === "next" ? "proj-in-next" : "proj-in-prev"}`}>
          {featured && (
            <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-[#2D2F33] ring-1 ring-white/5 md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D2F33]/40 via-transparent to-transparent md:bg-gradient-to-r" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10">
                <span className="font-mono text-[11.5px] font-bold uppercase tracking-widest text-[#9EF2C6]">
                  Featured &middot; {featured.releaseTime}
                </span>
                <h3 className="mt-3 font-mono text-[24px] font-bold text-[#F8F8F8]">
                  {featured.title}
                </h3>
                <p className="mt-3 font-mono text-[13.5px] leading-[1.7] text-[#A4A5A9]">
                  {featured.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {parseTechStack(featured.techStack).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-[#333438] px-3 py-1 text-[11.5px] text-[#F8F8F8] ring-1 ring-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex items-center gap-6">
                  {featured.livelink && (
                    <Link
                      href={featured.livelink}
                      className="group inline-flex items-center gap-1 font-mono text-[12.5px] font-bold uppercase tracking-wide text-[#9EF2C6]"
                    >
                      View live
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  )}
                  {featured.githubLink && (
                    <Link
                      href={featured.githubLink}
                      className="inline-flex items-center gap-1.5 font-mono text-[12.5px] text-[#A4A5A9] transition-colors duration-200 hover:text-[#F8F8F8]"
                    >
                      <Github className="h-3.5 w-3.5" />
                      Source
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {gridItems.map((project) => (
              <div
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-2xl bg-[#2D2F33] ring-1 ring-white/5 transition-all duration-300 hover:-translate-y-1 hover:ring-[#9EF2C6]/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D2F33] via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 rounded-md bg-[#1F2124]/80 px-2.5 py-1 font-mono text-[11px] text-[#A4A5A9] backdrop-blur-sm">
                    {project.releaseTime}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-mono text-[16px] font-bold text-[#F8F8F8]">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 font-mono text-[13px] leading-[1.65] text-[#A4A5A9]">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {parseTechStack(project.techStack).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-[#333438] px-2.5 py-1 text-[11px] text-[#F8F8F8] ring-1 ring-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex items-center gap-5 border-t border-white/5 pt-4">
                    {project.livelink && (
                      <Link
                        href={project.livelink}
                        className="group/link inline-flex items-center gap-1 font-mono text-[11.5px] font-bold uppercase tracking-wide text-[#9EF2C6]"
                      >
                        View live
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link
                        href={project.githubLink}
                        className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-[#A4A5A9] transition-colors duration-200 hover:text-[#F8F8F8]"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Source
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <div
            data-fade-up
            style={fadeUp(150)}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
          >
            <p className="font-mono text-[12px] text-[#6C6E72]">
              Showing {start + 1}&ndash;{Math.min(start + ITEMS_PER_PAGE, projects.length)} of{" "}
              {projects.length} projects
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => goTo(page - 1)}
                disabled={page === 0}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2D2F33] text-[#F8F8F8] ring-1 ring-white/10 transition-all duration-200 hover:ring-[#9EF2C6]/40 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:ring-white/10"
              >
                <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
              </button>

              <div className="relative flex items-center gap-2 rounded-full bg-[#2D2F33] p-1.5 ring-1 ring-white/5">
                <span
                  aria-hidden
                  className="absolute h-9 w-9 rounded-full bg-[#9EF2C6] transition-transform duration-300 ease-out"
                  style={{ transform: `translateX(${page * 44}px)` }}
                />
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Page ${i + 1}`}
                    aria-current={page === i}
                    className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full font-mono text-[12.5px] font-bold transition-colors duration-200 ${
                      page === i ? "text-[#10240F]" : "text-[#A4A5A9] hover:text-[#F8F8F8]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(page + 1)}
                disabled={page === totalPages - 1}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2D2F33] text-[#F8F8F8] ring-1 ring-white/10 transition-all duration-200 hover:ring-[#9EF2C6]/40 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:ring-white/10"
              >
                <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}