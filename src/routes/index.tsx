import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Story } from "@/components/site/Story";
import { About } from "@/components/site/About";
import { Work } from "@/components/site/Work";
import { Testimonials } from "@/components/site/Testimonials";
import { Branches } from "@/components/site/Branches";
import { Social } from "@/components/site/Social";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "أبو المجد كمبيوتر | أجهزة ولابتوبات بضمان" },
      {
        name: "description",
        content:
          "أبو المجد كمبيوتر — 13 سنة خبرة في بيع وتجهيز أجهزة الكمبيوتر واللابتوبات المستوردة بضمان، فروع في مصر والإمارات.",
      },
      { property: "og:title", content: "أبو المجد كمبيوتر | أجهزة ولابتوبات بضمان" },
      {
        property: "og:description",
        content:
          "أجهزة كمبيوتر ولابتوبات مستوردة بضمان حقيقي وخبرة 13 سنة. فروع في مصر والإمارات.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("dir", "rtl");
    root.setAttribute("lang", "ar");
    root.classList.remove("dark");
    window.localStorage.removeItem("theme");
  }, []);

  return (
    <main className="relative min-h-screen pb-20 md:pb-0">
      <Navbar />
      <Hero />
      <Story />
      <About />
      <Work />
      <Testimonials />
      <Branches />
      <Social />
    </main>
  );
}
