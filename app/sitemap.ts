import { MetadataRoute } from "next";
import { medicineData } from "@/lib/medicineData";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.insulinprimingdayssupply.com";
  const now = new Date();

  const medicinePages = medicineData
    .filter((m) => m.seoSlug)
    .map((m) => ({
      url: `${base}/${m.seoSlug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${base}/insulin-calculators`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: `${base}/insulin-days-supply-calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: `${base}/insulin-pen-days-supply`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${base}/insulin-priming-doses-chart`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${base}/insulin-expiration-chart`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: `${base}/app`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: `${base}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/how-to-calculate-insulin-days-supply`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },

    {
      url: `${base}/app/upgrade`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    ...medicinePages,
  ];
}
