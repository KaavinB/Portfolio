/**
 * The name, set as one wide and one condensed line of the same variable face.
 * The "i" in the first name is dotless: its dot is the football in the 3D
 * scene, which the sculpture parks on the `data-ball-anchor` marker until the
 * visitor scrolls and the ball is played away.
 */
export function HeroName({ first, last }: { first: string; last: string }) {
  return (
    <h1 className="hero-name relative" aria-label={`${first} ${last}`}>
      <span aria-hidden="true" className="display display-wide hero-first block whitespace-nowrap">
        {first.split("").map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.04em] align-bottom">
            <span className="hero-rise relative inline-block" style={{ animationDelay: `${0.12 + i * 0.06}s` }}>
              {ch === "i" ? (
                <>
                  ı<span data-ball-anchor className="tittle" />
                </>
              ) : (
                ch
              )}
            </span>
          </span>
        ))}
      </span>
      <span aria-hidden="true" className="display display-narrow hero-last block overflow-hidden whitespace-nowrap">
        {last.split("").map((ch, i) => (
          <span key={i} className="hero-rise inline-block" style={{ animationDelay: `${0.45 + i * 0.025}s` }}>
            {ch}
          </span>
        ))}
      </span>
    </h1>
  );
}
