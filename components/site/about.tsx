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
          I care less about how a model scores and more about whether it holds up.
        </Reveal>

        <div className="prose-serif col-span-4 mt-12 max-w-[46ch] space-y-4 md:col-span-5 md:col-start-3 md:mt-14">
          <p>
            I&rsquo;m finishing a master&rsquo;s in computer science at Rice, where I&rsquo;m also a teaching assistant
            for automata theory. Before that I studied electronics and computer engineering at VIT Chennai.
          </p>
          <p>
            Most of my work sits between training a model and trusting it: fine-tuning it for a narrow task, finding
            where it fails, and keeping it reliable once it&rsquo;s live. A benchmark score is where I start, not where
            I stop.
          </p>
          <p>Outside of work, I support Chelsea, through the good seasons and the rest.</p>
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
