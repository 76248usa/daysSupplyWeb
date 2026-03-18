import type { Metadata } from "next";
import Link from "next/link";
import EyeDropsCalculatorClient from "./EyeDropsCalculatorClient";

export const metadata: Metadata = {
  title:
    "Eye Drops Days Supply Calculator (Drops per mL & Bottle Size) | Pharmacist Tool",
  description:
    "Free eye drops days supply calculator for pharmacists and pharmacy technicians. Calculate ophthalmic day supply using bottle size, drops per mL, dosing frequency, and one-eye or both-eyes directions.",
  keywords: [
    "eye drops days supply calculator",
    "eye drop days supply calculator",
    "ophthalmic days supply calculator",
    "eye drops day supply",
    "eye drop day supply",
    "drops per ml eye drops",
    "pharmacy eye drop calculator",
    "how to calculate eye drop days supply",
    "timolol eye drop days supply",
    "latanoprost days supply calculator",
  ],
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/eye-drops-days-supply-calculator",
  },
  openGraph: {
    title:
      "Eye Drops Days Supply Calculator (Drops per mL & Bottle Size) | Pharmacist Tool",
    description:
      "Free eye drops days supply calculator for pharmacists and pharmacy technicians using bottle size, drops per mL, and dosing frequency.",
    url: "https://www.insulinprimingdayssupply.com/eye-drops-days-supply-calculator",
    siteName: "Insulin Days' Supply",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Eye Drops Days Supply Calculator (Drops per mL & Bottle Size) | Pharmacist Tool",
    description:
      "Free eye drops days supply calculator for pharmacists and pharmacy technicians.",
  },
};

export default function EyeDropsDaysSupplyCalculatorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "FAQPage"],
    name: "Eye Drops Days Supply Calculator",
    url: "https://www.insulinprimingdayssupply.com/eye-drops-days-supply-calculator",
    description:
      "Free eye drops days supply calculator for pharmacists and pharmacy technicians using bottle size, drops per mL, and dosing frequency.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacists",
    },
    about: {
      "@type": "DrugClass",
      name: "Ophthalmic medications",
    },
    mainEntity: [
      {
        "@type": "Question",
        name: "How do you calculate eye drop days supply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eye drop days supply is calculated using bottle size, estimated drops per mL, and drops used per day. Total drops are divided by daily drops used.",
        },
      },
      {
        "@type": "Question",
        name: "How many drops are in 1 mL of eye drops?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A common pharmacy workflow estimate is 20 drops per mL, although actual drop counts can vary by product and bottle design.",
        },
      },
      {
        "@type": "Question",
        name: "Why can eye drop days supply vary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Eye drop days supply can vary because actual drops per mL, bottle design, patient technique, and one-eye versus both-eyes use can all affect the final practical supply.",
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="mt-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm sm:mt-4 sm:px-5 sm:py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <img
                src="/icons/icon-192.png"
                alt="Eye Drops Days Supply Calculator"
                className="h-7 w-7 rounded-md sm:h-8 sm:w-8"
              />

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-700 sm:text-[11px]">
                  Pharmacist Tool
                </p>
                <h1 className="truncate text-sm font-bold leading-tight text-slate-900 sm:text-lg">
                  Eye Drops Days Supply Calculator
                </h1>
              </div>
            </div>

            <p className="mt-1 text-[11px] leading-4 text-slate-600 sm:mt-1.5 sm:text-xs">
              Calculate ophthalmic days supply using bottle size, drops per mL,
              dosing frequency, and one-eye or both-eyes directions.
            </p>

            <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-cyan-700">
              <span className="text-slate-500">Related pages:</span>

              <Link
                href="/how-to-calculate-eye-drop-days-supply"
                className="hover:underline"
              >
                Eye drop days supply guide
              </Link>
              <span>•</span>

              <Link href="/eye-drops-ndc-reference" className="hover:underline">
                Eye drops NDC reference
              </Link>
              <span>•</span>

              <Link href="/days-supply-calculators" className="hover:underline">
                Pharmacy calculators hub
              </Link>
            </div>
          </div>

          <div className="shrink-0 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold text-emerald-800">
                Free pharmacist tool
              </span>
            </div>
          </div>
        </div>
      </section>

      <p className="mt-2 max-w-3xl text-[12px] text-slate-600">
        Free eye drops days supply calculator for pharmacists and pharmacy
        technicians. Estimate ophthalmic day supply using bottle size, drops per
        mL, drops per dose, dosing frequency, and one-eye or both-eyes use.
      </p>

      <section className="mt-4">
        <EyeDropsCalculatorClient />
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          How eye drops days supply is calculated
        </h2>

        <p className="mt-4 leading-7 text-slate-700">
          Eye drops days supply is generally calculated by estimating the total
          number of drops in the dispensed bottles and dividing that total by
          the number of drops used per day. Pharmacists often estimate drops per
          mL because bottle design and solution characteristics can vary.
        </p>

        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
          <code className="font-semibold text-slate-900">
            Days Supply = Total Drops ÷ Drops Used Per Day
          </code>
        </div>

        <p className="mt-4 leading-7 text-slate-700">
          In pharmacy workflow, the final practical supply can vary depending on
          one-eye versus both-eyes directions, drops per administration,
          administrations per day, and the estimated drops per mL used for the
          calculation.
        </p>

        <Link
          href="/how-to-calculate-eye-drop-days-supply"
          className="mt-4 inline-block font-semibold text-cyan-700 underline underline-offset-4"
        >
          Learn how to calculate eye drop days supply →
        </Link>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Why pharmacists use an eye drops days supply calculator
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Accounts for bottle size and estimated drops per mL",
            "Supports one-eye or both-eyes directions",
            "Useful for billing, audits, and dispensing workflow",
            "Designed for pharmacists and pharmacy technicians",
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

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently asked questions
        </h2>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              How do you calculate eye drop days supply?
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Eye drop days supply is calculated by estimating the total drops
              available in the dispensed bottles and dividing by the number of
              drops used per day.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              How many drops are in 1 mL of eye drops?
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              A common pharmacy workflow estimate is 20 drops per mL, although
              real-world values can vary depending on bottle design and product
              characteristics.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Why can eye drops days supply vary?
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Eye drops days supply can vary because drops per mL are estimated,
              patient technique varies, and one-eye versus both-eyes directions
              change the daily number of drops used.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:mt-10 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          More ophthalmic guidance
        </h2>

        <p className="mt-3 text-slate-700">
          Need help with the calculation method? Visit the{" "}
          <Link
            href="/how-to-calculate-eye-drop-days-supply"
            className="font-semibold text-cyan-700 underline underline-offset-4"
          >
            eye drop days supply guide
          </Link>{" "}
          for a step-by-step explanation.
        </p>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Important note</h2>

        <p className="mt-3 leading-7 text-slate-700">
          Always use professional judgment and follow product labeling, payer
          requirements, and pharmacy workflow policies when determining billed
          days supply.
        </p>
      </section>
    </main>
  );
}
