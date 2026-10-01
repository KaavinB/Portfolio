import { Reveal, MaskedLines } from "@/components/motion/reveal";

/** Every section opens the same way: a small yellow number and a large title. */
export function SectionHeader({
  number,
  title,
  id,
  size = "default",
}: {
  number: string;
  title: string;
  id: string;
  size?: "default" | "large";
}) {
  return (
    <div className="grid grid-cols-4 gap-x-(--gutter) md:grid-cols-12">
      <p className="label col-span-4 mb-4 text-hi md:col-span-2 md:mb-0 md:pt-[0.9em]" aria-hidden="true">
        {number}
      </p>
      <Reveal
        as="h2"
        variant="lines"
        id={id}
        className={`display col-span-4 tracking-[-0.04em] md:col-span-10 ${
          size === "large" ? "text-[clamp(56px,9vw,160px)] leading-[0.86]" : "text-[clamp(44px,6vw,100px)] leading-[0.9]"
        }`}
      >
        <MaskedLines lines={[title]} />
      </Reveal>
    </div>
  );
}
