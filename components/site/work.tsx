import { featuredProjects, type FeaturedProject } from "@/lib/content";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeader } from "./section-header";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative pt-(--space-section)">
      <div className="px-(--gutter)" data-scene-quiet>
        <SectionHeader
          number="01"
          title="Selected work"
          id="work-title"
          size="large"
        />
      </div>

      {featuredProjects.map((p, i) => (
        <Project key={p.number} project={p} flip={i % 2 === 1} />
      ))}
    </section>
  );
}

function Project({ project: p, flip }: { project: FeaturedProject; flip: boolean }) {
  const id = `project-${p.number}`;
  return (
    <article
      id={id}
      data-scene={p.scene}
      aria-labelledby={`${id}-title`}
      className="relative grid grid-cols-4 gap-x-(--gutter) px-(--gutter) pt-16 pb-24 md:min-h-svh md:grid-cols-12 md:content-center md:py-(--space-section)"
    >
      {/* On narrow screens the drawing gets its own empty space above the text. */}
      <div className="col-span-4 h-[56svh] md:hidden" aria-hidden="true" />

      <div className={`col-span-4 md:col-span-6 lg:col-span-5 ${flip ? "md:col-start-7 lg:col-start-8" : ""}`}>
        <Reveal variant="fade">
          <p className="shirt-number text-[clamp(64px,7vw,116px)]" aria-hidden="true">
            {p.number}
          </p>
          <h3 id={`${id}-title`} className="display mt-6 text-[clamp(32px,3.4vw,58px)] leading-[0.95] tracking-[-0.035em]">
            {p.title}
          </h3>
        </Reveal>

        <div className="prose-serif mt-7 max-w-[46ch] space-y-3">
          {p.built.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>

        <div className="ticket mt-10 md:grid-cols-[minmax(0,1fr)_auto]">
          <dl className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 gap-y-3 text-[15px] leading-snug">
            <dt className="label pt-[2px] text-muted">Role</dt>
            <dd>{p.role}</dd>
            <dt className="label pt-[2px] text-muted">Stack</dt>
            <dd>{p.stack.join(" · ")}</dd>
            {p.result && (
              <>
                <dt className="label pt-[2px] text-muted">Result</dt>
                <dd>
                  <span className="font-semibold text-hi">{p.result.value}</span> {p.result.label}
                </dd>
              </>
            )}
          </dl>
          <a
            href={p.link.href}
            target="_blank"
            rel="noreferrer"
            className="ticket-stub group flex items-center justify-between gap-6 text-[15px] font-medium text-hi md:flex-col md:items-start md:justify-center md:gap-1"
          >
            <span className="label font-normal text-muted">Source</span>
            <span className="link-draw">
              View on GitHub <span className="arrow" aria-hidden="true">↗</span>
            </span>
            <span className="sr-only"> ({p.link.label}, opens in a new tab)</span>
          </a>
        </div>
      </div>

    </article>
  );
}
