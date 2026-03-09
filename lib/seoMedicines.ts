import { medicineData } from "./medicineData";

export const seoMedicines = medicineData.filter(
  (m) => m.seoSlug && m.seoTitle && m.seoDescription,
);

export function getMedicineBySeoSlug(seoSlug: string) {
  return seoMedicines.find((m) => m.seoSlug === seoSlug);
}
