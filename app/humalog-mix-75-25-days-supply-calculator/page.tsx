import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Humalog Mix 75/25 Days Supply Calculator | How to Calculate Premix Insulin Days Supply",
  description:
    "Learn how to calculate Humalog Mix 75/25 days supply with pharmacist-focused examples including multiple daily injections, priming considerations, and insulin expiration guidance.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/humalog-mix-75-25-days-supply-calculator",
  },
  openGraph: {
    title: "Humalog Mix 75/25 Days Supply Calculator | Premix Insulin Guide",
    description:
      "Step-by-step guide for calculating Humalog Mix 75/25 days supply including total units, priming, and example pharmacist calculations.",
    url: "https://www.insulinprimingdayssupply.com/humalog-mix-75-25-days-supply-calculator",
    type: "article",
  },
};

export default function HumalogMixDaysSupplyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Humalog Mix 75/25 Days Supply Calculator
        </h1>

        <p className="mt-4 text-lg text-slate-700 leading-8">
          This guide explains how to calculate{" "}
          <strong>Humalog Mix 75/25 days supply</strong> for insulin pens using
          total dispensed units, daily dose, and priming considerations.
        </p>

        <div className="mt-6 flex gap-3 flex-wrap">
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
          How to calculate Humalog Mix 75/25 days supply
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 1: Determine total units dispensed
            </h3>

            <p className="mt-2">
              Multiply the number of pens dispensed by the units contained in
              each pen. This gives the total units available before priming or
              wastage adjustments.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 2: Calculate total daily dose
            </h3>

            <p className="mt-2">
              Premixed insulin is commonly injected twice daily. Add the morning
              and evening doses together to determine the patient's total daily
              dose.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 3: Consider priming doses
            </h3>

            <p className="mt-2">
              Priming removes air from the insulin pen before injection. If
              included in your pharmacy workflow, subtract priming units from
              the available insulin supply.
            </p>

            <p className="mt-2">
              See the{" "}
              <Link
                href="/insulin-priming-doses-chart"
                className="text-cyan-700 font-semibold underline"
              >
                insulin priming doses chart
              </Link>{" "}
              for reference.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 4: Divide usable units by daily dose
            </h3>

            <p className="mt-2">
              Divide the remaining usable insulin units by the total daily dose
              to estimate the days supply.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Example Humalog Mix 75/25 days supply calculation
        </h2>

        <div className="mt-6 space-y-4 text-slate-700">
          <div className="bg-slate-50 rounded-xl p-5">
            <ul className="space-y-2">
              <li>Dispensed: 5 pens</li>
              <li>Units per pen: 300 units</li>
              <li>Total units dispensed: 1500 units</li>
              <li>Patient dose: 20 units morning + 10 units evening</li>
              <li>Total daily dose: 30 units/day</li>
            </ul>
          </div>

          <div className="bg-cyan-50 rounded-xl p-5 font-semibold text-slate-900">
            1500 ÷ 30 = 50 days supply
          </div>

          <p>
            If priming is included in your workflow, usable units may be lower
            and the calculated days supply may decrease slightly.
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
            <Link href="/humalog-days-supply-calculator">
              Humalog Days Supply Calculator
            </Link>
          </li>

          <li>
            <Link href="/tresiba-days-supply-calculator">
              Tresiba Days Supply Calculator
            </Link>
          </li>

          <li>
            <Link href="/insulin-priming-doses-chart">
              Insulin Priming Doses Chart
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
