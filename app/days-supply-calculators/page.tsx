import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pharmacy Days Supply Calculators | Pharmacist Tools",
  description:
    "Professional pharmacy days supply calculators including insulin, eye drop, and dispensing workflow calculators for pharmacists.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/days-supply-calculators",
  },
  openGraph: {
    title: "Pharmacy Days Supply Calculators | Pharmacist Tools",
    description:
      "Professional pharmacy days supply calculators including insulin and ophthalmic dispensing calculations.",
    url: "https://www.insulinprimingdayssupply.com/days-supply-calculators",
    siteName: "Insulin Days' Supply",
    type: "website",
  },
};

export default function DaysSupplyCalculatorsHub() {
  return (
    <main
      style={{
        maxWidth: 940,
        margin: "0 auto",
        padding: "24px 20px 56px",
        lineHeight: 1.65,
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: 12 }}>
        Pharmacy Days Supply Calculators
      </h1>

      <p style={{ fontSize: "1.05rem", marginBottom: 20 }}>
        Professional days supply calculators designed for pharmacist workflow.
        These tools help estimate medication days supply for dispensing,
        insurance billing, and pharmacy documentation.
      </p>

      {/* Core calculators */}

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 10 }}>Core Calculators</h2>

        <ul style={{ paddingLeft: 20 }}>
          <li>
            <Link href="/insulin-days-supply-calculator">
              Insulin Days Supply Calculator
            </Link>
          </li>

          <li>
            <Link href="/eye-drops-days-supply-calculator">
              Eye Drops Days Supply Calculator
            </Link>
          </li>

          <li>
            <Link href="/ear-drops-calculator">Ear Drops Calculator</Link>
          </li>
        </ul>
      </section>

      {/* Insulin drug calculators */}

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 10 }}>Insulin Days Supply Calculators</h2>

        <ul style={{ paddingLeft: 20 }}>
          <li>
            <Link href="/tresiba-days-supply-calculator">
              Tresiba Days Supply Calculator
            </Link>
          </li>

          <li>
            <Link href="/humalog-days-supply-calculator">
              Humalog Days Supply Calculator
            </Link>
          </li>

          <li>
            <Link href="/novolog-days-supply-calculator">
              NovoLog Days Supply Calculator
            </Link>
          </li>

          <li>
            <Link href="/lantus-days-supply-calculator">
              Lantus Days Supply Calculator
            </Link>
          </li>

          <li>
            <Link href="/toujeo-days-supply-calculator">
              Toujeo Days Supply Calculator
            </Link>
          </li>

          <li>
            <Link href="/admelog-days-supply-calculator">
              Admelog Days Supply Calculator
            </Link>
          </li>
        </ul>
      </section>

      {/* Guides */}

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 10 }}>Days Supply Calculation Guides</h2>

        <ul style={{ paddingLeft: 20 }}>
          <li>
            <Link href="/how-to-calculate-insulin-days-supply">
              How to Calculate Insulin Days Supply
            </Link>
          </li>

          <li>
            <Link href="/how-to-calculate-eye-drop-days-supply">
              How to Calculate Eye Drop Days Supply
            </Link>
          </li>

          <li>
            <Link href="/how-to-calculate-timolol-eye-drop-days-supply">
              How to Calculate Timolol Eye Drop Days Supply
            </Link>
          </li>
        </ul>
      </section>

      {/* References */}

      <section>
        <h2 style={{ marginBottom: 10 }}>Pharmacy Reference Tools</h2>

        <ul style={{ paddingLeft: 20 }}>
          <li>
            <Link href="/eye-drops-ndc-reference">Eye Drops NDC Reference</Link>
          </li>

          <li>
            <Link href="/insulin-expiration-chart">
              Insulin Expiration Chart
            </Link>
          </li>

          <li>
            <Link href="/insulin-priming-doses-chart">
              Insulin Priming Doses Chart
            </Link>
          </li>
        </ul>
      </section>

      <section style={{ marginTop: 32 }}>
        <p>
          These calculators and references are intended for professional
          pharmacy workflow support. Always verify directions, product labeling,
          and payer requirements when determining days supply.
        </p>
      </section>
    </main>
  );
}
