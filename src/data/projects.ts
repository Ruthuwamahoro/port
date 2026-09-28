// Content for the Projects section. Replace every "[ADD REAL DETAIL: ...]" with the real thing.
// Only emoHub's problem line is real copy (from your brief). Nothing else is invented.

export type Project = {
  number: string;
  title: string;
  meta: string; // one line, e.g. "Full-stack developer, Next.js / TypeScript / PostgreSQL"
  problem: string; // the human problem, before the product existed
  question: string; // the one question that made it worth building
  built: string; // what I did, with one technology choice tied to a decision
  hardPart: string; // one challenge and how I approached it
  lesson: string; // what remained
  image?: string; // e.g. "/projects/emohub.png". Leave undefined for a placeholder frame
  imageAlt: string;
  live?: string;
  github?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    number: "01",
    title: "emoHub",
    meta: "Capstone. [ADD REAL DETAIL: role and stack]",
    problem:
      "People had things they wanted to say, but not always a place where they felt comfortable saying them.",
    question: "[ADD REAL DETAIL: the question you were trying to answer]",
    built:
      "[ADD REAL DETAIL: what you built and decided, with one technology choice and why]",
    hardPart: "[ADD REAL DETAIL: one real challenge and how you worked through it]",
    lesson: "[ADD REAL DETAIL: what changed in how you think]",
    imageAlt: "emoHub interface. [ADD REAL DETAIL: describe the screen]",
    featured: true,
  },
  {
    number: "02",
    title: "[Project two]",
    meta: "[ADD REAL DETAIL: role and stack]",
    problem: "[ADD REAL DETAIL: the human problem]",
    question: "[ADD REAL DETAIL: the question that started it]",
    built: "[ADD REAL DETAIL: what you built and decided]",
    hardPart: "[ADD REAL DETAIL: the challenge and your approach]",
    lesson: "[ADD REAL DETAIL: what stayed with you]",
    imageAlt: "[ADD REAL DETAIL: describe the screenshot]",
  },
  {
    number: "03",
    title: "[Project three]",
    meta: "[ADD REAL DETAIL: role and stack]",
    problem: "[ADD REAL DETAIL: the human problem]",
    question: "[ADD REAL DETAIL: the question that started it]",
    built: "[ADD REAL DETAIL: what you built and decided]",
    hardPart: "[ADD REAL DETAIL: the challenge and your approach]",
    lesson: "[ADD REAL DETAIL: what stayed with you]",
    imageAlt: "[ADD REAL DETAIL: describe the screenshot]",
  },
];