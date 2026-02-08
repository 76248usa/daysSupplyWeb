import { medicineData, type Medicine } from "@/lib/medicineData";
import DetailsClient from "./DetailsClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DetailsPage({ params }: PageProps) {
  const { id } = await params;

  const medicine: Medicine | null =
    medicineData.find((m) => {
      if (String(m.id) === id) return true;

      const cleanNdc = String(m.ndc ?? "").replace(/^NDC:\s*/i, "");
      return cleanNdc === id;
    }) ?? null;

  if (!medicine) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
        <h1 className="text-xl font-bold">Medication not found</h1>
        <p className="text-slate-400 mt-2">
          ID: <span className="font-mono">{id}</span>
        </p>
      </div>
    );
  }

  return <DetailsClient medicine={medicine} />;
}
