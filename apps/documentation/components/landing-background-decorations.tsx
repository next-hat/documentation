export function LandingBackgroundDecorations() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,152,0,0.12)_0%,rgba(99,102,241,0.10)_50%,rgba(0,0,0,0.05)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-size-[48px_48px] mask-[linear-gradient(to_bottom,black,transparent)] opacity-40" />
    </div>
  )
}
