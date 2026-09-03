import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo.png";
import { ratingBranches, saveRating, type RatingBranch } from "@/lib/ratings";

export const Route = createFileRoute("/rate")({ component: RatePage });

function RatePage() {
  const [branch, setBranch] = useState<RatingBranch>(ratingBranches[0]);
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const requestedBranch = new URLSearchParams(window.location.search).get("branch");
    if (requestedBranch && ratingBranches.includes(requestedBranch as RatingBranch)) {
      setBranch(requestedBranch as RatingBranch);
    }
  }, []);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    saveRating({
      branch,
      name: String(form.get("name") || ""),
      phone: String(form.get("phone") || ""),
      message: String(form.get("message") || ""),
      rating,
    });
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-4 py-10 text-foreground sm:py-16">
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-10"
      />
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="site-button site-button-hover inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
        >
          <ArrowLeft aria-hidden="true" className="size-4" /> Back to Home
        </Link>
        <div className="glass relative mt-6">
          <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">شاركنا رأيك</h1>
          <p className="body-copy mt-2 text-muted-foreground">تقييمك بيساعدنا نقدم لك خدمة أفضل.</p>
          {submitted ? (
            <div className="mt-8 border border-emerald-400/40 bg-emerald-400/10 p-5 text-center text-lg font-medium text-emerald-700">
              تم إضافة تقييمك بنجاح، نورتنا ❤️
            </div>
          ) : (
            <form onSubmit={submit} className="mt-8 grid gap-5">
              <label className="grid gap-2 text-sm font-medium">
                الفرع
                <select
                  name="branch"
                  value={branch}
                  onChange={(event) => setBranch(event.target.value as RatingBranch)}
                  className="rounded-xl border border-border bg-background px-4 py-3 text-foreground"
                >
                  {ratingBranches.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-medium">
                الاسم
                <input
                  required
                  name="name"
                  className="rounded-xl border border-border bg-background px-4 py-3 text-foreground"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                رقم الهاتف
                <input
                  required
                  name="phone"
                  type="tel"
                  className="rounded-xl border border-border bg-background px-4 py-3 text-foreground"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                رسالتك
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="rounded-xl border border-border bg-background px-4 py-3 text-foreground"
                />
              </label>
              <fieldset className="grid gap-2">
                <legend className="text-sm font-medium">التقييم</legend>
                <div
                  className="flex flex-wrap gap-2"
                  role="radiogroup"
                  aria-label="التقييم من 1 إلى 5 مع أنصاف النجوم"
                >
                  {Array.from({ length: 9 }, (_, index) => (index + 2) / 2).map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={rating === value}
                      onClick={() => setRating(value)}
                      className={`rounded-xl border px-3 py-2 text-lg transition-colors ${rating === value ? "border-[#D4AF37] bg-[#D4AF37]/15 text-[#A68112]" : "border-border text-muted-foreground hover:border-[#D4AF37]/60"}`}
                    >
                      {value} ★
                    </button>
                  ))}
                </div>
              </fieldset>
              <button
                type="submit"
                className="site-button site-button-hover rounded-xl px-5 py-3 text-sm font-semibold"
              >
                إرسال التقييم
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
