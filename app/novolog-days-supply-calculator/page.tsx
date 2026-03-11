import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "NovoLog Days Supply Calculator | How to Calculate NovoLog Pen Days Supply",
  description:
    "Learn how to calculate NovoLog days supply using insulin pens, daily dose, and priming considerations. Pharmacist-focused guide with examples and workflow tips.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/novolog-days-supply-calculator",
  },
  openGraph: {
    title: "NovoLog Days Supply Calculator | Insulin Pen Days Supply Guide",
    description:
      "Step-by-step guide for calculating NovoLog days supply including total units, priming, and example pharmacist calculations.",
    url: "https://www.insulinprimingdayssupply.com/novolog-days-supply-calculator",
    type: "article",
  },
};

const faqs = [
  {
    question: "How do you calculate days supply for NovoLog?",
    answer:
      "Multiply the number of pens dispensed by the units in each pen, subtract priming loss if used in your workflow, then divide by the patient’s total daily dose.",
  },
  {
    question: "Does priming affect NovoLog days supply?",
    answer:
      "Yes. Priming uses small amounts of insulin before injections to remove air from the pen. Over multiple injections this can reduce usable insulin.",
  },
  {
    question: "Why can NovoLog days supply be difficult to calculate?",
    answer:
      "NovoLog is often used before meals or for correction dosing, which can make total daily insulin usage vary from day to day.",
  },
  {
    question: "Why does expiration after opening matter?",
    answer:
      "Even if the mathematical days supply is longer, insulin may expire after opening and limit how long the pen can be used.",
  },
];

export default function NovoLogDaysSupplyCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "NovoLog Days Supply Calculator",
    url: "https://www.insulinprimingdayssupply.com/novolog-days-supply-calculator",
    description:
      "Pharmacist-focused guide explaining how to calculate NovoLog days supply with priming and insulin pen math examples.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacist",
    },
    about: {
      "@type": "Drug",
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
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          NovoLog Days Supply Calculator
        </h1>

        <p className="mt-4 text-lg text-slate-700 leading-8">
          This page explains how pharmacists calculate{" "}
          <strong>NovoLog days supply</strong> using insulin pen units, total
          daily dose, and priming considerations.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/insulin-days-supply-calculator"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
          >
            Open Main Calculator
          </Link>

          <Link
            href="/insulin-pen-days-supply"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Insulin Pen Guide
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          How to calculate NovoLog days supply
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 1: Determine total units dispensed
            </h3>

            <p className="mt-2">
              Multiply the number of insulin pens dispensed by the number of
              units contained in each pen. This gives the total insulin units
              available before priming or wastage adjustments.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 2: Calculate the total daily dose
            </h3>

            <p className="mt-2">
              NovoLog is often used before meals. Add together all injections
              given in a full day to determine the patient’s total daily dose.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 3: Consider priming doses
            </h3>

            <p className="mt-2">
              Insulin pen priming removes air from the needle before injection.
              When included in pharmacy workflow calculations, priming reduces
              usable insulin units.
            </p>

            <p className="mt-2">
              See the{" "}
              <Link
                href="/insulin-priming-doses-chart"
                className="font-semibold text-cyan-700 underline"
              >
                insulin priming doses chart
              </Link>{" "}
              for reference.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 4: Divide usable units by total daily dose
            </h3>

            <p className="mt-2">
              Divide the remaining insulin units by the daily dose to estimate
              the patient’s NovoLog days supply.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Example NovoLog days supply calculation
        </h2>

        <div className="mt-6 space-y-4 text-slate-700">
          <div className="bg-slate-50 rounded-xl p-5">
            <ul className="space-y-2">
              <li>Dispensed: 5 pens</li>
              <li>Units per pen: 300 units</li>
              <li>Total units dispensed: 1500 units</li>
              <li>Daily insulin use: 36 units/day</li>
            </ul>
          </div>

          <div className="bg-cyan-50 rounded-xl p-5 font-semibold text-slate-900">
            1500 ÷ 36 = 41.6 days supply
          </div>

          <p>
            If priming loss is included in your workflow, usable units may be
            slightly lower and the calculated days supply may decrease.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Related insulin tools
        </h2>

        <ul className="mt-4 space-y-2 text-slate-700">
          <li>
            <Link href="/insulin-days-supply-calculator">
              Insulin Days Supply Calculator
            </Link>
          </li>

          <li>
            <Link href="/tresiba-days-supply-calculator">
              Tresiba Days Supply Calculator
            </Link>
          </li>

          <li>
            <Link href="/humalog-days-supply-calculator">
              Humalog Days Supply Calculator
            </Link>
          </li>

          <li>
            <Link href="/insulin-priming-doses-chart">
              Insulin Priming Doses Chart
            </Link>
          </li>

          <li>
            <Link href="/insulin-expiration-chart">
              Insulin Expiration Chart
            </Link>
          </li>
        </ul>
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

              <p className="mt-3 text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
