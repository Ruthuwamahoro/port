import About from "@/components/Aboutme";
import { Contact } from "@/components/Contact";
import Experience from "@/components/Experience";
import { Footer } from "@/components/Footer";
import Hero from "@/components/LandingPage";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero/>
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
