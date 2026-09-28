type Testimonial = {
  quote: string;
  rating: number;
  name: string;
  role: string;
  company: string;
  avatar?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Ruth was a real pleasure to work with, and we'd gladly work with her again. She's someone you can trust with a project from start to finish.",
    rating: 5,
    name: "Samuel Rebero",
    role: "Project Lead",
    company: "ALU",
  },
  {
    quote:
      "She didn't just build what we asked for, she asked the right questions first. The handoff documentation alone saved our team weeks.",
    rating: 5,
    name: "Paolo Paganin",
    role: "Managing Director",
    company: "Africhem Rwanda LTD",
  },
  {
    quote:
      "It's rare to find someone who cares equally about the code and the person using it. Feedback from our users was noticeably better after launch.",
    rating: 5,
    name: "Ineza David",
    role: "Client",
    company: "Norrsken",
  },
];