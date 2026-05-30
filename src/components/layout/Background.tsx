/** Minimal, static atmosphere: soft glow + faint grid + grain. */
export function Background() {
  return (
    <>
      <div className="bg-soft" aria-hidden />
      <div className="bg-grid" aria-hidden />
      <div className="bg-noise" aria-hidden />
    </>
  );
}
