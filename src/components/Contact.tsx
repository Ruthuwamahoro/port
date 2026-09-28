"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import Link from "next/link";
import { Check, Copy, Send } from "lucide-react";

const EMAIL = "ruthuwamahoro250@gmail.com";

// Leave href empty to hide a link until you have the real URL.
const socials = [
  { label: "GitHub", href: "https://github.com/Ruthuwamahoro" },
  { label: "LinkedIn", href: "" },
  { label: "Twitter", href: "" },
].filter((s) => s.href);

type Status = "idle" | "submitting" | "sent" | "error";

// text-base on mobile (16px) stops iOS Safari from zooming into the field on focus.
const fieldClasses =
  "w-full min-w-0 rounded-none border-0 border-b border-white/75 bg-transparent px-0 py-3 font-mono text-base text-[#F8F8F8] placeholder:text-[#6C6E72] outline-none transition-colors duration-200 focus:border-[#9EF2C6] sm:py-2.5 sm:text-[14px]";

const labelClasses = "block font-mono text-[12px] text-[#A4A5A9]";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

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

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contacts"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#2D2F33] px-4 py-12 min-[400px]:px-5 sm:px-10 sm:py-20 md:py-24 lg:px-16 xl:px-24 2xl:px-[132px]"
    >
      <div
        aria-hidden
        className="grid-background pointer-events-none absolute inset-0 opacity-[0.05]"
      />

      <div
        className={`relative mx-auto grid w-full max-w-[1250px] grid-cols-1 gap-12 transition-all duration-700 ease-out motion-reduce:transition-none sm:gap-14 lg:grid-cols-[5fr_6fr] lg:gap-16 xl:gap-24 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        } motion-reduce:translate-y-0 motion-reduce:opacity-100`}
      >
        {/* Left: the person */}
        <div className="flex min-w-0 flex-col">
          <h2 className="font-mono text-[clamp(1.875rem,8vw,2.75rem)] font-bold leading-[1.1] tracking-tight text-[#F8F8F8] lg:text-[clamp(2.25rem,3.4vw,3rem)]">
            Alright,
            <br />
            let&apos;s talk.
          </h2>
          <p className="mt-5 max-w-[40ch] font-mono text-[13px] leading-[1.75] text-[#A4A5A9] sm:mt-6 sm:text-[14px]">
            Have a project in mind, or just want to talk shop? My inbox is
            open. I usually reply within a day or two.
          </p>

          <div className="mt-8 sm:mt-10">
            <p className={labelClasses}>Write to me</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Link
                href={`mailto:${EMAIL}`}
                className="group block max-w-full break-all font-mono text-[clamp(0.8rem,4.4vw,1.5rem)] font-bold text-[#9EF2C6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EF2C6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2F33]"
              >
                <span className="relative inline-block max-w-full">
                  {EMAIL}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[#9EF2C6] transition-transform duration-300 ease-out group-hover:scale-x-0 group-focus-visible:scale-x-0 motion-reduce:transition-none" />
                  <span className="absolute -bottom-1 right-0 h-[2px] w-full origin-right scale-x-0 bg-[#9EF2C6] transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none" />
                </span>
              </Link>
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className="inline-flex h-10 items-center gap-1.5 rounded-md px-2.5 font-mono text-[12px] text-[#A4A5A9] transition-colors hover:text-[#F8F8F8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EF2C6] sm:h-9"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-[#9EF2C6]" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <dl className="mt-8 grid w-full max-w-[420px] grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-white/10 pt-5 font-mono text-[13px] sm:mt-10 sm:gap-x-8">
            <dt className="text-[#A4A5A9]">Based in</dt>
            <dd className="text-[#F8F8F8]">Kigali, Rwanda</dd>
            {socials.length > 0 && (
              <>
                <dt className="text-[#A4A5A9]">Elsewhere</dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-2">
                  {socials.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#F8F8F8] transition-colors hover:text-[#9EF2C6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EF2C6]"
                    >
                      {label}
                    </Link>
                  ))}
                </dd>
              </>
            )}
          </dl>
        </div>

        {/* Right: a quiet form, no card */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full min-w-0 max-w-2xl flex-col gap-6 sm:gap-7 lg:max-w-none lg:pt-3"
          aria-label="Contact form"
        >
          <div>
            <label htmlFor="name" className={labelClasses}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Jane Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={fieldClasses}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClasses}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="jane@company.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={fieldClasses}
            />
          </div>

          <div>
            <label htmlFor="message" className={labelClasses}>
              What are you working on?
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              placeholder="A few lines is plenty."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${fieldClasses} resize-none`}
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#9EF2C6] px-6 py-3.5 font-mono text-[13px] font-bold text-[#10240F] transition-colors duration-200 hover:bg-[#8be3b6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EF2C6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2F33] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:py-3"
            >
              {status === "submitting" ? "Sending..." : "Send message"}
              {status !== "submitting" && (
                <Send
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  strokeWidth={2.5}
                />
              )}
            </button>

            <p
              aria-live="polite"
              className="font-mono text-[12.5px] sm:min-h-0"
            >
              {status === "sent" && (
                <span className="text-[#9EF2C6]">
                  Got it. I&apos;ll get back to you soon.
                </span>
              )}
              {status === "error" && (
                <span className="text-[#F87171]">
                  That didn&apos;t send. Try again, or email me directly.
                </span>
              )}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}