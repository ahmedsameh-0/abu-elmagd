import img1 from "@/assets/photo_5821336946188424002_y.jpg";
import img2 from "@/assets/photo_5821336946188424001_y.jpg";
import img3 from "@/assets/photo_5821336946188424000_y.jpg";
import img4 from "@/assets/photo_5821336946188423999_y.jpg";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const items = [
  { src: img1, title: "HP 600 G3", specs: ["Core i7 Gen 7", "8GB DDR4", "HDD 500GB"] },
  { src: img2, title: "Dell 5490", specs: ["Core i5 Gen 8", "8GB DDR4", "SSD 256GB"] },
  { src: img3, title: "HP 600 G1", specs: ["Core i5 Gen 4", "8GB DDR3", "HDD 500GB"] },
  { src: img4, title: "HP Z2 G4", specs: ["Core i5 Gen 8", "8GB DDR4", "HDD 500GB"] },
];

export function Work() {
  const scroller = useRef<HTMLDivElement | null>(null);

  const scrollBy = (direction: 1 | -1) => {
    scroller.current?.scrollBy({
      left: direction * Math.min(440, scroller.current.clientWidth * 0.85),
      behavior: "smooth",
    });
  };

  return (
    <section id="work" className="relative w-full px-0 py-24 sm:py-32">
      <div className="w-full">
        <div className="min-w-0 px-4 text-center">
          <h2 className="text-4xl font-medium tracking-tight sm:text-5xl">
            شغالين ومبنوقفش !
          </h2>
        </div>

        <div className="product-carousel mt-10 flex w-full items-center gap-2 px-2 sm:gap-4 sm:px-6" dir="ltr">
          <button type="button" aria-label="السابق" onClick={() => scrollBy(-1)} className="carousel-arrow">
            <ArrowLeft aria-hidden="true" className="size-5" />
          </button>
          <div
            ref={scroller}
            className="flex min-w-0 flex-1 snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {items.map((it) => (
              <article
                key={it.title}
                className="product-card glass group w-[80vw] shrink-0 snap-start sm:w-[420px]"
                dir="rtl"
              >
                <div className="bg-black/5">
                  <img
                    src={it.src}
                    alt={it.title}
                    loading="lazy"
                    className="aspect-square w-full object-contain"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-medium tracking-tight">{it.title}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {it.specs.map((s) => (
                      <li key={s} className="glass-soft px-3 py-1 text-xs text-muted-foreground">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`https://wa.me/201277770535?text=${encodeURIComponent(`ممكن تفاصيل ${it.title}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="product-card-action mt-5 inline-flex items-center rounded-full border border-current/30 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-current hover:text-primary"
                  >
                    اسأل عن تفاصيله
                  </a>
                </div>
              </article>
            ))}
          </div>
          <button type="button" aria-label="التالي" onClick={() => scrollBy(1)} className="carousel-arrow">
            <ArrowRight aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
