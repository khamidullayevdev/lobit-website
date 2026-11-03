import { Bunny } from "./Bunny";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <Bunny className="h-9 w-9" alive={false} />
      <span
        className={`font-display text-[1.7rem] font-extrabold leading-none tracking-tight ${
          light ? "text-white" : "text-carrot"
        }`}
      >
        lobbit
      </span>
    </span>
  );
}
