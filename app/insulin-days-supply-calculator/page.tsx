import type { Metadata } from "next";
import Link from "next/link";
import { medicineData } from "@/lib/medicineData";

export const metadata: Metadata = {
  title: "Insulin Days Supply Calculator with Priming | Pharmacist Tool",
  description:
    "Professional insulin days supply calculator for pharmacists. Calculate insulin pen days supply with priming doses included for faster, more consistent dispensing and billing workflow.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/insulin-days-supply-calculator",
  },
  openGraph: {
    title: "Insulin Days Supply Calculator with Priming",
    description:
      "Professional insulin days supply calculator for pharmacists with priming doses included.",
    url: "https://www.insulinprimingdayssupply.com/insulin-days-supply-calculator",
    siteName: "Insulin Days' Supply",
    type: "website",
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
          text: "Insulin days supply is calculated by dividing total insulin units dispensed by the patient's total daily dose.",
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
        Insulin Days Supply Calculator (with Priming)
      </h1>

      <p style={{ fontSize: "1.05rem", marginBottom: 12 }}>
        This insulin days supply calculator helps pharmacists calculate insulin
        pen and vial days supply more consistently, including priming doses for
        pen products.
      </p>

      <p style={{ marginBottom: 24 }}>
        It is designed for fast pharmacy workflow, insurance billing, and
        day-to-day dispensing decisions when accurate insulin days supply
        matters.
      </p>

      <div style={{ marginBottom: 32 }}>
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
          Open Insulin Calculator
        </Link>
      </div>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>
          How insulin days supply is calculated
        </h2>

        <p>
          Insulin days supply is generally calculated by dividing the total
          insulin units dispensed by the patient's total daily dose.
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
          For insulin pens, priming can reduce the effective amount of insulin
          available for actual dosing.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Insulin Days Supply Calculators</h2>

        <ul style={{ paddingLeft: 20, margin: 0 }}>
          {calculatorPages.map((item) => (
            <li key={item.href} style={{ marginBottom: 8 }}>
              <Link href={item.href}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-4 text-slate-700">
        Looking for calculators for specific insulin types? Visit the{" "}
        <Link
          href="/insulin-calculators"
          className="font-semibold text-cyan-700 underline underline-offset-4"
        >
          insulin calculators hub
        </Link>
        .
      </p>

      <section>
        <h2 style={{ marginBottom: 12 }}>Important note</h2>

        <p>
          Always use professional judgment and follow payer, plan, store, and
          workflow requirements when determining billed days supply.
        </p>
      </section>
    </main>
  );
}
