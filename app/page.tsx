import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { ThemeObserver } from "@/components/motion/theme-observer";
import { Scene } from "@/components/scene/scene";
import { About } from "@/components/site/about";
import { Contact } from "@/components/site/contact";
import { Experience } from "@/components/site/experience";
import { Hero } from "@/components/site/hero";
import { MoreWork } from "@/components/site/more-work";
import { Nav } from "@/components/site/nav";
import { Work } from "@/components/site/work";
import "@/components/site/site.css";

const navySections = ["about", "contact"];

export default function Home() {
  return (
    <>
      <a href="#main" className="skip-link label">
        Skip to content
      </a>
      <Nav />
      <Scene />
      <SmoothScroll />
      <ThemeObserver targets={navySections} />
      <main id="main" className="relative">
        <Hero />
        <Work />
        <Experience />
        <MoreWork />
        <About />
        <Contact />
      </main>
    </>
  );
}
