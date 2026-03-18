import type { Metadata } from "next";
import Link from "next/link";
import EarDropsCalculatorClient from "./EarDropsCalculatorClient";

export const metadata: Metadata = {
  title: "Ear Drops Days Supply Calculator (Otic) | Pharmacist Tool",
  description:
    "Free ear drops days supply calculator for pharmacists and pharmacy technicians. Calculate otic day supply using bottle size, drops per mL, dosing frequency, one ear or both ears, and optional duration limits.",
  keywords: [
    "ear drops days supply calculator",
    "ear drop days supply calculator",
    "otic days supply calculator",
    "otic day supply",
    "ear drops day supply",
    "pharmacy ear drop calculator",
    "how to calculate ear drop days supply",
    "otic drops calculator",
  ],
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/ear-drops-days-supply-calculator",
  },
  openGraph: {
    title: "Ear Drops Days Supply Calculator (Otic) | Pharmacist Tool",
    description:
      "Free ear drops days supply calculator for pharmacists and pharmacy technicians using bottle size, drops per mL, dosing frequency, and one-ear or both-ears directions.",
    url: "https://www.insulinprimingdayssupply.com/ear-drops-days-supply-calculator",
    siteName: "Insulin Days' Supply",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ear Drops Days Supply Calculator (Otic) | Pharmacist Tool",
    description:
      "Free ear drops days supply calculator for pharmacists and pharmacy technicians.",
  },
};

export default function EarDropsDaysSupplyCalculatorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "FAQPage"],
    name: "Ear Drops Days Supply Calculator",
    url: "https://www.insulinprimingdayssupply.com/ear-drops-days-supply-calculator",
    description:
      "Free ear drops days supply calculator for pharmacists and pharmacy technicians using bottle size, drops per mL, dosing frequency, one ear or both ears, and optional duration limits.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacists",
    },
    about: {
      "@type": "DrugClass",
      name: "Otic medications",
    },
    mainEntity: [
      {
        "@type": "Question",
        name: "How do you calculate ear drops days supply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ear drops days supply is calculated by estimating the total number of drops in the dispensed bottle and dividing by the number of drops used per day based on dosing directions.",
        },
      },
      {
        "@type": "Question",
        name: "Why can ear drops days supply vary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ear drops days supply can vary because drops per mL are estimated, bottle design may differ, one-ear versus both-ears directions affect daily use, and some prescriptions include duration limits.",
        },
      },
      {
        "@type": "Question",
        name: "Should duration limits affect otic days supply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. If the prescription includes a specific duration such as 7 days, that duration may cap the practical billed days supply depending on workflow and payer requirements.",
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
                alt="Ear Drops Days Supply Calculator"
                className="h-7 w-7 rounded-md sm:h-8 sm:w-8"
              />

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-700 sm:text-[11px]">
                  Pharmacist Tool
                </p>
                <h1 className="truncate text-sm font-bold leading-tight text-slate-900 sm:text-lg">
                  Ear Drops Days Supply Calculator
                </h1>
              </div>
            </div>

            <p className="mt-1 text-[11px] leading-4 text-slate-600 sm:mt-1.5 sm:text-xs">
              Calculate otic days supply using bottle size, estimated drops per
              mL, dosing frequency, one-ear or both-ears directions, and
              optional duration limits.
            </p>

            {/* <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-cyan-700">
              <span className="text-slate-500">Related pages:</span>

              <Link href="/days-supply-calculators" className="hover:underline">
                Pharmacy calculators hub
              </Link>
              <span>•</span>

              <Link
                href="/eye-drops-days-supply-calculator"
                className="hover:underline"
              >
                Eye drops calculator
              </Link>
              <span>•</span>

              <Link
                href="/insulin-days-supply-calculator"
                className="hover:underline"
              >
                Insulin calculator
              </Link>
            </div> */}

            <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-cyan-700">
              <span className="text-slate-500">Resources:</span>

              <Link
                href="/how-to-calculate-ear-drop-days-supply"
                className="hover:underline"
              >
                Ear drops guide
              </Link>
              <span>•</span>

              <Link href="/days-supply-calculators" className="hover:underline">
                Calculators hub
              </Link>
              <span>•</span>

              <Link
                href="/eye-drops-days-supply-calculator"
                className="hover:underline"
              >
                Eye drops
              </Link>
              <span>•</span>

              <Link
                href="/insulin-days-supply-calculator"
                className="hover:underline"
              >
                Insulin
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
        Free ear drops days supply calculator for pharmacists and pharmacy
        technicians. Estimate otic day supply using bottle size, drops per mL,
        drops per dose, administrations per day, one ear or both ears, and
        optional duration caps.
      </p>

      <section className="mt-4">
        <EarDropsCalculatorClient />
      </section>

      <section className="mt-6 rounded-3xl border border-cyan-100 bg-cyan-50 p-5">
        <h2 className="text-lg font-bold text-slate-900">
          Learn how ear drops days supply is calculated
        </h2>

        <p className="mt-2 text-sm text-slate-700">
          See a step-by-step pharmacist guide covering bottle size, drops per
          mL, one-ear vs both-ears dosing, and duration limits.
        </p>

        <Link
          href="/how-to-calculate-ear-drop-days-supply"
          className="mt-3 inline-flex rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700"
        >
          View ear drops guide
        </Link>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          How ear drops days supply is calculated
        </h2>

        <p className="mt-4 leading-7 text-slate-700">
          Ear drops days supply is generally calculated by estimating the total
          number of drops in the dispensed bottle and dividing by the number of
          drops used per day. In pharmacy workflow, the calculation may also be
          limited by the prescribed duration when directions specify a fixed
          number of days. Use our ear drop days supply calculator.
        </p>

        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
          <code className="font-semibold text-slate-900">
            Days Supply = Total Drops ÷ Drops Used Per Day
          </code>
        </div>

        <p className="mt-4 leading-7 text-slate-700">
          Practical otic day supply can vary based on one-ear versus both-ears
          use, drops per administration, administrations per day, estimated
          drops per mL, and whether the prescription includes a duration limit
          such as “for 7 days.”
        </p>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Why pharmacists use an ear drops days supply calculator
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Accounts for bottle size and estimated drops per mL",
            "Supports one ear or both ears directions",
            "Can accommodate duration-limited otic therapy",
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
          Typical pharmacy workflow
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Select the otic product or enter bottle size",
            "Enter drops per dose and administrations per day",
            "Choose one ear or both ears",
            "Apply an optional duration cap if directions specify a fixed course",
          ].map((step) => (
            <div
              key={step}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700"
            >
              {step}
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
              How do you calculate ear drops days supply?
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Ear drops days supply is calculated by estimating the total number
              of drops in the bottle and dividing by the number of drops used
              each day based on the prescription directions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Why can ear drops days supply vary?
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Ear drops days supply can vary because drops per mL are estimated,
              bottle design may differ, and one-ear versus both-ears use changes
              the total daily number of drops used.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Should duration limits affect otic days supply?
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Yes. When directions specify a fixed duration such as 7 days, that
              duration may cap the practical billed days supply depending on
              workflow and payer requirements.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:mt-10 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          More pharmacy calculators
        </h2>

        <p className="mt-3 text-slate-700">
          Explore the{" "}
          <Link
            href="/days-supply-calculators"
            className="font-semibold text-cyan-700 underline underline-offset-4"
          >
            pharmacy calculators hub
          </Link>{" "}
          for insulin, eye drops, ear drops, and other days supply tools.
        </p>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Important note</h2>

        <p className="mt-3 leading-7 text-slate-700">
          Always use professional judgment and follow product labeling, payer
          requirements, and pharmacy workflow policies when determining billed
          days supply for otic medications.
        </p>
      </section>
    </main>
  );
}
