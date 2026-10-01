import { person } from "@/lib/content";
import { HeroName } from "./hero-name";

export function Hero() {
  return (
    <section
      id="top"
      data-scene="0"
      aria-label="Introduction"
      className="@container relative flex min-h-svh flex-col justify-between gap-8 overflow-x-clip px-(--gutter) pt-[calc(var(--nav-h)+28px)] pb-(--gutter)"
    >
      <div className="grid gap-8 md:grid-cols-12 md:gap-x-(--gutter)">
        <div className="hero-fade md:col-span-6" style={{ animationDelay: "0.9s" }}>
          <p className="text-[clamp(18px,1.35vw,21px)] leading-snug font-medium">{person.role}</p>
          <p className="text-[clamp(18px,1.35vw,21px)] leading-snug text-muted">{person.study}</p>
        </div>
        <div className="md:col-span-4 md:col-start-9 lg:col-span-3 lg:col-start-10">
          <p className="prose-serif hero-fade text-[17px]" style={{ animationDelay: "1.1s" }}>
            {person.summary}
          </p>
          <a
            href="#work"
            className="hero-fade link-draw mt-4 inline-flex items-center gap-2 text-[15px] font-medium text-hi"
            style={{ animationDelay: "1.2s" }}
          >
            See selected work <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <HeroName first={person.firstName} last={person.lastName} />
    </section>
  );
}
