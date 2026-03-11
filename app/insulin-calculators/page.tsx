import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insulin Calculators for Pharmacists",
  description:
    "Collection of pharmacist-focused insulin days supply calculators including Tresiba, Humalog, NovoLog, Lantus, Toujeo, and Admelog.",
  alternates: {
    canonical: "https://www.insulinprimingdayssupply.com/insulin-calculators",
  },
};

export default function InsulinCalculatorsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Insulin Days Supply Calculators
      </h1>

      <p className="mt-4 text-lg text-slate-700">
        These pharmacist-focused pages explain how to calculate insulin days
        supply for common insulin products including basal and rapid-acting
        insulins.
      </p>

      <Link
        href="/insulin-days-supply-calculator"
        className="font-semibold text-cyan-700 underline underline-offset-4"
      >
        Open the main insulin days supply calculator
      </Link>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/insulin-days-supply-calculator"
          className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
        >
          <h2 className="font-semibold text-slate-900">
            Main Insulin Days Supply Calculator
          </h2>
        </Link>

        <Link
          href="/tresiba-days-supply-calculator"
          className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
        >
          <h2 className="font-semibold text-slate-900">
            Tresiba Days Supply Calculator
          </h2>
        </Link>

        <Link
          href="/humalog-days-supply-calculator"
          className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
        >
          <h2 className="font-semibold text-slate-900">
            Humalog Days Supply Calculator
          </h2>
        </Link>

        <Link
          href="/novolog-days-supply-calculator"
          className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
        >
          <h2 className="font-semibold text-slate-900">
            NovoLog Days Supply Calculator
          </h2>
        </Link>

        <Link
          href="/lantus-days-supply-calculator"
          className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
        >
          <h2 className="font-semibold text-slate-900">
            Lantus Days Supply Calculator
          </h2>
        </Link>

        <Link
          href="/toujeo-days-supply-calculator"
          className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
        >
          <h2 className="font-semibold text-slate-900">
            Toujeo Days Supply Calculator
          </h2>
        </Link>

        <Link
          href="/admelog-days-supply-calculator"
          className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
        >
          <h2 className="font-semibold text-slate-900">
            Admelog Days Supply Calculator
          </h2>
        </Link>
      </div>

      <Link
        href="/insulin-days-supply-calculator"
        className="font-semibold text-cyan-700 underline underline-offset-4"
      >
        Open the main insulin days supply calculator
      </Link>
    </main>
  );
}
