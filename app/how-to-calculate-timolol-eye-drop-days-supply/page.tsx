import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Calculate Timolol Eye Drop Days Supply | Pharmacist Guide",
  description:
    "Step-by-step pharmacist guide explaining how to calculate timolol eye drop days supply using bottle size, drops per mL, dosing frequency, and practical workflow considerations.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/how-to-calculate-timolol-eye-drop-days-supply",
  },
  openGraph: {
    title: "How to Calculate Timolol Eye Drop Days Supply | Pharmacist Guide",
    description:
      "Step-by-step pharmacist guide explaining how to calculate timolol eye drop days supply using bottle size, drops per mL, dosing frequency, and practical workflow considerations.",
    url: "https://www.insulinprimingdayssupply.com/how-to-calculate-timolol-eye-drop-days-supply",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate Timolol Eye Drop Days Supply | Pharmacist Guide",
    description:
      "Step-by-step pharmacist guide explaining how to calculate timolol eye drop days supply using bottle size, drops per mL, dosing frequency, and practical workflow considerations.",
  },
};

const faqs = [
  {
    question: "How do you calculate timolol eye drop days supply?",
    answer:
      "Estimate the total number of drops in the bottle, then divide by the number of drops the patient uses each day based on directions for both eyes or one eye.",
  },
  {
    question: "How many drops are in a 5 mL timolol bottle?",
    answer:
      "The exact number can vary by bottle and drop size, but many pharmacy workflows estimate around 15 to 20 drops per mL unless a different standard is used.",
  },
  {
    question: "Why can timolol eye drop days supply vary?",
    answer:
      "Days supply can vary because drop size differs by bottle design, patient technique, prescribed frequency, and whether one or both eyes are being treated.",
  },
  {
    question: "Why is timolol days supply important for billing?",
    answer:
      "Accurate eye drop days supply helps support refill timing, prescription processing, and documentation consistency for pharmacy billing workflows.",
  },
];

export default function HowToCalculateTimololEyeDropDaysSupplyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "How to Calculate Timolol Eye Drop Days Supply",
    url: "https://www.insulinprimingdayssupply.com/how-to-calculate-timolol-eye-drop-days-supply",
    description:
      "Step-by-step guide for calculating timolol eye drop days supply using bottle size, drops per mL, and dosing frequency.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacist",
    },
    about: {
      "@type": "MedicalEntity",
      name: "Timolol",
    },
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
          How to Calculate Timolol Eye Drop Days Supply
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-700">
          This pharmacist-focused guide explains how to calculate{" "}
          <strong>timolol eye drop days supply</strong> using bottle size,
          estimated drops per mL, and prescribed daily use.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/eye-drops-ndc-reference"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Eye Drops NDC Reference
          </Link>

          <Link
            href="/eye-drops-ndc-reference/timolol"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Timolol NDC Page
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

        <p className="mt-4 text-slate-700">
          To estimate the total drops in the bottle, multiply the bottle size in
          mL by your pharmacy’s estimated drops per mL standard.
        </p>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Step-by-step: how to calculate timolol eye drop days supply
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 1: Confirm the bottle size
            </h3>
            <p className="mt-2 leading-7">
              Review the exact timolol product and bottle size dispensed. Many
              common ophthalmic products are supplied in small bottles such as 5
              mL, but the exact package should always be confirmed.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 2: Estimate total drops in the bottle
            </h3>
            <p className="mt-2 leading-7">
              Multiply the bottle size by the estimated number of drops per mL
              used in your pharmacy workflow. Many pharmacies use a standard
              range such as 15 to 20 drops per mL for estimation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 3: Determine total daily drops used
            </h3>
            <p className="mt-2 leading-7">
              Review the prescription directions carefully. Count the total
              number of drops used each day, taking into account frequency and
              whether the medication is used in one eye or both eyes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 4: Divide total drops by daily use
            </h3>
            <p className="mt-2 leading-7">
              Divide the total estimated drops in the bottle by the total drops
              used per day to estimate the days supply.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Example timolol eye drop days supply calculation
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

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Common timolol eye drop days supply mistakes
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Forgetting to count both eyes",
            "Using the wrong bottle size",
            "Ignoring pharmacy drop-per-mL standards",
            "Missing frequency in the directions",
            "Assuming every bottle produces identical drop size",
            "Not documenting the workflow used for estimation",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Related pharmacy references
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/eye-drops-ndc-reference/timolol"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Timolol Eye Drops NDC Reference
            </h3>
            <p className="mt-2 text-slate-700">
              Package NDCs, brands, and labelers for timolol ophthalmic
              products.
            </p>
          </Link>

          <Link
            href="/eye-drops-ndc-reference"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Eye Drops NDC Reference
            </h3>
            <p className="mt-2 text-slate-700">
              Browse ophthalmic package NDC reference pages by drug.
            </p>
          </Link>

          <Link
            href="/how-to-calculate-insulin-days-supply"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              How to Calculate Insulin Days Supply
            </h3>
            <p className="mt-2 text-slate-700">
              Pharmacist guide for insulin pen and vial calculations.
            </p>
          </Link>

          <Link
            href="/insulin-calculators"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Insulin Calculators
            </h3>
            <p className="mt-2 text-slate-700">
              Browse insulin days supply calculators and related references.
            </p>
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently asked questions about timolol eye drop days supply
        </h2>

        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl border border-cyan-200 bg-white p-5"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900">
                {faq.question}
              </summary>
              <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
