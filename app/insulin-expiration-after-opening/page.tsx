import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Insulin Expiration After Opening | Pharmacist Guide",
  description:
    "Pharmacist guide to insulin expiration after opening and how it affects insulin days supply and insulin day supply calculations for pens and vials.",
  keywords: [
    "insulin expiration after opening",
    "how long insulin lasts after opening",
    "insulin days supply expiration",
    "insulin day supply expiration",
    "opened insulin expiration pharmacist",
    "insulin pen expiration after opening",
  ],
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/insulin-expiration-after-opening",
  },
  openGraph: {
    title: "Insulin Expiration After Opening | Pharmacist Guide",
    description:
      "Learn how insulin expiration after opening affects practical insulin days supply and billed day supply.",
    url: "https://www.insulinprimingdayssupply.com/insulin-expiration-after-opening",
    siteName: "Insulin Days' Supply",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insulin Expiration After Opening | Pharmacist Guide",
    description:
      "Learn how insulin expiration after opening affects practical insulin days supply and billed day supply.",
  },
};

export default function InsulinExpirationAfterOpeningPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "FAQPage"],
    name: "Insulin Expiration After Opening",
    url: "https://www.insulinprimingdayssupply.com/insulin-expiration-after-opening",
    description:
      "Pharmacist guide to insulin expiration after opening and its effect on insulin days supply and insulin day supply calculations.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacists",
    },
    about: {
      "@type": "Drug",
      name: "Insulin",
    },
    mainEntity: [
      {
        "@type": "Question",
        name: "Why does insulin expiration after opening matter for days supply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some insulin products have limited in-use stability after opening, which can make the practical or billed days supply shorter than the theoretical unit-based calculation.",
        },
      },
      {
        "@type": "Question",
        name: "Can insulin day supply be shorter because of expiration after opening?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. When an insulin product expires after opening before all dispensed units would be used, the practical insulin day supply may be shorter than simple unit math suggests.",
        },
      },
      {
        "@type": "Question",
        name: "Should pharmacists consider product labeling when calculating insulin days supply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Pharmacists should consider product labeling, payer rules, workflow requirements, and professional judgment when determining insulin days supply.",
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
                alt="Insulin Expiration After Opening Guide"
                className="h-7 w-7 rounded-md sm:h-8 sm:w-8"
              />

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-700 sm:text-[11px]">
                  Pharmacist Guide
                </p>
                <h1 className="text-sm font-bold leading-tight text-slate-900 sm:text-lg">
                  Insulin Expiration After Opening
                </h1>
              </div>
            </div>

            <p className="mt-1 text-[11px] leading-4 text-slate-600 sm:mt-1.5 sm:text-xs">
              Learn how expiration after opening can affect insulin days supply
              and insulin day supply calculations for pens and vials.
            </p>

            <h2>How long is insulin good after opening?</h2>

            <p>
              Most insulin products expire 28 days after opening, although some
              products differ. This expiration can limit the maximum billable
              days supply regardless of total units.
            </p>

            <p>
              For example, even if calculated days supply is 40 days, expiration
              may limit it to 28 days.
            </p>

            <Link href="/insulin-days-supply-calculator">
              Use the insulin days supply calculator →
            </Link>

            <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-cyan-700">
              <Link
                href="/insulin-days-supply-calculator"
                className="hover:underline"
              >
                Insulin days supply calculator
              </Link>
              <span>•</span>
              <Link
                href="/how-to-calculate-insulin-days-supply"
                className="hover:underline"
              >
                How to calculate insulin days supply
              </Link>
              <span>•</span>
              <Link
                href="/insulin-pen-priming-days-supply"
                className="hover:underline"
              >
                Insulin pen priming and days supply
              </Link>
            </div>
          </div>

          <div className="shrink-0 rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1.5">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[10px] font-semibold text-emerald-800">
                Free pharmacist guide
              </span>
            </div>
          </div>
        </div>
      </section>

      <p className="mt-2 max-w-3xl text-[12px] text-slate-600">
        Insulin expiration after opening can shorten the practical insulin days
        supply or insulin day supply when the labeled in-use period is shorter
        than the mathematically calculated unit-based supply.
      </p>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Why expiration after opening matters
        </h2>

        <p className="mt-4 leading-7 text-slate-700">
          Some insulin products have a limited period of stability after
          opening. In pharmacy workflow, this means a prescription may have a
          shorter practical days supply than simple unit math would suggest if
          the product reaches its labeled in-use expiration before all dispensed
          units can be used.
        </p>

        <p className="mt-4 leading-7 text-slate-700">
          This is one reason insulin days supply and insulin day supply
          calculations often require more than dividing total units dispensed by
          the daily dose. Product-specific labeling can materially affect the
          final practical or billed supply.
        </p>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          How expiration can affect insulin day supply
        </h2>

        <p className="mt-4 leading-7 text-slate-700">
          When the calculated unit-based supply exceeds the product&apos;s
          allowed in-use period after opening, the practical supply may be
          limited by expiration rather than by the total number of units
          dispensed.
        </p>

        <div className="mt-5 rounded-2xl bg-slate-50 p-5">
          <code className="font-semibold text-slate-900">
            Final Practical Supply = Lesser of Unit-Based Supply or
            Expiration-Limited Supply
          </code>
        </div>

        <p className="mt-4 leading-7 text-slate-700">
          Pharmacists should apply product labeling, plan requirements, store
          workflow, and professional judgment when determining the final billed
          days supply.
        </p>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Pharmacist workflow considerations
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Expiration after opening may limit practical or billed supply",
            "Pen and vial workflow may differ by product and labeling",
            "Simple unit math may overestimate usable supply",
            "Always verify product labeling and payer requirements",
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

      <section className="mt-8 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Use the insulin days supply calculator
        </h2>

        <p className="mt-3 leading-7 text-slate-700">
          For insulin days supply and insulin day supply calculations that take
          practical workflow into account, use the main calculator.
        </p>

        <div className="mt-4">
          <Link
            href="/insulin-days-supply-calculator"
            className="inline-flex rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-cyan-700"
          >
            Open insulin days supply calculator
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently asked questions
        </h2>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Why does insulin expiration after opening matter for days supply?
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Some insulin products have limited in-use stability after opening,
              which can make the practical or billed days supply shorter than a
              theoretical unit-based calculation.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Can insulin day supply be shorter because of expiration after
              opening?
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Yes. If an insulin product reaches its labeled expiration after
              opening before all dispensed units would be used, the practical
              insulin day supply may be shorter than simple unit math suggests.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Should pharmacists consider product labeling when calculating
              insulin days supply?
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Yes. Product labeling, payer rules, workflow requirements, and
              professional judgment all matter when determining insulin days
              supply.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Related pages</h2>

        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            {
              href: "/insulin-days-supply-calculator",
              label: "Insulin days supply calculator",
            },
            {
              href: "/how-to-calculate-insulin-days-supply",
              label: "How to calculate insulin days supply",
            },
            {
              href: "/insulin-pen-priming-days-supply",
              label: "Insulin pen priming and days supply",
            },
            {
              href: "/days-supply-calculators",
              label: "Pharmacy days supply calculators hub",
            },
          ].map((item) => (
            <li
              key={item.href}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <Link
                href={item.href}
                className="font-semibold text-cyan-700 underline underline-offset-4"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
