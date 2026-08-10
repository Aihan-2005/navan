
import type {
  AssessmentDefinition,
} from "../types/assessment.types";

export const placementAssessmentMock = {
  id:
    "english-placement-foundation-v1",

  slug:
    "english-placement-foundation",

  type: "placement",

  status: "published",

  mode: "adaptive",

  title:
    "آزمون تعیین سطح انگلیسی",

  description:
    "ارزیابی اولیه سطح زبان انگلیسی با تمرکز بر گرامر، واژگان و درک مطلب. سطح و سختی سؤال‌ها در ادامه بر اساس عملکرد کاربر قابل تطبیق خواهد بود.",

  targetLanguageCode: "en",

  nativeLanguageCode: "fa",

  estimatedMinutes: 15,

  questionCount: 12,

  passingScore: null,

  xpReward: 120,

  skills: [
    "grammar",
    "vocabulary",
    "reading",
  ],

  adaptiveConfig: {
    startingCefrLevel: "B1",

    initialDifficulty:
      "medium",

    minimumQuestions: 6,

    maximumQuestions: 12,

    promoteAfterCorrectStreak: 2,

    demoteAfterIncorrectStreak: 2,

    targetConfidence: 85,
  },

  sections: [
    {
      id:
        "placement-grammar",

      title: "گرامر",

      description:
        "ارزیابی ساختار جمله، زمان‌ها و قواعد اصلی.",

      order: 1,

      skill: "grammar",

      questionIds: [
        "placement-grammar-001",
        "placement-grammar-002",
        "placement-grammar-003",
        "placement-grammar-004",
      ],

      estimatedMinutes: 4,
    },

    {
      id:
        "placement-vocabulary",

      title: "واژگان",

      description:
        "ارزیابی معنی، کاربرد و انتخاب واژه در Context.",

      order: 2,

      skill: "vocabulary",

      questionIds: [
        "placement-vocabulary-001",
        "placement-vocabulary-002",
        "placement-vocabulary-003",
        "placement-vocabulary-004",
      ],

      estimatedMinutes: 4,
    },

    {
      id:
        "placement-reading",

      title: "درک مطلب",

      description:
        "ارزیابی Main Idea، Detail و Inference.",

      order: 3,

      skill: "reading",

      questionIds: [
        "placement-reading-001",
        "placement-reading-002",
        "placement-reading-003",
        "placement-reading-004",
      ],

      estimatedMinutes: 7,
    },
  ],

  questions: [
    {
      id:
        "placement-grammar-001",

      type:
        "multiple_choice",

      skill: "grammar",

      cefrLevel: "A2",

      difficulty: "easy",

      topic:
        "past_simple",

      prompt:
        "Yesterday, Sarah ___ to the library after work.",

      instruction:
        "گزینه صحیح را انتخاب کن.",

      points: 1,

      estimatedSeconds: 30,

      source: {
        feature:
          "assessment",

        sourceId:
          "placement-bank-v1",

        resourceId: null,

        sectionId: null,

        href: null,
      },

      tags: [
        "past-simple",
        "verb-form",
      ],

      options: [
        {
          id: "a",
          label: "go",
        },
        {
          id: "b",
          label: "goes",
        },
        {
          id: "c",
          label: "went",
        },
        {
          id: "d",
          label: "going",
        },
      ],

      correctOptionId: "c",

      explanation:
        "Yesterday نشان‌دهنده زمان گذشته است و شکل گذشته go برابر went است.",
    },

    {
      id:
        "placement-grammar-002",

      type:
        "fill_blank",

      skill: "grammar",

      cefrLevel: "B1",

      difficulty: "medium",

      topic:
        "present_perfect",

      prompt:
        "I have ___ this movie three times.",

      instruction:
        "شکل صحیح فعل see را بنویس.",

      points: 1,

      estimatedSeconds: 35,

      source: {
        feature:
          "assessment",

        sourceId:
          "placement-bank-v1",

        resourceId: null,

        sectionId: null,

        href: null,
      },

      tags: [
        "present-perfect",
        "past-participle",
      ],

      acceptedAnswers: [
        "seen",
      ],

      caseSensitive: false,

      explanation:
        "Present Perfect با have/has + past participle ساخته می‌شود و شکل سوم see برابر seen است.",
    },

    {
      id:
        "placement-grammar-003",

      type:
        "multiple_choice",

      skill: "grammar",

      cefrLevel: "B1",

      difficulty: "medium",

      topic:
        "conditionals",

      prompt:
        "If I had more free time, I ___ another language.",

      instruction:
        "گزینه صحیح را انتخاب کن.",

      points: 1,

      estimatedSeconds: 40,

      source: {
        feature:
          "assessment",

        sourceId:
          "placement-bank-v1",

        resourceId: null,

        sectionId: null,

        href: null,
      },

      tags: [
        "second-conditional",
      ],

      options: [
        {
          id: "a",
          label: "learn",
        },
        {
          id: "b",
          label: "will learn",
        },
        {
          id: "c",
          label: "would learn",
        },
        {
          id: "d",
          label: "learned",
        },
      ],

      correctOptionId: "c",

      explanation:
        "Second Conditional از if + past simple و would + base verb استفاده می‌کند.",
    },

    {
      id:
        "placement-grammar-004",

      type:
        "multiple_choice",

      skill: "grammar",

      cefrLevel: "B2",

      difficulty: "hard",

      topic:
        "past_perfect",

      prompt:
        "By the time we arrived, the meeting ___.",

      instruction:
        "گزینه‌ای را انتخاب کن که ترتیب زمانی را درست نشان می‌دهد.",

      points: 2,

      estimatedSeconds: 45,

      source: {
        feature:
          "assessment",

        sourceId:
          "placement-bank-v1",

        resourceId: null,

        sectionId: null,

        href: null,
      },

      tags: [
        "past-perfect",
        "sequence",
      ],

      options: [
        {
          id: "a",
          label: "already started",
        },
        {
          id: "b",
          label: "has already started",
        },
        {
          id: "c",
          label: "had already started",
        },
        {
          id: "d",
          label: "was already start",
        },
      ],

      correctOptionId: "c",

      explanation:
        "رویدادی که قبل از یک رویداد گذشته دیگر اتفاق افتاده با Past Perfect بیان می‌شود.",
    },

    {
      id:
        "placement-vocabulary-001",

      type:
        "multiple_choice",

      skill: "vocabulary",

      cefrLevel: "A2",

      difficulty: "easy",

      topic:
        "everyday_vocabulary",

      prompt:
        "What does “borrow” mean?",

      instruction:
        "نزدیک‌ترین معنی را انتخاب کن.",

      points: 1,

      estimatedSeconds: 25,

      source: {
        feature:
          "assessment",

        sourceId:
          "placement-bank-v1",

        resourceId: null,

        sectionId: null,

        href: null,
      },

      tags: [
        "meaning",
        "daily-english",
      ],

      options: [
        {
          id: "a",
          label:
            "To give something permanently",
        },
        {
          id: "b",
          label:
            "To use something temporarily and return it",
        },
        {
          id: "c",
          label:
            "To buy something cheaply",
        },
        {
          id: "d",
          label:
            "To lose something",
        },
      ],

      correctOptionId: "b",

      explanation:
        "Borrow یعنی چیزی را موقتاً از کسی گرفتن و بعداً پس‌دادن.",
    },

    {
      id:
        "placement-vocabulary-002",

      type:
        "multiple_choice",

      skill: "vocabulary",

      cefrLevel: "B1",

      difficulty: "medium",

      topic:
        "vocabulary_in_context",

      prompt:
        "The new software is very ___; even beginners can use it easily.",

      instruction:
        "بهترین واژه را برای Context انتخاب کن.",

      points: 1,

      estimatedSeconds: 30,

      source: {
        feature:
          "assessment",

        sourceId:
          "placement-bank-v1",

        resourceId: null,

        sectionId: null,

        href: null,
      },

      tags: [
        "context",
        "adjectives",
      ],

      options: [
        {
          id: "a",
          label: "user-friendly",
        },
        {
          id: "b",
          label: "ordinary",
        },
        {
          id: "c",
          label: "ancient",
        },
        {
          id: "d",
          label: "narrow",
        },
      ],

      correctOptionId: "a",

      explanation:
        "User-friendly برای چیزی استفاده می‌شود که استفاده از آن ساده و قابل‌فهم است.",
    },

    {
      id:
        "placement-vocabulary-003",

      type:
        "multiple_choice",

      skill: "vocabulary",

      cefrLevel: "B1",

      difficulty: "medium",

      topic:
        "collocations",

      prompt:
        "Which expression is the most natural English collocation?",

      instruction:
        "Collocation صحیح را انتخاب کن.",

      points: 1,

      estimatedSeconds: 35,

      source: {
        feature:
          "assessment",

        sourceId:
          "placement-bank-v1",

        resourceId: null,

        sectionId: null,

        href: null,
      },

      tags: [
        "collocation",
      ],

      options: [
        {
          id: "a",
          label:
            "make a decision",
        },
        {
          id: "b",
          label:
            "do a decision",
        },
        {
          id: "c",
          label:
            "build a decision",
        },
        {
          id: "d",
          label:
            "create a decision",
        },
      ],

      correctOptionId: "a",

      explanation:
        "در انگلیسی Collocation طبیعی make a decision است.",
    },

    {
      id:
        "placement-vocabulary-004",

      type:
        "multiple_choice",

      skill: "vocabulary",

      cefrLevel: "B2",

      difficulty: "hard",

      topic:
        "academic_vocabulary",

      prompt:
        "The evidence was not sufficient to ___ the researchers' conclusion.",

      instruction:
        "مناسب‌ترین Verb را انتخاب کن.",

      points: 2,

      estimatedSeconds: 40,

      source: {
        feature:
          "assessment",

        sourceId:
          "placement-bank-v1",

        resourceId: null,

        sectionId: null,

        href: null,
      },

      tags: [
        "academic",
        "context",
      ],

      options: [
        {
          id: "a",
          label: "support",
        },
        {
          id: "b",
          label: "carry",
        },
        {
          id: "c",
          label: "hold",
        },
        {
          id: "d",
          label: "raise",
        },
      ],

      correctOptionId: "a",

      explanation:
        "Support a conclusion یعنی شواهدی ارائه‌کردن که نتیجه را تأیید می‌کنند.",
    },

    {
      id:
        "placement-reading-001",

      type:
        "reading_comprehension",

      skill: "reading",

      cefrLevel: "A2",

      difficulty: "easy",

      topic:
        "main_idea",

      prompt:
        "Why does Emma usually cycle to work?",

      instruction:
        "متن را بخوان و پاسخ صحیح را انتخاب کن.",

      points: 1,

      estimatedSeconds: 50,

      source: {
        feature:
          "assessment",

        sourceId:
          "placement-bank-v1",

        resourceId: null,

        sectionId: null,

        href: null,
      },

      tags: [
        "main-idea",
        "daily-life",
      ],

      passage: {
        id:
          "placement-reading-passage-a2",

        title:
          "Emma's Commute",

        text:
          "Emma lives about three kilometers from her office. She usually cycles to work because it is faster than taking the bus during the morning traffic. On rainy days, however, she takes the bus.",

        sourceLabel:
          "Placement Test",
      },

      options: [
        {
          id: "a",
          label:
            "Because cycling is cheaper than walking.",
        },
        {
          id: "b",
          label:
            "Because cycling is faster during morning traffic.",
        },
        {
          id: "c",
          label:
            "Because she does not like buses.",
        },
        {
          id: "d",
          label:
            "Because her office is far away.",
        },
      ],

      correctOptionId: "b",

      explanation:
        "متن مستقیماً می‌گوید Emma دوچرخه‌سواری را انتخاب می‌کند چون در ترافیک صبح سریع‌تر از اتوبوس است.",
    },

    {
      id:
        "placement-reading-002",

      type:
        "reading_comprehension",

      skill: "reading",

      cefrLevel: "B1",

      difficulty: "medium",

      topic:
        "detail_accuracy",

      prompt:
        "What changed after the company introduced flexible working hours?",

      instruction:
        "بر اساس جزئیات متن پاسخ بده.",

      points: 1,

      estimatedSeconds: 65,

      source: {
        feature:
          "assessment",

        sourceId:
          "placement-bank-v1",

        resourceId: null,

        sectionId: null,

        href: null,
      },

      tags: [
        "detail",
        "work",
      ],

      passage: {
        id:
          "placement-reading-passage-b1",

        title:
          "Flexible Working",

        text:
          "A small technology company introduced flexible working hours last year. Employees can now choose to begin their day between seven and ten in the morning. Managers initially worried that communication would become more difficult, but internal surveys showed that employees became more satisfied and missed fewer days of work.",

        sourceLabel:
          "Placement Test",
      },

      options: [
        {
          id: "a",
          label:
            "Employees worked fewer hours every day.",
        },
        {
          id: "b",
          label:
            "The company removed all managers.",
        },
        {
          id: "c",
          label:
            "Employee satisfaction increased and absence decreased.",
        },
        {
          id: "d",
          label:
            "Communication completely stopped.",
        },
      ],

      correctOptionId: "c",

      explanation:
        "Surveyها نشان دادند رضایت کارکنان بیشتر شد و تعداد روزهای غیبت کاهش پیدا کرد.",
    },

    {
      id:
        "placement-reading-003",

      type:
        "reading_comprehension",

      skill: "reading",

      cefrLevel: "B1",

      difficulty: "medium",

      topic:
        "inference",

      prompt:
        "What can reasonably be inferred about the managers?",

      instruction:
        "به اطلاعات غیرمستقیم متن توجه کن.",

      points: 2,

      estimatedSeconds: 75,

      source: {
        feature:
          "assessment",

        sourceId:
          "placement-bank-v1",

        resourceId: null,

        sectionId: null,

        href: null,
      },

      tags: [
        "inference",
        "work",
      ],

      passage: {
        id:
          "placement-reading-passage-b1",

        title:
          "Flexible Working",

        text:
          "A small technology company introduced flexible working hours last year. Employees can now choose to begin their day between seven and ten in the morning. Managers initially worried that communication would become more difficult, but internal surveys showed that employees became more satisfied and missed fewer days of work.",

        sourceLabel:
          "Placement Test",
      },

      options: [
        {
          id: "a",
          label:
            "Their initial concern was not fully supported by the later results.",
        },
        {
          id: "b",
          label:
            "They wanted every employee to work from home.",
        },
        {
          id: "c",
          label:
            "They refused to read the surveys.",
        },
        {
          id: "d",
          label:
            "They were already certain the change would succeed.",
        },
      ],

      correctOptionId: "a",

      explanation:
        "مدیران ابتدا نگران بودند اما نتایج بعدی پیامدهای مثبتی نشان داد؛ بنابراین نگرانی اولیه آن‌ها کاملاً تأیید نشد.",
    },

    {
      id:
        "placement-reading-004",

      type:
        "reading_comprehension",

      skill: "reading",

      cefrLevel: "B2",

      difficulty: "hard",

      topic:
        "author_argument",

      prompt:
        "Which statement best captures the author's main argument?",

      instruction:
        "ایده مرکزی متن را انتخاب کن.",

      points: 2,

      estimatedSeconds: 90,

      source: {
        feature:
          "assessment",

        sourceId:
          "placement-bank-v1",

        resourceId: null,

        sectionId: null,

        href: null,
      },

      tags: [
        "main-idea",
        "argument",
        "technology",
      ],

      passage: {
        id:
          "placement-reading-passage-b2",

        title:
          "Technology and Productivity",

        text:
          "Digital tools are often introduced with the promise of improving productivity. Yet adding more software does not automatically make a team more efficient. When employees must constantly switch between applications, respond to notifications, and learn overlapping systems, technology can create additional cognitive load. The most effective organizations therefore evaluate not only what a tool can do, but also whether it simplifies existing workflows.",

        sourceLabel:
          "Placement Test",
      },

      options: [
        {
          id: "a",
          label:
            "Organizations should always use the newest software.",
        },
        {
          id: "b",
          label:
            "Digital tools are the main cause of workplace failure.",
        },
        {
          id: "c",
          label:
            "Technology improves productivity only when it meaningfully supports simpler workflows.",
        },
        {
          id: "d",
          label:
            "Employees should avoid learning new applications.",
        },
      ],

      correctOptionId: "c",

      explanation:
        "نویسنده استدلال می‌کند ارزش ابزار دیجیتال فقط به امکانات آن نیست؛ باید واقعاً Workflow را ساده‌تر کند.",
    },
  ],

  version: 1,

  createdAt:
    "2026-08-10T12:00:00.000Z",

  updatedAt:
    "2026-08-10T12:00:00.000Z",
} satisfies AssessmentDefinition;