export type EyeDropSeoContent = {
  introExtra?: string;
  dosingConsiderations?: string[];
  commonScenarios?: Array<{
    title: string;
    dose: string;
    impact: string;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  relatedTerms?: string[];
};

export const eyeDropSeoContent: Record<string, EyeDropSeoContent> = {
  "atropine-sulfate-monohydrate": {
    introExtra:
      "Atropine ophthalmic products are often used for cycloplegia, uveitis-related care, and pediatric myopia control. Because dosing may be once daily or otherwise infrequent, atropine can produce longer estimated days supply than many other ophthalmic medications.",
    dosingConsiderations: [
      "Often prescribed once daily or at other low-frequency dosing schedules.",
      "May be used in one eye or both eyes depending on indication.",
      "Lower daily drop usage can produce longer days supply per bottle.",
      "Bottle size and pharmacy drop-per-mL assumptions materially affect billed days supply.",
    ],
    commonScenarios: [
      {
        title: "Pediatric myopia control",
        dose: "1 drop once daily",
        impact: "Usually produces a long estimated days supply.",
      },
      {
        title: "Cycloplegic use",
        dose: "1 drop in each eye once daily",
        impact:
          "Produces a moderate-to-long days supply depending on bottle size.",
      },
      {
        title: "Inflammatory eye use",
        dose: "Multiple drops per day",
        impact: "Shortens the estimated days supply.",
      },
    ],
    faq: [
      {
        question:
          "Why is atropine days supply often longer than other eye drops?",
        answer:
          "Atropine is commonly used at lower daily dosing frequencies, so total daily drop use may be lower than with glaucoma drops or ophthalmic antibiotics.",
      },
      {
        question:
          "What should pharmacists verify before billing atropine eye drops?",
        answer:
          "Pharmacists should verify bottle size, one-eye versus both-eyes use, frequency, and the drop-per-mL standard used in their workflow.",
      },
      {
        question: "Can atropine days supply vary a lot by indication?",
        answer:
          "Yes. Different indications may use atropine once daily or more frequently, which can significantly change the total daily drops used.",
      },
    ],
    relatedTerms: [
      "cycloplegia",
      "myopia control",
      "ophthalmic bottle size",
      "drops per mL",
    ],
  },

  "tetrahydrozoline-hydrochloride": {
    introExtra:
      "Tetrahydrozoline eye drops are commonly used for temporary redness relief. Because these products are often used on an as-needed basis rather than on a fixed long-term schedule, pharmacists should carefully interpret the prescribed frequency when estimating days supply.",
    dosingConsiderations: [
      "Usage may be scheduled or as needed.",
      "As-needed directions can make days supply estimation less straightforward.",
      "One-eye versus both-eyes use changes total daily drop count.",
      "Small differences in assumed daily use can significantly affect billed days supply.",
    ],
    commonScenarios: [
      {
        title: "PRN redness relief",
        dose: "1–2 drops up to several times daily",
        impact:
          "Days supply may vary widely depending on actual use assumptions.",
      },
    ],
    faq: [
      {
        question: "Why is tetrahydrozoline days supply less predictable?",
        answer:
          "Because use may be as needed rather than fixed, estimated daily drop usage can vary more than with chronic scheduled ophthalmic therapies.",
      },
    ],
  },

  "proparacaine-hydrochloride": {
    introExtra:
      "Proparacaine is an ophthalmic anesthetic generally used in procedural or in-office settings rather than as a routine long-duration outpatient maintenance therapy. When evaluating package information and ophthalmic workflow, pharmacists should consider the specific intended use context.",
    dosingConsiderations: [
      "Often associated with procedural or short-duration ophthalmic use.",
      "Not typically used like chronic glaucoma or allergy drops.",
      "Workflow assumptions should reflect actual intended administration frequency.",
    ],
    faq: [
      {
        question:
          "Why is proparacaine different from routine maintenance eye drops?",
        answer:
          "It is typically associated with short-duration ophthalmic anesthetic use rather than chronic self-administered outpatient therapy.",
      },
    ],
  },

  "timolol-maleate": {
    introExtra:
      "Timolol ophthalmic products are commonly used in glaucoma workflows and are often prescribed on a scheduled daily regimen, so one-eye versus both-eyes directions can significantly affect days supply.",
    dosingConsiderations: [
      "Confirm once-daily versus twice-daily directions.",
      "Both-eyes use doubles daily drop count compared with one-eye use.",
      "Scheduled dosing usually makes days supply more predictable.",
      "Bottle size and drops-per-mL assumptions should match pharmacy workflow.",
    ],
    commonScenarios: [
      {
        title: "Glaucoma maintenance therapy",
        dose: "1 drop once or twice daily",
        impact:
          "Days supply depends heavily on whether one eye or both eyes are treated.",
      },
    ],
    faq: [
      {
        question: "Why does timolol eye selection matter for days supply?",
        answer:
          "Using timolol in both eyes doubles the daily drop count compared with one-eye directions, which can cut the calculated days supply in half.",
      },
    ],
    relatedTerms: ["glaucoma", "scheduled dosing", "both eyes", "drops per mL"],
  },

  latanoprost: {
    introExtra:
      "Latanoprost is commonly dosed once daily, often in the evening, so small bottle sizes may still produce a relatively long calculated days supply.",
    dosingConsiderations: [
      "Often dosed once daily.",
      "Confirm whether directions are for one eye or both eyes.",
      "Small bottles can still last several weeks depending on daily use.",
      "Use the pharmacy’s standard drops-per-mL assumption consistently.",
    ],
    commonScenarios: [
      {
        title: "Glaucoma maintenance therapy",
        dose: "1 drop in affected eye(s) once daily in the evening",
        impact:
          "Once-daily dosing often creates a longer days supply than twice-daily medications.",
      },
    ],
    faq: [
      {
        question: "Why can latanoprost days supply be relatively long?",
        answer:
          "Because latanoprost is commonly dosed once daily, total daily drop use may be low compared with medications used multiple times per day.",
      },
    ],
    relatedTerms: ["glaucoma", "once daily", "evening dosing", "drops per mL"],
  },
};
