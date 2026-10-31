/** Hatched rails down both sides of the content column (in its side padding), like a blueprint frame. */
export function PageFrame() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
      <div className="relative mx-auto h-full max-w-[1320px]">
        <div className="rail absolute inset-y-0 left-0 w-8" />
        <div className="rail absolute inset-y-0 right-0 w-8" />
      </div>
    </div>
  );
}
