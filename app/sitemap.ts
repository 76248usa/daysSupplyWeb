import { medicineData } from "@/lib/medicineData";

export default function sitemap() {
  const baseUrl = "https://www.insulinprimingdayssupply.com";

  const staticPages = [
    "",
    "/insulin-days-supply-calculator",
    "/eye-drops-days-supply-calculator",
    "/ear-drops-days-supply-calculator",
    "/how-to-calculate-eye-drop-days-supply",
  ];

  const seoPages = medicineData
    .filter((m) => m.seoSlug)
    .map((m) => ({
      url: `${baseUrl}/${m.seoSlug}`,
      lastModified: new Date(),
    }));

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
    })),
    ...seoPages,
  ];
}
