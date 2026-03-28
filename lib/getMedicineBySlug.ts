import { medicineData } from "@/lib/medicineData";

export function getMedicineBySlug(slug: string) {
  return medicineData.find((m) => m.seoSlug === slug) ?? null;
}

export function getSeoMedicines() {
  return medicineData.filter((m) => m.seoSlug && m.seoTitle);
}
