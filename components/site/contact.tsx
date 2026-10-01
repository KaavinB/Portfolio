import { club, person } from "@/lib/content";
import { MaskedLines, Reveal } from "@/components/motion/reveal";
import { CopyEmail } from "./copy-email";

export function Contact() {
  const [user, domain] = person.email.split("@");
  return (
    <section
      id="contact"
      data-scene="6"
      aria-labelledby="contact-title"
      className="relative flex min-h-svh flex-col px-(--gutter) pt-(--space-section) pb-(--gutter)"
    >
      <div className="grid flex-1 grid-cols-4 content-center gap-x-(--gutter) md:grid-cols-12">
        <div className="col-span-4 md:col-span-12">
          <p className="label mb-4 text-hi" aria-hidden="true">
            05
          </p>
          <h2 id="contact-title" className="display text-[clamp(28px,2.6vw,40px)] leading-tight tracking-[-0.02em]">
            Contact
          </h2>
          <p className="prose-serif mt-4 max-w-[44ch] text-muted">
            {person.lookingFor} Email is the quickest way to reach me.
          </p>

          <a href={`mailto:${person.email}`} className="group mt-12 block w-fit" aria-label={`Email ${person.email}`}>
            <Reveal
              as="span"
              variant="lines"
              className="display display-narrow block text-[min(14vw,20svh)] leading-[0.84] tracking-[-0.02em]"
            >
              <MaskedLines lines={[user, `@${domain}`]} />
            </Reveal>
            <span className="mt-4 block h-[3px] origin-left scale-x-[0.15] bg-hi transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-x-100 group-focus-visible:scale-x-100" />
          </a>

          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4 text-[17px]">
            <CopyEmail email={person.email} />
            {[person.github, person.linkedin].map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link-draw">
                {l.label}
                <span className="sr-only"> (opens in a new tab)</span> <span className="arrow text-hi" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6 text-[14px] text-muted">
        <p>
          © {new Date().getFullYear()} {person.name}
        </p>
        {/* For anyone who reads footers: "Keep the blue flag flying high". */}
        <p className="label text-hi" title="Keep the blue flag flying high">
          {club.motto}
        </p>
        <a href="#top" className="link-draw text-fg">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </section>
  );
}
