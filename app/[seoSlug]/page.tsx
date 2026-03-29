import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { medicineData } from "@/lib/medicineData";

type Props = {
  params: Promise<{
    seoSlug: string;
  }>;
};

export const dynamicParams = false;

function getMedicineBySeoSlug(seoSlug: string) {
  return medicineData.find((medicine) => medicine.seoSlug === seoSlug);
}

const featuredLinks = [
  {
    href: "/tresiba-days-supply-calculator",
    label: "Tresiba",
  },
  {
    href: "/novolog-days-supply-calculator",
    label: "NovoLog",
  },
  {
    href: "/lantus-days-supply-calculator",
    label: "Lantus",
  },
  {
    href: "/humalog-days-supply-calculator",
    label: "Humalog",
  },
];

export async function generateStaticParams() {
  return medicineData
    .filter((medicine) => medicine.seoSlug)
    .map((medicine) => ({
      seoSlug: medicine.seoSlug!,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoSlug } = await params;
  const medicine = getMedicineBySeoSlug(seoSlug);

  if (!medicine) {
    return {
      title: "Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title =
    medicine.seoTitle ??
    `${medicine.name} Days Supply Calculator (With Priming & Expiration)`;

  const description =
    medicine.seoDescription ??
    `Calculate ${medicine.name} days supply including priming doses and expiration considerations for pharmacist workflow.`;

  const url = `https://www.insulinprimingdayssupply.com/${medicine.seoSlug}`;

  return {
    title: `${title} | Pharmacist Tool`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | Pharmacist Tool`,
      description,
      url,
      siteName: "Insulin Days' Supply",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Pharmacist Tool`,
      description,
    },
  };
}

export default async function SeoMedicinePage({ params }: Props) {
  const { seoSlug } = await params;
  const medicine = getMedicineBySeoSlug(seoSlug);

  if (!medicine) {
    notFound();
  }

  const title =
    medicine.seoTitle ??
    `${medicine.name} Days Supply Calculator (With Priming & Expiration)`;

  const intro =
    medicine.seoIntro ??
    `Use this ${medicine.name} calculator to estimate insulin days supply while accounting for priming, package size, and expiration considerations.`;

  const description =
    medicine.seoDescription ??
    `Calculate ${medicine.name} days supply including priming doses and expiration considerations for pharmacist workflow.`;

  const calculatorHref = `/app/medicine/${medicine.id}`;

  const relatedPages = medicineData
    .filter(
      (item) =>
        item.seoSlug && item.seoTitle && item.seoSlug !== medicine.seoSlug,
    )
    .slice(0, 8)
    .map((item) => ({
      href: `/${item.seoSlug}`,
      label: item.seoTitle!,
    }));

  const schema = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "FAQPage"],
    name: title,
    url: `https://www.insulinprimingdayssupply.com/${medicine.seoSlug}`,
    description,
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacists",
    },
    about: {
      "@type": "MedicalEntity",
      name: medicine.name,
    },
    mainEntity: [
      {
        "@type": "Question",
        name: `How do you calculate ${medicine.name} days supply?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${medicine.name} days supply is generally calculated by dividing total insulin units dispensed by the patient's total daily dose. For pen products, priming can reduce the effective insulin available for therapeutic dosing, and expiration after opening can limit practical days supply.`,
        },
      },
      {
        "@type": "Question",
        name: `Why does priming matter for ${medicine.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Priming uses insulin units before injection, which can reduce the effective amount of ${medicine.name} available for actual patient dosing.`,
        },
      },
      {
        "@type": "Question",
        name: `Why does expiration matter for ${medicine.name} days supply?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Expiration after opening can cap practical or billable days supply even when simple unit-based calculations suggest a longer duration.`,
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

      <section className="mt-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 sm:py-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-700">
          Pharmacist Tool
        </p>

        <h1 className="mt-2 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          {title}
        </h1>

        {medicine.addToName ? (
          <p className="mt-2 text-sm text-slate-600">{medicine.addToName}</p>
        ) : null}

        <p className="mt-3 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
          {intro}
        </p>

        <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-700 sm:text-base">
          This page is designed for pharmacists and pharmacy technicians to
          calculate insulin days supply more consistently for dispensing,
          billing, refill timing, and audit-ready workflow.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={calculatorHref}
            className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
          >
            Open {medicine.name} Calculator
          </Link>

          <Link
            href="/insulin-days-supply-calculator"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View Main Insulin Calculator
          </Link>
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
        <p className="text-sm font-semibold text-slate-900">
          Also calculate other insulins
        </p>

        <div className="mt-2 flex flex-wrap gap-3 text-sm">
          {featuredLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-cyan-700 underline underline-offset-4"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          How {medicine.name} days supply is calculated
        </h2>

        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
          <code className="font-semibold text-slate-900">
            Days Supply = Total Units Dispensed ÷ (Total Daily Dose + Priming
            Loss)
          </code>
        </div>

        <p className="mt-4 leading-7 text-slate-700">
          {medicine.name} days supply is generally calculated by dividing the
          total insulin units dispensed by the patient&apos;s total daily dose.
          For pen products, priming can reduce the effective insulin available
          for actual patient dosing, so it may affect the final days supply
          calculation.
        </p>

        <p className="mt-4 leading-7 text-slate-700">
          If the product has an in-use expiration limit after opening, that
          expiration may cap the practical or billable days supply even when the
          mathematical unit-based calculation suggests a longer supply.
        </p>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Product details</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {medicine.addToName ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
              <span className="font-semibold text-slate-900">Package:</span>{" "}
              {medicine.addToName}
            </div>
          ) : null}

          {medicine.ndc ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
              <span className="font-semibold text-slate-900">NDC:</span>{" "}
              {medicine.ndc}
            </div>
          ) : null}

          {medicine.unitsInPen ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
              <span className="font-semibold text-slate-900">
                Units per container:
              </span>{" "}
              {medicine.unitsInPen}
            </div>
          ) : null}

          {medicine.pensAmount ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
              <span className="font-semibold text-slate-900">
                Pens/cartridges per box:
              </span>{" "}
              {medicine.pensAmount}
            </div>
          ) : null}

          {typeof medicine.prime === "number" ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
              <span className="font-semibold text-slate-900">
                Priming dose:
              </span>{" "}
              {medicine.prime} unit{medicine.prime === 1 ? "" : "s"}
            </div>
          ) : null}

          {medicine.expire ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
              <span className="font-semibold text-slate-900">
                In-use expiration:
              </span>{" "}
              {medicine.expire} days
            </div>
          ) : null}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">
          Why priming matters
        </h2>

        <p className="mt-4 leading-7 text-slate-700">
          Many insulin pens require priming before injection. Those units are
          not part of the therapeutic dose, so repeated priming can reduce true
          available insulin and shorten practical days supply.
        </p>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-xl font-bold text-slate-900">Fast access</h2>

        <p className="mt-4 leading-7 text-slate-700">
          Need to calculate now? Go straight to the calculator for this insulin.
        </p>

        <p className="mt-4">
          <Link
            href={calculatorHref}
            className="font-semibold text-cyan-700 underline underline-offset-4"
          >
            Open {medicine.name} calculator
          </Link>
        </p>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Frequently asked questions
        </h2>

        <div className="mt-6 space-y-6 text-slate-700">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              How do you calculate {medicine.name} days supply?
            </h3>
            <p className="mt-2 leading-7">
              Days supply equals total insulin units dispensed divided by the
              patient&apos;s total daily dose. For pen products, priming may
              reduce the effective insulin available for dosing, and expiration
              after opening may cap the final practical days supply.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Why does priming matter?
            </h3>
            <p className="mt-2 leading-7">
              Priming uses insulin units before injection and can reduce the
              effective insulin available for therapeutic dosing.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Why does expiration matter?
            </h3>
            <p className="mt-2 leading-7">
              Expiration after opening can shorten usable or billable days
              supply, even if simple unit math suggests a longer duration.
            </p>
          </div>
        </div>
      </section>

      {relatedPages.length > 0 ? (
        <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-10 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Related insulin calculators
          </h2>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {relatedPages.map((item) => (
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
      ) : null}
    </main>
  );
}
