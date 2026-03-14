import type { Metadata } from "next";
import Link from "next/link";
import { medicineData } from "@/lib/medicineData";
import InsulinDaysSupplyCalculatorClient from "./InsulinDaysSupplyCalculatorClient";
import { ShieldCheck } from "lucide-react";
export const metadata: Metadata = {
  title: "Insulin Days Supply Calculator | Includes Priming & Expiration",
  description:
    "Professional insulin days supply calculator for pharmacists. Calculate insulin pen and vial days supply including priming doses and expiration limits for accurate dispensing and billing.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/insulin-days-supply-calculator",
  },
  openGraph: {
    title: "Insulin Days Supply Calculator | Includes Priming & Expiration",
    description:
      "Professional insulin days supply calculator for pharmacists with priming doses and expiration limits included.",
    url: "https://www.insulinprimingdayssupply.com/insulin-days-supply-calculator",
    siteName: "Insulin Days' Supply",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insulin Days Supply Calculator | Includes Priming & Expiration",
    description:
      "Professional insulin days supply calculator for pharmacists with priming doses and expiration limits included.",
  },
};

const calculatorPages = medicineData
  .filter((m) => m.seoSlug && m.seoTitle)
  .map((m) => ({
    name: m.seoTitle!,
    href: `/${m.seoSlug}`,
  }));

export default function InsulinDaysSupplyCalculatorPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "FAQPage"],
    name: "Insulin Days Supply Calculator",
    url: "https://www.insulinprimingdayssupply.com/insulin-days-supply-calculator",
    description:
      "Professional insulin days supply calculator for pharmacists. Includes insulin pen priming doses and expiration limits for pharmacy workflow support.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacists",
    },
    about: {
      "@type": "DrugClass",
      name: "Insulin",
    },
    mainEntity: [
      {
        "@type": "Question",
        name: "What is an insulin days supply calculator?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An insulin days supply calculator helps pharmacists estimate days supply using total insulin dispensed, daily dose, priming considerations, and expiration limits when applicable.",
        },
      },
      {
        "@type": "Question",
        name: "How do you calculate insulin days supply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Insulin days supply is calculated by dividing total insulin units dispensed by the patient's total daily dose, while also considering priming loss and expiration limits when relevant.",
        },
      },
      {
        "@type": "Question",
        name: "Why does insulin pen priming affect days supply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Priming removes air from insulin pens but uses insulin units that cannot be delivered therapeutically, which can reduce the effective insulin available for patient use.",
        },
      },
      {
        "@type": "Question",
        name: "Why does insulin expiration matter for days supply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some insulin products expire after opening, so the practical billed or usable days supply may be shorter than the mathematical unit-based calculation.",
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-5 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* 



      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      
        <div className="flex items-start gap-3">
         

          <div className="space-y-0">
            <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
              Insulin Days’ Supply Calculator
            </h1>

            <p className="text-sm text-slate-600">
              Accurate insulin days’ supply calculations including priming
              doses,expiration, pen sizes, and package quantities.
            </p>

            <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-600" />

                <div className="text-sm leading-relaxed text-slate-700">
                  <span className="font-semibold text-slate-900">
                    Free for Pharmacists, Pharmacy Technicians and other
                    Healthcare Professionals.
                  </span>
                  <div className="mt-1 text-xs text-slate-500">
                    Designed to support accurate day-supply calculations in
                    pharmacy workflow.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white px-3 py-3 shadow-sm sm:px-5 sm:py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <img
                src="/icons/icon-192.png"
                alt="Insulin Days Supply Calculator"
                className="h-7 w-7 rounded-md sm:h-8 sm:w-8"
              />

              <h1 className="truncate text-sm font-bold text-slate-900 sm:text-lg">
                Insulin Days’ Supply Calculator
              </h1>
            </div>

            <p className="mt-1 text-[11px] leading-4 text-slate-600 sm:text-xs">
              Calculate insulin days supply including priming doses, pen
              quantities, and expiration limits.
            </p>

            {/* SEO internal links */}
            <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-cyan-700">
              <a
                href="/tresiba-days-supply-calculator"
                className="hover:underline"
              >
                Tresiba
              </a>
              <span>•</span>
              <a
                href="/novolog-days-supply-calculator"
                className="hover:underline"
              >
                Novolog
              </a>
              <span>•</span>
              <a
                href="/lantus-days-supply-calculator"
                className="hover:underline"
              >
                Lantus
              </a>
              <span>•</span>
              <a
                href="/humalog-days-supply-calculator"
                className="hover:underline"
              >
                Humalog
              </a>
            </div>
          </div>

          <div className="shrink-0 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1.5">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[10px] font-semibold text-emerald-800">
                Free pharmacist tool
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4">
        <InsulinDaysSupplyCalculatorClient />
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="text-2xl font-bold text-slate-900">
          How insulin days supply is calculated
        </h2>

        <p className="mt-4 text-slate-700 leading-7">
          Insulin days supply is generally calculated by dividing the total
          insulin units dispensed by the patient&apos;s total daily dose.
          However, for many insulin pen products, priming can reduce the
          effective insulin available for dosing, and expiration after opening
          can shorten the practical days supply.
        </p>

        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
          <code className="font-semibold text-slate-900">
            Days Supply = Total Units Dispensed ÷ Total Daily Units Used
          </code>
        </div>

        <p className="mt-4 text-slate-700 leading-7">
          This is why pharmacists often need more than simple unit math alone.
          Priming and expiration can materially affect the final insulin days
          supply used for dispensing and billing workflow.
        </p>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Why pharmacists use an insulin days supply calculator
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Includes insulin pen priming considerations",
            "Includes expiration-after-opening limits",
            "Supports insulin pen and vial workflow",
            "Designed for pharmacists and pharmacy billing workflow",
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
          Related insulin days supply calculators
        </h2>

        <p className="mt-3 max-w-3xl text-slate-700">
          Looking for calculators for specific insulin types? Explore the
          related insulin calculator pages below.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {calculatorPages.map((item) => (
            <li
              key={item.href}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <Link
                href={item.href}
                className="font-semibold text-cyan-700 underline underline-offset-4"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          More pharmacy calculators
        </h2>

        <p className="mt-3 text-slate-700">
          Looking for additional dispensing tools? Visit the{" "}
          <Link
            href="/days-supply-calculators"
            className="font-semibold text-cyan-700 underline underline-offset-4"
          >
            pharmacy days supply calculators hub
          </Link>{" "}
          to explore insulin calculators, ophthalmic calculators, and dispensing
          guides.
        </p>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Important note</h2>

        <p className="mt-3 text-slate-700 leading-7">
          Always use professional judgment and follow product labeling, payer,
          plan, store, and workflow requirements when determining billed days
          supply.
        </p>
      </section>
    </main>
  );
}
