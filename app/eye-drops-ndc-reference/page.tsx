// app/eye-drops-ndc-reference/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  getEyeDropDrugGroups,
  getEyeDropGuideHref,
  getEyeDropNdcData,
  slugifyDrugName,
} from "@/lib/fdaNdc";

export const metadata: Metadata = {
  title: "Eye Drops NDC Reference | Ophthalmic Products",
  description:
    "Reference list of ophthalmic products and eye drops using public FDA NDC data, including package NDCs, brand names, and labelers.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/eye-drops-ndc-reference",
  },
  openGraph: {
    title: "Eye Drops NDC Reference | Ophthalmic Products",
    description:
      "Reference list of ophthalmic products and eye drops using public FDA NDC data, including package NDCs, brand names, and labelers.",
    url: "https://www.insulinprimingdayssupply.com/eye-drops-ndc-reference",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eye Drops NDC Reference | Ophthalmic Products",
    description:
      "Reference list of ophthalmic products and eye drops using public FDA NDC data, including package NDCs, brand names, and labelers.",
  },
};

export default async function EyeDropsNdcReferencePage() {
  const [items, groups] = await Promise.all([
    getEyeDropNdcData(),
    getEyeDropDrugGroups(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Eye Drops NDC Reference",
    url: "https://www.insulinprimingdayssupply.com/eye-drops-ndc-reference",
    description:
      "Reference list of ophthalmic products and eye drops using public FDA NDC data.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacist",
    },
    about: {
      "@type": "DrugClass",
      name: "Ophthalmic Products",
    },
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
          Pharmacy Reference
        </p>

        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Eye Drops NDC Reference
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          This page lists ophthalmic products using public FDA NDC data. It can
          be used as a pharmacy reference for package NDC, product name, package
          description, and labeler information.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/how-to-calculate-eye-drop-days-supply"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Eye Drop Days Supply Guide
          </Link>

          <Link
            href="/insulin-days-supply-calculator"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Insulin Days Supply Calculator
          </Link>
        </div>
      </section>

      <p>
        These days supply calculators are designed for pharmacists and pharmacy
        technicians.
      </p>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Browse by ophthalmic drug
        </h2>

        <p className="mt-3 max-w-3xl text-slate-700">
          Browse individual ophthalmic drug pages for grouped package NDCs,
          brands, and labelers. These pages are useful for quick pharmacy
          reference and search.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group.slug}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {group.genericName}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {group.items.length} package NDC
                {group.items.length === 1 ? "" : "s"}
              </p>

              {group.brandNames.length > 0 && (
                <p className="mt-2 text-sm text-slate-600">
                  Brands: {group.brandNames.slice(0, 3).join(", ")}
                  {group.brandNames.length > 3 ? "..." : ""}
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href={`/eye-drops-ndc-reference/${group.slug}`}
                  className="inline-flex items-center rounded-xl bg-cyan-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700"
                >
                  NDC Reference
                </Link>

                <Link
                  href={getEyeDropGuideHref(group.genericName)}
                  className="inline-flex items-center rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Days Supply Guide
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          All ophthalmic package NDCs
        </h2>

        <p className="mt-3 max-w-3xl text-slate-700">
          Full package-level reference table using public FDA NDC data for
          ophthalmic products.
        </p>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full border-collapse">
            <caption className="sr-only">
              Ophthalmic package NDC reference table
            </caption>
            <thead className="bg-slate-50">
              <tr>
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Generic
                </th>
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Brand
                </th>
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Package NDC
                </th>
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Package
                </th>
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Labeler
                </th>
                <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                  Guide
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={
                    item.packageNdc ||
                    `${item.genericName}-${item.packageDescription}`
                  }
                >
                  <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                    {item.genericName ? (
                      <Link
                        href={`/eye-drops-ndc-reference/${slugifyDrugName(
                          item.genericName,
                        )}`}
                        className="font-medium text-cyan-700 underline underline-offset-4"
                      >
                        {item.genericName}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                    {item.brandName || "—"}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                    {item.packageNdc || "—"}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                    {item.packageDescription || "—"}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                    {item.labelerName || "—"}
                  </td>
                  <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                    {item.genericName ? (
                      <Link
                        href={getEyeDropGuideHref(item.genericName)}
                        className="font-medium text-cyan-700 underline underline-offset-4"
                      >
                        Guide
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Related pharmacy references
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/how-to-calculate-eye-drop-days-supply"
            className="rounded-2xl border border-cyan-200 bg-white p-5 transition hover:bg-slate-50"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              How to Calculate Eye Drop Days Supply
            </h3>
            <p className="mt-2 text-slate-700">
              Step-by-step guide for calculating eye drop days supply.
            </p>
          </Link>

          <Link
            href="/insulin-calculators"
            className="rounded-2xl border border-cyan-200 bg-white p-5 transition hover:bg-slate-50"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Insulin Calculators
            </h3>
            <p className="mt-2 text-slate-700">
              Browse insulin days supply calculators and pharmacist references.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
