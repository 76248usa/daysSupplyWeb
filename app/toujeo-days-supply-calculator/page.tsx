import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Toujeo Days Supply Calculator | How to Calculate Toujeo Pen Days Supply",
  description:
    "Learn how to calculate Toujeo days supply using total units dispensed, daily dose, priming considerations, and expiration guidance. Pharmacist-focused page with examples.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/toujeo-days-supply-calculator",
  },
  openGraph: {
    title:
      "Toujeo Days Supply Calculator | How to Calculate Toujeo Pen Days Supply",
    description:
      "Step-by-step pharmacist guide explaining how to calculate Toujeo days supply including priming and insulin expiration considerations.",
    url: "https://www.insulinprimingdayssupply.com/toujeo-days-supply-calculator",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Toujeo Days Supply Calculator | How to Calculate Toujeo Pen Days Supply",
    description:
      "Step-by-step pharmacist guide explaining how to calculate Toujeo days supply including priming and insulin expiration considerations.",
  },
};

const faqs = [
  {
    question: "How do you calculate days supply for Toujeo?",
    answer:
      "Multiply the number of pens dispensed by the total units in each pen, adjust for priming loss if your workflow includes it, then divide by the patient’s total daily dose.",
  },
  {
    question: "Does priming affect Toujeo days supply?",
    answer:
      "Yes. Toujeo priming can reduce usable insulin units available for dosing, especially over repeated injections and needle changes.",
  },
  {
    question: "Why can Toujeo days supply be tricky?",
    answer:
      "Toujeo calculations can be affected by product presentation, daily dose, priming assumptions, and expiration after opening.",
  },
  {
    question:
      "Why is Toujeo important to review separately from other basal insulins?",
    answer:
      "Toujeo has product-specific presentation details and priming considerations, so it is useful to review it separately when calculating days supply.",
  },
];

export default function ToujeoDaysSupplyCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Toujeo Days Supply Calculator",
    url: "https://www.insulinprimingdayssupply.com/toujeo-days-supply-calculator",
    description:
      "Pharmacist-focused guide to calculating Toujeo days supply, including examples, priming considerations, and links to insulin reference pages.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacist",
    },
    about: {
      "@type": "Drug",
      name: "Toujeo",
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
          Toujeo Days Supply Calculator
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-700">
          This page explains how pharmacists calculate{" "}
          <strong>Toujeo days supply</strong> using total insulin units, patient
          daily dose, and priming considerations. Use this insulin days supply
          calculator to estimate the correct insulin day supply for
          prescriptions including priming and expiration considerations
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
            Insulin Pen Guide
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
              For Toujeo, usable total units may be reduced by priming loss if
              that is part of your pharmacy’s calculation approach.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Why this page matters
          </h2>
          <ul className="mt-4 space-y-3 text-slate-700">
            <li>Supports more consistent Toujeo calculations</li>
            <li>Helps explain the math clearly</li>
            <li>Improves workflow for pharmacists and technicians</li>
            <li>Strengthens audit-ready documentation</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          How to calculate Toujeo days supply
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 1: Confirm the Toujeo product presentation
            </h3>
            <p className="mt-2 leading-7">
              Before calculating days supply, verify the exact Toujeo product
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
              Confirm how many units the patient injects per day. Toujeo is
              commonly used once daily, but the written directions should always
              be reviewed carefully.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 4: Account for priming if appropriate
            </h3>
            <p className="mt-2 leading-7">
              If your workflow includes priming in the days supply calculation,
              subtract expected priming units from the total available units.
              This can reduce the final days supply result.
            </p>
            <p className="mt-2 leading-7">
              See the{" "}
              <Link
                href="/insulin-priming-doses-chart"
                className="font-semibold text-cyan-700 underline underline-offset-4"
              >
                insulin priming doses chart
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
              the estimated Toujeo days supply.
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
          Example Toujeo days supply calculation
        </h2>

        <div className="mt-6 space-y-5 text-slate-700">
          <p className="leading-7">
            Here is a simple example using sample numbers:
          </p>

          <div className="rounded-2xl bg-slate-50 p-5">
            <ul className="space-y-2 leading-7">
              <li>Dispensed: 3 pens</li>
              <li>Units per pen: 450 units</li>
              <li>Total units dispensed: 1350 units</li>
              <li>Daily dose: 45 units once daily</li>
            </ul>
          </div>

          <p className="leading-7">Basic calculation:</p>

          <div className="rounded-2xl bg-cyan-50 p-5 text-slate-900">
            <p className="font-semibold">1350 ÷ 45 = 30 days supply</p>
          </div>

          <p className="leading-7">
            If priming loss is included in your process, the usable units may be
            lower and the calculated days supply may decrease slightly.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Common Toujeo days supply mistakes
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Using the wrong product presentation",
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
          Related Toujeo references
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
          Frequently asked questions about Toujeo days supply
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
          Calculate Toujeo days supply faster
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          Use your main insulin calculator for faster workflow, then cross-check
          against your priming and expiration reference pages when needed.
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
