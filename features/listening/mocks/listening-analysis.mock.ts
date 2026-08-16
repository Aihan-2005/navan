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

    status:
      "completed",

    engine:
      "mock",

    submittedTranscript:
      "Good morning. Can I see your passport and ticket please? I have one luggage. I would like window seat if possible. Your flight leave at ten thirty from gate twelve.",

    referenceTranscript:
      "Good morning. May I see your passport and ticket, please? I have one piece of luggage. I would like a window seat if possible. Your flight leaves at ten thirty from gate twelve.",

    score: {
      overall:
        82,

      wordAccuracy:
        84,

      sequenceAccuracy:
        89,

      spellingAccuracy:
        92,
    },

    comparison: [
      {
        id:
          "airport-analysis-segment-1",

        kind:
          "match",

        expected:
          "Good morning.",

        actual:
          "Good morning.",
      },

      {
        id:
          "airport-analysis-segment-2",

        kind:
          "substitution",

        expected:  "May I see your passport and ticket, please?",

        actual:
          "Can I see your passport and ticket please?",
      },

      {
        id:
          "airport-analysis-segment-3",

        kind:
          "substitution",

        expected:
          "I have one piece of luggage.",

        actual:
          "I have one luggage.",
      },

      {
        id:
          "airport-analysis-segment-4",

        kind:
          "omission",

        expected:
          "a window seat",

        actual:
          "window seat",
      },

      {
        id:
          "airport-analysis-segment-5",

        kind:
          "substitution",

        expected:
          "Your flight leaves at ten thirty from gate twelve.",

        actual:
          "Your flight leave at ten thirty from gate twelve.",
      },
    ],

    feedback: {
      summary:
        "درک کلی مکالمه بسیار خوب بوده است. بیشتر اطلاعات مهم مانند گذرنامه، چمدان، نوع صندلی، ساعت و شماره گیت به‌درستی شنیده شده‌اند. خطاهای اصلی مربوط به کلمات کوتاه، connected speech و نشانه‌های گرامری کم‌صداتر هستند.",

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

    skillProfile: {
      mainIdea:
        94,

      details:
        86,

      numbersAndNames:
        96,

      connectedSpeech:
        68,

      vocabularyInContext:
        84,

      inference:
        80,
    },

    errorPatterns: [
      {
        id:
          "airport-pattern-function-words",

        category:
          "function_words",

        severity:
          "medium",

        title:
          "کلمات کوتاه و کم‌استرس",

        description:
          "در چند بخش، articleها و کلمات کوتاه مثل a و may به‌خوبی شنیده نشده‌اند.",

        evidence: [
          "a window seat → window seat",
          "May I see → Can I see",
        ],

        recommendation:
          "در تمرین بعدی یک دور فقط روی کلمات کوتاه بین کلمات اصلی تمرکز کن.",
      },

      {
        id:
          "airport-pattern-connected-speech",

        category:
          "connected_speech",

        severity:
          "high",

        title:
          "شنیدن Chunk به‌جای تک‌کلمه",

        description:
          "عبارت piece of luggage به‌صورت یک واحد صوتی سریع شنیده می‌شود و بخشی از آن حذف شده است.",
  evidence: [
          "one piece of luggage → one luggage",
        ],

        recommendation:
          "عبارت را چند بار با سرعت ۰٫۷۵ و سپس سرعت طبیعی گوش بده.",
      },
    ],

    difficultSegments: [
      {
        id:
          "airport-difficult-1",

        startSecond:
          42,

        endSecond:
          48,

        transcript:
          "I have one piece of luggage.",

        focusPhrase:
          "piece of luggage",

        reasonFa:
          "اتصال piece of و کاهش صدای of باعث می‌شود مرز کلمات واضح نباشد.",

        tipFa:
          "ابتدا phrase را با سرعت پایین بشنو و بعد بدون توقف با سرعت طبیعی تکرار کن.",
      },

      {
        id:
          "airport-difficult-2",

        startSecond:
          121,

        endSecond:
          128,

        transcript:
          "Your flight leaves at ten thirty from gate twelve.",

        focusPhrase:
          "flight leaves",

        reasonFa:
          "صدای پایانی s در leaves کوتاه است و در سرعت مکالمه به‌راحتی از دست می‌رود.",

        tipFa:
          "روی پایان فعل‌ها تمرکز کن و contrast بین leave و leaves را جداگانه گوش بده.",
      }, ],

    missedWords: [
      {
        word:
          "piece",

        heardAs:
          null,

        meaningFa:
          "واحد / تکه؛ در عبارت piece of luggage",

        reasonFa:
          "داخل یک Chunk سریع قرار گرفته و استرس اصلی روی luggage بوده است.",
      },

      {
        word:
          "a",

        heardAs:
          null,

        meaningFa:
          "یک",

        reasonFa:
          "Article بدون استرس تلفظ شده و بین دو کلمه اصلی قرار گرفته است.",
      },

      {
        word:
          "leaves",

        heardAs:
          "leave",

        meaningFa:
          "حرکت می‌کند / ترک می‌کند",

        reasonFa:
          "صدای پایانی /z/ واضح تشخیص داده نشده است.",
      },
    ],

    vocabularyDiscoveries: [
      {
        word:
          "boarding pass",
            meaningFa:
          "کارت پرواز",

        phrase:
          "Here is your boarding pass.",

        noteFa:
          "یک Chunk رایج در فرودگاه است و بهتر است به‌صورت عبارت کامل یاد گرفته شود.",

        masteryStatus:
          "review",
      },

      {
        word:
          "piece of luggage",

        meaningFa:
          "یک تکه / واحد بار یا چمدان",

        phrase:
          "I have one piece of luggage.",

        noteFa:
          "luggage معمولاً غیرقابل‌شمارش است؛ برای شمارش از piece of استفاده می‌شود.",

        masteryStatus:
          "new",
      },
    ],

    actionPlan: [
      {
        id:
          "airport-plan-1",

        priority:
          1,

        title:
          "شنیدن دوباره بدون نوشتن",

        description:
          "فایل را یک بار کامل فقط برای ریتم و connected speech گوش بده.",

        durationMinutes:
          4,

        practiceMode:
          "listen_only",
      },

      {
        id:
          "airport-plan-2",

        priority:
          2,

        title:
          "Dictation بخش‌های دشوار",

        description:
          "فقط دو Segment دشوار را با سرعت ۰٫۷۵ رونویسی کن.",

        durationMinutes:
          6, practiceMode:
          "guided_dictation",
      },

      {
        id:
          "airport-plan-3",

        priority:
          3,

        title:
          "Shadowing عبارت‌های فرودگاه",

        description:
          "سه Chunk اصلی را همزمان با گوینده تکرار کن.",

        durationMinutes:
          5,

        practiceMode:
          "shadowing",
      },
    ],

    aiCoach: {
      headline:
        "درک مفهوم قوی است؛ شنیدن کلمات کم‌استرس نیاز به تمرین دارد.",

      diagnosis:
        "تو اطلاعات مهم و ساختار کلی مکالمه را خوب می‌گیری، اما وقتی گوینده چند کلمه را به هم متصل می‌کند یا article و endingها با استرس کم گفته می‌شوند، بخشی از سیگنال صوتی از دست می‌رود.",

      nextFocus:
        "Connected speech و function words",

      estimatedCefrLevel:
        "B1",

      confidencePercent:
        87,

      nextSessionGoal:
        "در فایل بعدی حداقل ۸۵٪ کلمات کوتاه و endingهای دستوری را بدون کاهش سرعت تشخیص بده.",

      encouragement:
        "لازم نیست بیشتر روی معنی کلی کار کنی؛ مرحله بعدی رشد تو دقیق‌تر شنیدن جزئیات صوتی است.",
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

    practiceMode: "guided_dictation",

    status:
      "completed",

    engine:
      "mock",

    submittedTranscript:
      "The company announced a new research program. Researchers say the technology could help developers work faster.",

    referenceTranscript:
      "The company announced a new research program. Researchers say the technology could help software developers work faster.",

    score: {
      overall:
        77,

      wordAccuracy:
        78,

      sequenceAccuracy:
        91,

      spellingAccuracy:
        96,
    },

    comparison: [
      {
        id:
          "technology-analysis-segment-1",

        kind:
          "match",

        expected:
          "The company announced a new research program.",

        actual:
          "The company announced a new research program.",
      },

      {
        id:
          "technology-analysis-segment-2",

        kind:
          "omission",

        expected:
          "software developers",

        actual:
          "developers",
      },
{
        id:
          "technology-analysis-segment-3",

        kind:
          "match",

        expected:
          "work faster",

        actual:
          "work faster",
      },
    ],

    feedback: {
      summary:
        "ایده اصلی خبر را خوب درک کردی، اما یک واژه کلیدی در Compound Noun حذف شده است.",

      strengths: [
        "ساختار کلی خبر را درست شنیدی.",
        "کلمات research و technology را دقیق ثبت کردی.",
        "املای واژگان تخصصی خوب بوده است.",
      ],

      priorities: [
        "روی شنیدن Compound Nounها تمرکز کن.",
        "هنگام شنیدن اخبار، اسم‌ها و صفت‌های قبل از اسم را جداگانه بررسی کن.",
      ],
    },

    skillProfile: {
      mainIdea:
        90,

      details:
        73,

      numbersAndNames:
        80,

      connectedSpeech:
        74,

      vocabularyInContext:
        78,

      inference:
        82,
    },

    errorPatterns: [
      {
        id:
          "technology-pattern-compound",

        category:
          "word_boundary",

        severity:
          "high",

        title:
          "مرز کلمات در Compound Noun",

               description:
          "در عبارت software developers، کلمه اول حذف شده و فقط هسته اصلی اسم ثبت شده است.",

        evidence: [
          "software developers → developers",
        ],

        recommendation:
          "هنگام شنیدن News، قبل از اسم اصلی به modifierهای کوتاه توجه ویژه داشته باش.",
      },
    ],

    difficultSegments: [
      {
        id:
          "technology-difficult-1",

        startSecond:
          68,

        endSecond:
          75,

        transcript:
          "The technology could help software developers work faster.",

        focusPhrase:
          "software developers",

        reasonFa:
          "دو اسم پشت سر هم با فاصله صوتی بسیار کم بیان شده‌اند.",

        tipFa:
          "عبارت را به دو بخش software / developers تقسیم کن و بعد دوباره به شکل Chunk کامل گوش بده.",
      },
    ],

    missedWords: [
      {
        word:
          "software",

        heardAs:
          null,

        meaningFa:
          "نرم‌افزار",

        reasonFa:
          "قبل از developers با سرعت بالا بیان شده و مرز صوتی ضعیفی داشته است.",
      },
    ],

    vocabularyDiscoveries: [
      {
        word:
          "research program",

        meaningFa:
          "برنامه پژوهشی",

        phrase:
          "The company announced a new research program.",

         noteFa:
          "در اخبار علمی و فناوری یک ترکیب رایج است.",

        masteryStatus:
          "familiar",
      },

      {
        word:
          "software developer",

        meaningFa:
          "توسعه‌دهنده نرم‌افزار",

        phrase:
          "software developers work faster",

        noteFa:
          "به‌عنوان Compound Noun بهتر است دو کلمه با هم تمرین شوند.",

        masteryStatus:
          "review",
      },
    ],

    actionPlan: [
      {
        id:
          "technology-plan-1",

        priority:
          1,

        title:
          "تمرکز روی Compound Nounها",

        description:
          "فایل را یک بار فقط برای تشخیص عبارت‌های چندکلمه‌ای گوش بده.",

        durationMinutes:
          5,

        practiceMode: "listen_only",
      },

      {
        id:
          "technology-plan-2",

        priority:
          2,

        title:
          "Guided Dictation خبر",

        description:
          "بخش‌هایی که modifier قبل از noun دارند دوباره رونویسی کن.",

        durationMinutes:
          7,

        practiceMode:
          "guided_dictation",
      },
    ],

    aiCoach: {
      headline:
        "درک خبر خوب است، اما جزئیات داخل عبارت‌های فشرده گم می‌شوند.",

      diagnosis:
        "تو هسته معنایی جمله‌ها را به‌خوبی می‌گیری، ولی در زبان خبری که چند اسم و صفت پشت سر هم قرار می‌گیرند، بعضی modifierها حذف می‌شوند.",

      nextFocus:
        "Compound nouns و word boundaries",

      estimatedCefrLevel:
        "B1",

      confidencePercent:
        82,

      nextSessionGoal:
        "در یک خبر B1/B2 سه Compound Noun را بدون حذف modifier تشخیص بده.",

      encouragement:
        "دقت املایی بسیار خوب است؛ تمرکز بعدی باید روی شنیدن ساختار کامل عبارت باشد نه نوشتن بهتر.",
    },

    createdAt:
      "2026-07-29T13:00:00.000Z",

    completedAt:
      "2026-07-29T13:10:00.000Z",
  },
] satisfies readonly ListeningAttemptAnalysis[];