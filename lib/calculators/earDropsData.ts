// lib/calculators/earDropsData.ts

export const DEFAULT_DROPS_PER_ML = 20;

export type EarDropProduct = {
  ndc11: string;
  brand: string;
  activeIngredients: string[];
  volumeMl: number;
  dropsPerMlDefault: number;
  suggestedDurationDays?: number | null;
};

export const earDropProducts: EarDropProduct[] = [
  // Neomycin/Polymyxin B/Hydrocortisone 10 mL
  {
    ndc11: "24208041005",
    brand: "Neomycin/Polymyxin B/Hydrocortisone Otic",
    activeIngredients: [
      "Neomycin sulfate",
      "Polymyxin B sulfate",
      "Hydrocortisone",
    ],
    volumeMl: 10,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  // Ofloxacin 0.3% – 5 mL
  {
    ndc11: "51672300701",
    brand: "Ofloxacin Otic 0.3%",
    activeIngredients: ["Ofloxacin 0.3%"],
    volumeMl: 5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  // Ofloxacin 0.3% – 10 mL
  {
    ndc11: "70752015920",
    brand: "Ofloxacin Otic 0.3%",
    activeIngredients: ["Ofloxacin 0.3%"],
    volumeMl: 10,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  // Ciprofloxacin/Dexamethasone 7.5 mL
  {
    ndc11: "63481052910",
    brand: "Ciprofloxacin/Dexamethasone Otic",
    activeIngredients: ["Ciprofloxacin 0.3%", "Dexamethasone 0.1%"],
    volumeMl: 7.5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  // Ciprofloxacin 0.2% – 14 mL
  {
    ndc11: "70756061030",
    brand: "Ciprofloxacin Otic 0.2%",
    activeIngredients: ["Ciprofloxacin 0.2%"],
    volumeMl: 14,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  // Acetic Acid 2% – 15 mL
  {
    ndc11: "16714062801",
    brand: "Acetic Acid 2% Otic",
    activeIngredients: ["Acetic acid 2%"],
    volumeMl: 15,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  // Hydrocortisone/Acetic Acid – 10 mL
  {
    ndc11: "66758008770",
    brand: "Hydrocortisone/Acetic Acid Otic",
    activeIngredients: ["Hydrocortisone", "Acetic acid"],
    volumeMl: 10,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  // Cortisporin Otic Suspension – 10 mL
  {
    ndc11: "00781618667",
    brand: "Cortisporin Otic Suspension",
    activeIngredients: [
      "Neomycin sulfate",
      "Polymyxin B sulfate",
      "Hydrocortisone",
    ],
    volumeMl: 10,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },
];
