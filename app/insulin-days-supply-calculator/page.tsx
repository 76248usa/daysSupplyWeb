import type { Metadata } from "next";
import Link from "next/link";
import { medicineData } from "@/lib/medicineData";

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
        Insulin Days Supply Calculator | Includes Priming & Expiration
      </h1>

      <p style={{ fontSize: "1.05rem", marginBottom: 12 }}>
        An insulin days supply calculator helps pharmacists determine insulin
        pen and vial days supply using total units dispensed, daily dose,
        priming considerations, and expiration limits when appropriate.
      </p>

      <p style={{ marginBottom: 24 }}>
        This calculator includes insulin pen priming and expiration limits,
        helping pharmacists make more accurate insulin days supply decisions for
        dispensing, insurance billing, and day-to-day workflow.
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
          Open Full Calculator
        </Link>
      </div>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>
          How insulin days supply is calculated
        </h2>

        <p>
          Insulin days supply is generally calculated by dividing the total
          insulin units dispensed by the patient&apos;s total daily dose.
          However, for many insulin pen products, priming can reduce the
          effective insulin available for dosing, and expiration after opening
          can shorten the practical days supply.
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
          This is why pharmacists often need more than simple unit math alone.
          Priming and expiration can materially affect the final insulin days
          supply used for dispensing and billing workflow.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Why this calculator is different</h2>

        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li style={{ marginBottom: 8 }}>
            Includes insulin pen priming considerations
          </li>
          <li style={{ marginBottom: 8 }}>
            Includes expiration-after-opening limits
          </li>
          <li style={{ marginBottom: 8 }}>
            Supports insulin pen and vial workflow
          </li>
          <li style={{ marginBottom: 8 }}>
            Designed for pharmacists and pharmacy billing workflow
          </li>
        </ul>
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

      <section style={{ marginTop: 40 }}>
        <h2>More Pharmacy Calculators</h2>

        <p>
          Looking for additional dispensing tools? Visit the{" "}
          <Link href="/days-supply-calculators">
            pharmacy days supply calculators hub
          </Link>{" "}
          to explore insulin calculators, ophthalmic calculators, and dispensing
          guides.
        </p>
      </section>

      <section style={{ marginTop: 32, marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Important note</h2>

        <p>
          Always use professional judgment and follow product labeling, payer,
          plan, store, and workflow requirements when determining billed days
          supply.
        </p>
      </section>
    </main>
  );
}
