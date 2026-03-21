import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Calculate Eye Drop Days Supply | Pharmacist Guide",
  description:
    "Step-by-step pharmacist guide explaining how to calculate eye drop days supply using bottle size, drops per mL, dosing frequency, and practical workflow considerations.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/how-to-calculate-eye-drop-days-supply",
  },
  openGraph: {
    title: "How to Calculate Eye Drop Days Supply | Pharmacist Guide",
    description:
      "Step-by-step pharmacist guide explaining how to calculate eye drop days supply using bottle size, drops per mL, dosing frequency, and practical workflow considerations.",
    url: "https://www.insulinprimingdayssupply.com/how-to-calculate-eye-drop-days-supply",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate Eye Drop Days Supply | Pharmacist Guide",
    description:
      "Step-by-step pharmacist guide explaining how to calculate eye drop days supply using bottle size, drops per mL, dosing frequency, and practical workflow considerations.",
  },
};

const faqs = [
  {
    question: "How do you calculate eye drop days supply?",
    answer:
      "Estimate the total number of drops in the bottle, then divide by the number of drops the patient uses each day based on the prescription directions.",
  },
  {
    question: "How many drops are in 1 mL of ophthalmic solution?",
    answer:
      "The exact number can vary by bottle and formulation, but many pharmacy workflows use an estimated drops-per-mL standard for calculation purposes.",
  },
  {
    question: "Why can eye drop days supply vary?",
    answer:
      "Days supply can vary because drop size differs by bottle design, patient technique, dosing frequency, and whether one or both eyes are treated.",
  },
  {
    question: "Why is accurate eye drop days supply important?",
    answer:
      "Accurate eye drop days supply helps support refill timing, prescription processing, and documentation consistency in pharmacy workflow.",
  },
];

export default function HowToCalculateEyeDropDaysSupplyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "How to Calculate Eye Drop Days Supply",
    url: "https://www.insulinprimingdayssupply.com/how-to-calculate-eye-drop-days-supply",
    description:
      "Step-by-step guide for calculating eye drop days supply using bottle size, drops per mL, and dosing frequency.",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacist",
    },
    about: {
      "@type": "MedicalTherapy",
      name: "Ophthalmic medications",
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

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
          Eye Drop Days Supply Guide
        </p>

        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          How to Calculate Eye Drop Days Supply
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-700">
          This pharmacist-focused guide explains how to calculate{" "}
          <strong>eye drop days supply</strong> using bottle size, estimated
          drops per mL, and prescribed daily use. It is useful for ophthalmic
          billing, refill timing, and workflow consistency.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/eye-drops-days-supply-calculator"
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Eye Drops Calculator
          </Link>

          <Link
            href="/eye-drops-ndc-reference"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Eye Drops NDC Reference
          </Link>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
        <h2 className="text-lg font-bold text-slate-900">
          Eye drop days supply calculator
        </h2>

        <p className="mt-2 text-sm text-slate-700">
          Use our free eye drop days supply calculator to estimate accurate days
          supply based on bottle size, drops per mL, dosing frequency, and
          quantity dispensed.
        </p>

        <Link
          href="/eye-drops-days-supply-calculator"
          className="font-semibold text-cyan-700 underline"
        >
          Use the eye drop days supply calculator →
        </Link>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Basic eye drop days supply formula
        </h2>

        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
          <p className="font-semibold text-slate-900">
            Days Supply = Total Drops in Bottle ÷ Drops Used Per Day
          </p>
        </div>

        <p className="mt-4 text-slate-700 leading-7">
          To estimate the total number of drops in the bottle, multiply the
          bottle size in mL by the drops-per-mL standard used in your pharmacy
          workflow.
        </p>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Step-by-step: how to calculate eye drop days supply
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 1: Confirm the bottle size
            </h3>
            <p className="mt-2 leading-7">
              Review the exact ophthalmic product and bottle size dispensed.
              Many eye drops are supplied in small bottles such as 2.5 mL, 5 mL,
              10 mL, or 15 mL, but the package should always be confirmed.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 2: Estimate total drops in the bottle
            </h3>
            <p className="mt-2 leading-7">
              Multiply the bottle size by the estimated number of drops per mL
              used in your pharmacy workflow. Many pharmacies use a standard
              estimated drops-per-mL rule for calculation purposes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 3: Determine total daily drops used
            </h3>
            <p className="mt-2 leading-7">
              Review the prescription directions carefully. Count the total
              number of drops used each day, taking into account frequency and
              whether the medication is used in one eye or both eyes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Step 4: Divide total drops by daily use
            </h3>
            <p className="mt-2 leading-7">
              Divide the total estimated drops in the bottle by the total number
              of drops used per day to estimate the days supply.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Example eye drop days supply calculation
        </h2>

        <div className="mt-6 space-y-5 text-slate-700">
          <div className="rounded-2xl bg-slate-50 p-5">
            <ul className="space-y-2 leading-7">
              <li>Bottle size: 5 mL</li>
              <li>Estimated drops per mL: 20</li>
              <li>Total estimated drops: 100 drops</li>
              <li>Directions: 1 drop in each eye twice daily</li>
              <li>Total daily use: 4 drops per day</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-cyan-50 p-5 text-slate-900">
            <p className="font-semibold">100 ÷ 4 = 25 days supply</p>
          </div>

          <p className="leading-7">
            Actual drop count may vary by bottle design and patient technique,
            so pharmacies often follow internal workflow standards for eye drop
            calculations.
          </p>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Common eye drop examples
        </h2>

        <p className="mt-3 max-w-3xl text-slate-700">
          Looking for drug-specific examples? These ophthalmic guides show how
          days supply calculations can vary by bottle size, drops per mL, and
          dosing frequency.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/latanoprost-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Latanoprost days supply calculator
            </h3>
            <p className="mt-2 text-slate-700">
              Step-by-step guide for latanoprost eye drop day supply
              calculations.
            </p>
          </Link>

          <Link
            href="/timolol-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Timolol days supply calculator
            </h3>
            <p className="mt-2 text-slate-700">
              Common ophthalmic example using bottle size, drops per mL, and
              daily dosing.
            </p>
          </Link>

          <Link
            href="/brimonidine-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Brimonidine days supply calculator
            </h3>
            <p className="mt-2 text-slate-700">
              Drug-specific guide for brimonidine ophthalmic day supply
              workflow.
            </p>
          </Link>

          <Link
            href="/eye-drops-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Eye drops days supply calculator
            </h3>
            <p className="mt-2 text-slate-700">
              Use the calculator for one eye, both eyes, bottle size, and dosing
              frequency.
            </p>
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Common eye drop days supply mistakes
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[
            "Forgetting to count both eyes",
            "Using the wrong bottle size",
            "Ignoring pharmacy drops-per-mL standards",
            "Missing frequency in the directions",
            "Assuming every bottle produces identical drop size",
            "Not documenting the workflow used for estimation",
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
          Related eye drop guides and references
        </h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/timolol-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Timolol days supply calculator
            </h3>
            <p className="mt-2 text-slate-700">
              Step-by-step guide for timolol ophthalmic days supply.
            </p>
          </Link>

          <Link
            href="/eye-drops-ndc-reference"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Eye Drops NDC Reference
            </h3>
            <p className="mt-2 text-slate-700">
              Browse ophthalmic package NDC reference pages by drug.
            </p>
          </Link>

          <Link
            href="/how-to-calculate-insulin-days-supply"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              How to Calculate Insulin Days Supply
            </h3>
            <p className="mt-2 text-slate-700">
              Pharmacist guide for insulin pen and vial calculations.
            </p>
          </Link>

          <Link
            href="/insulin-days-supply-calculator"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold text-slate-900">
              Insulin Days Supply Calculator
            </h3>
            <p className="mt-2 text-slate-700">
              Browse insulin days supply calculators and pharmacist references.
            </p>
          </Link>
        </div>
      </section>

      <section className="mt-10 rounded-3xl border border-cyan-100 bg-cyan-50 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently asked questions about eye drop days supply
        </h2>

        <div className="mt-6 space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="rounded-2xl border border-cyan-200 bg-white p-5"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-slate-900">
                {faq.question}
              </summary>
              <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
