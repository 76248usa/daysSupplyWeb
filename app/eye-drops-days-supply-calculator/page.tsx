import type { Metadata } from "next";
import EyeDropsCalculatorClient from "./EyeDropsCalculatorClient";

export const metadata: Metadata = {
  title: "Eye Drops Days Supply Calculator | Pharmacist Guide",
  description:
    "Calculate eye drop days supply using bottle size, drops per mL, dosing frequency, and one-eye or both-eyes directions.",
  alternates: {
    canonical:
      "https://www.insulinprimingdayssupply.com/eye-drops-days-supply-calculator",
  },
  openGraph: {
    title: "Eye Drops Days Supply Calculator | Pharmacist Guide",
    description:
      "Calculate eye drop days supply using bottle size, drops per mL, dosing frequency, and one-eye or both-eyes directions.",
    url: "https://www.insulinprimingdayssupply.com/eye-drops-days-supply-calculator",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eye Drops Days Supply Calculator | Pharmacist Guide",
    description:
      "Calculate eye drop days supply using bottle size, drops per mL, dosing frequency, and one-eye or both-eyes directions.",
  },
};

export default function EyeDropsDaysSupplyCalculatorPage() {
  return <EyeDropsCalculatorClient />;
}
