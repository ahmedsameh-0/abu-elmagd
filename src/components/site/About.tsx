export function About() {
  return (
    <section id="about" className="relative px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">اعرف أكتر عننا</h2>
          <p className="body-copy mx-auto mt-4 max-w-2xl text-muted-foreground">
            شوف قصتنا وخبرتنا في تجهيز أجهزة الكمبيوتر واللابتوبات المناسبة لكل احتياج.
          </p>
        </div>
        <div className="glass mt-10 p-3 sm:p-5">
          <div className="relative aspect-video overflow-hidden rounded-[12px] bg-black/20">
            <iframe
              className="absolute inset-0 h-full w-full border-0"
              src="https://www.youtube.com/embed/A5h3O75B19g?vq=hd1080&rel=0&playsinline=1"
              title="اعرف أكتر عن أبو المجد كمبيوتر"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
