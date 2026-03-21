import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Timolol Days Supply Calculator | Pharmacist Guide",
  description:
    "Step-by-step pharmacist guide explaining how to calculate timolol days supply using bottle size, drops per mL, dosing frequency, and one-eye or both-eyes directions.",
  keywords: [
    "timolol days supply calculator",
    "timolol days supply",
    "timolol eye drop days supply",
    "how to calculate timolol days supply",
    "ophthalmic days supply calculator",
    "eye drop days supply calculator timolol",
  ],
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/timolol-days-supply-calculator",
  },
  openGraph: {
    title: "Timolol Days Supply Calculator | Pharmacist Guide",
    description:
      "Step-by-step pharmacist guide explaining how to calculate timolol days supply using bottle size, drops per mL, and dosing frequency.",
    url: "https://www.insulinprimingdayssupply.com/timolol-days-supply-calculator",
    siteName: "Insulin Days' Supply",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Timolol Days Supply Calculator | Pharmacist Guide",
    description:
      "Step-by-step pharmacist guide explaining how to calculate timolol days supply using bottle size, drops per mL, and dosing frequency.",
  },
};

const faqs = [
  {
    question: "How do you calculate timolol days supply?",
    answer:
      "Estimate the total number of drops in the bottle, then divide by the number of drops used each day based on whether the medication is used in one eye or both eyes.",
  },
  {
    question: "How many drops are in a 5 mL timolol bottle?",
    answer:
      "A common pharmacy workflow estimate is 20 drops per mL, so a 5 mL bottle may be estimated at about 100 drops, although actual drop count can vary.",
  },
  {
    question: "Why can timolol days supply vary?",
    answer:
      "Days supply can vary because drop size may differ by bottle design, patient technique can vary, and one-eye versus both-eyes directions change total daily use.",
  },
  {
    question: "Why is timolol days supply important for billing?",
    answer:
      "Accurate eye drop days supply supports refill timing, documentation consistency, and prescription processing in pharmacy workflow.",
  },
];

export default function TimololDaysSupplyCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "FAQPage"],
    name: "Timolol Days Supply Calculator",
    url: "https://www.insulinprimingdayssupply.com/timolol-days-supply-calculator",
    description:
      "Step-by-step guide for calculating timolol days supply using bottle size, drops per mL, dosing frequency, and one-eye or both-eyes directions.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacists",
    },
    about: {
      "@type": "MedicalEntity",
      name: "Timolol",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Insulin Days' Supply",
      url: "https://www.insulinprimingdayssupply.com",
    },
    relatedLink: [
      "https://www.insulinprimingdayssupply.com/eye-drops-days-supply-calculator",
      "https://www.insulinprimingdayssupply.com/how-to-calculate-eye-drop-days-supply",
      "https://www.insulinprimingdayssupply.com/latanoprost-days-supply-calculator",
      "https://www.insulinprimingdayssupply.com/brimonidine-days-supply-calculator",
      "https://www.insulinprimingdayssupply.com/eye-drop-days-supply-guides",
    ],
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
          Timolol Days Supply Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-700">
          This pharmacist-focused guide explains how to calculate{" "}
          <strong>timolol days supply</strong> using bottle size, estimated
          drops per mL, dosing frequency, and one-eye or both-eyes directions.
        </p>

        <p className="mt-2 text-sm text-slate-600">
          This timolol days supply calculator helps pharmacists calculate
          ophthalmic days supply using bottle size, drops per mL, and dosing
          frequency.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/eye-drops-days-supply-calculator"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Eye Drops Days Supply Calculator
          </Link>

          <Link
            href="/how-to-calculate-eye-drop-days-supply"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            General Eye Drop Guide
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Basic eye drops days supply formula
        </h2>

        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
          <p className="font-semibold text-slate-900">
            Days Supply = Total Drops in Bottle ÷ Drops Used Per Day
          </p>
        </div>

        <p className="mt-4 leading-7 text-slate-700">
          To estimate total drops in the bottle, multiply bottle size in mL by
          your pharmacy&apos;s estimated drops per mL standard.
        </p>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Step-by-step: how to calculate timolol days supply
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 1: Confirm the bottle size
            </h3>
            <p className="mt-2 leading-7">
              Timolol is often dispensed in a 5 mL bottle, but the actual
              dispensed package should always be confirmed.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 2: Estimate total drops in the bottle
            </h3>
            <p className="mt-2 leading-7">
              Multiply bottle size by the estimated drops per mL used in your
              workflow. Many pharmacies use 20 drops per mL as a working
              estimate.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 3: Determine total daily drops used
            </h3>
            <p className="mt-2 leading-7">
              Count the total number of drops used each day based on whether the
              medication is used in one eye or both eyes. Timolol is often dosed
              twice daily.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 4: Divide total drops by daily use
            </h3>
            <p className="mt-2 leading-7">
              Divide the total estimated drops in the bottle by the total drops
              used per day to estimate mathematical days supply.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Use the eye drops days supply calculator
        </h2>

        <p className="mt-3 leading-7 text-slate-700">
          For a faster workflow calculation, use the calculator to estimate
          ophthalmic days supply using bottle size, drops per mL, one-eye or
          both-eyes dosing, and frequency.
        </p>

        <div className="mt-4">
          <Link
            href="/eye-drops-days-supply-calculator"
            className="inline-flex rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
          >
            Open eye drops days supply calculator
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Example timolol days supply calculation
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
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Related eye drop examples
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/latanoprost-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Latanoprost days supply calculator
            </h3>
            <p className="mt-2 text-slate-700">
              Common once-daily ophthalmic workflow example.
            </p>
          </Link>

          <Link
            href="/brimonidine-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Brimonidine days supply calculator
            </h3>
            <p className="mt-2 text-slate-700">
              Example calculations for more frequent daily dosing.
            </p>
          </Link>

          <Link
            href="/how-to-calculate-eye-drop-days-supply"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              General eye drop days supply guide
            </h3>
            <p className="mt-2 text-slate-700">
              Learn the general formula and ophthalmic workflow approach.
            </p>
          </Link>

          <Link
            href="/eye-drops-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Eye drops days supply calculator
            </h3>
            <p className="mt-2 text-slate-700">
              Calculate ophthalmic days supply using bottle size and drops per
              mL.
            </p>
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently asked questions about timolol days supply
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
