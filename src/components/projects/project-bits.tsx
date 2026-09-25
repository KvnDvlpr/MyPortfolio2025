import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

// Small pieces shared by the detail panel (light) and the gallery story panel (dark).

/** Quiet status line that sits under the tagline (never above the title). */
export function ProjectMeta({ project, dark = false }: { project: Project; dark?: boolean }) {
  return (
    <p className={cn("inline-flex items-center gap-2 text-sm", dark ? "text-white/60" : "text-ink-3")}>
      <span className="size-2 rounded-full bg-[#2fb47c] shadow-[0_0_0_4px_rgba(47,180,124,0.18)]" />
      Live <span aria-hidden="true" className="opacity-50">·</span> {project.year}{" "}
      <span aria-hidden="true" className="opacity-50">·</span> {project.kind}
    </p>
  );
}

export function ProjectTags({ tags, dark = false }: { tags: string[]; dark?: boolean }) {
  return (
    <ul aria-label="Highlights" className="flex flex-wrap gap-[0.45rem]">
      {tags.map((t) => (
        <li
          key={t}
          className={cn(
            "rounded-lg border px-3 py-1.5 font-mono text-[0.74rem]",
            dark ? "border-white/14 bg-white/8 text-white/85" : "border-line bg-bg text-ink-2"
          )}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ProjectFeatureCols({ project, dark = false }: { project: Project; dark?: boolean }) {
  const cols = [
    { title: "What it does", items: project.does },
    { title: "How it's built", items: project.built },
  ];
  return (
    <div className={cn("grid gap-6 sm:grid-cols-2", dark && "pt-2")}>
      {cols.map((col) => (
        <div key={col.title}>
          <h4 className={cn("mb-3", dark && "text-white/55")}>{col.title}</h4>
          <ul className={cn("project-features grid gap-[0.45rem] text-[0.9rem]", dark ? "text-white/82" : "text-ink-2")}>
            {col.items.map((item) => (
              <li key={item} className="relative pl-[1.2rem]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** SVG filter that lights the paper notes like crumpled paper. */
export function CrumpleFilter() {
  return (
    <svg aria-hidden="true" focusable="false" className="absolute size-0 overflow-hidden">
      <filter id="crumple" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.028" numOctaves={5} seed={9} result="noise" />
        <feDiffuseLighting in="noise" lightingColor="#ffffff" surfaceScale={2.4} result="light">
          <feDistantLight azimuth={40} elevation={58} />
        </feDiffuseLighting>
        <feBlend in="SourceGraphic" in2="light" mode="multiply" />
      </filter>
    </svg>
  );
}
