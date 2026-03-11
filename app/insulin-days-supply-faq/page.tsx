import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insulin Days Supply Questions Pharmacists Ask",
  description:
    "Common pharmacist questions about insulin days supply calculations including insulin pens, priming, expiration, and billing considerations.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/insulin-days-supply-faq",
  },
};

export default function InsulinDaysSupplyFAQPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Insulin Days Supply Questions Pharmacists Ask
      </h1>

      <p className="mt-4 text-lg text-slate-700">
        Pharmacists frequently need to calculate insulin days supply for
        insurance billing, prescription processing, and audit documentation.
        These are some of the most common questions asked about insulin days
        supply calculations.
      </p>

      <section className="mt-12 rounded-2xl bg-slate-50 border border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Use the insulin days supply calculator
        </h2>

        <p className="mt-2 text-slate-700">
          Use the pharmacist-focused calculator to determine insulin days supply
          quickly.
        </p>

        <div className="mt-4">
          <Link
            href="/insulin-days-supply-calculator"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-5 py-3 text-white font-semibold hover:bg-cyan-700"
          >
            Open Insulin Calculator
          </Link>
        </div>
      </section>

      <section className="mt-10 space-y-8">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            How do pharmacists calculate insulin days supply?
          </h2>

          <p className="mt-2 text-slate-700">
            Days supply is calculated by dividing the total insulin units
            dispensed by the patient’s total daily insulin dose.
          </p>

          <p className="mt-2">
            See the{" "}
            <Link
              href="/how-to-calculate-insulin-days-supply"
              className="text-cyan-700 font-semibold underline"
            >
              detailed insulin calculation guide
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            How many units are in an insulin pen?
          </h2>

          <p className="mt-2 text-slate-700">
            Most insulin pens contain 300 units of insulin, although some
            products may contain different amounts depending on the insulin type
            and pen design.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Do priming doses affect insulin days supply?
          </h2>

          <p className="mt-2 text-slate-700">
            Yes. Priming doses remove air from insulin pens and reduce the total
            insulin available for dosing.
          </p>

          <p className="mt-2">
            See the{" "}
            <Link
              href="/insulin-priming-doses-chart"
              className="text-cyan-700 font-semibold underline"
            >
              insulin priming chart
            </Link>
            .
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Can expiration affect insulin days supply?
          </h2>

          <p className="mt-2 text-slate-700">
            Yes. Many insulin products expire after a certain number of days
            once opened. This can limit the practical days supply.
          </p>

          <p className="mt-2">
            Review the{" "}
            <Link
              href="/insulin-expiration-chart"
              className="text-cyan-700 font-semibold underline"
            >
              insulin expiration chart
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
