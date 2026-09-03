import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import logo from "@/assets/logo.png";
import { getRatings, ratingBranches, type CustomerRating } from "@/lib/ratings";

export const Route = createFileRoute("/admin-ratings")({ component: AdminRatingsPage });

export function AdminRatingsPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [query, setQuery] = useState("");
  const [branch, setBranch] = useState("all");
  const [rating, setRating] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const ratings = getRatings();
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 6);
  const weekRatings = ratings.filter((item) => new Date(item.date) >= weekStart);
  const today = new Date().toDateString();
  const todayCount = ratings.filter((item) => new Date(item.date).toDateString() === today).length;
  const average = weekRatings.length
    ? weekRatings.reduce((sum, item) => sum + item.rating, 0) / weekRatings.length
    : 0;
  const ratingCounts = weekRatings.reduce<Record<string, number>>(
    (counts, item) => ({ ...counts, [item.rating]: (counts[item.rating] || 0) + 1 }),
    {},
  );
  const topRating = Object.entries(ratingCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "-";
  const filtered = useMemo(
    () =>
      ratings.filter((item) => {
        const matchesQuery = [item.name, item.phone, item.message, item.branch]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());
        return (
          matchesQuery &&
          (branch === "all" || item.branch === branch) &&
          (rating === "all" || item.rating === Number(rating))
        );
      }),
    [ratings, query, branch, rating],
  );
  const visible = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  if (!authenticated) return <AdminLogin onSuccess={() => setAuthenticated(true)} />;

  return (
    <main className="min-h-screen bg-[#f7f8fa] px-4 py-8 text-[#202124] sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Abu Elmagd" className="h-14 w-14 rounded-2xl object-cover" />
            <div>
              <Link to="/" className="text-sm text-[#667085]">
                Back to Home
              </Link>
              <h1 className="mt-3 text-3xl font-semibold">Customer Ratings</h1>
            </div>
          </div>
          <span className="rounded-full bg-white px-4 py-2 text-sm text-[#667085]">
            {filtered.length} تقييم
          </span>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Today's Ratings", todayCount, "Today"],
            ["Top Rating", topRating === "-" ? "-" : `${topRating} ★`, "This week"],
            ["Total Ratings", ratings.length, "All time"],
            ["Average Rating", average ? `${average.toFixed(1)} ★` : "-", "This week"],
          ].map(([label, value, note]) => (
            <div key={String(label)} className="glass rounded-2xl p-5">
              <p className="text-sm font-medium text-[#667085]">{label}</p>
              <strong className="mt-3 block text-3xl font-semibold">{value}</strong>
              <span className="mt-2 block text-xs text-[#98a2b3]">{note}</span>
            </div>
          ))}
        </div>
        <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm sm:p-7">
          <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_180px_auto]">
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search reviews"
              className="rounded-xl border border-[#e4e7ec] px-4 py-3 outline-none focus:border-[#98a2b3]"
            />
            <select
              value={branch}
              onChange={(event) => {
                setBranch(event.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-[#e4e7ec] px-4 py-3"
            >
              <option value="all">All branches</option>
              {ratingBranches.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <select
              value={rating}
              onChange={(event) => {
                setRating(event.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-[#e4e7ec] px-4 py-3"
            >
              <option value="all">All ratings</option>
              {[5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1].map((item) => (
                <option key={item} value={item}>
                  {item} stars
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setBranch("all");
                setRating("all");
                setPage(1);
              }}
              className="rounded-xl border border-[#e4e7ec] px-4 py-3 text-sm"
            >
              Clear
            </button>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[900px] text-right text-sm">
              <thead>
                <tr className="border-b border-[#eaecf0] text-[#667085]">
                  <th className="px-3 py-4 font-medium">Customer</th>
                  <th className="px-3 py-4 font-medium">Phone</th>
                  <th className="px-3 py-4 font-medium">Branch</th>
                  <th className="px-3 py-4 font-medium">Message</th>
                  <th className="px-3 py-4 font-medium">Rating</th>
                  <th className="px-3 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((item: CustomerRating) => (
                  <tr key={item.id} className="border-b border-[#f2f4f7] hover:bg-[#fafafa]">
                    <td className="px-3 py-4 font-medium">{item.name}</td>
                    <td className="px-3 py-4">{item.phone}</td>
                    <td className="px-3 py-4">{item.branch}</td>
                    <td className="max-w-sm px-3 py-4">{item.message}</td>
                    <td className="px-3 py-4 font-medium text-[#a68112]">{item.rating} ★</td>
                    <td className="px-3 py-4 text-[#667085]">
                      {new Date(item.date).toLocaleDateString("en-GB")}
                    </td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-12 text-center text-[#667085]">
                      No reviews found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-5 flex items-center justify-between text-sm text-[#667085]">
            <span>
              Page {page} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
                className="rounded-lg border px-3 py-2 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-lg border px-3 py-2 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [error, setError] = useState(false);
  const [remember, setRemember] = useState(false);
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.get("username") === "admin" && form.get("password") === "admin") onSuccess();
    else setError(true);
  };
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4">
      <img
        src={logo}
        alt="Abu Elmagd"
        className="absolute top-16 h-24 w-24 rounded-3xl object-cover opacity-90"
      />
      <form onSubmit={submit} className="glass w-full max-w-md pt-32">
        <h1 className="text-3xl font-semibold">Sign in</h1>
        <div className="mt-8 grid gap-4">
          <input
            required
            name="username"
            placeholder="Username"
            className="rounded-xl border border-border bg-background px-4 py-3"
          />
          <input
            required
            name="password"
            type="password"
            placeholder="Password"
            className="rounded-xl border border-border bg-background px-4 py-3"
          />
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
            />{" "}
            Remember me
          </label>
          <button className="site-button site-button-hover rounded-xl px-4 py-3 font-semibold">
            Sign in
          </button>
          {error && <p className="text-sm text-red-600">Invalid username or password.</p>}
        </div>
      </form>
    </main>
  );
}
