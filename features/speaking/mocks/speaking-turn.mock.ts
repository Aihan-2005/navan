import type {
  SpeakingTurnAnalysis,
  SpeakingTurnAnalyzeMetadata,
} from "../types/speaking-turn.types";

type MockSpeakingProfile =
  Readonly<{
    transcript:
      string;

    summaryFa:
      string;

    strengths:
      readonly string[];

    priorities:
      readonly string[];

    scores:
      SpeakingTurnAnalysis["scores"];

    corrections:
      SpeakingTurnAnalysis["corrections"];

    pronunciationFindings:
      SpeakingTurnAnalysis["pronunciationFindings"];

    reply:
      SpeakingTurnAnalysis["aiReply"];
  }>;

const DEFAULT_PROFILE:
  MockSpeakingProfile = {
  transcript:
    "Today I want to talk about my goals. I think learning English is important for my future because I want to communicate with more people and feel more confident.",

  summaryFa:
    "پاسخ ساختار قابل‌فهمی دارد و پیام اصلی به‌خوبی منتقل می‌شود. برای طبیعی‌تر شدن گفتار، روی اتصال جمله‌ها، تنوع واژگان و کاهش مکث‌های غیرضروری تمرکز کن.",

  strengths: [
    "پیام اصلی واضح و قابل‌فهم است.",
    "جمله‌ها از نظر ترتیب منطقی مناسب هستند.",
    "واژگان پایه به شکل درستی استفاده شده‌اند.",
  ],

  priorities: [
    "بین ایده‌ها از linking wordهای متنوع‌تر استفاده کن.",
    "سرعت گفتار را کمی یکنواخت‌تر نگه دار.",
    "برای بیان نظر شخصی از عبارت‌های طبیعی‌تر استفاده کن.",
  ],

  scores: {
    overall: 78, pronunciation: 75,
    fluency: 72,
    grammar: 81,
    vocabulary: 76,
    coherence: 84,
  },

  corrections: [
    {
      id:
        "mock-correction-general-1",

      category:
        "naturalness",

      severity:
        "minor",

      original:
        "English is important for my future.",

      corrected:
        "English is important for my future goals.",

      explanationFa:
        "اضافه کردن future goals جمله را دقیق‌تر و طبیعی‌تر می‌کند.",
    },
  ],

  pronunciationFindings: [
    {
      id:
        "mock-pronunciation-general-1",

      target:
        "confident",

      ipa:
        "/ˈkɒn.fɪ.dənt/",

      feedbackFa:
        "استرس اصلی روی بخش اول کلمه است. بخش پایانی را کوتاه و بدون کشش اضافه تلفظ کن.",

      score:
        74,
    },
  ],

  reply: {
    text:
      "That makes sense. Becoming more confident is a strong reason to practice. What kind of situations would you most like to handle confidently in English?",

    translationFa:
      "منطقی است. افزایش اعتمادبه‌نفس دلیل خوبی برای تمرین است. دوست داری در چه موقعیت‌هایی بتوانی با اعتمادبه‌نفس بیشتری انگلیسی صحبت کنی؟",

    followUpQuestion:
      "What situations do you want to handle confidently in English?",
 suggestedReplies: [
      "I want to feel confident in job interviews.",
      "I would like to speak more naturally while traveling.",
      "I want to participate in meetings without hesitation.",
    ],

    audioUrl:
      null,
  },
};

const PROFILES:
  Record<
    string,
    MockSpeakingProfile
  > = {
  "restaurant-roleplay": {
    transcript:
      "Hi, could I see the menu please? I would like order the grilled chicken and a glass of water. Also, what do you recommend for dessert?",

    summaryFa:
      "برای یک موقعیت رستوران پاسخ خوبی است. درخواست مؤدبانه، سفارش غذا و سؤال درباره پیشنهاد پیشخدمت را پوشش داده‌ای. مهم‌ترین اصلاح فعلی ساختار would like to است.",

    strengths: [
      "شروع مکالمه مؤدبانه است.",
      "واژگان مرتبط با رستوران درست انتخاب شده‌اند.",
      "سؤال follow-up طبیعی مطرح شده است.",
    ],

    priorities: [
      "بعد از would like از to + verb استفاده کن.",
      "بین سفارش غذا و نوشیدنی مکث کوتاه‌تری داشته باش.",
      "در سؤال‌ها intonation صعودی را واضح‌تر کن.",
    ],

    scores: {
      overall: 82,
      pronunciation: 78,
      fluency: 80,
      grammar: 77,
      vocabulary: 85,
      coherence: 86,
    },

    corrections: [
      {
        id:
          "restaurant-correction-1",

        category:
          "grammar",

        severity:
          "important",

        original:
          "I would like order the grilled chicken.",

        corrected: "I would like to order the grilled chicken.",

        explanationFa:
          "بعد از would like برای بیان کاری که می‌خواهیم انجام دهیم از to + verb استفاده می‌کنیم.",
      },
    ],

    pronunciationFindings: [
      {
        id:
          "restaurant-pronunciation-1",

        target:
          "recommend",

        ipa:
          "/ˌrek.əˈmend/",

        feedbackFa:
          "استرس اصلی روی بخش پایانی mend قرار می‌گیرد.",

        score:
          77,
      },
    ],

    reply: {
      text:
        "Of course. The grilled chicken is a popular choice. For dessert, I recommend our chocolate cake. Would you like to add that to your order?",

      translationFa:
        "حتماً. مرغ گریل‌شده انتخاب محبوبی است. برای دسر کیک شکلاتی را پیشنهاد می‌کنم. مایل هستید آن را هم به سفارشتان اضافه کنم؟",

      followUpQuestion:
        "Would you like to add the chocolate cake to your order?",

      suggestedReplies: [
        "Yes, please. I would like one slice.",
        "No, thank you. That will be all.",
        "Do you have a lighter dessert?",
      ],

      audioUrl:
        null,
    },
  },

  "job-interview": {
    transcript:
      "I have worked in software development for three years. One of my strength is solving problems and working with teams. Last year I lead a difficult project and we finished it on time.",
summaryFa:
      "ساختار پاسخ حرفه‌ای و مناسب مصاحبه است. تجربه، نقطه قوت و یک مثال واقعی ارائه شده است. چند خطای کوچک در مفرد و جمع و زمان گذشته وجود دارد که با اصلاح آن‌ها پاسخ در سطح B2 طبیعی‌تر می‌شود.",

    strengths: [
      "پاسخ دارای مثال واقعی است.",
      "ایده‌ها مستقیم و مرتبط با سؤال هستند.",
      "واژگان حرفه‌ای مناسب محیط کاری استفاده شده‌اند.",
    ],

    priorities: [
      "strength را در این ساختار جمع ببند.",
      "برای lead در گذشته از led استفاده کن.",
      "نتیجه پروژه را با یک عدد یا impact مشخص‌تر بیان کن.",
    ],

    scores: {
      overall: 79,
      pronunciation: 80,
      fluency: 76,
      grammar: 72,
      vocabulary: 84,
      coherence: 83,
    },

    corrections: [
      {
        id:
          "job-correction-1",

        category:
          "grammar",

        severity:
          "important",

        original:
          "One of my strength is solving problems.",

        corrected:
          "One of my strengths is solving problems.",

        explanationFa:
          "بعد از one of my اسم باید به صورت جمع بیاید.",
      },

      {
        id:
          "job-correction-2",

        category:
          "grammar",

        severity:
          "important",
 original:
          "Last year I lead a difficult project.",

        corrected:
          "Last year I led a difficult project.",

        explanationFa:
          "شکل گذشته فعل lead برابر led است.",
      },
    ],

    pronunciationFindings: [
      {
        id:
          "job-pronunciation-1",

        target:
          "development",

        ipa:
          "/dɪˈvel.əp.mənt/",

        feedbackFa:
          "استرس اصلی روی vel قرار دارد؛ هجای اول را بیش از حد قوی تلفظ نکن.",

        score:
          80,
      },
    ],

    reply: {
      text:
        "That is a useful example. Can you tell me about one specific challenge your team faced during that project and how you personally helped solve it?",

      translationFa:
        "مثال خوبی بود. می‌توانی یک چالش مشخص که تیم در آن پروژه با آن روبه‌رو شد و نقشی که خودت در حل آن داشتی را توضیح بدهی؟",

      followUpQuestion:
        "What specific challenge did your team face, and how did you help solve it?",

      suggestedReplies: [
        "One challenge was a very tight deadline.",
        "We had a technical problem with...",
        "I helped the team by...",
      ],

      audioUrl:
        null,
    },
  },

  "th-sound-pronunciation": {
    transcript:
      "Think about three things. This is their house. They thought about it.",

    summaryFa:
      "جمله‌های هدف به‌درستی پوشش داده شده‌اند. تمرکز اصلی باید روی تفاوت /θ/ و /ð/ و جلوگیری از تبدیل آن‌ها به /t/ یا /d/ باشد.",

    strengths: [
      "تمام جمله‌های هدف اجرا شده‌ان",
       "ریتم جمله‌ها قابل‌فهم است.",
      "تفاوت voiced و unvoiced تا حد خوبی حفظ شده است.",
    ],

    priorities: [
      "نوک زبان را کمی بین دندان‌ها قرار بده.",
      "در /θ/ جریان هوا را حفظ کن.",
      "در /ð/ لرزش تارهای صوتی را واضح‌تر نگه دار.",
    ],

    scores: {
      overall: 74,
      pronunciation: 69,
      fluency: 82,
      grammar: 92,
      vocabulary: 90,
      coherence: 88,
    },

    corrections: [],

    pronunciationFindings: [
      {
        id:
          "th-pronunciation-1",

        target:
          "think",

        ipa:
          "/θɪŋk/",

        feedbackFa:
          "شروع کلمه باید با خروج هوا بین زبان و دندان‌ها باشد، نه صدای /t/.",

        score:
          68,
      },

      {
        id:
          "th-pronunciation-2",

        target: "their",

        ipa:
          "/ðeə(r)/",

        feedbackFa:
          "برای /ð/ همان موقعیت زبان را حفظ کن ولی تارهای صوتی باید بلرزند.",

        score:
          71,
      },
    ],

    reply: {
      text:
        "Good work. Now try one more sentence: 'Those three things are worth thinking about.' Keep the TH sounds slow and clear.",

      translationFa:
        "خوب بود. حالا این جمله را هم امتحان کن: Those three things are worth thinking about. صداهای TH را آهسته و واضح نگه دار.",

      followUpQuestion:
        "Can you repeat: Those three things are worth thinking about?",

      suggestedReplies: [
        "Those three things are worth thinking about.",
      ],

      audioUrl:
        null,
    },
  },

  "sixty-second-story": {
    transcript:
      "One of my most memorable journeys was when I went to Istanbul with my friends. At first we were tired, but later we explored the city and tried many local foods. In the end I learned that traveling with good friends can make simple moments special.",

    summaryFa:
      "داستان شروع، میانه و پایان مشخص دارد و از نظر coherence قوی است. برای بهتر شدن، جزئیات حسی و تنوع بیشتر در افعال گذشته اضافه کن.",

    strengths: [
      "ساختار داستان واضح است.",
      "از transitionهایی مثل at first و in the end استفاده شده است.",
      "نتیجه و lesson داستان مشخص است.",
    ],

    priorities: [
      "از افعال توصیفی متنوع‌تری استفاده کن.",
      "یک یا دو جزئیات حسی به داستان اضافه کن.",
      "مکث بین جمله‌ها را طبیعی‌تر کن.",
    ],

    scores: {
      overall: 84,
      pronunciation: 80,
      fluency: 82,
      grammar: 86,
      vocabulary: 81,
      coherence: 90,  },

    corrections: [],

    pronunciationFindings: [
      {
        id:
          "story-pronunciation-1",

        target:
          "memorable",

        ipa:
          "/ˈmem.ər.ə.bəl/",

        feedbackFa:
          "استرس اصلی روی هجای اول است و هجای میانی کوتاه تلفظ می‌شود.",

        score:
          79,
      },
    ],

    reply: {
      text:
        "That sounds like a meaningful trip. What was one moment in Istanbul that surprised you or changed the way you saw the city?",

      translationFa:
        "به نظر سفر معناداری بوده. یک لحظه در استانبول که تو را غافلگیر کرد یا نگاهت به شهر را تغییر داد چه بود؟",

      followUpQuestion:
        "What moment in Istanbul surprised you the most?",

      suggestedReplies: [
        "The thing that surprised me most was...",
        "I did not expect...",
        "One moment I still remember is...",
      ],

      audioUrl:
        null,
    },
  },
};

function getProfile(
  metadata:
    SpeakingTurnAnalyzeMetadata,
): MockSpeakingProfile {
  if (
    metadata.scenarioId &&
    PROFILES[
      metadata.scenarioId
    ]
  ) {
    return PROFILES[
      metadata.scenarioId
    ];
  }return DEFAULT_PROFILE;
}

function calculateWordCount(
  transcript:
    string,
): number {
  return transcript
    .trim()
    .split(
      /\s+/u,
    )
    .filter(
      Boolean,
    )
    .length;
}

export function buildMockSpeakingTurnAnalysis(
  metadata:
    SpeakingTurnAnalyzeMetadata,
  options:
    Readonly<{
      turnId:
        string;

      createdAt:
        string;
    }>,
): SpeakingTurnAnalysis {
  const profile =
    getProfile(
      metadata,
    );

  const wordCount =
    calculateWordCount(
      profile.transcript,
    );

  const rawWordsPerMinute =
    Math.round(
      (
        wordCount /
        metadata.durationSeconds
      ) *
     60,
    );

  const wordsPerMinute =
    Math.min(
      170,
      Math.max(
        70,
        rawWordsPerMinute,
      ),
    );

  return {
    turnId:
      options.turnId,

    scenarioId:
      metadata.scenarioId,

    turnIndex:
      metadata.turnIndex,

    engine:
      "mock",

    languageCode:
      "en",

    durationSeconds:
      metadata.durationSeconds,

    transcript:
      profile.transcript,

    transcriptConfidencePercent:
      91,

    transcriptSegments: [
      {
        id:
          `${options.turnId}-segment-1`,

        startMs:
          0,

        endMs:
          Math.round(
            metadata.durationSeconds *
              1000,
          ),

        text:
          profile.transcript,

        confidencePercent:
          91,
      },
    ],
wordCount,

    wordsPerMinute,

    scores:
      profile.scores,

    summaryFa:
      profile.summaryFa,

    strengths: [
      ...profile.strengths,
    ],

    priorities: [
      ...profile.priorities,
    ],

    corrections:
      profile.corrections.map(
        (
          correction,
        ) => ({
          ...correction,
        }),
      ),

    pronunciationFindings:
      profile.pronunciationFindings.map(
        (
          finding,
        ) => ({
          ...finding,
        }),
      ),

    aiReply: {
      ...profile.reply,

      suggestedReplies: [
        ...profile.reply
          .suggestedReplies,
      ],
    },

    createdAt:
      options.createdAt,
  };
}