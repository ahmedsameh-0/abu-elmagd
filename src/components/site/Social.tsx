import logo from "@/assets/logo.png";
import facebookIcon from "@/assets/facebook.png";
import tiktokIcon from "@/assets/tiktok.png";
import instapayIcon from "@/assets/Instapay_icon.png";
import { siteConfig } from "@/lib/site-config";

const platforms = [
  { key: "facebook", label: "Facebook", image: facebookIcon },
  { key: "tiktok", label: "TikTok", image: tiktokIcon },
  { key: "instapay", label: "InstaPay", image: instapayIcon },
] as const;

export function Social() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#090909] px-4 pb-8 pt-16 text-white sm:pt-24">
      <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:linear-gradient(32deg,transparent_49.8%,#6b5b9b_50%,transparent_50.2%),linear-gradient(148deg,transparent_49.8%,#6b5b9b_50%,transparent_50.2%)] [background-size:900px_700px]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex items-start justify-between gap-8">
          <img src={logo} alt="Abu Elmagd Computer" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
          <div className="flex gap-2">
            {platforms.map((platform) => {
              const url = siteConfig.social[platform.key];
              const className = "grid h-10 w-10 place-items-center overflow-hidden rounded-full border border-white/15 text-lg text-white/70";
              const icon = "image" in platform
                ? <img src={platform.image} alt="" className="social-icon h-6 w-6 object-contain" />
                : platform.icon;
              return url ? <a key={platform.key} href={url} target="_blank" rel="noreferrer" aria-label={platform.label} className={`${className} transition-colors hover:border-white/50`}>{icon}</a> : <span key={platform.key} aria-label={platform.label} className={className}>{icon}</span>;
            })}
          </div>
        </div>
        <div className="mt-14 overflow-hidden border border-white/10 bg-white/[0.02] px-4 py-10 sm:px-10 sm:py-16">
          <div className="footer-wordmark select-none text-center text-[clamp(4rem,17vw,13rem)] font-semibold leading-[0.72] tracking-[-0.04em] text-white/[0.045]">Abu Elmagd</div>
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-6 text-sm font-medium text-white/55 sm:flex-row sm:items-center">
          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="روابط التذييل">
            <a href="#top" className="transition-colors hover:text-white">الرئيسية</a>
            <a href="#story" className="transition-colors hover:text-white">قصتنا</a>
            <a href="#branches" className="transition-colors hover:text-white">فروعنا</a>
            <a href="#contact" className="transition-colors hover:text-white">تواصل</a>
          </nav>
          <p className="text-xs">© {new Date().getFullYear()} Abu Elmagd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
