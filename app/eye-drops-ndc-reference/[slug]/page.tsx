import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getEyeDropDrugBySlug,
  getEyeDropDrugGroups,
  getEyeDropGuideHref,
} from "@/lib/fdaNdc";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const groups = await getEyeDropDrugGroups();

  return groups.map((group) => ({
    slug: group.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const group = await getEyeDropDrugBySlug(slug);

  if (!group) {
    return {
      title: "Eye Drops NDC Reference",
    };
  }

  const title = `${group.genericName} Eye Drops NDC Reference | Ophthalmic Product Guide`;
  const description = `NDC reference for ${group.genericName} ophthalmic products including package NDCs, package descriptions, brand names, and labelers.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.insulinprimingdayssupply.com/eye-drops-ndc-reference/${group.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.insulinprimingdayssupply.com/eye-drops-ndc-reference/${group.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EyeDropDrugPage({ params }: Props) {
  const { slug } = await params;
  const group = await getEyeDropDrugBySlug(slug);

  if (!group) {
    notFound();
  }

  const guideHref = getEyeDropGuideHref(group.genericName);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${group.genericName} Eye Drops NDC Reference`,
    url: `https://www.insulinprimingdayssupply.com/eye-drops-ndc-reference/${group.slug}`,
    description: `Reference page for ${group.genericName} ophthalmic products using public FDA NDC data.`,
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Pharmacist",
    },
    about: {
      "@type": "MedicalEntity",
      name: group.genericName,
    },
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="mb-4 text-sm text-slate-600">
        <Link
          href="/eye-drops-ndc-reference"
          className="text-cyan-700 underline underline-offset-4"
        >
          Eye Drops NDC Reference
        </Link>{" "}
        / {group.genericName}
      </p>

      <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
        {group.genericName} Eye Drops NDC Reference
      </h1>

      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
        This page lists public FDA NDC reference data for{" "}
        <strong>{group.genericName}</strong> ophthalmic products, including
        package NDCs, package descriptions, and labelers.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={guideHref}
          className="inline-flex items-center rounded-xl bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700"
        >
          {group.genericName} Days Supply Guide
        </Link>

        <Link
          href="/how-to-calculate-eye-drop-days-supply"
          className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          General Eye Drop Guide
        </Link>
      </div>

      {group.brandNames.length > 0 && (
        <section className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-xl font-semibold text-slate-900">Brand names</h2>
          <p className="mt-3 text-slate-700">{group.brandNames.join(", ")}</p>
        </section>
      )}

      <section className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full border-collapse">
          <caption className="sr-only">
            {group.genericName} ophthalmic package NDC table
          </caption>
          <thead className="bg-slate-50">
            <tr>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                Package NDC
              </th>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                Brand
              </th>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                Package
              </th>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                Labeler
              </th>
              <th className="border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-900">
                Guide
              </th>
            </tr>
          </thead>
          <tbody>
            {group.items.map((item) => (
              <tr
                key={
                  item.packageNdc ||
                  `${group.slug}-${item.packageDescription}-${item.brandName}`
                }
              >
                <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                  {item.packageNdc || "—"}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                  {item.brandName || "—"}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                  {item.packageDescription || "—"}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                  {item.labelerName || "—"}
                </td>
                <td className="border-b border-slate-100 px-4 py-3 text-sm text-slate-700">
                  <Link
                    href={guideHref}
                    className="font-medium text-cyan-700 underline underline-offset-4"
                  >
                    Guide
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Related pharmacy pages
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/eye-drops-ndc-reference"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            All Eye Drops NDCs
          </Link>

          <Link
            href={guideHref}
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            {group.genericName} Days Supply Guide
          </Link>

          <Link
            href="/how-to-calculate-eye-drop-days-supply"
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            General Eye Drop Guide
          </Link>
        </div>
      </section>
    </main>
  );
}
