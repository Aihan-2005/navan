export const writingAnalysisMock = [
  {
    id: "writing-1",

    overallScore: 86,

    grammar: {
      label: "Grammar",
      score: 88,
      detail: "استفاده از زمان‌ها و ساختارهای گرامری مناسب است.",
    },

    vocabulary: {
      label: "Vocabulary",
      score: 82,
      detail: "تنوع واژگان خوب است اما هنوز جای بهبود دارد.",
    },

    coherence: {
      label: "Coherence",
      score: 90,
      detail: "ارتباط منطقی بین پاراگراف‌ها حفظ شده است.",
    },

    clarity: {
      label: "Clarity",
      score: 84,
      detail: "متن قابل فهم است اما برخی جملات طولانی هستند.",
    },

    tone: {
      label: "Tone",
      score: 83,
      detail: "لحن متن با هدف نوشته همخوانی دارد.",
    },

    highlightedMistakes: [
      "I go to school yesterday",
    ],

    issues: [
      {
        id: "issue-1",
        title: "اشتباه در زمان فعل",
        description:
          "برای اتفاقات گذشته باید از زمان گذشته استفاده شود.",
        severity: "متوسط",
        suggestion: "I went to school yesterday",
      },
    ],

    repeatedWords: [
      "good",
      "important",
    ],

    betterVocabulary: [
      "excellent",
      "valuable",
      "significant",
    ],

    rewrittenVersion:
      "Yesterday I went to school and had an excellent experience.",

    nextPractice:
      "یک خاطره کوتاه درباره یک اتفاق مهم در گذشته بنویس.",
  },
];