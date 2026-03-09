import type { Metadata } from "next";
import Link from "next/link";
import { medicineData } from "@/lib/medicineData";

export const metadata: Metadata = {
  title: "Insulin Priming Doses Chart | Pharmacist Reference",
  description:
    "Reference chart showing priming doses for common insulin pens and related products used in pharmacy practice.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/insulin-priming-doses-chart",
  },
  openGraph: {
    title: "Insulin Priming Doses Chart",
    description:
      "Reference chart showing priming doses for common insulin pens and related products.",
    url: "https://www.insulinprimingdayssupply.com/insulin-priming-doses-chart",
    siteName: "Insulin Days' Supply",
    type: "website",
  },
};

type PrimingItem = {
  key: string;
  displayName: string;
  prime: number;
  seoSlug?: string;
  medicineId?: number;
  details: string[];
};

function normalizeDisplayName(name: string) {
  return name.replace(/®|™/g, "").replace(/\s+/g, " ").trim();
}

function buildPrimingRows(): PrimingItem[] {
  const withPrime = medicineData.filter(
    (m) => typeof m.prime === "number" && m.prime > 0,
  );

  const map = new Map<string, PrimingItem>();

  for (const med of withPrime) {
    const displayName = normalizeDisplayName(med.name);
    const key = `${displayName}__${med.prime}`;

    const detailParts = [
      med.addToName,
      med.unitsInPen ? `${med.unitsInPen} units/container` : null,
      med.pensAmount ? `${med.pensAmount} pens/cartridges per box` : null,
      med.expire ? `${med.expire} day in-use expiration` : null,
    ].filter(Boolean) as string[];

    if (!map.has(key)) {
      map.set(key, {
        key,
        displayName,
        prime: med.prime!,
        seoSlug: med.seoSlug,
        medicineId: med.id,
        details: detailParts.length ? [detailParts.join(" • ")] : [],
      });
    } else {
      const existing = map.get(key)!;
      const detail = detailParts.join(" • ");
      if (detail && !existing.details.includes(detail)) {
        existing.details.push(detail);
      }
      if (!existing.seoSlug && med.seoSlug) {
        existing.seoSlug = med.seoSlug;
      }
      if (!existing.medicineId) {
        existing.medicineId = med.id;
      }
    }
  }

  return Array.from(map.values()).sort((a, b) =>
    a.displayName.localeCompare(b.displayName),
  );
}

export default function InsulinPrimingDosesChartPage() {
  const rows = buildPrimingRows();

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Insulin Priming Doses Chart",
    url: "https://www.insulinprimingdayssupply.com/insulin-priming-doses-chart",
    description:
      "Reference chart showing priming doses for common insulin pens and related products used in pharmacy practice.",
    medicalAudience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacists",
    },
    about: {
      "@type": "DrugClass",
      name: "Insulin",
    },
  };

  return (
    <main
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: "24px 20px 56px",
        lineHeight: 1.65,
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <p style={{ marginBottom: 12 }}>
        <Link href="/">Home</Link> /{" "}
        <Link href="/insulin-days-supply-calculator">
          Insulin Days Supply Calculator
        </Link>{" "}
        / <span>Insulin Priming Doses Chart</span>
      </p>
      <h1
        style={{
          fontSize: "2rem",
          lineHeight: 1.2,
          marginBottom: 12,
        }}
      >
        Insulin Priming Doses Chart
      </h1>
      <section
        style={{
          marginBottom: 32,
          padding: 16,
          borderRadius: 10,
          background: "#f8fafc",
          border: "1px solid #e5e7eb",
        }}
      >
        <h2 style={{ marginTop: 0, marginBottom: 12 }}>Quick answer</h2>
        <p style={{ margin: 0 }}>
          Most common insulin pen priming doses are <strong>2 units</strong>,
          while some products such as <strong>Toujeo SoloStar</strong> use{" "}
          <strong>3 units</strong> and <strong>Humulin R U-500 KwikPen</strong>{" "}
          uses <strong>5 units</strong>. Always verify product-specific priming
          before calculating billed days supply.
        </p>
      </section>
      Why this helps: gives Google a short, direct answer improves
      featured-snippet chances adds strong keyword relevance for: insulin
      priming dose insulin pen priming units Toujeo priming dose U-500 priming
      dose Two very good additions after that: Add one FAQ block near the
      bottom:
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Frequently Asked Questions</h2>

        <h3>What is the usual insulin pen priming dose?</h3>
        <p>
          Many insulin pens use a 2-unit priming dose, but some products use a
          different amount.
        </p>

        <h3>Does priming affect days supply?</h3>
        <p>
          Yes. Priming uses insulin that is not part of the therapeutic dose, so
          it can reduce the effective insulin available for patient use.
        </p>
      </section>
      And add matching FAQ schema to that page later. The next strongest move is
      adding an insulin expiration chart page beside the priming chart.
      <p style={{ fontSize: "1.05rem", marginBottom: 12 }}>
        This reference chart shows priming doses for common insulin pens and
        related products. It is designed to help pharmacists and pharmacy
        technicians quickly review priming amounts that may affect effective
        insulin available for dosing and days supply calculations.
      </p>
      <p style={{ marginBottom: 24 }}>
        Need to calculate insulin days supply? Use the{" "}
        <Link href="/insulin-days-supply-calculator">
          insulin days supply calculator
        </Link>
        .
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
          Open Main Calculator
        </Link>
      </div>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Priming dose reference table</h2>

        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #e5e7eb",
            }}
          >
            <thead>
              <tr style={{ background: "#f8fafc", textAlign: "left" }}>
                <th
                  style={{ padding: "12px", borderBottom: "1px solid #e5e7eb" }}
                >
                  Insulin / Product
                </th>
                <th
                  style={{ padding: "12px", borderBottom: "1px solid #e5e7eb" }}
                >
                  Priming Dose
                </th>
                <th
                  style={{ padding: "12px", borderBottom: "1px solid #e5e7eb" }}
                >
                  Details
                </th>
                <th
                  style={{ padding: "12px", borderBottom: "1px solid #e5e7eb" }}
                >
                  Calculator
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #e5e7eb",
                      verticalAlign: "top",
                    }}
                  >
                    {row.displayName}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #e5e7eb",
                      verticalAlign: "top",
                      fontWeight: 700,
                    }}
                  >
                    {row.prime} unit{row.prime === 1 ? "" : "s"}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #e5e7eb",
                      verticalAlign: "top",
                    }}
                  >
                    {row.details.length ? (
                      <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {row.details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid #e5e7eb",
                      verticalAlign: "top",
                    }}
                  >
                    {/* {row.seoSlug ? (
                      <Link href={`/${row.seoSlug}`}>View calculator page</Link>
                    ) : row.medicineId ? (
                      <Link href={`/app/medicine/${row.medicineId}`}>
                        Open calculator
                      </Link>
                    ) : (
                      "—"
                    )} */}

                    {row.seoSlug ? (
                      <Link
                        href={`/${row.seoSlug}`}
                        style={{
                          display: "inline-block",
                          padding: "8px 14px",
                          borderRadius: 8,
                          background: "#2563eb",
                          color: "#ffffff",
                          textDecoration: "none",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}
                      >
                        Open Calculator
                      </Link>
                    ) : row.medicineId ? (
                      <Link
                        href={`/app/medicine/${row.medicineId}`}
                        style={{
                          display: "inline-block",
                          padding: "8px 14px",
                          borderRadius: 8,
                          background: "#2563eb",
                          color: "#ffffff",
                          textDecoration: "none",
                          fontWeight: 600,
                          fontSize: "0.9rem",
                        }}
                      >
                        Open Calculator
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Why priming matters</h2>

        <p>
          Priming removes air from insulin pens before injection and helps
          ensure accurate dose delivery. However, those priming units are not
          part of the therapeutic dose. Repeated priming can reduce the
          effective insulin available for patient use.
        </p>

        <p>
          For pharmacists, this can affect insulin days supply calculations,
          refill timing, and documentation during billing or audit review.
        </p>
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Related tools</h2>

        <ul style={{ paddingLeft: 20, margin: 0 }}>
          <li>
            <Link href="/insulin-days-supply-calculator">
              Insulin Days Supply Calculator
            </Link>
          </li>
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
            <Link href="/toujeo-days-supply-calculator">
              Toujeo Days Supply Calculator
            </Link>
          </li>
        </ul>
      </section>
      <section>
        <h2 style={{ marginBottom: 12 }}>Important note</h2>
        <p>
          Always use professional judgment and follow product labeling, payer
          requirements, and store workflow requirements when determining billed
          days supply.
        </p>
      </section>
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Frequently Asked Questions</h2>

        <h3>What is the usual insulin pen priming dose?</h3>
        <p>
          Many insulin pens use a 2-unit priming dose, but some products use a
          different amount.
        </p>

        <h3>Does priming affect days supply?</h3>
        <p>
          Yes. Priming uses insulin that is not part of the therapeutic dose, so
          it can reduce the effective insulin available for patient use.
        </p>
      </section>
    </main>
  );
}
