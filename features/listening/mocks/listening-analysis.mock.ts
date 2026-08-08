import type {
  ListeningAttemptAnalysis,
} from "../types/listening.types";

export const listeningAnalysisMock = [
  {
    attemptId:
      "attempt-airport-check-in-001",

    contentId:
      "airport-check-in-conversation",

    contentTitle:
      "گفت‌وگو در فرودگاه",

    practiceMode:
      "full_dictation",

    status: "completed",

    submittedTranscript:
      "Good morning. Can I see your passport and ticket please? I have one luggage. I would like window seat if possible. Your flight leave at ten thirty from gate twelve.",

    referenceTranscript:
      "Good morning. May I see your passport and ticket, please? I have one piece of luggage. I would like a window seat if possible. Your flight leaves at ten thirty from gate twelve.",

    score: {
      overall: 82,
      wordAccuracy: 84,
      sequenceAccuracy: 89,
      spellingAccuracy: 92,
    },

    comparison: [
      {
        id:
          "airport-analysis-segment-1",

        kind: "match",

        expected:
          "Good morning.",

        actual:
          "Good morning.",
      },

      {
        id:
          "airport-analysis-segment-2",

        kind: "substitution",

        expected:
          "May I see your passport and ticket, please?",

        actual:
          "Can I see your passport and ticket please?",
      },

      {
        id:
          "airport-analysis-segment-3",

        kind: "substitution",

        expected:
          "I have one piece of luggage.",

        actual:
          "I have one luggage.",
      },

      {
        id:
          "airport-analysis-segment-4",

        kind: "omission",

        expected:
          "a window seat",

        actual:
          "window seat",
      },

      {
        id:
          "airport-analysis-segment-5",

        kind: "substitution",

        expected:
          "Your flight leaves at ten thirty from gate twelve.",

        actual:
          "Your flight leave at ten thirty from gate twelve.",
      },
    ],

    feedback: {
      summary:
        "درک کلی مکالمه بسیار خوب بوده است. بیشتر اطلاعات مهم مانند گذرنامه، چمدان، نوع صندلی، ساعت و شماره گیت به‌درستی شنیده شده‌اند. خطاهای اصلی مربوط به کلمات کوتاه و ساختارهای طبیعی مکالمه هستند.",

      strengths: [
        "اطلاعات عددی و زمان پرواز را دقیق شنیدی.",
        "واژگان اصلی مربوط به فرودگاه را تشخیص دادی.",
        "ترتیب کلی مکالمه را درست حفظ کردی.",
      ],

      priorities: [
        "به articleهایی مانند a و the بیشتر توجه کن.",
        "عبارت piece of luggage را به‌صورت یک Chunk تمرین کن.",
        "در شنیدن سوم‌شخص مفرد و صدای پایانی s تمرکز بیشتری داشته باش.",
      ],
    },

    createdAt:
      "2026-08-01T17:20:00.000Z",

    completedAt:
      "2026-08-01T17:32:00.000Z",
  },

  {
    attemptId:
      "attempt-technology-news-001",

    contentId:
      "technology-news-brief",

    contentTitle:
      "خبر کوتاه فناوری",

    practiceMode:
      "guided_dictation",

    status: "completed",

    submittedTranscript:
      "The company announced a new research program. Researchers say the technology could help developers work faster.",

    referenceTranscript:
      "The company announced a new research program. Researchers say the technology could help software developers work faster.",

    score: {
      overall: 77,
      wordAccuracy: 78,
      sequenceAccuracy: 91,
      spellingAccuracy: 96,
    },

    comparison: [
      {
        id:
          "technology-analysis-segment-1",

        kind: "match",

        expected:
          "The company announced a new research program.",

        actual:
          "The company announced a new research program.",
      },

      {
        id:
          "technology-analysis-segment-2",

        kind: "omission",

        expected:
          "software developers",

        actual:
          "developers",
      },

      {
        id:
          "technology-analysis-segment-3",

        kind: "match",

        expected:
          "work faster",

        actual:
          "work faster",
      },
    ],

    feedback: {
      summary:
        "ایده اصلی خبر را خوب درک کردی، اما یک واژه کلیدی در عبارت software developers حذف شده است.",

      strengths: [
        "ساختار کلی خبر را درست شنیدی.",
        "کلمات research و technology را دقیق ثبت کردی.",
      ],

      priorities: [
        "روی شنیدن Compound Nounها تمرکز کن.",
        "هنگام شنیدن اخبار، اسم‌ها و صفت‌های قبل از اسم را جداگانه بررسی کن.",
      ],
    },

    createdAt:
      "2026-07-29T13:00:00.000Z",

    completedAt:
      "2026-07-29T13:10:00.000Z",
  },
] satisfies readonly ListeningAttemptAnalysis[];