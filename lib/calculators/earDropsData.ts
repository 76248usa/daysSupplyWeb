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
  {
    ndc11: "51672300701",
    brand: "Ofloxacin Otic 0.3%",
    activeIngredients: ["Ofloxacin 0.3%"],
    volumeMl: 5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },
  {
    ndc11: "63481052910",
    brand: "Ciprofloxacin/Dexamethasone Otic",
    activeIngredients: ["Ciprofloxacin 0.3%", "Dexamethasone 0.1%"],
    volumeMl: 7.5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },
  {
    ndc11: "16714062801",
    brand: "Acetic Acid 2% Otic",
    activeIngredients: ["Acetic acid 2%"],
    volumeMl: 15,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },
  {
    ndc11: "66758008770",
    brand: "Hydrocortisone/Acetic Acid Otic",
    activeIngredients: ["Hydrocortisone", "Acetic acid"],
    volumeMl: 10,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },
  {
    ndc11: "42195055014",
    brand: "Ofloxacin Otic 0.3%",
    activeIngredients: ["Ofloxacin 0.3%"],
    volumeMl: 5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  {
    ndc11: "69238161503",
    brand: "Ciprofloxacin/Dexamethasone Otic",
    activeIngredients: ["Ciprofloxacin 0.3%", "Dexamethasone 0.1%"],
    volumeMl: 7.5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  {
    ndc11: "64980032920",
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

  {
    ndc11: "72603018602",
    brand: "Ciprofloxacin/Dexamethasone Otic",
    activeIngredients: ["Ciprofloxacin 0.3%", "Dexamethasone 0.1%"],
    volumeMl: 7.5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  {
    ndc11: "69238161606",
    brand: "Ciprofloxacin/Dexamethasone Otic",
    activeIngredients: ["Ciprofloxacin 0.3%", "Dexamethasone 0.1%"],
    volumeMl: 7.5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

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

  {
    ndc11: "72603018601",
    brand: "Ciprofloxacin/Dexamethasone Otic",
    activeIngredients: ["Ciprofloxacin 0.3%", "Dexamethasone 0.1%"],
    volumeMl: 7.5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  {
    ndc11: "24208063562",
    brand: "Acetic Acid 2% Otic",
    activeIngredients: ["Acetic acid 2%"],
    volumeMl: 15,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },
  {
    ndc11: "66992045014",
    brand: "Ofloxacin Otic 0.3%",
    activeIngredients: ["Ofloxacin 0.3%"],
    volumeMl: 5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  {
    ndc11: "60505036301",
    brand: "Ciprofloxacin/Dexamethasone Otic",
    activeIngredients: ["Ciprofloxacin 0.3%", "Dexamethasone 0.1%"],
    volumeMl: 7.5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  {
    ndc11: "69315032005",
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

  {
    ndc11: "65145014301",
    brand: "Acetic Acid 2% Otic",
    activeIngredients: ["Acetic acid 2%"],
    volumeMl: 15,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  {
    ndc11: "64950038114",
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

  {
    ndc11: "70756061030",
    brand: "Ciprofloxacin Otic 0.2%",
    activeIngredients: ["Ciprofloxacin 0.2%"],
    volumeMl: 14,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  {
    ndc11: "00832143075",
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

  {
    ndc11: "65145014401",
    brand: "Hydrocortisone/Acetic Acid Otic",
    activeIngredients: ["Hydrocortisone", "Acetic acid"],
    volumeMl: 10,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },
  {
    ndc11: "00713085109",
    brand: "Ofloxacin Otic 0.3%",
    activeIngredients: ["Ofloxacin 0.3%"],
    volumeMl: 5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  {
    ndc11: "69543045714",
    brand: "Ciprofloxacin/Dexamethasone Otic",
    activeIngredients: ["Ciprofloxacin 0.3%", "Dexamethasone 0.1%"],
    volumeMl: 7.5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  {
    ndc11: "64980043201",
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

  {
    ndc11: "70069068601",
    brand: "Ciprofloxacin Otic 0.2%",
    activeIngredients: ["Ciprofloxacin 0.2%"],
    volumeMl: 14,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  {
    ndc11: "70752015920",
    brand: "Ofloxacin Otic 0.3%",
    activeIngredients: ["Ofloxacin 0.3%"],
    volumeMl: 10,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  {
    ndc11: "71656006410",
    brand: "Ciprofloxacin/Dexamethasone Otic",
    activeIngredients: ["Ciprofloxacin 0.3%", "Dexamethasone 0.1%"],
    volumeMl: 7.5,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },

  {
    ndc11: "64980044810",
    brand: "Acetic Acid 2% Otic",
    activeIngredients: ["Acetic acid 2%"],
    volumeMl: 15,
    dropsPerMlDefault: DEFAULT_DROPS_PER_ML,
    suggestedDurationDays: 7,
  },
];
