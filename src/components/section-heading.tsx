import { cn } from "@/lib/utils";

/** Legacy .section-heading: h2 + optional sub line, left or centered. */
export function SectionHeading({
  title,
  sub,
  center = false,
  light = false,
  className,
}: {
  title: React.ReactNode;
  sub?: React.ReactNode;
  center?: boolean;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "mb-12 text-center", className)}>
      <h2 className={cn(light && "text-white")}>{title}</h2>
      {sub && (
        <p className={cn("mt-3.5 max-w-xl", center && "mx-auto", light ? "text-white/80" : "text-ink-2")}>{sub}</p>
      )}
    </div>
  );
}
