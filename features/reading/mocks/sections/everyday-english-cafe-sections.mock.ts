import type {
  ReadingSectionDetail,
} from "../../types/reading.types";

export const everydayEnglishCafeSectionsMock = [
  {
    id: "cafe-section-1",

    resourceId:
      "everyday-english-cafe",

    resourceTitle:
      "Everyday English: At the Café",

    resourceAuthor:
      "MeowLingo Original",

    languageCode: "en",
    cefrLevel: "A2",

    order: 1,

    title:
      "بخش اول: ورود و سفارش",

    summary:
      "عبارت‌های ضروری برای سلام‌کردن و سفارش نوشیدنی.",

    wordCount: 240,

    estimatedMinutes: 8,

    status: "available",

    audioStatus: "ready",

    audioUrl: null,

    vocabularyCount: 9,

    grammarPointCount: 2,

    previousSectionId: null,

    nextSectionId: null,

    content: [
      {
        id:
          "cafe-section-1-paragraph-1",

        order: 1,

        text:
          "Maya walked into a small café near her office. The barista smiled and said, “Good morning. What can I get for you?” Maya looked at the menu for a moment.",

        translation:
          "مایا وارد یک کافه کوچک نزدیک محل کارش شد. باریستا لبخند زد و گفت: «صبح بخیر. چه چیزی می‌توانم برایتان بیاورم؟» مایا لحظه‌ای به منو نگاه کرد.",

        note:
          "عبارت What can I get for you? یکی از رایج‌ترین روش‌های پرسیدن سفارش مشتری در کافه و رستوران است.",
      },

      {
        id:
          "cafe-section-1-paragraph-2",

        order: 2,

        text:
          "“I'd like a medium latte with oat milk, please,” she said. “Of course,” the barista replied. “Would you like anything else?” Maya pointed to a chocolate pastry beside the counter.",

        translation:
          "او گفت: «لطفاً یک لاته متوسط با شیر جو دوسر می‌خواهم.» باریستا پاسخ داد: «حتماً. چیز دیگری هم میل دارید؟» مایا به یک شیرینی شکلاتی کنار پیشخوان اشاره کرد.",

        note:
          "I'd like... شکل مؤدبانه و بسیار طبیعی برای سفارش‌دادن است و نسبت به I want... رسمی‌تر و دوستانه‌تر شنیده می‌شود.",
      },

      {
        id:
          "cafe-section-1-paragraph-3",

        order: 3,

        text:
          "“Could I have one of those too?” Maya asked. The barista added the pastry to the order and asked, “Is that for here or to go?” Maya answered, “For here, please.”",

        translation:
          "مایا پرسید: «می‌توانم یکی از آن‌ها هم داشته باشم؟» باریستا شیرینی را به سفارش اضافه کرد و پرسید: «اینجا میل می‌کنید یا می‌برید؟» مایا پاسخ داد: «اینجا، لطفاً.»",

        note:
          "for here یعنی سفارش را داخل کافه مصرف می‌کنی و to go یعنی سفارش را با خودت می‌بری.",
      },
    ],

    vocabulary: [
      {
        id:
          "cafe-section-1-vocabulary-1",

        term: "barista",

        pronunciation:
          "/bəˈriːstə/",

        partOfSpeech: "noun",

        meaning: "باریستا",

        contextualMeaning:
          "فردی که در کافه نوشیدنی‌هایی مانند قهوه آماده و سرو می‌کند.",

        example:
          "The barista prepared my coffee.",

        exampleTranslation:
          "باریستا قهوه من را آماده کرد.",

        isCore: true,
      },

      {
        id:
          "cafe-section-1-vocabulary-2",

        term: "menu",

        pronunciation:
          "/ˈmenjuː/",

        partOfSpeech: "noun",

        meaning: "منو",

        contextualMeaning:
          "فهرست نوشیدنی‌ها و غذاهایی که می‌توان سفارش داد.",

        example:
          "Can I see the menu, please?",

        exampleTranslation:
          "می‌توانم لطفاً منو را ببینم؟",

        isCore: true,
      },

      {
        id:
          "cafe-section-1-vocabulary-3",

        term: "medium",

        pronunciation:
          "/ˈmiːdiəm/",

        partOfSpeech:
          "adjective",

        meaning: "متوسط",

        contextualMeaning:
          "اندازه‌ای بین small و large برای نوشیدنی.",

        example:
          "I'd like a medium coffee.",

        exampleTranslation:
          "یک قهوه متوسط می‌خواهم.",

        isCore: false,
      },

      {
        id:
          "cafe-section-1-vocabulary-4",

        term: "oat milk",

        pronunciation:
          "/əʊt mɪlk/",

        partOfSpeech: "noun",

        meaning:
          "شیر جو دوسر",

        contextualMeaning:
          "نوعی شیر گیاهی که می‌تواند جایگزین شیر معمولی شود.",

        example:
          "Do you have oat milk?",

        exampleTranslation:
          "شیر جو دوسر دارید؟",

        isCore: false,
      },

      {
        id:
          "cafe-section-1-vocabulary-5",

        term: "anything else",

        pronunciation: null,

        partOfSpeech:
          "phrase",

        meaning:
          "چیز دیگری",

        contextualMeaning:
          "عبارتی برای پرسیدن اینکه آیا مشتری مورد دیگری هم می‌خواهد.",

        example:
          "Would you like anything else?",

        exampleTranslation:
          "چیز دیگری هم میل دارید؟",

        isCore: true,
      },

      {
        id:
          "cafe-section-1-vocabulary-6",

        term: "pastry",

        pronunciation:
          "/ˈpeɪstri/",

        partOfSpeech: "noun",

        meaning: "شیرینی",

        contextualMeaning:
          "نوعی خوراکی پخته‌شده که معمولاً همراه نوشیدنی فروخته می‌شود.",

        example:
          "She ordered a pastry with her coffee.",

        exampleTranslation:
          "او همراه قهوه‌اش یک شیرینی سفارش داد.",

        isCore: false,
      },

      {
        id:
          "cafe-section-1-vocabulary-7",

        term: "counter",

        pronunciation:
          "/ˈkaʊntər/",

        partOfSpeech: "noun",

        meaning: "پیشخوان",

        contextualMeaning:
          "محلی در فروشگاه یا کافه که مشتری سفارش می‌دهد یا پرداخت می‌کند.",

        example:
          "Please order at the counter.",

        exampleTranslation:
          "لطفاً کنار پیشخوان سفارش دهید.",

        isCore: false,
      },

      {
        id:
          "cafe-section-1-vocabulary-8",

        term: "for here",

        pronunciation: null,

        partOfSpeech:
          "phrase",

        meaning:
          "برای مصرف در محل",

        contextualMeaning:
          "وقتی مشتری می‌خواهد سفارش را داخل کافه مصرف کند.",

        example:
          "It's for here, please.",

        exampleTranslation:
          "برای همین‌جا است، لطفاً.",

        isCore: true,
      },

      {
        id:
          "cafe-section-1-vocabulary-9",

        term: "to go",

        pronunciation: null,

        partOfSpeech:
          "phrase",

        meaning:
          "برای بیرون‌بر",

        contextualMeaning:
          "وقتی مشتری سفارش را با خودش از کافه خارج می‌کند.",

        example:
          "Can I get this coffee to go?",

        exampleTranslation:
          "می‌توانم این قهوه را بیرون‌بر بگیرم؟",

        isCore: true,
      },
    ],

    grammarPoints: [
      {
        id:
          "cafe-section-1-grammar-1",

        title:
          "I'd like برای سفارش مؤدبانه",

        explanation:
          "برای بیان خواسته در کافه، فروشگاه یا رستوران، I'd like طبیعی‌تر و مؤدبانه‌تر از I want است.",

        pattern:
          "I'd like + noun + please.",

        examples: [
          {
            id:
              "cafe-section-1-grammar-1-example-1",

            source:
              "I'd like a medium latte, please.",

            translation:
              "لطفاً یک لاته متوسط می‌خواهم.",
          },

          {
            id:
              "cafe-section-1-grammar-1-example-2",

            source:
              "I'd like a glass of water, please.",

            translation:
              "لطفاً یک لیوان آب می‌خواهم.",
          },
        ],
      },

      {
        id:
          "cafe-section-1-grammar-2",

        title:
          "Could I have برای درخواست",

        explanation:
          "Could I have...? یک ساختار مؤدبانه برای درخواست چیزی است و در مکالمات خدماتی بسیار رایج است.",

        pattern:
          "Could I have + noun + ?",

        examples: [
          {
            id:
              "cafe-section-1-grammar-2-example-1",

            source:
              "Could I have one of those too?",

            translation:
              "می‌توانم یکی از آن‌ها را هم داشته باشم؟",
          },

          {
            id:
              "cafe-section-1-grammar-2-example-2",

            source:
              "Could I have the bill, please?",

            translation:
              "می‌توانم لطفاً صورت‌حساب را داشته باشم؟",
          },
        ],
      },
    ],

    comprehensionQuestions: [
      {
        id:
          "cafe-section-1-question-1",

        prompt:
          "What drink did Maya order?",

        options: [
          {
            id:
              "cafe-section-1-question-1-option-a",

            label:
              "A small black coffee",
          },

          {
            id:
              "cafe-section-1-question-1-option-b",

            label:
              "A medium latte with oat milk",
          },

          {
            id:
              "cafe-section-1-question-1-option-c",

            label:
              "A large tea",
          },
        ],

        correctOptionId:
          "cafe-section-1-question-1-option-b",

        explanation:
          "Maya asked for a medium latte with oat milk.",
      },

      {
        id:
          "cafe-section-1-question-2",

        prompt:
          "Where did Maya want to have her order?",

        options: [
          {
            id:
              "cafe-section-1-question-2-option-a",

            label:
              "At the café",
          },

          {
            id:
              "cafe-section-1-question-2-option-b",

            label:
              "At her office",
          },

          {
            id:
              "cafe-section-1-question-2-option-c",

            label:
              "At home",
          },
        ],

        correctOptionId:
          "cafe-section-1-question-2-option-a",

        explanation:
          "Maya answered “For here, please,” so she planned to stay in the café.",
      },
    ],
  },
] satisfies readonly ReadingSectionDetail[];