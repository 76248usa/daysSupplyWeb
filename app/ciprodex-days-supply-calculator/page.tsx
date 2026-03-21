import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ciprodex Days Supply Calculator | Pharmacist Guide",
  description:
    "Step-by-step pharmacist guide explaining how to calculate Ciprodex days supply using bottle size, drops per mL, dosing frequency, one ear or both ears, and practical workflow considerations.",
  keywords: [
    "ciprodex days supply calculator",
    "ciprodex days supply",
    "ciprodex ear drops days supply",
    "how to calculate ciprodex days supply",
    "otic days supply calculator",
    "ear drop days supply calculator ciprodex",
  ],
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/ciprodex-days-supply-calculator",
  },
  openGraph: {
    title: "Ciprodex Days Supply Calculator | Pharmacist Guide",
    description:
      "Step-by-step pharmacist guide explaining how to calculate Ciprodex days supply using bottle size, drops per mL, dosing frequency, and ear-specific directions.",
    url: "https://www.insulinprimingdayssupply.com/ciprodex-days-supply-calculator",
    siteName: "Insulin Days' Supply",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ciprodex Days Supply Calculator | Pharmacist Guide",
    description:
      "Step-by-step pharmacist guide explaining how to calculate Ciprodex days supply using bottle size, drops per mL, dosing frequency, and ear-specific directions.",
  },
};

const faqs = [
  {
    question: "How do you calculate Ciprodex days supply?",
    answer:
      "Estimate the total number of drops in the bottle, then divide by the number of drops used each day based on directions for the left ear, right ear, or both ears.",
  },
  {
    question: "Why can Ciprodex days supply vary?",
    answer:
      "Days supply can vary because drop size may differ by bottle design, patient technique can vary, and one-ear versus both-ears directions change total daily use.",
  },
  {
    question: "Should a 7-day direction cap the billed days supply?",
    answer:
      "Often yes. If the directions specify a fixed treatment duration such as 7 days, that duration may cap the practical billed days supply depending on workflow and payer requirements.",
  },
  {
    question: "How many drops are in a 7.5 mL Ciprodex bottle?",
    answer:
      "A common pharmacy workflow estimate is 20 drops per mL, so a 7.5 mL bottle may be estimated at about 150 drops, although actual drop count can vary.",
  },
];

export default function CiprodexDaysSupplyCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "FAQPage"],
    name: "Ciprodex Days Supply Calculator",
    url: "https://www.insulinprimingdayssupply.com/ciprodex-days-supply-calculator",
    description:
      "Step-by-step guide for calculating Ciprodex days supply using bottle size, drops per mL, dosing frequency, and ear-specific directions.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacists",
    },
    about: {
      "@type": "MedicalEntity",
      name: "Ciprodex",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Insulin Days' Supply",
      url: "https://www.insulinprimingdayssupply.com",
    },
    relatedLink: [
      "https://www.insulinprimingdayssupply.com/ear-drops-days-supply-calculator",
      "https://www.insulinprimingdayssupply.com/how-to-calculate-ear-drop-days-supply",
      "https://www.insulinprimingdayssupply.com/ofloxacin-ear-drops-days-supply",
      "https://www.insulinprimingdayssupply.com/ciprofloxacin-ear-drops-days-supply",
      "https://www.insulinprimingdayssupply.com/days-supply-calculators",
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
          Ear Drop Days Supply Guide
        </p>

        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Ciprodex Days Supply Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-700">
          This pharmacist-focused guide explains how to calculate{" "}
          <strong>Ciprodex days supply</strong> using bottle size, estimated
          drops per mL, dosing frequency, one-ear or both-ears directions, and
          treatment duration.
        </p>

        <p className="mt-2 text-sm text-slate-600">
          This Ciprodex days supply calculator helps pharmacists calculate ear
          drops days supply using bottle size, drops per mL, and dosing
          frequency for otic prescriptions.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/ear-drops-days-supply-calculator"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Ear Drops Days Supply Calculator
          </Link>

          <Link
            href="/how-to-calculate-ear-drop-days-supply"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            General Ear Drop Guide
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Basic ear drops days supply formula
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
          Step-by-step: how to calculate Ciprodex days supply
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 1: Confirm the bottle size
            </h3>
            <p className="mt-2 leading-7">
              Confirm the dispensed bottle size. Ciprodex is commonly dispensed
              as a 7.5 mL otic suspension, but the actual package dispensed
              should always be verified.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 2: Estimate total drops in the bottle
            </h3>
            <p className="mt-2 leading-7">
              Multiply the bottle size by the estimated drops per mL used in
              your workflow. Many pharmacies use 20 drops per mL as a working
              estimate.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 3: Determine total daily drops used
            </h3>
            <p className="mt-2 leading-7">
              Count the total number of drops used each day based on directions
              for the left ear, right ear, or both ears, and how many times per
              day the medication is used.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 4: Divide total drops by daily use
            </h3>
            <p className="mt-2 leading-7">
              Divide the total estimated drops in the bottle by the total drops
              used per day to estimate the mathematical days supply.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 5: Apply any duration limit
            </h3>
            <p className="mt-2 leading-7">
              If the directions specify a fixed course such as 7 days, that may
              cap the final billed days supply depending on workflow and payer
              rules.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Use the ear drops days supply calculator
        </h2>

        <p className="mt-3 leading-7 text-slate-700">
          For a faster workflow calculation, use the calculator to estimate days
          supply using bottle size, left and right ear dosing, frequency, and
          optional duration caps.
        </p>

        <div className="mt-4">
          <Link
            href="/ear-drops-days-supply-calculator"
            className="inline-flex rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
          >
            Open ear drops days supply calculator
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Example Ciprodex days supply calculation
        </h2>

        <div className="mt-6 space-y-5 text-slate-700">
          <div className="rounded-2xl bg-slate-50 p-5">
            <ul className="space-y-2 leading-7">
              <li>Bottle size: 7.5 mL</li>
              <li>Estimated drops per mL: 20</li>
              <li>Total estimated drops: 150 drops</li>
              <li>Directions: 4 drops in one ear twice daily</li>
              <li>Total daily use: 8 drops per day</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-cyan-50 p-5 text-slate-900">
            <p className="font-semibold">150 ÷ 8 = 18.75 days supply</p>
          </div>

          <p className="leading-7">
            If the prescription directions also specify use for 7 days, the
            practical billed days supply may be capped at 7 days.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Common Ciprodex days supply mistakes
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Using the wrong bottle size",
            "Forgetting to count one ear versus both ears",
            "Ignoring the workflow drops-per-mL standard",
            "Missing dosing frequency in the directions",
            "Overlooking a fixed duration such as 7 days",
            "Not documenting the estimation method used",
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
          Related ear drop examples
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/ofloxacin-ear-drops-days-supply"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Ofloxacin ear drops days supply
            </h3>
            <p className="mt-2 text-slate-700">
              Common otic dosing example and workflow math.
            </p>
          </Link>

          <Link
            href="/ciprofloxacin-ear-drops-days-supply"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Ciprofloxacin ear drops days supply
            </h3>
            <p className="mt-2 text-slate-700">
              Step-by-step guide for ciprofloxacin otic calculations.
            </p>
          </Link>

          <Link
            href="/how-to-calculate-ear-drop-days-supply"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              General ear drop days supply guide
            </h3>
            <p className="mt-2 text-slate-700">
              Learn the general formula and otic workflow approach.
            </p>
          </Link>

          <Link
            href="/ear-drops-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Ear drops days supply calculator
            </h3>
            <p className="mt-2 text-slate-700">
              Calculate otic days supply using left and right ear dosing.
            </p>
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently asked questions about Ciprodex days supply
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
