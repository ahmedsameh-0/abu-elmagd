export const ratingBranches = [
  "مول البوستان - الدور الثالث - مصر",
  "مول البوستان - الدور الثاني - مصر",
  "مول البوستان - الدور التاسع - مصر",
  "Ezone - مدينه نصر - مصر",
  "مدينةالشارقة - الامارات",
] as const;

export type RatingBranch = (typeof ratingBranches)[number];

export type CustomerRating = {
  id: string;
  branch: RatingBranch;
  name: string;
  phone: string;
  message: string;
  rating: number;
  date: string;
};

const STORAGE_KEY = "abu-elmagd-ratings";

export function getRatings(): CustomerRating[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as CustomerRating[]) : [];
  } catch {
    return [];
  }
}

export function saveRating(input: Omit<CustomerRating, "id" | "date">) {
  const rating: CustomerRating = {
    ...input,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };
  const next = [rating, ...getRatings()];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return rating;
}
