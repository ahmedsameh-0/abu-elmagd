const stats = [
  { value: "13+", label: "سنة خبرة" },
  { value: "2", label: "فرع" },
  { value: "5000+", label: "عميل" },
  { value: "100%", label: "أجهزة مختبرة" },
];

export function Story() {
  return (
    <section id="story" className="relative px-4 py-28 sm:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <h2
          className="text-4xl leading-[1.35] font-medium tracking-tight sm:text-6xl"
        >
          رحلة بدأت من{" "}
          <span className="relative inline-block">
            <span className="rgb-outline">13 سنة</span>
            <span
              className="pointer-events-none absolute -inset-x-3 -inset-y-1 rounded-xl opacity-60 blur-[2px]"
              style={{
                background:
                  "linear-gradient(100deg, transparent, oklch(0.7 0.2 20 / .25), oklch(0.72 0.18 180 / .25), transparent)",
              }}
            />
          </span>{" "}
          ولسه مكملين
        </h2>
        <p
          className="body-copy mx-auto mt-8 max-w-2xl text-muted-foreground"
        >
          بدأنا بمحل صغير وشغف كبير بالتكنولوجيا، وكل جهاز بيخرج من عندنا بيتفحص
          وبيتجهز كأنه ليّنا. النهارده بقى عندنا فروع وعملاء في مصر والإمارات،
          ولسه المشوار مكمل.
        </p>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="glass px-4 py-6"
            >
              <div className="text-3xl font-medium tracking-tight">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
