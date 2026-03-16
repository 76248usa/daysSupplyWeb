import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Tresiba Days Supply Calculator | How to Calculate Tresiba Pen Days Supply",
  description:
    "Calculate Tresiba days supply with pharmacist-friendly guidance, priming considerations, example math, and quick links to insulin dosing resources.",

  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/tresiba-days-supply-calculator",
  },
  openGraph: {
    title:
      "Tresiba Days Supply Calculator | How to Calculate Tresiba Pen Days Supply",
    description:
      "Learn how to calculate Tresiba pen days supply step by step, including total units, priming, and expiration considerations.",
    url: "https://www.insulinprimingdayssupply.com/tresiba-days-supply-calculator",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Tresiba Days Supply Calculator | How to Calculate Tresiba Pen Days Supply",
    description:
      "Learn how to calculate Tresiba pen days supply step by step, including total units, priming, and expiration considerations.",
  },
};

const faqs = [
  {
    question: "How do you calculate days supply for Tresiba?",
    answer:
      "Multiply the number of pens dispensed by the units in each pen, adjust for priming if your workflow requires it, then divide by the patient’s total daily dose.",
  },
  {
    question: "How many units are in a Tresiba pen?",
    answer:
      "Tresiba pen units depend on the product presentation, so the package being dispensed should always be verified before calculating days supply.",
  },
  {
    question: "Does priming affect Tresiba days supply?",
    answer:
      "Yes. Priming can reduce the number of usable units available from the dispensed pens, especially over repeated injections and needle changes.",
  },
  {
    question: "Why can Tresiba days supply be tricky?",
    answer:
      "Tresiba calculations can be affected by the pen presentation, daily dose, priming assumptions, and product dating after opening.",
  },
];

export default function TresibaDaysSupplyCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Tresiba Days Supply Calculator",
    url: "https://www.insulinprimingdayssupply.com/tresiba-days-supply-calculator",
    description:
      "Pharmacist-focused guide to calculating Tresiba days supply, including examples, priming considerations, and links to insulin reference pages.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacist",
    },
    about: {
      "@type": "Drug",
      name: "Tresiba",
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
          Insulin SEO Page
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Tresiba Days Supply Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-700">
          This pharmacist-focused page explains how to calculate{" "}
          <span className="font-semibold text-slate-900">
            Tresiba days supply
          </span>{" "}
          using total dispensed units, daily dose, and priming considerations.
          It is designed to help with clear, consistent insulin pen calculations
          and quick access to your main calculator.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/insulin-days-supply-calculator"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Open Main Calculator
          </Link>

          <Link
            href="/insulin-pen-days-supply"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Read Pen Days Supply Guide
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
              For Tresiba, usable total units may be reduced by priming loss if
              that is part of your pharmacy’s calculation approach.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Why this page matters
          </h2>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li>Supports more consistent Tresiba calculations</li>
            <li>Helps explain the math clearly</li>
            <li>Improves workflow for pharmacists and technicians</li>
            <li>Strengthens audit-ready documentation</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          How to calculate Tresiba days supply
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 1: Confirm the Tresiba pen presentation
            </h3>
            <p className="mt-2 leading-7">
              Before calculating days supply, verify the exact Tresiba product
              being dispensed. Different pen presentations can contain different
              total unit amounts, so confirming the package is essential.
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
              Confirm how many units the patient injects per day. Since Tresiba
              is commonly used once daily, this may be straightforward, but the
              written directions should always be reviewed carefully.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 4: Account for priming if appropriate
            </h3>
            <p className="mt-2 leading-7">
              If your workflow includes priming in the days supply calculation,
              subtract expected priming units from the total available units.
              This can slightly reduce the final days supply result.
            </p>
            <p className="mt-2 leading-7">
              See the{" "}
              <Link
                href="/insulin-priming-doses-chart"
                className="font-semibold text-cyan-700 underline underline-offset-4"
              >
                priming doses chart
              </Link>{" "}
              for quick reference.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 5: Divide usable units by daily dose
            </h3>
            <p className="mt-2 leading-7">
              Once you have usable total units, divide by the daily dose to get
              the estimated Tresiba days supply.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 6: Check expiration after opening
            </h3>
            <p className="mt-2 leading-7">
              Even when the math suggests a certain number of days, practical
              use may also be limited by expiration after opening. Confirm this
              against your insulin reference page.
            </p>
            <p className="mt-2 leading-7">
              Review the{" "}
              <Link
                href="/insulin-expiration-chart"
                className="font-semibold text-cyan-700 underline underline-offset-4"
              >
                insulin expiration chart
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Example Tresiba days supply calculation
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
              <li>Daily dose: 40 units once daily</li>
            </ul>
          </div>

          <p className="leading-7">Basic calculation:</p>

          <div className="rounded-2xl bg-cyan-50 p-5 text-slate-900">
            <p className="font-semibold">1500 ÷ 40 = 37.5 days supply</p>
          </div>

          <p className="leading-7">
            If priming loss is included in your process, the usable units may be
            lower and the calculated days supply may decrease slightly.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Common Tresiba days supply mistakes
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Using the wrong pen presentation",
            "Forgetting to verify total units per pen",
            "Ignoring priming assumptions",
            "Not confirming the exact daily dose",
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
          Related Tresiba references
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
              Open the main calculator for a broader insulin workflow.
            </p>
          </Link>

          <Link
            href="/insulin-pen-days-supply"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Insulin Pen Days Supply Guide
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Read the step-by-step guide for pen-based insulin calculations.
            </p>
          </Link>

          <Link
            href="/insulin-priming-doses-chart"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Priming Doses Chart
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Review priming references that may affect usable units.
            </p>
          </Link>

          <Link
            href="/insulin-expiration-chart"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Insulin Expiration Chart
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Check expiration-after-opening guidance across insulin products.
            </p>
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently asked questions about Tresiba days supply
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
          Calculate Tresiba days supply faster
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          The perfect tool for faster workflow. Use this Tresiba insulin days
          supply calculator to estimate the correct insulin day supply for
          prescriptions including priming and expiration considerations.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/insulin-days-supply-calculator"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Open Calculator
          </Link>
          <Link
            href="/insulin-priming-doses-chart"
            className="inline-flex items-center rounded-xl border border-cyan-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Priming Chart
          </Link>
          <Link
            href="/insulin-expiration-chart"
            className="inline-flex items-center rounded-xl border border-cyan-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Expiration Chart
          </Link>
        </div>
      </section>
    </main>
  );
}
