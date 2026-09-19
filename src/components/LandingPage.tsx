
// import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
// import { Navbar } from "./Navbar";
// import Link from "next/link";

// export function Hero() {
//   return (
//     <section className="relative overflow-hidden bg-[#2D2F33]">

//       <style>{`
//         @keyframes hero-float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         @keyframes hero-pulse-dot {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.4; transform: scale(1.4); }
//         }
//         @keyframes hero-fade-up {
//           from { opacity: 0; transform: translateY(14px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes hero-blink-caret {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0; }
//         }
//         .hero-float { animation: hero-float 4s ease-in-out infinite; }
//         .hero-float-slow { animation: hero-float 6s ease-in-out infinite; }
//         .hero-pulse-dot { animation: hero-pulse-dot 2s ease-in-out infinite; }
//         .hero-blink-caret { animation: hero-blink-caret 1s step-end infinite; }
//         @media (prefers-reduced-motion: reduce) {
//           .hero-float, .hero-float-slow, .hero-pulse-dot, .hero-blink-caret {
//             animation: none;
//           }
//           [data-fade-up] {
//             animation: none !important;
//             opacity: 1 !important;
//             transform: none !important;
//           }
//         }
//       `}</style>

//       <div
//         aria-hidden
//         className="pointer-events-none absolute inset-0 opacity-[0.05]"
//         style={{
//           backgroundImage:
//             "linear-gradient(#F8F8F8 1px, transparent 1px), linear-gradient(90deg, #F8F8F8 1px, transparent 1px)",
//           backgroundSize: "44px 44px",
//         }}
//       />
//       <div
//         aria-hidden
//         className="pointer-events-none absolute right-0 top-1/3 -z-0 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#9EF2C6]/10 blur-[120px]"
//       />

//       <Navbar />

//       <div className="relative mx-auto grid w-full max-w-[1450px] grid-cols-1 items-center gap-14 px-6 pb-16 pt-6 sm:px-10 md:grid-cols-2 lg:px-16 xl:gap-10 xl:pb-24 xl:pt-[26px]">
//         <div className="relative z-10 flex flex-col xl:pl-[132px]">
//           <Badge
//             data-fade-up
//             style={{ opacity: 0, animation: "hero-fade-up 0.6s ease-out 0ms forwards" }}
//             className="w-fit rounded-md bg-[#9EF2C6] px-4 py-[7px] text-[13px] font-semibold leading-none text-[#10240F]"
//           >
//             Full Stack Developer
//           </Badge>

//           <h1 data-fade-up
//             style={{ opacity: 0, animation: "hero-fade-up 0.6s ease-out 120ms forwards" }}
//             className="mt-9 font-mono text-[34px] font-bold leading-[1.16] tracking-tight text-[#F8F8F8] sm:text-[42px] xl:text-[44px]">
//             Talk is cheap.
//             <br />
//             Show me the code
//             <span
//               aria-hidden
//               className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[2px] hero-blink-caret bg-[#9EF2C6] align-middle"
//             />
//           </h1>

//           <p data-fade-up
//             style={{ opacity: 0, animation: "hero-fade-up 0.6s ease-out 240ms forwards" }}
//             className="mt-10 max-w-[320px] font-mono text-[13.5px] leading-[1.5] text-[#A4A5A9]">
//             Full-stack developer focused on clean code, great experiences, and real-world solutions.
//           </p>

//           <Link
//             href="#contacts"
//             data-fade-up
//             style={{ opacity: 0, animation: "hero-fade-up 0.6s ease-out 360ms forwards" }}
//             className="group mt-[46px] w-fit font-mono text-[13.5px] font-bold uppercase tracking-wide text-[#9EF2C6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EF2C6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2F33]"
//           >
//             <span className="relative">
//               Let&apos;s chat!
//               <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-100 bg-[#9EF2C6] transition-transform duration-300 ease-out group-hover:scale-x-0" />
//               <span className="absolute -bottom-1 right-0 h-[2px] w-full origin-right scale-x-0 bg-[#9EF2C6] transition-transform duration-300 ease-out group-hover:scale-x-100" />
//             </span>
//           </Link>

//           <div data-fade-up
//             style={{ opacity: 0, animation: "hero-fade-up 0.6s ease-out 480ms forwards" }}
//             className="relative left-[-100px] mt-16 flex items-center gap-10 sm:gap-14">
//             <div className="flex items-baseline gap-3">
//               <span className="font-mono text-[32px] font-bold leading-none text-[#F8F8F8] sm:text-[36px]">
//                 4
//               </span>
//               <span className="font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-wide text-[#A4A5A9]">
//                 Years
//                 <br />
//                 Experience
//               </span>
//             </div>
//             <div className="flex items-baseline gap-3">
//               <span className="font-mono text-[32px] font-bold leading-none text-[#F8F8F8] sm:text-[36px]">
//                 13+
//               </span>
//               <span className="font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-wide text-[#A4A5A9]">
//                 Projects Completed
//                 <br />
//                 In 18 Countries
//               </span>
//             </div>
//           </div>
//         </div>

//         <div data-fade-up
//           style={{ opacity: 0, animation: "hero-fade-up 0.6s ease-out 200ms forwards" }}
//           className="relative z-10 mx-auto aspect-square w-full max-w-[360px] sm:max-w-md md:max-w-none">

//           <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-full bg-[#26282B]/60 ring-1 ring-white/5">
//             <Image
//               src="/images/main.png"
//               alt="Graduation portrait"
//               fill
//               priority
//               quality={100}
//               sizes="(min-width: 1280px) 500px, (min-width: 768px) 40vw, 86vw"
//               className="object-cover object-[50%_8%]"
//             />
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

import { Badge } from "@/components/ui/badge";
import { Navbar } from "./Navbar";
import Link from "next/link";


export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#2D2F33]">

      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes hero-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.4); }
        }
        @keyframes hero-fade-up {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-blink-caret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes hero-video-zoom {
          0% { transform: scale(1.08); }
          50% { transform: scale(1.16); }
          100% { transform: scale(1.08); }
        }
        .hero-float { animation: hero-float 4s ease-in-out infinite; }
        .hero-float-slow { animation: hero-float 6s ease-in-out infinite; }
        .hero-pulse-dot { animation: hero-pulse-dot 2s ease-in-out infinite; }
        .hero-blink-caret { animation: hero-blink-caret 1s step-end infinite; }
        .hero-video-bg { animation: hero-video-zoom 20s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .hero-float, .hero-float-slow, .hero-pulse-dot, .hero-blink-caret, .hero-video-bg {
            animation: none;
          }
          [data-fade-up] {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Video background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="hero-video-bg h-full w-full object-cover"
          src="/images/myVideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        {/* Dark overlay so text stays readable over the moving footage */}
        {/* {/* <div className="absolute inset-0 bg-[#2D2F33]/70" /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D2F33] via-[#2D2F33]/60 to-transparent" /> 
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#F8F8F8 1px, transparent 1px), linear-gradient(90deg, #F8F8F8 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/3 z-[1] h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#9EF2C6]/10 blur-[120px]"
      />

      <div className="relative z-10">
        <Navbar />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-[1450px] grid-cols-1 items-center gap-14 px-6 pb-16 pt-6 sm:px-10 md:grid-cols-2 lg:px-16 xl:gap-10 xl:pb-24 xl:pt-[26px]">
        <div className="relative z-10 flex flex-col xl:pl-[132px]">
          <Badge
            data-fade-up
            style={{ opacity: 0, animation: "hero-fade-up 0.6s ease-out 0ms forwards" }}
            className="w-fit rounded-md bg-[#9EF2C6] px-4 py-[7px] text-[13px] font-semibold leading-none text-[#10240F]"
          >
            Full Stack Developer
          </Badge>

          <h1 data-fade-up
            style={{ opacity: 0, animation: "hero-fade-up 0.6s ease-out 120ms forwards" }}
            className="mt-9 font-mono text-[34px] font-bold leading-[1.16] tracking-tight text-[#F8F8F8] sm:text-[42px] xl:text-[44px]">
            Talk is cheap.
            <br />
            Show me the code
            <span
              aria-hidden
              className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[2px] hero-blink-caret bg-[#9EF2C6] align-middle"
            />
          </h1>

          <p data-fade-up
            style={{ opacity: 0, animation: "hero-fade-up 0.6s ease-out 240ms forwards" }}
            className="mt-10 max-w-[320px] font-mono text-[13.5px] leading-[1.5] text-[#A4A5A9]">
            Full-stack developer focused on clean code, great experiences, and real-world solutions.
          </p>

          <Link
            href="#contacts"
            data-fade-up
            style={{ opacity: 0, animation: "hero-fade-up 0.6s ease-out 360ms forwards" }}
            className="group mt-[46px] w-fit font-mono text-[13.5px] font-bold uppercase tracking-wide text-[#9EF2C6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9EF2C6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2F33]"
          >
            <span className="relative">
              Let&apos;s chat!
              <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-100 bg-[#9EF2C6] transition-transform duration-300 ease-out group-hover:scale-x-0" />
              <span className="absolute -bottom-1 right-0 h-[2px] w-full origin-right scale-x-0 bg-[#9EF2C6] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </span>
          </Link>

          <div data-fade-up
            style={{ opacity: 0, animation: "hero-fade-up 0.6s ease-out 480ms forwards" }}
            className="relative left-[-100px] mt-16 flex items-center gap-10 sm:gap-14">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[32px] font-bold leading-none text-[#F8F8F8] sm:text-[36px]">
                4
              </span>
              <span className="font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-wide text-[#A4A5A9]">
                Years
                <br />
                Experience
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[32px] font-bold leading-none text-[#F8F8F8] sm:text-[36px]">
                20+
              </span>
              <span className="font-mono text-[11px] font-medium uppercase leading-[1.5] tracking-wide text-[#A4A5A9]">
                Projects Completed
                <br />
              </span>
            </div>
          </div>
        </div>

        <div data-fade-up
          style={{ opacity: 0, animation: "hero-fade-up 0.6s ease-out 200ms forwards" }}
          className="relative z-10 mx-auto aspect-square w-full max-w-[360px] sm:max-w-md md:max-w-none">
        </div>
      </div>
    </section>
  );
}