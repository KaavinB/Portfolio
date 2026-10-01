import { certifications, education, experience, season } from "@/lib/content";
import { SectionHeader } from "./section-header";

/** Practical information: one row per role, nothing that moves. */
export function Experience() {
  return (
    <section
      id="experience"
      data-scene="4"
      aria-labelledby="experience-title"
      className="relative px-(--gutter) py-(--space-section)"
    >
      <SectionHeader number="02" title="Experience" id="experience-title" />

      <ol className="mt-16 md:mt-20">
        {experience.map((r) => (
          <li key={`${r.org}-${r.start}`} className="border-t border-rule">
            <article className="grid grid-cols-4 gap-x-(--gutter) gap-y-3 py-9 md:grid-cols-12 md:py-11">
              <div className="col-span-4 flex items-center gap-3 md:col-span-2 md:flex-col md:items-start md:gap-2">
                <p className="label">
                  {r.start} – {r.end}
                </p>
                <SeasonTag date={r.start} />
              </div>
              <div className="col-span-4 md:col-span-4">
                <h3 className="display text-[clamp(24px,2vw,32px)] leading-[1.05] tracking-[-0.025em]">{r.role}</h3>
                <p className="mt-1 text-[16px] text-muted">
                  {r.org}, {r.place}
                </p>
                {r.detail && <p className="mt-1 font-serif text-[17px] italic">{r.detail}</p>}
              </div>
              <p className="prose-serif col-span-4 max-w-[52ch] md:col-span-6">{r.description}</p>
            </article>
          </li>
        ))}
      </ol>

      <div className="border-t border-rule">
        <article className="grid grid-cols-4 gap-x-(--gutter) gap-y-3 pt-9 md:grid-cols-12 md:pt-11">
          <p className="label col-span-4 md:col-span-2">Education</p>
          <div className="col-span-4 md:col-span-4">
            <h3 className="display text-[clamp(24px,2vw,32px)] leading-[1.05] tracking-[-0.025em]">{education.org}</h3>
            <p className="mt-1 text-[16px] text-muted">
              {education.program}, {education.place}
            </p>
          </div>
          <p className="prose-serif col-span-4 max-w-[52ch] text-muted md:col-span-6">
            I also hold NPTEL certificates in {certifications.slice(0, -1).join(", ")} and {certifications.at(-1)}.
          </p>
        </article>
      </div>
    </section>
  );
}

/** Dates in match-programme form: football seasons run August to May. */
function SeasonTag({ date }: { date: string }) {
  const s = season(date);
  if (!s) return null;
  return (
    <span
      className="season-tag"
      title="Football season, August to May"
    >
      Season {s}
    </span>
  );
}
