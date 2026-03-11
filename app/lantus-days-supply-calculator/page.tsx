import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Lantus Days Supply Calculator | How to Calculate Lantus Pen Days Supply",
  description:
    "Learn how to calculate Lantus insulin pen days supply using total units dispensed, daily dose, priming considerations, and expiration limits.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/lantus-days-supply-calculator",
  },
  openGraph: {
    title: "Lantus Days Supply Calculator | Insulin Pen Days Supply Guide",
    description:
      "Step-by-step pharmacist guide explaining how to calculate Lantus days supply including priming and insulin expiration considerations.",
    url: "https://www.insulinprimingdayssupply.com/lantus-days-supply-calculator",
    type: "article",
  },
};

const faqs = [
  {
    question: "How do you calculate days supply for Lantus?",
    answer:
      "Multiply the number of pens dispensed by the units in each pen. Divide that total by the patient's daily insulin dose. Adjust for priming loss if used in your pharmacy workflow.",
  },
  {
    question: "Does priming affect Lantus days supply?",
    answer:
      "Yes. Priming removes air from the insulin pen before injection. These priming units reduce the total insulin available for dosing.",
  },
  {
    question: "Why can Lantus days supply calculations be incorrect?",
    answer:
      "Errors can occur if priming loss is ignored, total units per pen are incorrect, or the patient’s true daily dose is underestimated.",
  },
  {
    question: "Why does expiration after opening matter for Lantus?",
    answer:
      "Even if the mathematical days supply is longer, insulin pens may expire after opening and limit how long they can actually be used.",
  },
];

export default function LantusDaysSupplyCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Lantus Days Supply Calculator",
    url: "https://www.insulinprimingdayssupply.com/lantus-days-supply-calculator",
    description:
      "Pharmacist-focused guide explaining how to calculate Lantus insulin days supply including priming and dosing examples.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacist",
    },
    about: {
      "@type": "Drug",
      name: "Lantus",
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
          Lantus Days Supply Calculator
        </h1>

        <p className="mt-4 text-lg text-slate-700 leading-8">
          This page explains how pharmacists calculate{" "}
          <strong>Lantus days supply</strong> using insulin pen units, total
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
          How to calculate Lantus days supply
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 1: Determine total insulin units dispensed
            </h3>

            <p className="mt-2">
              Multiply the number of pens dispensed by the number of units
              contained in each pen to determine the total insulin units
              available.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 2: Identify the patient's total daily dose
            </h3>

            <p className="mt-2">
              Lantus is typically administered once daily. Confirm the patient's
              daily insulin dose before calculating days supply.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 3: Account for priming if used
            </h3>

            <p className="mt-2">
              Insulin pens require priming before injections. If priming is
              included in your pharmacy workflow calculations, subtract those
              units from the available insulin supply.
            </p>

            <p className="mt-2">
              Review the{" "}
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
              Step 4: Divide total usable units by daily dose
            </h3>

            <p className="mt-2">
              Divide the remaining insulin units by the patient's daily dose to
              estimate the days supply.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Example Lantus days supply calculation
        </h2>

        <div className="mt-6 space-y-4 text-slate-700">
          <div className="bg-slate-50 rounded-xl p-5">
            <ul className="space-y-2">
              <li>Dispensed: 5 pens</li>
              <li>Units per pen: 300 units</li>
              <li>Total units dispensed: 1500 units</li>
              <li>Daily dose: 40 units/day</li>
            </ul>
          </div>

          <div className="bg-cyan-50 rounded-xl p-5 font-semibold text-slate-900">
            1500 ÷ 40 = 37.5 days supply
          </div>
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
            <Link href="/novolog-days-supply-calculator">
              NovoLog Days Supply Calculator
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
          Frequently asked questions about Lantus days supply
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
