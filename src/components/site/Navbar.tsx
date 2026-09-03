import logo from "@/assets/logo.png";
import { useScrollY } from "@/hooks/use-scroll-progress";
import { useIsMobile } from "@/hooks/use-mobile";
import { BookOpen, Contact, Home, Laptop, MapPin, Star } from "lucide-react";

const links = [
  { href: "#top", label: "الرئيسية", icon: Home },
  { href: "#about", label: "اعرف أكتر", icon: BookOpen },
  { href: "#story", label: "قصتنا", icon: Contact },
  { href: "#work", label: "شغلنا", icon: Laptop },
  { href: "#reviews", label: "آراء العملاء", icon: Star },
  { href: "#branches", label: "فروعنا", icon: MapPin },
];

export function Navbar() {
  const scrollY = useScrollY();
  const scrolled = scrollY > 24;
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <nav className="mobile-top-nav site-navbar fixed inset-x-3 top-3 z-50 flex items-center justify-between px-3 py-2">
          <a href="#top" aria-label="الرئيسية">
            <img src={logo} alt="أبو المجد كمبيوتر" className="h-10 w-10 rounded-xl object-cover" />
          </a>
          <a href="tel:01277770535" className="site-button site-button-hover rounded-lg px-4 py-2 text-sm font-semibold">
            اتصل بنا
          </a>
        </nav>
        <nav className="mobile-nav fixed inset-x-3 bottom-3 z-50 flex items-center justify-around gap-1 px-2 py-2">
          {links.map(({ href, label, icon: Icon }) => (
            <a key={href} href={href} className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-2 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground">
              <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
              <span className="truncate">{label}</span>
            </a>
          ))}
        </nav>
      </>
    );
  }

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 flex justify-center transition-all duration-500 ease-out"
      style={{ padding: scrolled ? "0.75rem 1rem" : "1.25rem 1rem" }}
    >
      <nav
        className={[
          "relative w-full max-w-6xl transition-all duration-500 ease-out",
          scrolled
            ? "site-navbar nav-scrolled px-4 py-2.5 sm:px-6"
            : "border border-transparent bg-transparent px-2 py-3 shadow-none sm:px-4",
        ].join(" ")}
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <img
              src={logo}
              alt="أبو المجد كمبيوتر"
              className="h-10 w-10 shrink-0 rounded-xl object-cover"
              loading="eager"
            />
          </a>

          <div className="flex items-center gap-1">
            <ul className="nav-links hidden items-center gap-1 lg:flex">
              {links.slice(1).map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="nav-item rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="tel:01277770535"
              className="site-button site-button-hover shrink-0 rounded-lg px-4 py-2 text-sm font-semibold hover:scale-[1.03]"
            >
              اتصل بنا
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
