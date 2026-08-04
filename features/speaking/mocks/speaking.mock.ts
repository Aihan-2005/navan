import type {
  SpeakingOverview,
  SpeakingScenario,
} from "../types/speaking.types";

export const speakingScenariosMock = [
  {
    id: "restaurant-roleplay",

    title: "سفارش غذا در رستوران",

    description:
      "با یک پیشخدمت هوشمند گفتگو کن، درباره منو سؤال بپرس و سفارش خودت را کامل ثبت کن.",

    mode: "roleplay",
    difficulty: "intermediate",
    coachStyle: "supportive",

    cefrLevel: "B1",
    estimatedMinutes: 8,

    prompt:
      "You are at a restaurant. Ask about the menu, choose a meal, request a drink, and handle one unexpected problem with your order.",

    aiRole:
      "The AI acts as a friendly restaurant waiter and reacts naturally to the learner.",

    focusAreas: [
      "واژگان رستوران",
      "درخواست مؤدبانه",
      "سؤال‌سازی",
    ],

    starterPhrases: [
      "Could I see the menu, please?",
      "What do you recommend?",
      "I would like to order...",
    ],

    isFeatured: true,
    isAvailable: true,
  },

  {
    id: "job-interview",

    title: "مصاحبه شغلی انگلیسی",

    description:
      "به سؤال‌های یک مصاحبه‌گر پاسخ بده و بازخوردی درباره اعتمادبه‌نفس، گرامر و ساختار پاسخ دریافت کن.",

    mode: "roleplay",
    difficulty: "advanced",
    coachStyle: "balanced",

    cefrLevel: "B2",
    estimatedMinutes: 12,

    prompt:
      "You are attending a job interview. Introduce yourself, explain your strengths, describe a challenge, and ask one question about the company.",

    aiRole:
      "The AI acts as a professional interviewer and asks follow-up questions.",

    focusAreas: [
      "معرفی حرفه‌ای",
      "گذشته ساده",
      "بیان توانایی‌ها",
    ],

    starterPhrases: [
      "I have experience in...",
      "One of my strengths is...",
      "A challenge I faced was...",
    ],

    isFeatured: true,
    isAvailable: true,
  },

  {
    id: "th-sound-pronunciation",

    title: "تمرین صدای TH",

    description:
      "تفاوت میان صداهای /θ/ و /ð/ را در کلمات و جمله‌های کاربردی تمرین کن.",

    mode: "pronunciation",
    difficulty: "intermediate",
    coachStyle: "strict",

    cefrLevel: "B1",
    estimatedMinutes: 6,

    prompt:
      "Pronounce the target words and sentences clearly. Focus on tongue position, airflow, and voiced versus unvoiced TH sounds.",

    aiRole:
      "The AI acts as a pronunciation coach and highlights unclear target sounds.",

    focusAreas: [
      "صدای /θ/",
      "صدای /ð/",
      "وضوح تلفظ",
    ],

    starterPhrases: [
      "Think about three things.",
      "This is their house.",
      "They thought about it.",
    ],

    isFeatured: false,
    isAvailable: true,
  },

  {
    id: "coffee-shop-shadowing",

    title: "Shadowing در کافی‌شاپ",

    description:
      "یک گفت‌وگوی طبیعی را جمله‌به‌جمله تقلید کن و ریتم، استرس و آهنگ گفتار خودت را بهبود بده.",

    mode: "shadowing",
    difficulty: "beginner",
    coachStyle: "supportive",

    cefrLevel: "A2",
    estimatedMinutes: 7,

    prompt:
      "Listen to each sentence, repeat it with similar rhythm and stress, and then record the complete conversation.",

    aiRole:
      "The AI acts as a native conversation partner and pronunciation model.",

    focusAreas: [
      "ریتم",
      "استرس کلمه",
      "جمله‌های روزمره",
    ],

    starterPhrases: [
      "Can I get a cup of coffee?",
      "Would you like anything else?",
      "That will be all, thank you.",
    ],

    isFeatured: true,
    isAvailable: true,
  },

  {
    id: "sixty-second-story",

    title: "چالش داستان ۶۰ ثانیه‌ای",

    description:
      "بدون توقف درباره یک موضوع صحبت کن و پیوستگی، سرعت و دامنه واژگان خودت را بسنج.",

    mode: "storytelling",
    difficulty: "intermediate",
    coachStyle: "balanced",

    cefrLevel: "B1",
    estimatedMinutes: 5,

    prompt:
      "Tell a one-minute story about a memorable journey. Include where you went, what happened, how you felt, and what you learned.",

    aiRole:
      "The AI acts as a storytelling coach and evaluates structure, fluency, and vocabulary variety.",

    focusAreas: [
      "پیوستگی گفتار",
      "زمان گذشته",
      "توصیف احساسات",
    ],

    starterPhrases: [
      "One of my most memorable journeys was...",
      "At first, I thought...",
      "In the end, I learned that...",
    ],

    isFeatured: true,
    isAvailable: true,
  },

  {
    id: "social-media-debate",

    title: "مناظره درباره شبکه‌های اجتماعی",

    description:
      "نظر خودت را بیان کن، دلیل بیاور و به دیدگاه مخالف پاسخ بده.",

    mode: "debate",
    difficulty: "advanced",
    coachStyle: "strict",

    cefrLevel: "B2",
    estimatedMinutes: 10,

    prompt:
      "Argue whether social media has a positive or negative effect on young people. Give at least two reasons and respond to one counterargument.",

    aiRole:
      "The AI challenges the learner's opinion and asks for evidence and clarification.",

    focusAreas: [
      "بیان عقیده",
      "استدلال",
      "پاسخ به مخالفت",
    ],

    starterPhrases: [
      "In my opinion...",
      "One important reason is...",
      "I understand that point, however...",
    ],

    isFeatured: false,
    isAvailable: true,
  },
] satisfies SpeakingScenario[];

export const speakingOverviewMock = {
  stats: {
    totalSessions: 18,
    weeklyMinutes: 47,

    averageFluencyScore: 72,
    pronunciationScore: 68,

    currentStreak: 5,
  },

  scenarios: speakingScenariosMock,
} satisfies SpeakingOverview;