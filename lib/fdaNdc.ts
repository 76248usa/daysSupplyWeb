// lib/fdaNdc.ts
type OpenFdaNdcPackage = {
  package_ndc?: string;
  description?: string;
};

type OpenFdaNdcResult = {
  product_ndc?: string;
  generic_name?: string;
  brand_name?: string;
  labeler_name?: string;
  dosage_form?: string;
  route?: string[];
  marketing_status?: string;
  finished?: boolean;
  listing_expiration_date?: string;
  packaging?: OpenFdaNdcPackage[];
};

export type EyeDropItem = {
  productNdc: string;
  packageNdc: string;
  brandName: string;
  genericName: string;
  labelerName: string;
  dosageForm: string;
  route: string;
  marketingStatus: string;
  packageDescription: string;
};

export type EyeDropDrugGroup = {
  slug: string;
  genericName: string;
  brandNames: string[];
  labelerNames: string[];
  items: EyeDropItem[];
};

function normalizeText(value?: string): string {
  return (value ?? "").trim();
}

function normalizeItem(r: OpenFdaNdcResult): EyeDropItem[] {
  const packages = r.packaging ?? [];

  return packages.map((pkg) => ({
    productNdc: normalizeText(r.product_ndc),
    packageNdc: normalizeText(pkg.package_ndc),
    brandName: normalizeText(r.brand_name),
    genericName: normalizeText(r.generic_name),
    labelerName: normalizeText(r.labeler_name),
    dosageForm: normalizeText(r.dosage_form),
    route: Array.isArray(r.route)
      ? r.route
          .map((part) => normalizeText(part))
          .filter(Boolean)
          .join(", ")
      : "",
    marketingStatus: normalizeText(r.marketing_status),
    packageDescription: normalizeText(pkg.description),
  }));
}

export function slugifyDrugName(name: string): string {
  return name
    .toLowerCase()
    .replace(/%/g, " percent ")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getEyeDropGuideSlug(name: string): string {
  return slugifyDrugName(name);
}

export function getEyeDropGuideHref(name: string): string {
  return `/eye-drop-days-supply-guides/${getEyeDropGuideSlug(name)}`;
}

function dedupeEyeDropItems(items: EyeDropItem[]): EyeDropItem[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = [
      item.productNdc,
      item.packageNdc,
      item.genericName,
      item.brandName,
      item.packageDescription,
      item.labelerName,
    ].join("||");

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export async function getEyeDropNdcData(): Promise<EyeDropItem[]> {
  const apiKey = process.env.OPENFDA_API_KEY;
  const params = new URLSearchParams();

  params.set("search", 'route:"OPHTHALMIC"');
  params.set("limit", "100");

  if (apiKey) {
    params.set("api_key", apiKey);
  }

  const url = `https://api.fda.gov/drug/ndc.json?${params.toString()}`;

  const res = await fetch(url, {
    next: { revalidate: 60 * 60 * 24 },
  });

  if (!res.ok) {
    throw new Error(`openFDA request failed: ${res.status}`);
  }

  const json = (await res.json()) as { results?: OpenFdaNdcResult[] };
  const results = json.results ?? [];

  const flattened = dedupeEyeDropItems(results.flatMap(normalizeItem));

  return flattened
    .filter((item) => {
      const desc = item.packageDescription.toLowerCase();
      const route = item.route.toUpperCase();

      return (
        route.includes("OPHTHALMIC") &&
        (desc.includes("ml") || desc.includes("bottle"))
      );
    })
    .sort((a, b) => {
      const byGeneric = a.genericName.localeCompare(b.genericName);
      if (byGeneric !== 0) return byGeneric;

      const byBrand = a.brandName.localeCompare(b.brandName);
      if (byBrand !== 0) return byBrand;

      return a.packageNdc.localeCompare(b.packageNdc);
    });
}

export async function getEyeDropDrugGroups(): Promise<EyeDropDrugGroup[]> {
  const items = await getEyeDropNdcData();
  const map = new Map<string, EyeDropDrugGroup>();

  for (const item of items) {
    const genericName = item.genericName || "Unknown Ophthalmic Product";
    const slug = slugifyDrugName(genericName) || "unknown-ophthalmic-product";

    if (!map.has(slug)) {
      map.set(slug, {
        slug,
        genericName,
        brandNames: item.brandName ? [item.brandName] : [],
        labelerNames: item.labelerName ? [item.labelerName] : [],
        items: [item],
      });
      continue;
    }

    const existing = map.get(slug)!;
    existing.items.push(item);

    if (item.brandName && !existing.brandNames.includes(item.brandName)) {
      existing.brandNames.push(item.brandName);
    }

    if (item.labelerName && !existing.labelerNames.includes(item.labelerName)) {
      existing.labelerNames.push(item.labelerName);
    }
  }

  return Array.from(map.values())
    .map((group) => ({
      ...group,
      brandNames: [...group.brandNames].sort((a, b) => a.localeCompare(b)),
      labelerNames: [...group.labelerNames].sort((a, b) => a.localeCompare(b)),
      items: dedupeEyeDropItems(group.items).sort((a, b) => {
        const byBrand = a.brandName.localeCompare(b.brandName);
        if (byBrand !== 0) return byBrand;

        return a.packageNdc.localeCompare(b.packageNdc);
      }),
    }))
    .sort((a, b) => a.genericName.localeCompare(b.genericName));
}

export async function getEyeDropDrugBySlug(
  slug: string,
): Promise<EyeDropDrugGroup | null> {
  const groups = await getEyeDropDrugGroups();
  return groups.find((group) => group.slug === slug) ?? null;
}
