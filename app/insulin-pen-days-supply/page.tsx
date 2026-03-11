import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "How to Calculate Insulin Pen Days Supply | Step-by-Step Guide for Pharmacists",
  description:
    "Learn how to calculate insulin pen days supply step by step, including priming doses, total units, examples, and pharmacist-friendly guidance.",
  alternates: {
    canonical: "/insulin-pen-days-supply",
  },
  openGraph: {
    title:
      "How to Calculate Insulin Pen Days Supply | Step-by-Step Guide for Pharmacists",
    description:
      "Step-by-step insulin pen days supply calculations with priming, examples, and pharmacist-focused guidance.",
    url: "/insulin-pen-days-supply",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "How to Calculate Insulin Pen Days Supply | Step-by-Step Guide for Pharmacists",
    description:
      "Step-by-step insulin pen days supply calculations with priming, examples, and pharmacist-focused guidance.",
  },
};

const faqs = [
  {
    question: "How do you calculate insulin pen days supply?",
    answer:
      "Add the total units available across all pens, subtract units lost to priming when appropriate, then divide by the patient’s total daily dose.",
  },
  {
    question: "Does priming affect insulin days supply?",
    answer:
      "Yes. Priming can reduce the number of usable units in insulin pens, especially when the patient uses many injections or changes needles frequently.",
  },
  {
    question:
      "Why is insulin pen days supply sometimes difficult to calculate?",
    answer:
      "Different insulin products have different pen sizes, concentrations, priming recommendations, and beyond-use dating after opening.",
  },
  {
    question: "Why does accurate insulin days supply matter?",
    answer:
      "Accurate calculation helps support proper billing, refill timing, and audit readiness while reducing the risk of under- or overestimating coverage.",
  },
];

export default function InsulinPenDaysSupplyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "How to Calculate Insulin Pen Days Supply",
    url: "https://www.insulinprimingdayssupply.com/insulin-pen-days-supply",
    description:
      "Step-by-step guide for calculating insulin pen days supply, including priming doses, examples, and pharmacist-focused education.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacist",
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

      <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
          Pharmacist Guide
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          How to Calculate Insulin Pen Days Supply
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-700">
          Calculating insulin pen days supply can be tricky because you often
          need to account for{" "}
          <span className="font-semibold text-slate-900">total pen units</span>,{" "}
          <span className="font-semibold text-slate-900">daily dose</span>, and{" "}
          <span className="font-semibold text-slate-900">priming loss</span>.
          This guide walks through the process step by step so pharmacists can
          estimate coverage more accurately and document with confidence.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/insulin-days-supply-calculator"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Open Insulin Days Supply Calculator
          </Link>

          <Link
            href="/insulin-priming-doses-chart"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Priming Doses Chart
          </Link>

          <Link
            href="/insulin-expiration-chart"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Insulin Expiration Chart
          </Link>
        </div>
      </div>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Quick Formula
          </h2>
          <div className="mt-4 rounded-2xl bg-white p-4 text-base leading-7 text-slate-800 shadow-sm">
            <p className="font-semibold text-slate-900">
              Days Supply = Usable Total Units ÷ Total Daily Dose
            </p>
            <p className="mt-3">
              Where usable total units may need to account for priming loss
              depending on product instructions and actual needle changes.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Why this matters
          </h2>
          <ul className="mt-4 space-y-3 text-base leading-7 text-slate-700">
            <li>Supports accurate prescription processing</li>
            <li>Helps reduce refill timing problems</li>
            <li>Improves consistency across insulin products</li>
            <li>Helps pharmacists explain calculations clearly</li>
          </ul>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Step-by-step: how to calculate insulin pen days supply
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 1: Identify the total units in each pen
            </h3>
            <p className="mt-2 leading-7">
              Start by confirming the number of units in one pen. This varies by
              insulin product and concentration. Multiply the units per pen by
              the total number of pens dispensed to determine the starting total
              units available.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 2: Determine the patient’s total daily dose
            </h3>
            <p className="mt-2 leading-7">
              Calculate how many units the patient uses in one full day. If the
              patient injects more than once daily, add all doses together to
              get the total daily units.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 3: Account for priming when appropriate
            </h3>
            <p className="mt-2 leading-7">
              Some insulin pens require priming before injections. If your
              workflow or product-specific approach includes priming loss,
              factor in the units used for priming across expected needle
              changes and injections. This can materially affect the calculated
              days supply.
            </p>
            <p className="mt-2 leading-7">
              For a quick reference, see the{" "}
              <Link
                href="/insulin-priming-doses-chart"
                className="font-semibold text-cyan-700 underline underline-offset-4"
              >
                priming doses chart
              </Link>
              .
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 4: Divide usable units by total daily dose
            </h3>
            <p className="mt-2 leading-7">
              After adjusting for priming if needed, divide the remaining usable
              units by the patient’s total daily dose. The result is the
              estimated days supply.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 5: Check product expiration after opening
            </h3>
            <p className="mt-2 leading-7">
              Some insulin products have a limited number of days they may be
              used after opening. Even if math suggests a longer supply, actual
              usable days may be limited by product expiration guidance.
            </p>
            <p className="mt-2 leading-7">
              You can compare products on the{" "}
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
          Example insulin pen days supply calculation
        </h2>

        <div className="mt-6 space-y-5 text-slate-700">
          <p className="leading-7">
            Here is a simple example using a hypothetical insulin pen scenario:
          </p>

          <div className="rounded-2xl bg-slate-50 p-5">
            <ul className="space-y-2 leading-7">
              <li>Dispensed: 5 pens</li>
              <li>Units per pen: 300 units</li>
              <li>Total units dispensed: 1500 units</li>
              <li>Patient dose: 40 units daily</li>
            </ul>
          </div>

          <p className="leading-7">Without considering priming:</p>

          <div className="rounded-2xl bg-cyan-50 p-5 text-slate-900">
            <p className="font-semibold">1500 ÷ 40 = 37.5 days supply</p>
          </div>

          <p className="leading-7">
            If priming loss applies, usable units may be lower, which can reduce
            the final days supply. That is why insulin pen calculations often
            need a product-specific and workflow-specific review.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Common reasons insulin pen days supply is miscalculated
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Ignoring priming doses",
            "Using the wrong units per pen",
            "Forgetting multiple daily injections",
            "Not checking beyond-use dating",
            "Confusing mL and units",
            "Assuming all products behave the same way",
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
          Frequently asked questions
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
          Use the calculator
        </h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          Ready to calculate insulin pen days supply more quickly? Use the main
          calculator and compare your results with the priming and expiration
          reference pages.
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
