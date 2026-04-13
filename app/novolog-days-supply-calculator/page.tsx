import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "NovoLog Days Supply Calculator (With Priming & Expiration) | Pharmacist Tool",
  description:
    "Calculate NovoLog days supply with pharmacist-focused guidance, priming considerations, expiration limits, example math, and quick links to insulin workflow resources.",
  keywords: [
    "novolog days supply calculator",
    "novolog day supply calculator",
    "novolog days supply",
    "novolog insulin day supply",
    "how to calculate novolog days supply",
    "insulin days supply calculator",
    "insulin pen priming days supply",
  ],
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/novolog-days-supply-calculator",
  },
  openGraph: {
    title:
      "NovoLog Days Supply Calculator (With Priming & Expiration) | Pharmacist Tool",
    description:
      "Learn how to calculate NovoLog pen days supply step by step, including total units, priming, and expiration considerations.",
    url: "https://www.insulinprimingdayssupply.com/novolog-days-supply-calculator",
    type: "article",
    siteName: "Insulin Days' Supply",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "NovoLog Days Supply Calculator (With Priming & Expiration) | Pharmacist Tool",
    description:
      "Learn how to calculate NovoLog pen days supply step by step, including total units, priming, and expiration considerations.",
  },
};

const faqs = [
  {
    question: "How do you calculate days supply for NovoLog?",
    answer:
      "Calculate total units dispensed, adjust for priming if your workflow includes priming loss, then divide usable units by the patient’s total daily dose.",
  },
  {
    question: "How many units are in a NovoLog pen?",
    answer:
      "NovoLog pen units depend on the product presentation being dispensed, so the exact package should always be confirmed before calculating days supply.",
  },
  {
    question: "Does priming affect NovoLog days supply?",
    answer:
      "Yes. Priming can reduce the usable insulin available from dispensed pens, especially over repeated injections and needle changes.",
  },
  {
    question: "Why can NovoLog days supply be tricky?",
    answer:
      "NovoLog calculations can be affected by the pen presentation, total daily dose, priming assumptions, and expiration after opening.",
  },
];

export default function NovoLogDaysSupplyCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "FAQPage"],
    name: "NovoLog Days Supply Calculator",
    url: "https://www.insulinprimingdayssupply.com/novolog-days-supply-calculator",
    description:
      "Pharmacist-focused guide to calculating NovoLog days supply, including examples, priming considerations, expiration limits, and links to insulin reference pages.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacists",
    },
    about: {
      "@type": "MedicalEntity",
      name: "NovoLog",
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
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
          Pharmacist Tool
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          NovoLog Days Supply Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-700">
          This pharmacist-focused page explains how to calculate{" "}
          <span className="font-semibold text-slate-900">
            NovoLog days supply
          </span>{" "}
          using total dispensed units, daily dose,{" "}
          <span className="font-semibold text-slate-900">
            priming considerations
          </span>
          , and{" "}
          <span className="font-semibold text-slate-900">
            expiration after opening
          </span>
          .
        </p>

        <p className="mt-3 leading-7 text-slate-700">
          It is designed to help pharmacists and pharmacy technicians perform
          clear, consistent insulin pen calculations for dispensing, billing,
          refill timing, and audit-ready documentation.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/insulin-days-supply-calculator"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Open Main Insulin Calculator
          </Link>

          <Link
            href="/insulin-pen-priming-days-supply"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Pen Priming Guide
          </Link>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
        <p className="text-sm font-semibold text-slate-900">
          Also calculate other insulins
        </p>

        <div className="mt-2 flex flex-wrap gap-3 text-sm">
          <Link
            href="/tresiba-days-supply-calculator"
            className="text-cyan-700 underline underline-offset-4"
          >
            Tresiba
          </Link>
          <Link
            href="/lantus-days-supply-calculator"
            className="text-cyan-700 underline underline-offset-4"
          >
            Lantus
          </Link>
          <Link
            href="/humalog-days-supply-calculator"
            className="text-cyan-700 underline underline-offset-4"
          >
            Humalog
          </Link>
          <Link
            href="/toujeo-days-supply-calculator"
            className="text-cyan-700 underline underline-offset-4"
          >
            Toujeo
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Quick formula
          </h2>

          <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
            <p className="font-semibold text-slate-900">
              Days Supply = Usable Total Units ÷ Total Daily Dose
            </p>
            <p className="mt-3 leading-7 text-slate-700">
              For NovoLog, usable total units may be reduced by priming loss if
              your workflow includes priming in the final days supply
              calculation.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Why this page matters
          </h2>

          <ul className="mt-4 space-y-3 text-slate-700">
            <li>Supports more consistent NovoLog calculations</li>
            <li>Helps explain the math clearly</li>
            <li>Improves workflow for pharmacists and technicians</li>
            <li>Strengthens audit-ready documentation</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          How to calculate NovoLog days supply
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 1: Confirm the NovoLog pen presentation
            </h3>
            <p className="mt-2 leading-7">
              Before calculating days supply, verify the exact NovoLog product
              being dispensed. Different pen presentations can contain different
              total unit amounts, so confirming the correct package is
              essential.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 2: Calculate total dispensed units
            </h3>
            <p className="mt-2 leading-7">
              Multiply the number of pens dispensed by the number of units in
              each pen. This gives the starting total units available before any
              priming adjustment.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 3: Determine the patient’s total daily dose
            </h3>
            <p className="mt-2 leading-7">
              Confirm how many total units the patient injects per day. Review
              the written directions carefully, especially if the patient uses
              meal-based or multiple daily injections.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 4: Account for priming if appropriate
            </h3>
            <p className="mt-2 leading-7">
              If your workflow includes priming in the days supply calculation,
              subtract expected priming units from the total available units.
              This can slightly reduce the final NovoLog days supply result.
            </p>
            <p className="mt-2 leading-7">
              See the{" "}
              <Link
                href="/insulin-pen-priming-days-supply"
                className="font-semibold text-cyan-700 underline underline-offset-4"
              >
                insulin pen priming guide
              </Link>{" "}
              for quick reference.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 5: Divide usable units by daily dose
            </h3>
            <p className="mt-2 leading-7">
              Once you have usable total units, divide by the total daily dose
              to get the estimated NovoLog days supply.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 6: Check expiration after opening
            </h3>
            <p className="mt-2 leading-7">
              Even when the math suggests a certain number of days, practical
              use may also be limited by expiration after opening. Confirm this
              against your insulin expiration reference.
            </p>
            <p className="mt-2 leading-7">
              Review the{" "}
              <Link
                href="/insulin-expiration-after-opening"
                className="font-semibold text-cyan-700 underline underline-offset-4"
              >
                insulin expiration guide
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Example NovoLog days supply calculation
        </h2>

        <div className="mt-6 space-y-5 text-slate-700">
          <p className="leading-7">
            Here is a simple example using sample numbers:
          </p>

          <div className="rounded-2xl bg-slate-50 p-5">
            <ul className="space-y-2 leading-7">
              <li>Dispensed: 5 pens</li>
              <li>Units per pen: 300 units</li>
              <li>Total units dispensed: 1500 units</li>
              <li>Total daily dose: 60 units per day</li>
            </ul>
          </div>

          <p className="leading-7">Basic calculation:</p>

          <div className="rounded-2xl bg-cyan-50 p-5 text-slate-900">
            <p className="font-semibold">1500 ÷ 60 = 25 days supply</p>
          </div>

          <p className="leading-7">
            If priming loss is included in your process, usable units may be
            slightly lower and the calculated days supply may decrease.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Common NovoLog days supply mistakes
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Using the wrong pen presentation",
            "Forgetting to verify total units per pen",
            "Ignoring priming assumptions",
            "Not confirming the exact total daily dose",
            "Confusing units with mL",
            "Forgetting expiration limits after opening",
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
          Related NovoLog references
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/insulin-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Insulin Days Supply Calculator
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Open the main calculator for broader insulin workflow.
            </p>
          </Link>

          <Link
            href="/insulin-pen-priming-days-supply"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Insulin Pen Priming Guide
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Review how priming loss can affect usable insulin units and days
              supply.
            </p>
          </Link>

          <Link
            href="/insulin-expiration-after-opening"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Insulin Expiration After Opening
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Check expiration-after-opening guidance across insulin products.
            </p>
          </Link>

          <Link
            href="/humalog-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Humalog Days Supply Calculator
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Compare another rapid-acting insulin workflow page.
            </p>
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently asked questions about NovoLog days supply
        </h2>

        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900">
                {faq.question}
              </summary>
              <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Calculate NovoLog days supply faster
        </h2>

        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          Use this NovoLog insulin days supply calculator workflow to estimate
          correct insulin day supply with priming and expiration considerations
          in mind.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/insulin-days-supply-calculator"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Open Calculator
          </Link>
          <Link
            href="/insulin-pen-priming-days-supply"
            className="inline-flex items-center rounded-xl border border-cyan-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Priming Guide
          </Link>
          <Link
            href="/insulin-expiration-after-opening"
            className="inline-flex items-center rounded-xl border border-cyan-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Expiration Guide
          </Link>
        </div>
      </section>
    </main>
  );
}
