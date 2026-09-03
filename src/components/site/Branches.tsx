import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function Branches() {
  const [activeId, setActiveId] = useState<string>(siteConfig.branches[0].id);
  const active = siteConfig.branches.find((b) => b.id === activeId) ?? siteConfig.branches[0];

  return (
    <section id="branches" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">فروعنا</h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_1.15fr]">
          <div className="flex flex-col gap-4">
            {siteConfig.branches.map((b) => {
              const isActive = b.id === active.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setActiveId(b.id)}
                  aria-pressed={isActive}
                  className={[
                    "glass p-5 text-right transition-all duration-300",
                    isActive
                      ? "scale-[1.01] ring-2 ring-primary/60"
                      : "opacity-80 hover:opacity-100",
                  ].join(" ")}
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <h3 className="truncate text-lg font-medium">{b.name}</h3>
                    <span className="glass-soft shrink-0 px-3 py-1 text-xs text-muted-foreground">
                      {b.country}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{b.address}</p>
                </button>
              );
            })}

            {active.mapsUrl ? (
              <a
                href={active.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="site-button site-button-hover rounded-lg px-6 py-3 text-center text-sm font-semibold hover:scale-[1.02]"
              >
                افتح {active.name} على الخريطة
              </a>
            ) : (
              <div className="glass-soft px-6 py-3 text-center text-sm text-muted-foreground">
                رابط الخريطة لهذا الفرع لسه مش متضاف
              </div>
            )}
          </div>

          <div className="glass relative min-h-[320px] p-0 lg:min-h-[420px]">
            {active.embedUrl ? (
              <iframe
                key={active.id}
                title={active.name}
                src={active.embedUrl}
                className="h-full min-h-[320px] w-full rounded-[14px] border-0 lg:min-h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="hero-glow flex h-full min-h-[320px] flex-col items-center justify-center gap-3 p-8 text-center lg:min-h-[420px]">
                <div className="glass-soft px-4 py-2 text-sm">{active.name}</div>
                <p className="max-w-xs text-sm text-muted-foreground">{active.address}</p>
                <p className="text-xs text-muted-foreground/70">
                  ابعتلي رابط جوجل مابس للفرع وهيظهر هنا مباشرة.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
