import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Calculate Ear Drop Days Supply | Pharmacist Guide",
  description:
    "Step-by-step pharmacist guide explaining how to calculate ear drops days supply using bottle size, drops per mL, dosing frequency, one ear or both ears, and duration limits.",
  keywords: [
    "how to calculate ear drop days supply",
    "ear drops days supply",
    "ear drop day supply",
    "otic days supply",
    "otic drops calculator",
    "pharmacy ear drop calculator",
    "ear drops days supply calculator",
  ],
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/how-to-calculate-ear-drop-days-supply",
  },
  openGraph: {
    title: "How to Calculate Ear Drop Days Supply | Pharmacist Guide",
    description:
      "Step-by-step pharmacist guide explaining how to calculate ear drops days supply using bottle size, drops per mL, dosing frequency, one ear or both ears, and duration limits.",
    url: "https://www.insulinprimingdayssupply.com/how-to-calculate-ear-drop-days-supply",
    siteName: "Insulin Days' Supply",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate Ear Drop Days Supply | Pharmacist Guide",
    description:
      "Step-by-step pharmacist guide explaining how to calculate ear drops days supply using bottle size, drops per mL, dosing frequency, one ear or both ears, and duration limits.",
  },
};

const faqs = [
  {
    question: "How do you calculate ear drops days supply?",
    answer:
      "Estimate the total number of drops in the bottle, then divide by the number of drops used each day based on directions for the left ear, right ear, or both ears.",
  },
  {
    question: "Why can ear drops days supply vary?",
    answer:
      "Days supply can vary because drop size may differ by bottle design, patient technique can vary, one-ear versus both-ears directions change total daily use, and some prescriptions include a fixed duration such as 7 days.",
  },
  {
    question: "Should a 7-day direction cap the billed days supply?",
    answer:
      "Often yes. If the prescription directions specify a fixed duration, such as 7 days, pharmacies may use that duration as a cap on the practical billed days supply depending on workflow and payer requirements.",
  },
  {
    question: "How many drops are in 1 mL of ear drops?",
    answer:
      "A common pharmacy workflow estimate is 20 drops per mL, although actual drop counts can vary by product and bottle design.",
  },
];

export default function HowToCalculateEarDropDaysSupplyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "FAQPage"],
    name: "How to Calculate Ear Drop Days Supply",
    url: "https://www.insulinprimingdayssupply.com/how-to-calculate-ear-drop-days-supply",
    description:
      "Step-by-step guide for calculating ear drops days supply using bottle size, drops per mL, dosing frequency, one ear or both ears, and duration limits.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacists",
    },
    about: {
      "@type": "DrugClass",
      name: "Otic medications",
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Insulin Days' Supply",
      url: "https://www.insulinprimingdayssupply.com",
    },
    relatedLink: [
      "https://www.insulinprimingdayssupply.com/ear-drops-days-supply-calculator",
      "https://www.insulinprimingdayssupply.com/days-supply-calculators",
      "https://www.insulinprimingdayssupply.com/eye-drops-days-supply-calculator",
      "https://www.insulinprimingdayssupply.com/insulin-days-supply-calculator",
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
          How to Calculate Ear Drop Days Supply
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-700">
          This pharmacist-focused guide explains how to calculate{" "}
          <strong>ear drops days supply</strong> using bottle size, estimated
          drops per mL, dosing frequency, one-ear or both-ears directions, and
          optional duration limits.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/ear-drops-days-supply-calculator"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Ear Drops Days Supply Calculator
          </Link>

          <Link
            href="/days-supply-calculators"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Pharmacy Calculators Hub
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

        <p className="mt-4 text-slate-700 leading-7">
          To estimate the total number of drops in the bottle, multiply the
          bottle size in mL by your pharmacy&apos;s estimated drops per mL
          standard.
        </p>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Step-by-step: how to calculate ear drop days supply
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 1: Confirm bottle size
            </h3>
            <p className="mt-2 leading-7">
              Review the bottle size that will actually be dispensed. The total
              bottle volume is a key part of estimating the total number of
              drops available.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 2: Estimate total drops in the bottle
            </h3>
            <p className="mt-2 leading-7">
              Multiply the bottle size by the estimated number of drops per mL
              used in your pharmacy workflow. A common estimate is 20 drops per
              mL unless your workflow uses a different standard.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 3: Determine total daily drops used
            </h3>
            <p className="mt-2 leading-7">
              Review the prescription directions carefully. Count the total
              number of drops used each day, including whether the medication is
              used in the left ear, right ear, or both ears.
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

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 5: Apply any duration limit
            </h3>
            <p className="mt-2 leading-7">
              If the directions specify a fixed treatment duration, such as{" "}
              <strong>for 7 days</strong>, that duration may cap the practical
              billed days supply depending on pharmacy workflow and payer
              requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Use the ear drops days supply calculator
        </h2>

        <p className="mt-3 leading-7 text-slate-700">
          For a faster workflow calculation, use the ear drops days supply
          calculator to estimate days supply using bottle size, drops per mL,
          left and right ear dosing, frequency, and optional duration caps.
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
          Example ear drops days supply calculation
        </h2>

        <div className="mt-6 space-y-5 text-slate-700">
          <div className="rounded-2xl bg-slate-50 p-5">
            <ul className="space-y-2 leading-7">
              <li>Bottle size: 10 mL</li>
              <li>Estimated drops per mL: 20</li>
              <li>Total estimated drops: 200 drops</li>
              <li>Directions: 4 drops in each ear twice daily</li>
              <li>Total daily use: 16 drops per day</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-cyan-50 p-5 text-slate-900">
            <p className="font-semibold">200 ÷ 16 = 12.5 days supply</p>
          </div>

          <p className="leading-7">
            If the prescription also says to use the medication for{" "}
            <strong>7 days</strong>, then the practical billed days supply may
            be capped at 7 days based on workflow and payer requirements.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Common ear drops days supply mistakes
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Forgetting to count both ears when directions are bilateral",
            "Using the wrong bottle size",
            "Ignoring your workflow drops-per-mL standard",
            "Missing dosing frequency in the directions",
            "Overlooking a fixed duration such as 7 days",
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
          Related pharmacy tools
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/ear-drops-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Ear Drops Days Supply Calculator
            </h3>
            <p className="mt-2 text-slate-700">
              Calculate otic days supply using bottle size, ear-specific dosing,
              and optional duration limits.
            </p>
          </Link>

          <Link
            href="/eye-drops-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Eye Drops Days Supply Calculator
            </h3>
            <p className="mt-2 text-slate-700">
              Calculate ophthalmic days supply using bottle size and drops per
              mL.
            </p>
          </Link>

          <Link
            href="/insulin-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Insulin Days Supply Calculator
            </h3>
            <p className="mt-2 text-slate-700">
              Pharmacist calculator including priming and expiration logic.
            </p>
          </Link>

          <Link
            href="/days-supply-calculators"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Pharmacy Calculators Hub
            </h3>
            <p className="mt-2 text-slate-700">
              Browse insulin, eye drops, ear drops, and other days supply tools.
            </p>
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently asked questions about ear drops days supply
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
