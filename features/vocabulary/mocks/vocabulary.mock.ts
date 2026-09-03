import type {
  VocabularyCollection,
  VocabularyWord,
} from "../types/vocabulary.types";
   



export const vocabularyCollectionsMock: VocabularyCollection[] = [
  {
    id: "travel",

    title: "سفر",

    description:
      "واژگان کاربردی فرودگاه، هتل، حمل‌ونقل و گردشگری",

    emoji: "✈️",

    totalWords: 2,

    learnedWords: 1,
  },

  {
    id: "work",

    title: "محیط کار",

    description:
      "واژگان جلسات، ایمیل‌ها، همکاری و مکالمات حرفه‌ای",

    emoji: "💼",

    totalWords: 3,

    learnedWords: 0,
  },

  {
    id: "daily",

    title: "مکالمات روزمره",

    description:
      "واژه‌های پرکاربرد برای گفتگوها و موقعیت‌های روزانه",

    emoji: "☕",

    totalWords: 1,

    learnedWords: 0,
  },

  {
    id: "food",

    title: "غذا و رستوران",

    description:
      "واژگان سفارش غذا، منو، رستوران و توصیف طعم‌ها",

    emoji: "🍽️",

    totalWords: 2,

    learnedWords: 0,
  },
];



export const vocabularyWordsMock: VocabularyWord[] = [
    


  {
    id: "word-accomplish",

    word: "accomplish",

    translation: "به انجام رساندن",

    phonetic: "/əˈkʌmplɪʃ/",

    definition:
      "To succeed in doing or completing something.",

    example:
      "She accomplished all of her goals this year.",

    exampleTranslation:
      "او امسال تمام اهدافش را به انجام رساند.",

    partOfSpeech: "verb",

    difficulty: "medium",

    status: "learning",

    leitnerBox: 2,

    tags: [
      "work",
      "B1",
      "goals",
    ],

    collectionId: "work",

    reviewCount: 6,

    correctCount: 4,

    lapseCount: 2,

    nextReviewAt:
      "2026-09-03T09:00:00.000Z",

    lastReviewedAt:
      "2026-09-01T09:00:00.000Z",

    createdAt:
      "2026-08-22T09:00:00.000Z",

    updatedAt:
      "2026-09-01T09:00:00.000Z",
  },

  {
    id: "word-schedule",

    word: "schedule",

    translation: "برنامه زمانی",

    phonetic: "/ˈskedʒuːl/",

    definition:
      "A plan that lists events and the times at which they will happen.",

    example:
      "My schedule is very busy this week.",

    exampleTranslation:
      "برنامه این هفته من خیلی شلوغ است.",

    partOfSpeech: "noun",

    difficulty: "easy",

    status: "review",

    leitnerBox: 3,

    tags: [
      "work",
      "daily",
      "B1",
    ],

    collectionId: "work",

    reviewCount: 9,

    correctCount: 7,

    lapseCount: 2,

    nextReviewAt:
      "2026-09-03T11:00:00.000Z",

    lastReviewedAt:
      "2026-08-30T11:00:00.000Z",

    createdAt:
      "2026-08-18T09:00:00.000Z",

    updatedAt:
      "2026-08-30T11:00:00.000Z",
  },

  {
    id: "word-negotiate",

    word: "negotiate",

    translation: "مذاکره کردن",

    phonetic: "/nɪˈɡəʊʃieɪt/",

    definition:
      "To discuss something in order to reach an agreement.",

    example:
      "We need to negotiate a better price.",

    exampleTranslation:
      "ما باید برای قیمت بهتری مذاکره کنیم.",

    partOfSpeech: "verb",

    difficulty: "hard",

    status: "learning",

    leitnerBox: 1,

    tags: [
      "work",
      "business",
      "B2",
    ],

    collectionId: "work",

    reviewCount: 8,

    correctCount: 3,

    lapseCount: 5,

    nextReviewAt:
      "2026-09-03T08:00:00.000Z",

    lastReviewedAt:
      "2026-09-02T08:00:00.000Z",

    createdAt:
      "2026-08-25T09:00:00.000Z",

    updatedAt:
      "2026-09-02T08:00:00.000Z",
  },

  


  {
    id: "word-destination",

    word: "destination",

    translation: "مقصد",

    phonetic: "/ˌdestɪˈneɪʃən/",

    definition:
      "The place to which someone or something is going.",

    example:
      "Paris is our final destination.",

    exampleTranslation:
      "پاریس مقصد نهایی ماست.",

    partOfSpeech: "noun",

    difficulty: "easy",

    status: "mastered",

    leitnerBox: 5,

    tags: [
      "travel",
      "B1",
    ],

    collectionId: "travel",

    reviewCount: 14,

    correctCount: 13,

    lapseCount: 1,

    nextReviewAt:
      "2026-09-15T09:00:00.000Z",

    lastReviewedAt:
      "2026-08-30T09:00:00.000Z",

    createdAt:
      "2026-08-01T09:00:00.000Z",

    updatedAt:
      "2026-08-30T09:00:00.000Z",
  },

  {
    id: "word-departure",

    word: "departure",

    translation: "عزیمت / حرکت",

    phonetic: "/dɪˈpɑːrtʃər/",

    definition:
      "The act of leaving a place, especially to start a journey.",

    example:
      "Our departure is scheduled for six in the morning.",

    exampleTranslation:
      "زمان حرکت ما برای ساعت شش صبح برنامه‌ریزی شده است.",

    partOfSpeech: "noun",

    difficulty: "medium",

    status: "review",

    leitnerBox: 4,

    tags: [
      "travel",
      "airport",
      "B1",
    ],

    collectionId: "travel",

    reviewCount: 11,

    correctCount: 9,

    lapseCount: 2,

    nextReviewAt:
      "2026-09-07T08:00:00.000Z",

    lastReviewedAt:
      "2026-08-30T08:00:00.000Z",

    createdAt:
      "2026-08-08T09:00:00.000Z",

    updatedAt:
      "2026-08-30T08:00:00.000Z",
  },

  


  {
    id: "word-delicious",

    word: "delicious",

    translation: "خوشمزه",

    phonetic: "/dɪˈlɪʃəs/",

    definition:
      "Having a very pleasant taste or smell.",

    example:
      "The food was absolutely delicious.",

    exampleTranslation:
      "غذا واقعاً خوشمزه بود.",

    partOfSpeech: "adjective",

    difficulty: "easy",

    status: "review",

    leitnerBox: 3,

    tags: [
      "food",
      "daily",
      "B1",
    ],

    collectionId: "food",

    reviewCount: 7,

    correctCount: 6,

    lapseCount: 1,

    nextReviewAt:
      "2026-09-05T08:00:00.000Z",

    lastReviewedAt:
      "2026-09-01T08:00:00.000Z",

    createdAt:
      "2026-08-12T09:00:00.000Z",

    updatedAt:
      "2026-09-01T08:00:00.000Z",
  },

  {
    id: "word-recommend",

    word: "recommend",

    translation: "توصیه کردن",

    phonetic: "/ˌrekəˈmend/",

    definition:
      "To suggest that someone or something would be good or suitable.",

    example:
      "Can you recommend a good restaurant?",

    exampleTranslation:
      "می‌توانی یک رستوران خوب پیشنهاد کنی؟",

    partOfSpeech: "verb",

    difficulty: "medium",

    status: "learning",

    leitnerBox: 2,

    tags: [
      "food",
      "travel",
      "B1",
    ],

    collectionId: "food",

    reviewCount: 10,

    correctCount: 6,

    lapseCount: 4,

    nextReviewAt:
      "2026-09-03T13:00:00.000Z",

    lastReviewedAt:
      "2026-09-01T13:00:00.000Z",

    createdAt:
      "2026-08-09T09:00:00.000Z",

    updatedAt:
      "2026-09-01T13:00:00.000Z",
  },

  

  {
    id: "word-convenient",

    word: "convenient",

    translation: "مناسب / راحت",

    phonetic: "/kənˈviːniənt/",

    definition:
      "Suitable for your purposes and causing little difficulty.",

    example:
      "Is this time convenient for you?",

    exampleTranslation:
      "آیا این زمان برای تو مناسب است؟",

    partOfSpeech: "adjective",

    difficulty: "medium",

    status: "new",

    leitnerBox: 1,

    tags: [
      "daily",
      "B1",
    ],

    collectionId: "daily",

    reviewCount: 0,

    correctCount: 0,

    lapseCount: 0,

    nextReviewAt:
      "2026-09-03T10:00:00.000Z",

    createdAt:
      "2026-09-03T07:00:00.000Z",

    updatedAt:
      "2026-09-03T07:00:00.000Z",
  },
];