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
    name: "Insulin Days Supply Calculator with Priming",
    url: "https://www.insulinprimingdayssupply.com/insulin-days-supply-calculator",
    description:
      "Professional insulin days supply calculator for pharmacists. Includes insulin pen priming doses and pharmacy workflow support.",
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
        name: "How do you calculate insulin days supply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Insulin days supply is calculated by dividing total insulin units dispensed by the patient's daily dose.",
        },
      },
      {
        "@type": "Question",
        name: "Why does insulin pen priming affect days supply?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Priming removes air from insulin pens but uses insulin units that cannot be delivered therapeutically.",
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
          marginBottom: 32,
        }}
      >
        <Link
          href="/app"
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
          Open Main Calculator
        </Link>
      </div>
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

      <section>
        <h2 style={{ marginBottom: 12 }}>Fast access</h2>

        <p>
          Need to calculate now? Go straight to the calculator for this insulin.
        </p>

        <p>
          <Link href={calculatorHref}>Open {medicine.name} calculator</Link>
        </p>
      </section>

      <h2>Frequently Asked Questions</h2>

      <h3>How do you calculate insulin days supply?</h3>
      <p>
        Days supply equals total insulin units dispensed divided by the
        patient’s total daily dose.
      </p>

      <h3>Why does priming matter?</h3>
      <p>
        Priming uses insulin units before injection and can reduce the effective
        insulin available for dosing.
      </p>
    </main>
  );
}
