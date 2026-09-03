import logo from "@/assets/logo.png";

const words = ["أنت", "جاهز", "؟"];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-center"
        loading="eager"
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-background/70 dark:bg-background/55" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-background/25 via-transparent to-background" />

      <div className="relative z-[2] w-full max-w-4xl text-center">
        <h1 className="hero-title flex flex-wrap items-center justify-center gap-x-5">
          {words.map((w, i) => {
            return (
              <span
                key={w}
                className="inline-block"
              >
                {w}
              </span>
            );
          })}
        </h1>

        <p
          className="body-copy mx-auto mt-6 max-w-xl text-muted-foreground"
        >
          أجهزة كمبيوتر ولابتوبات مستوردة بضمان حقيقي، وخبرة 13 سنة في السوق.
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#work"
            className="site-button site-button-hover rounded-lg px-6 py-3 text-sm font-semibold hover:scale-[1.03]"
          >
            شوف المتوفر
          </a>
        </div>
      </div>
    </section>
  );
}
