import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Calculate Insulin Days Supply | With Priming and Expiration",
  description:
    "Step-by-step guide explaining how pharmacists calculate insulin days supply including insulin pens, priming doses, and expiration considerations.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/how-to-calculate-insulin-days-supply",
  },
};

export default function HowToCalculateInsulinDaysSupplyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        How to Calculate Insulin Days Supply
      </h1>

      <p className="mt-4 text-lg text-slate-700">
        Pharmacists frequently need to calculate{" "}
        <strong>insulin days supply</strong>
        for insulin pens and vials when processing prescriptions, insurance
        claims, or audit documentation. This guide explains the basic formula
        and important considerations that affect insulin days supply
        calculations.
      </p>

      <h2>Step-by-step insulin day supply calculation</h2>

      <p>Example: 1500 units ÷ 50 units/day = 30 days supply</p>

      <p>
        But priming loss and expiration limits may reduce the final insulin day
        supply.
      </p>

      <Link href="/insulin-days-supply-calculator">
        Use the insulin days supply calculator →
      </Link>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-slate-900">
          Basic insulin days supply formula
        </h2>

        <div className="mt-4 rounded-xl bg-slate-50 p-5">
          <p className="font-semibold text-slate-900">
            Days Supply = Total Insulin Units Dispensed ÷ Total Daily Dose
          </p>
        </div>

        <p className="mt-4 text-slate-700">
          The key steps are determining how many total insulin units are
          dispensed and dividing that by the patient’s total daily insulin dose.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-900">
          Step 1: Determine total insulin units dispensed
        </h2>

        <p className="mt-3 text-slate-700">
          For insulin pens, multiply the number of pens dispensed by the number
          of units in each pen. For example:
        </p>

        <div className="mt-4 rounded-xl bg-slate-50 p-5">
          <ul className="space-y-2">
            <li>5 pens dispensed</li>
            <li>300 units per pen</li>
            <li>Total units = 1500 units</li>
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-900">
          Step 2: Determine the patient’s daily insulin dose
        </h2>

        <p className="mt-3 text-slate-700">
          Review the prescription directions carefully and determine the
          patient’s total insulin use per day.
        </p>

        <p className="mt-3 text-slate-700">
          For example, if the patient injects 30 units daily:
        </p>

        <div className="mt-4 rounded-xl bg-slate-50 p-5 font-semibold">
          1500 ÷ 30 = 50 days supply
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-900">
          Step 3: Consider insulin pen priming
        </h2>

        <p className="mt-3 text-slate-700">
          Many insulin pens require priming before injection. These priming
          doses reduce the total insulin available for dosing and may affect
          days supply calculations depending on pharmacy workflow.
        </p>

        <p className="mt-3 text-slate-700">
          See the{" "}
          <Link
            href="/insulin-priming-doses-chart"
            className="font-semibold text-cyan-700 underline"
          >
            insulin priming doses chart
          </Link>{" "}
          for reference.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-900">
          Step 4: Check expiration after opening
        </h2>

        <p className="mt-3 text-slate-700">
          Some insulin products expire after a certain number of days once
          opened. Even if the mathematical days supply is longer, expiration
          limits may restrict actual use.
        </p>

        <p className="mt-3 text-slate-700">
          Review the{" "}
          <Link
            href="/insulin-expiration-chart"
            className="font-semibold text-cyan-700 underline"
          >
            insulin expiration chart
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 p-6 bg-slate-50">
        <h2 className="text-xl font-semibold text-slate-900">
          Use the insulin calculator
        </h2>

        <p className="mt-2 text-slate-700">
          Instead of calculating insulin days supply manually, use the
          pharmacist-friendly calculator.
        </p>

        <div className="mt-4">
          <Link
            href="/insulin-days-supply-calculator"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-5 py-3 text-white font-semibold hover:bg-cyan-700"
          >
            Open Insulin Days Supply Calculator
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-900">
          Related insulin calculators
        </h2>

        <ul className="mt-4 space-y-2">
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
            <Link href="/lantus-days-supply-calculator">
              Lantus Days Supply Calculator
            </Link>
          </li>

          <li>
            <Link href="/toujeo-days-supply-calculator">
              Toujeo Days Supply Calculator
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
