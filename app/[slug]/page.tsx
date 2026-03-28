import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DetailsClient from "@/app/app/medicine/[id]/DetailsClient";
import { getMedicineBySlug, getSeoMedicines } from "@/lib/getMedicineBySlug";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getSeoMedicines().map((m) => ({
    slug: m.seoSlug!,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const medicine = getMedicineBySlug(slug);

  if (!medicine) {
    return {
      title: "Insulin Calculator",
    };
  }

  const pageTitle =
    medicine.seoTitle ?? `${medicine.name} Days Supply Calculator`;

  const description = `Calculate ${medicine.name.toLowerCase()} days supply including priming doses, expiration limits, and package details for pharmacy workflow.`;

  return {
    title: `${pageTitle} | Pharmacist Tool`,
    description,
    keywords: [
      `${medicine.name.toLowerCase()} days supply calculator`,
      `${medicine.name.toLowerCase()} day supply calculator`,
      `${medicine.name.toLowerCase()} insulin days supply`,
      `${medicine.name.toLowerCase()} pharmacist calculator`,
      "insulin days supply calculator",
      "insulin day supply calculator",
    ],
    alternates: {
      canonical: `https://www.insulinprimingdayssupply.com/${slug}`,
    },
    openGraph: {
      title: `${pageTitle} | Pharmacist Tool`,
      description,
      url: `https://www.insulinprimingdayssupply.com/${slug}`,
      siteName: "Insulin Days' Supply",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${pageTitle} | Pharmacist Tool`,
      description,
    },
  };
}

export default async function MedicineSeoPage({ params }: PageProps) {
  const { slug } = await params;
  const medicine = getMedicineBySlug(slug);

  if (!medicine) notFound();

  const relatedPages = getSeoMedicines()
    .filter((m) => m.seoSlug !== medicine.seoSlug)
    .slice(0, 6);

  const schema = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "FAQPage"],
    name: medicine.seoTitle ?? `${medicine.name} Days Supply Calculator`,
    url: `https://www.insulinprimingdayssupply.com/${slug}`,
    description: `Calculate ${medicine.name} days supply including priming doses, expiration limits, and package details for pharmacy workflow.`,
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacists",
    },
    about: {
      "@type": "Drug",
      name: medicine.name,
    },
    mainEntity: [
      {
        "@type": "Question",
        name: `How do you calculate ${medicine.name} days supply?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${medicine.name} days supply is calculated using total units dispensed, total daily dose, pen priming considerations when applicable, and product expiration after opening.`,
        },
      },
      {
        "@type": "Question",
        name: `Why does priming matter for ${medicine.name} days supply?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Priming uses insulin units that are not delivered therapeutically, so it can reduce the usable insulin available and shorten practical days supply.`,
        },
      },
      {
        "@type": "Question",
        name: `Why does expiration matter for ${medicine.name} days supply?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Expiration after opening can cap practical days supply even when mathematical unit calculations suggest a longer duration.`,
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
          {medicine.seoTitle ?? `${medicine.name} Days Supply Calculator`}
        </h1>

        {medicine.addToName ? (
          <p className="mt-2 text-sm text-slate-600">{medicine.addToName}</p>
        ) : null}

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-700 sm:text-base">
          This {medicine.name.toLowerCase()} days supply calculator helps
          pharmacists calculate insulin days supply using product-specific
          priming, expiration limits, and package details.
        </p>

        <div className="mt-3 flex flex-wrap gap-2 text-[12px] text-cyan-700">
          <Link
            href="/insulin-days-supply-calculator"
            className="hover:underline"
          >
            Main insulin calculator
          </Link>
          <span>•</span>
          <Link
            href="/insulin-pen-priming-days-supply"
            className="hover:underline"
          >
            Pen priming guide
          </Link>
          <span>•</span>
          <Link
            href="/insulin-expiration-after-opening"
            className="hover:underline"
          >
            Insulin expiration guide
          </Link>
        </div>
      </section>

      <section className="mt-4 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <DetailsClient medicine={medicine} />
      </section>

      <section className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
          Popular insulin pages
        </h2>

        <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[12px] text-cyan-700">
          <Link
            href="/insulin-days-supply-calculator"
            className="hover:underline"
          >
            Insulin calculator
          </Link>
          <span>•</span>
          <Link
            href="/insulin-pen-priming-days-supply"
            className="hover:underline"
          >
            Pen priming guide
          </Link>
          <span>•</span>
          <Link
            href="/insulin-expiration-after-opening"
            className="hover:underline"
          >
            Insulin expiration guide
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          How {medicine.name} days supply is calculated
        </h2>

        <p className="mt-4 leading-7 text-slate-700">
          {medicine.name} days supply is generally calculated by dividing the
          total insulin units dispensed by the patient&apos;s total daily dose.
          For pen products, priming can reduce the effective insulin available,
          and expiration after opening can shorten the practical billed days
          supply.
        </p>

        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
          <code className="font-semibold text-slate-900">
            Days Supply = Total Units Dispensed ÷ Total Daily Units Used
          </code>
        </div>

        <p className="mt-4 leading-7 text-slate-700">
          This is why pharmacists often need more than unit math alone when
          working with {medicine.name}. Priming and expiration can materially
          affect the final documented days supply.
        </p>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Product details</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            <span className="font-semibold text-slate-900">Prime:</span>{" "}
            {medicine.prime ?? "—"} units
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            <span className="font-semibold text-slate-900">Expiration:</span>{" "}
            {medicine.expire ?? "—"} days
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            <span className="font-semibold text-slate-900">Total units:</span>{" "}
            {medicine.unitsInPen ?? "—"}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
            <span className="font-semibold text-slate-900">Pens per box:</span>{" "}
            {medicine.pensAmount ?? "—"}
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Related insulin calculators
        </h2>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {relatedPages.map((item) => (
            <li
              key={item.seoSlug}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <Link
                href={`/${item.seoSlug}`}
                className="font-semibold text-cyan-700 underline underline-offset-4"
              >
                {item.seoTitle}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:mt-10 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Important note</h2>

        <p className="mt-3 leading-7 text-slate-700">
          Always use professional judgment and follow product labeling, payer
          plan, store, and workflow requirements when determining billed days
          supply.
        </p>
      </section>
    </main>
  );
}
