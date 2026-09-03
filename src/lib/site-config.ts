// Configurable external links. Leave empty until the real URL is provided —
// empty links render as disabled instead of pointing somewhere invented.
export const siteConfig = {
  phones: ["01277770535", "01002397417"],
  social: {
    facebook: "https://www.facebook.com/share/1C32dH9wg1/",
    instagram: "",
    tiktok: "https://www.tiktok.com/@abuelmagdcomputers?lang=en-GB",
    instapay: "https://ipn.eg/S/morgn6/instapay/0AQSa6",
  },
  branches: [
    {
      id: "main",
      name: "أبو المجد كمبيوتر — الفرع الرئيسي",
      country: "مصر",
      address: "الفرع الرئيسي",
      // Provide the Google Maps link/embed for the main branch here.
      mapsUrl: "https://maps.app.goo.gl/ZgRWzetWzq91bGebA?utm_source=chatgpt.com",
      embedUrl: "https://www.google.com/maps?q=30.0456642,31.2385812&output=embed",
    },
    {
      id: "uae",
      name: "Abu Elmagd Computers — UAE",
      country: "الإمارات",
      address: "Sharjah, Industrial Area 5, Warehouse 4.",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Sharjah%20Industrial%20Area%205%20Warehouse%204",
      embedUrl:
        "https://www.google.com/maps?q=Sharjah%20Industrial%20Area%205%20Warehouse%204&output=embed",
    },
  ],
} as const;

export type Branch = (typeof siteConfig.branches)[number];
