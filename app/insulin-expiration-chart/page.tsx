import type { Metadata } from "next";
import Link from "next/link";
import { medicineData } from "@/lib/medicineData";

export const metadata: Metadata = {
  title: "Insulin Expiration Chart (After Opening) | Pharmacist Reference",
  description:
    "Reference chart showing in-use insulin expiration after opening for common insulin pens and vials used in pharmacy practice.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/insulin-expiration-chart",
  },
  openGraph: {
    title: "Insulin Expiration Chart (After Opening)",
    description:
      "Reference chart showing in-use insulin expiration after opening for common insulin pens and vials.",
    url: "https://www.insulinprimingdayssupply.com/insulin-expiration-chart",
    siteName: "Insulin Days' Supply",
    type: "website",
  },
};

type ExpirationItem = {
  key: string;
  displayName: string;
  expire: number;
  seoSlug?: string;
  medicineId?: number;
  details: string[];
};

function normalizeDisplayName(name: string) {
  return name.replace(/®|™/g, "").replace(/\s+/g, " ").trim();
}

function buildExpirationRows(): ExpirationItem[] {
  const withExpire = medicineData.filter(
    (m) => typeof m.expire === "number" && m.expire > 0,
  );

  const map = new Map<string, ExpirationItem>();

  for (const med of withExpire) {
    const displayName = normalizeDisplayName(med.name);
    const key = `${displayName}__${med.expire}`;

    const detailParts = [
      med.addToName,
      typeof med.prime === "number" ? `${med.prime} unit priming dose` : null,
      med.unitsInPen ? `${med.unitsInPen} units/container` : null,
      med.pensAmount ? `${med.pensAmount} pens/cartridges per box` : null,
    ].filter(Boolean) as string[];

    if (!map.has(key)) {
      map.set(key, {
        key,
        displayName,
        expire: med.expire!,
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

export default function InsulinExpirationChartPage() {
  const rows = buildExpirationRows();

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: "Insulin Expiration Chart (After Opening)",
    url: "https://www.insulinprimingdayssupply.com/insulin-expiration-chart",
    description:
      "Reference chart showing in-use insulin expiration after opening for common insulin pens and vials used in pharmacy practice.",
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
        / <span>Insulin Expiration Chart</span>
      </p>

      <h1
        style={{
          fontSize: "2rem",
          lineHeight: 1.2,
          marginBottom: 12,
        }}
      >
        Insulin Expiration Chart (After Opening)
      </h1>

      <p
        style={{
          fontSize: "1.05rem",
          background: "#f8fafc",
          border: "1px solid #e5e7eb",
          padding: "14px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <strong>In-use insulin expiration</strong> is the number of days an
        insulin product remains usable after opening or first use. Many common
        insulin products expire after <strong>28 days</strong>, while some such
        as <strong>Tresiba</strong> and <strong>Toujeo</strong> remain usable
        for <strong>56 days</strong>. Always verify product-specific in-use
        stability before dispensing or calculating days supply.
      </p>

      <p style={{ fontSize: "1.05rem", marginBottom: 12 }}>
        This reference chart shows in-use expiration after opening for common
        insulin pens and vials. It is designed to help pharmacists and pharmacy
        technicians quickly review product stability that may affect patient
        counseling, refill timing, and days supply calculations.
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
        <h2 style={{ marginBottom: 12 }}>Insulin expiration reference table</h2>

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
                  In-Use Expiration (Days)
                </th>
                <th
                  style={{ padding: "12px", borderBottom: "1px solid #e5e7eb" }}
                >
                  Details
                </th>
                <th
                  style={{ padding: "12px", borderBottom: "1px solid #e5e7eb" }}
                >
                  Calculate Days Supply
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
                    {row.expire} days
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
        <h2 style={{ marginBottom: 12 }}>Why expiration matters</h2>

        <p>
          Once opened or put into use, insulin products have specific stability
          limits. Using the correct in-use expiration helps support safe patient
          counseling and accurate dispensing decisions.
        </p>

        <p>
          For pharmacists, in-use expiration can affect refill timing, product
          waste, and practical days supply calculations, especially when pen
          products are opened but not fully used.
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
            <Link href="/insulin-priming-doses-chart">
              Insulin Priming Doses Chart
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
        </ul>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 12 }}>Frequently Asked Questions</h2>

        <h3>What is in-use insulin expiration?</h3>
        <p>
          In-use insulin expiration is the number of days an insulin product
          remains usable after opening or first use.
        </p>

        <h3>Do all insulin pens expire after 28 days?</h3>
        <p>
          No. Many do, but some products have different in-use expiration
          periods, such as 10, 14, 31, 42, or 56 days depending on the product.
        </p>

        <h3>Does insulin expiration affect days supply?</h3>
        <p>
          Yes. Even if insulin remains in the pen or vial, the product may no
          longer be considered usable after its in-use expiration period.
        </p>
      </section>

      <section>
        <h2 style={{ marginBottom: 12 }}>Important note</h2>
        <p>
          Always use professional judgment and follow product labeling, payer
          requirements, and store workflow requirements when determining billed
          days supply or counseling on insulin stability.
        </p>
      </section>
    </main>
  );
}
