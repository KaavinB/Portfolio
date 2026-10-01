import { minorProjects, publications } from "@/lib/content";
import { SectionHeader } from "./section-header";

export function MoreWork() {
  return (
    <section id="more" data-scene="5" aria-labelledby="more-title" className="relative px-(--gutter) py-(--space-section)">
      <SectionHeader
        number="03"
        title="More work"
        id="more-title"
      />

      <div className="mt-16 grid grid-cols-4 gap-x-(--gutter) md:mt-20 md:grid-cols-12">
        <h3 className="label col-span-4 mb-4 text-muted md:col-span-2 md:pt-8">Projects</h3>
        <ul className="col-span-4 border-b border-rule md:col-span-9">
          {minorProjects.map((p) => (
            <li key={p.title} className="border-t border-rule">
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="index-row group grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)_auto] md:gap-x-(--gutter)"
              >
                <span className="display text-[clamp(22px,2vw,30px)] leading-[1.05] tracking-[-0.025em]">{p.title}</span>
                <span className="arrow text-xl text-hi md:col-start-3" aria-hidden="true">
                  ↗
                </span>
                <span className="prose-serif col-span-2 text-[17px] md:col-span-1 md:col-start-2 md:row-start-1">
                  {p.description}
                </span>
                <span className="sr-only"> (GitHub repository, opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20 grid grid-cols-4 gap-x-(--gutter) md:mt-28 md:grid-cols-12">
        <h3 className="label col-span-4 mb-4 text-muted md:col-span-2 md:pt-8">Research</h3>
        <ol className="col-span-4 md:col-span-9">
          {publications.map((p) => (
            <li
              key={p.title}
              className="grid gap-x-(--gutter) gap-y-2 border-t border-rule py-7 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
            >
              <div>
                <p className="font-serif text-[clamp(20px,1.6vw,24px)] leading-[1.2] italic">{p.title}</p>
                <p className="label mt-2 text-hi">{p.venue}</p>
              </div>
              <p className="prose-serif text-[17px] text-muted">{p.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
