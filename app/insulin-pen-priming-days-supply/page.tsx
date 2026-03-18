import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Insulin Pen Priming and Days Supply | Pharmacist Guide",
  description:
    "Learn how insulin pen priming affects insulin days supply and insulin day supply calculations. Pharmacist guide to priming loss, billed supply, and workflow considerations.",
  keywords: [
    "insulin pen priming days supply",
    "insulin pen priming loss",
    "insulin priming day supply",
    "how priming affects insulin days supply",
    "insulin pen priming pharmacist",
    "insulin day supply priming",
  ],
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/insulin-pen-priming-days-supply",
  },
  openGraph: {
    title: "Insulin Pen Priming and Days Supply | Pharmacist Guide",
    description:
      "Learn how insulin pen priming affects insulin days supply and billed day supply calculations.",
    url: "https://www.insulinprimingdayssupply.com/insulin-pen-priming-days-supply",
    siteName: "Insulin Days' Supply",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Insulin Pen Priming and Days Supply | Pharmacist Guide",
    description:
      "Learn how insulin pen priming affects insulin days supply and billed day supply calculations.",
  },
};

export default function InsulinPenPrimingDaysSupplyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "FAQPage"],
    name: "Insulin Pen Priming and Days Supply",
    url: "https://www.insulinprimingdayssupply.com/insulin-pen-priming-days-supply",
    description:
      "Pharmacist guide to how insulin pen priming affects insulin days supply and insulin day supply calculations.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacists",
    },
    about: {
      "@type": "MedicalTherapy",
      name: "Insulin pen priming",
    },
    mainEntity: [
      {
        "@type": "Question",
        name: "What is insulin pen priming?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Insulin pen priming is the process of expelling a small number of insulin units before injection to remove air and confirm proper insulin flow.",
        },
      },
      {
        "@type": "Question",
        name: "Why does priming affect insulin days supply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Priming uses insulin units that are not delivered as a therapeutic dose, which can reduce the effective insulin available for patient use and affect pharmacist days supply calculations.",
        },
      },
      {
        "@type": "Question",
        name: "Should priming be considered in insulin day supply calculations?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Priming may need to be considered when determining practical or billed insulin day supply, depending on product, workflow, payer rules, and professional judgment.",
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
                alt="Insulin Pen Priming Guide"
                className="h-7 w-7 rounded-md sm:h-8 sm:w-8"
              />

              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-700 sm:text-[11px]">
                  Pharmacist Guide
                </p>
                <h1 className="text-sm font-bold leading-tight text-slate-900 sm:text-lg">
                  Insulin Pen Priming and Days Supply
                </h1>
              </div>
            </div>

            <h2>How many units are lost during insulin pen priming?</h2>

            <p>
              Most insulin pens require 1–2 units per priming attempt. If
              priming is done before each injection, this can significantly
              reduce total usable insulin.
            </p>

            <p>
              This is why insulin days supply calculations may be shorter than
              expected.
            </p>

            <Link href="/insulin-days-supply-calculator">
              Calculate insulin days supply including priming →
            </Link>

            <p className="mt-1 text-[11px] leading-4 text-slate-600 sm:mt-1.5 sm:text-xs">
              Learn how insulin pen priming can affect insulin days supply and
              insulin day supply calculations in pharmacy workflow.
            </p>

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
                href="/insulin-expiration-after-opening"
                className="hover:underline"
              >
                Insulin expiration after opening
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
        Insulin pen priming uses units that are not delivered therapeutically.
        That can reduce the effective number of usable units and affect the
        practical insulin days supply or insulin day supply for certain
        prescriptions.
      </p>

      <section className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h2 className="text-2xl font-bold text-slate-900">
          What is insulin pen priming?
        </h2>

        <p className="mt-4 leading-7 text-slate-700">
          Insulin pen priming is the process of dialing and expelling a small
          number of insulin units before an injection. Priming helps remove air
          from the pen system and confirms that insulin flows properly through
          the needle before the therapeutic dose is administered.
        </p>

        <p className="mt-4 leading-7 text-slate-700">
          From a pharmacist workflow perspective, priming matters because those
          units are used from the pen but are not delivered as part of the
          patient&apos;s intended daily dose. For that reason, priming can
          reduce the effective insulin available for treatment over time.
        </p>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Why priming affects insulin days supply
        </h2>

        <p className="mt-4 leading-7 text-slate-700">
          Basic insulin days supply math often starts with total units dispensed
          divided by total daily units used. However, insulin pen priming can
          change the practical result because additional insulin units may be
          expended before each injection. This can make the usable insulin
          amount smaller than the total labeled units in the package.
        </p>

        <div className="mt-5 rounded-2xl bg-slate-50 p-5">
          <code className="font-semibold text-slate-900">
            Practical Days Supply = Usable Units ÷ Daily Therapeutic Units
          </code>
        </div>

        <p className="mt-4 leading-7 text-slate-700">
          In real-world pharmacy workflow, priming impact depends on how often
          the pen is used, how often needles are changed, product-specific
          instructions, and professional judgment. It can also affect billed day
          supply when store, payer, or plan requirements require a practical
          rather than purely mathematical estimate.
        </p>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Pharmacist workflow considerations
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Priming uses insulin units that are not delivered therapeutically",
            "More frequent injections can increase cumulative priming loss",
            "Practical day supply may differ from simple unit math",
            "Always follow product labeling, payer rules, and professional judgment",
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
          For practical insulin days supply and insulin day supply calculations
          that include priming logic, use the main calculator.
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
              What is insulin pen priming?
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Insulin pen priming is the process of expelling a small amount of
              insulin before injection to remove air and confirm that insulin is
              flowing correctly.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Why does priming affect insulin days supply?
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Priming uses insulin units that are not delivered as part of the
              patient&apos;s therapeutic dose, which can reduce the effective
              insulin available for use.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Should priming be considered in insulin day supply calculations?
            </h3>
            <p className="mt-2 leading-7 text-slate-700">
              Priming may need to be considered when determining practical or
              billed insulin day supply, depending on product labeling, payer
              requirements, workflow, and professional judgment.
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
              href: "/insulin-expiration-after-opening",
              label: "Insulin expiration after opening",
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
