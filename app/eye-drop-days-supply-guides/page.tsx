import type { Metadata } from "next";
import Link from "next/link";
import { getEyeDropDrugGroups } from "@/lib/fdaNdc";

export const metadata: Metadata = {
  title: "Eye Drop Days Supply Guides | Pharmacist Reference",
  description:
    "Browse pharmacist guides for calculating eye drop days supply by ophthalmic drug, including bottle size, drops per mL, and dosing workflow.",
  keywords: [
    "eye drop days supply guides",
    "ophthalmic days supply guides",
    "eye drop days supply by drug",
    "pharmacist eye drop guide",
    "how to calculate eye drop days supply",
  ],
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/eye-drop-days-supply-guides",
  },
  openGraph: {
    title: "Eye Drop Days Supply Guides | Pharmacist Reference",
    description:
      "Browse pharmacist guides for calculating eye drop days supply by ophthalmic drug.",
    url: "https://www.insulinprimingdayssupply.com/eye-drop-days-supply-guides",
    siteName: "Insulin Days' Supply",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eye Drop Days Supply Guides | Pharmacist Reference",
    description:
      "Browse pharmacist guides for calculating eye drop days supply by ophthalmic drug.",
  },
};

export default async function EyeDropGuidesIndexPage() {
  const groups = await getEyeDropDrugGroups();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Eye Drop Days Supply Guides",
    url: "https://www.insulinprimingdayssupply.com/eye-drop-days-supply-guides",
    description:
      "Browse pharmacist guides for calculating eye drop days supply by ophthalmic drug.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacists",
    },
    about: {
      "@type": "DrugClass",
      name: "Ophthalmic Products",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Insulin Days' Supply",
      url: "https://www.insulinprimingdayssupply.com",
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
          Pharmacist Guides
        </p>

        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Eye Drop Days Supply Guides
        </h1>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          Browse ophthalmic drug-specific guides for calculating eye drop days
          supply using bottle size, drops per mL, and daily dosing directions.
        </p>

        <p className="mt-3 max-w-3xl text-sm text-slate-700">
          These eye drop days supply guides are designed for pharmacists and
          pharmacy technicians who need drug-specific ophthalmic workflow
          examples for documentation, billing, and refill timing.
        </p>

        <p className="mt-3 max-w-3xl text-sm text-slate-600">
          Looking for the main tool? Use the{" "}
          <Link
            href="/eye-drops-days-supply-calculator"
            className="font-semibold text-cyan-700 underline underline-offset-4"
          >
            eye drops days supply calculator
          </Link>{" "}
          or start with the{" "}
          <Link
            href="/how-to-calculate-eye-drop-days-supply"
            className="font-semibold text-cyan-700 underline underline-offset-4"
          >
            general eye drop days supply guide
          </Link>
          .
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/eye-drops-days-supply-calculator"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Eye Drops Calculator
          </Link>

          <Link
            href="/how-to-calculate-eye-drop-days-supply"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            General Eye Drop Guide
          </Link>

          <Link
            href="/eye-drops-ndc-reference"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Eye Drops NDC Reference
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Browse by ophthalmic drug
        </h2>

        <p className="mt-3 max-w-3xl text-slate-700">
          Select a drug below to view a pharmacist guide for calculating eye
          drop days supply by medication, package size, and common dosing
          workflow.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Link
              key={group.slug}
              href={`/eye-drop-days-supply-guides/${group.slug}`}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:bg-slate-50"
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
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
