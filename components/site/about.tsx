import { toolkit } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";

export function About() {
  return (
    <section id="about" data-scene="6" aria-labelledby="about-title" className="relative px-(--gutter) py-(--space-section)">
      <SectionHeader number="04" title="About" id="about-title" />

      <div className="mt-16 grid grid-cols-4 gap-x-(--gutter) md:mt-20 md:grid-cols-12">
        <Reveal
          as="p"
          variant="fade"
          className="display col-span-4 max-w-[18ch] text-[clamp(32px,4vw,68px)] leading-[1.02] tracking-[-0.035em] md:col-span-8 md:col-start-3"
        >
          The part of machine learning I care about comes after the notebook.
        </Reveal>

        <div className="prose-serif col-span-4 mt-12 max-w-[46ch] space-y-4 md:col-span-5 md:col-start-3 md:mt-14">
          <p>
            I&rsquo;m a computer science graduate student at Rice and a teaching assistant for automata theory. Most of
            what I build is about getting models to hold up in the real world: fine-tuning them for a narrow task,
            deploying them, and monitoring them once they&rsquo;re live.
          </p>
          <p>Outside of work, I support Chelsea.</p>
        </div>
      </div>

      <div className="mt-24 grid grid-cols-4 gap-x-(--gutter) md:mt-32 md:grid-cols-12">
        <h3 className="label col-span-4 mb-6 text-muted md:col-span-2">Toolkit</h3>
        <div className="col-span-4 grid grid-cols-2 gap-x-(--gutter) gap-y-10 md:col-span-10 md:grid-cols-4">
          {toolkit.map((g) => (
            <div key={g.group}>
              <h4 className="label text-hi">{g.group}</h4>
              <ul className="mt-4 space-y-1.5 text-[17px] leading-snug">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
