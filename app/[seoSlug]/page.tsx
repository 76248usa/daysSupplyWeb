// app/[seoSlug]/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { medicineData } from "@/lib/medicineData";

type Props = {
  params: Promise<{
    seoSlug: string;
  }>;
};

function getMedicineBySeoSlug(seoSlug: string) {
  return medicineData.find((medicine) => medicine.seoSlug === seoSlug);
}

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
    };
  }

  const title =
    medicine.seoTitle ?? `${medicine.name} Days Supply Calculator with Priming`;

  const description =
    medicine.seoDescription ??
    `Calculate ${medicine.name} days supply including priming doses.`;

  const url = `https://www.insulinprimingdayssupply.com/${medicine.seoSlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Insulin Days' Supply",
      type: "website",
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
    medicine.seoTitle ?? `${medicine.name} Days Supply Calculator with Priming`;

  const intro =
    medicine.seoIntro ??
    `Use this ${medicine.name} calculator to estimate insulin days supply while accounting for priming and package size.`;

  const description =
    medicine.seoDescription ??
    `Calculate ${medicine.name} days supply including priming doses.`;

  const calculatorHref = `/app/medicine/${medicine.id}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": ["MedicalWebPage", "FAQPage"],
    name: title,
    url: `https://www.insulinprimingdayssupply.com/${medicine.seoSlug}`,
    description,
    medicalAudience: {
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
          text: `Days supply for ${medicine.name} is generally calculated by dividing total insulin units dispensed by the patient's total daily dose. For pen products, priming can reduce the effective insulin available for therapeutic dosing.`,
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
    ],
  };

  return (
    <main
      style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: "24px 20px 56px",
        lineHeight: 1.65,
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <h1
        style={{
          fontSize: "2rem",
          lineHeight: 1.2,
          marginBottom: 12,
        }}
      >
        {title}
      </h1>

      <p style={{ fontSize: "1.05rem", marginBottom: 12 }}>{intro}</p>

      <p style={{ marginBottom: 24 }}>
        This page is designed to help pharmacists and pharmacy technicians
        estimate insulin days supply more consistently and quickly.
      </p>

      <div
        style={{
          marginBottom: 24,
        }}
      >
        <Link
          href={calculatorHref}
          style={{
            display: "inline-block",
            padding: "14px 24px",
            borderRadius: 10,
            textDecoration: "none",
            fontWeight: 700,
            background: "#2563eb",
            color: "#ffffff",
            fontSize: "1.05rem",
          }}
        >
          Open {medicine.name} Calculator
        </Link>
      </div>

      <p style={{ marginBottom: 32 }}>
        <Link href="/insulin-days-supply-calculator">
          View all insulin days supply calculators
        </Link>
      </p>

      <section className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
        <p className="text-sm text-slate-700">Also calculate other insulins:</p>

        <div className="mt-2 flex flex-wrap gap-2 text-sm">
          <Link href="/tresiba-days-supply-calculator" className="underline">
            Tresiba
          </Link>
          <Link href="/novolog-days-supply-calculator" className="underline">
            NovoLog
          </Link>
          <Link href="/lantus-days-supply-calculator" className="underline">
            Lantus
          </Link>
          <Link href="/humalog-days-supply-calculator" className="underline">
            Humalog
          </Link>
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>
          How {medicine.name} days supply is calculated
        </h2>

        <p>
          Insulin days supply is generally calculated by dividing the total
          insulin units dispensed by the patient&apos;s total daily dose.
        </p>

        <div
          style={{
            background: "#f3f4f6",
            padding: 16,
            borderRadius: 8,
            margin: "16px 0",
            overflowX: "auto",
          }}
        >
          <code>
            Days Supply = Total Units Dispensed ÷ Total Daily Units Used
          </code>
        </div>

        <p>
          For pen products, priming can reduce the effective amount of insulin
          available for actual patient dosing, so it may affect the final days
          supply calculation.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Product details</h2>

        <ul style={{ paddingLeft: 20, margin: 0 }}>
          {medicine.addToName ? (
            <li style={{ marginBottom: 8 }}>{medicine.addToName}</li>
          ) : null}
          {medicine.ndc ? (
            <li style={{ marginBottom: 8 }}>{medicine.ndc}</li>
          ) : null}
          {medicine.unitsInPen ? (
            <li style={{ marginBottom: 8 }}>
              Units per container: {medicine.unitsInPen}
            </li>
          ) : null}
          {medicine.pensAmount ? (
            <li style={{ marginBottom: 8 }}>
              Pens/cartridges per box: {medicine.pensAmount}
            </li>
          ) : null}
          {typeof medicine.prime === "number" ? (
            <li style={{ marginBottom: 8 }}>
              Priming dose: {medicine.prime} unit
              {medicine.prime === 1 ? "" : "s"}
            </li>
          ) : null}
          {medicine.expire ? (
            <li style={{ marginBottom: 8 }}>
              In-use expiration: {medicine.expire} days
            </li>
          ) : null}
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Why priming matters</h2>

        <p>
          Many insulin pens require priming before injection. Those units are
          not part of the therapeutic dose, so repeated priming can affect true
          available insulin and billed days supply.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Fast access</h2>

        <p>
          Need to calculate now? Go straight to the calculator for this insulin.
        </p>

        <p>
          <Link href={calculatorHref}>Open {medicine.name} calculator</Link>
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Frequently Asked Questions</h2>

        <h3>How do you calculate {medicine.name} days supply?</h3>
        <p>
          Days supply equals total insulin units dispensed divided by the
          patient&apos;s total daily dose. For pen products, priming may reduce
          the effective insulin available for dosing.
        </p>

        <h3>Why does priming matter?</h3>
        <p>
          Priming uses insulin units before injection and can reduce the
          effective insulin available for therapeutic dosing.
        </p>
      </section>
    </main>
  );
}
