import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEyeDropDrugBySlug, getEyeDropDrugGroups } from "@/lib/fdaNdc";
import { eyeDropSeoContent } from "@/lib/eyeDropSeoContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const groups = await getEyeDropDrugGroups();

  return groups.map((group) => ({
    slug: group.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const group = await getEyeDropDrugBySlug(slug);

  if (!group) {
    return {
      title: "Eye Drop Days Supply Guide",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const seoContent = eyeDropSeoContent[group.slug] ?? null;

  const title = `How to Calculate ${group.genericName} Eye Drop Days Supply | Pharmacist Guide`;

  const description = seoContent?.relatedTerms?.length
    ? `Step-by-step pharmacist guide for calculating ${group.genericName} eye drop days supply using bottle size, drops per mL, dosing frequency, and workflow considerations. Includes ${seoContent.relatedTerms.join(
        ", ",
      )}.`
    : `Step-by-step pharmacist guide for calculating ${group.genericName} eye drop days supply using bottle size, drops per mL, dosing frequency, and workflow considerations.`;

  const url = `https://www.insulinprimingdayssupply.com/eye-drop-days-supply-guides/${group.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Insulin Days' Supply",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EyeDropGuidePage({ params }: Props) {
  const { slug } = await params;
  const group = await getEyeDropDrugBySlug(slug);

  if (!group) {
    notFound();
  }

  const seoContent = eyeDropSeoContent[group.slug] ?? null;

  const bottleSizes = [
    ...new Set(
      group.items
        .map((item) => item.bottleSizeMl)
        .filter((value): value is number => value != null),
    ),
  ].sort((a, b) => a - b);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `How to Calculate ${group.genericName} Eye Drop Days Supply`,
    url: `https://www.insulinprimingdayssupply.com/eye-drop-days-supply-guides/${group.slug}`,
    description: `Step-by-step pharmacist guide for calculating ${group.genericName} eye drop days supply.`,
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacist",
    },
    about: {
      "@type": "Drug",
      name: group.genericName,
    },
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
          Eye Drop Days Supply Guide
        </p>

        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          How to Calculate {group.genericName} Eye Drop Days Supply
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-700">
          This pharmacist-focused guide explains how to calculate{" "}
          <strong>{group.genericName} eye drop days supply</strong> using bottle
          size, estimated drops per mL, and prescribed daily use.
        </p>

        {seoContent?.introExtra ? (
          <p className="mt-3 text-base leading-7 text-slate-700">
            {seoContent.introExtra}
          </p>
        ) : null}

        {group.items.length > 0 ? (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-xl font-semibold text-slate-900">
              {group.genericName} ophthalmic product overview
            </h2>

            <div className="mt-4 space-y-2 text-slate-700">
              <p>
                <strong>Package NDCs found:</strong> {group.items.length}
              </p>

              {group.brandNames.length > 0 ? (
                <p>
                  <strong>Brand names:</strong> {group.brandNames.join(", ")}
                </p>
              ) : null}

              {group.labelerNames.length > 0 ? (
                <p>
                  <strong>Labelers:</strong>{" "}
                  {group.labelerNames.slice(0, 5).join(", ")}
                  {group.labelerNames.length > 5 ? "..." : ""}
                </p>
              ) : null}

              <p>
                <strong>Common bottle sizes:</strong>{" "}
                {bottleSizes.length
                  ? bottleSizes.map((value) => `${value} mL`).join(", ")
                  : "Not available"}
              </p>
            </div>
          </section>
        ) : null}

        {seoContent?.dosingConsiderations?.length ? (
          <section className="mt-8 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
            <h2 className="text-xl font-semibold text-slate-900">
              {group.genericName} dosing considerations
            </h2>

            <ul className="mt-4 space-y-2 text-slate-700 leading-7">
              {seoContent.dosingConsiderations.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {seoContent?.commonScenarios?.length ? (
          <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Common {group.genericName} dosing scenarios
            </h2>

            <div className="mt-4 space-y-4">
              {seoContent.commonScenarios.map((scenario) => (
                <div
                  key={scenario.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="font-semibold text-slate-900">
                    {scenario.title}
                  </h3>
                  <p className="mt-2 text-slate-700">
                    <span className="font-semibold">Typical dosing:</span>{" "}
                    {scenario.dose}
                  </p>
                  <p className="mt-2 text-slate-700">
                    <span className="font-semibold">Days supply impact:</span>{" "}
                    {scenario.impact}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/eye-drops-ndc-reference/${group.slug}`}
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            {group.genericName} NDC Reference
          </Link>

          <Link
            href="/how-to-calculate-eye-drop-days-supply"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            General Eye Drop Guide
          </Link>

          <Link
            href="/eye-drops-days-supply-calculator"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Eye Drops Calculator
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Basic eye drop days supply formula
        </h2>

        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
          <p className="font-semibold text-slate-900">
            Days Supply = Total Drops in Bottle ÷ Drops Used Per Day
          </p>
        </div>

        <p className="mt-4 text-slate-700 leading-7">
          To estimate the total number of drops in the bottle, multiply the
          bottle size in mL by the drops-per-mL standard used in your pharmacy
          workflow.
        </p>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Step-by-step: how to calculate {group.genericName} eye drop days
          supply
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 1: Confirm the bottle size
            </h3>
            <p className="mt-2 leading-7">
              Review the exact {group.genericName} ophthalmic product and bottle
              size dispensed. Bottle sizes vary by product and manufacturer, so
              the package should always be confirmed.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 2: Estimate total drops in the bottle
            </h3>
            <p className="mt-2 leading-7">
              Multiply the bottle size by the estimated number of drops per mL
              used in your pharmacy workflow. Many pharmacies use a standard
              drops-per-mL estimation rule.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 3: Determine total daily drops used
            </h3>
            <p className="mt-2 leading-7">
              Review the prescription directions carefully. Count the total
              number of drops used each day, including whether the medication is
              used in one eye or both eyes and how often it is applied.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 4: Divide total drops by daily use
            </h3>
            <p className="mt-2 leading-7">
              Divide the total estimated drops in the bottle by the total number
              of drops used per day to estimate the days supply.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Example {group.genericName} eye drop days supply calculation
        </h2>

        <div className="mt-6 space-y-5 text-slate-700">
          <div className="rounded-2xl bg-slate-50 p-5">
            <ul className="space-y-2 leading-7">
              <li>Bottle size: 5 mL</li>
              <li>Estimated drops per mL: 20</li>
              <li>Total estimated drops: 100 drops</li>
              <li>Directions: 1 drop in each eye twice daily</li>
              <li>Total daily use: 4 drops per day</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-cyan-50 p-5 text-slate-900">
            <p className="font-semibold">100 ÷ 4 = 25 days supply</p>
          </div>

          <p className="leading-7">
            Actual drop count may vary by bottle design and patient technique,
            so pharmacies often follow internal workflow standards for eye drop
            calculations.
          </p>
        </div>
      </section>

      {seoContent?.faq?.length ? (
        <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {group.genericName} eye drop days supply FAQs
          </h2>

          <div className="mt-6 space-y-6 text-slate-700">
            {seoContent.faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.question}
                </h3>
                <p className="mt-2 leading-7">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Related pages</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href={`/eye-drops-ndc-reference/${group.slug}`}
            className="rounded-2xl border border-cyan-200 bg-white p-5 transition hover:bg-slate-50"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              {group.genericName} NDC Reference
            </h3>
            <p className="mt-2 text-slate-700">
              Package NDCs, brands, and labelers for {group.genericName}{" "}
              ophthalmic products.
            </p>
          </Link>

          <Link
            href="/eye-drops-ndc-reference"
            className="rounded-2xl border border-cyan-200 bg-white p-5 transition hover:bg-slate-50"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Eye Drops NDC Reference
            </h3>
            <p className="mt-2 text-slate-700">
              Browse ophthalmic package NDC reference pages by drug.
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
