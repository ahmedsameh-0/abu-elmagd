type Review = { name: string; text: string; rating: number };

const rowA: Review[] = [
  { name: "محمد سامي", text: "جهاز ممتاز وسعر مناسب جدًا، والتعامل محترم.", rating: 5 },
  { name: "أحمد رفعت", text: "اشتريت لابتوب Dell وشغال معايا من سنة من غير مشاكل.", rating: 5 },
  { name: "Mostafa A.", text: "خدمة ما بعد البيع فعلاً موجودة مش كلام.", rating: 5 },
  { name: "سارة خالد", text: "نصحوني بالجهاز المناسب لشغلي بدل ما يبيعوا الأغلى.", rating: 4 },
];

const rowB: Review[] = [
  { name: "كريم منصور", text: "أسرع تجهيز جهاز عملته في حياتي، تسليم في نفس اليوم.", rating: 5 },
  { name: "Omar H.", text: "Great prices and honest advice. Highly recommended.", rating: 5 },
  { name: "هدى إبراهيم", text: "الفرع نضيف والتعامل راقي، وشرحوا كل حاجة بالتفصيل.", rating: 5 },
  { name: "طارق عبد الله", text: "جربت أكتر من مكان ورجعت لهم تاني، فرق الجودة واضح.", rating: 4 },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-1 text-lg text-[#D4AF37]" aria-label={`${n} من 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < n ? "text-[#D4AF37]" : "text-[#D4AF37]/25"}>
          ★
        </span>
      ))}
    </div>
  );
}

function Card({ r }: { r: Review }) {
  return (
    <div className="glass mx-2.5 flex w-[300px] shrink-0 flex-col gap-3 p-5 sm:w-[360px]">
      <Stars n={r.rating} />
      <p className="text-sm leading-relaxed text-muted-foreground">{r.text}</p>
      <div className="mt-auto flex items-center gap-3 pt-2">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/15 text-sm">
          {r.name.charAt(0)}
        </div>
        <span className="truncate text-sm font-medium">{r.name}</span>
      </div>
    </div>
  );
}

function Row({ items, dir }: { items: Review[]; dir: "left" | "right" }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-paused relative z-0 min-h-[170px] overflow-hidden py-3" dir="ltr">
      <div
        className={`marquee-track ${dir === "left" ? "marquee-left" : "marquee-right"}`}
        style={{ ["--marquee-duration" as string]: "48s" }}
      >
        {doubled.map((r, i) => (
          <Card key={`${r.name}-${i}`} r={r} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
          آراء عملائنا عننا
        </h2>
      </div>

      <div className="mt-12 space-y-5">
        <Row items={rowA} dir="right" />
        <Row items={rowB} dir="left" />
      </div>
    </section>
  );
}
