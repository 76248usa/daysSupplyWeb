import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.insulinprimingdayssupply.com";
  const now = new Date();

  const medicines = [
    "tresiba",
    "toujeo",
    "lantus",
    "basaglar",
    "levemir",
    "humalog",
    "admelog",
    "novolog",
    "fiasp",
    "humulin-r",
    "humulin-n",
    "humulin-70-30",
    "novolin-r",
    "novolin-n",
    "novolin-70-30",
    "humalog-75-25",
    "humalog-50-50",
    "novolog-70-30",
  ];

  const medicinePages = medicines.map((m) => ({
    url: `${base}/app/medicine/${m}`,
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
      url: `${base}/app`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
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
