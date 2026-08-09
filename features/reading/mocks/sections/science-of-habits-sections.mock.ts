import type {
  ReadingSectionDetail,
} from "../../types/reading.types";

export const scienceOfHabitsSectionsMock = [
  {
    id: "habits-section-1",

    resourceId:
      "science-of-habits",

    resourceTitle:
      "The Science of Small Habits",

    resourceAuthor:
      "MeowLingo Original",

    languageCode: "en",

    cefrLevel: "B2",

    order: 1,

    title:
      "بخش اول: عادت چگونه شکل می‌گیرد؟",

    summary:
      "توضیح چرخه نشانه، رفتار و پاداش.",

    wordCount: 365,

    estimatedMinutes: 8,

    status: "available",

    audioStatus: "ready",

    audioUrl: null,

    vocabularyCount: 13,

    grammarPointCount: 2,

    previousSectionId: null,

    nextSectionId: null,

    content: [
      {
        id:
          "habits-section-1-paragraph-1",

        order: 1,

        text:
          "A habit is a behavior that becomes easier and more automatic through repetition. At first, a person may need to make a conscious decision to perform an action, but repeated actions gradually require less mental effort.",

        translation:
          "عادت رفتاری است که از طریق تکرار آسان‌تر و خودکارتر می‌شود. در ابتدا ممکن است فرد برای انجام یک کار نیاز به تصمیم آگاهانه داشته باشد، اما کارهای تکراری به‌تدریج به تلاش ذهنی کمتری نیاز دارند.",

        note:
          "واژه gradually یک Linking Adverb است و تغییر تدریجی در طول زمان را بیان می‌کند.",
      },

      {
        id:
          "habits-section-1-paragraph-2",

        order: 2,

        text:
          "Researchers often describe habits as a cycle with three important parts: a cue, a routine, and a reward. The cue triggers the behavior, the routine is the behavior itself, and the reward helps the brain remember that the behavior was useful.",

        translation:
          "پژوهشگران اغلب عادت‌ها را به‌صورت چرخه‌ای با سه بخش مهم توصیف می‌کنند: نشانه، رفتار تکرارشونده و پاداش. نشانه رفتار را فعال می‌کند، روتین خود رفتار است و پاداش به مغز کمک می‌کند به خاطر بسپارد که آن رفتار مفید بوده است.",

        note:
          "ساختار describe something as something یعنی چیزی را به شکل یا عنوان خاصی توصیف‌کردن.",
      },

      {
        id:
          "habits-section-1-paragraph-3",

        order: 3,

        text:
          "When the same cue and reward appear repeatedly in a consistent context, the association between them becomes stronger. Eventually, the cue can trigger the routine before a person has consciously considered what to do.",

        translation:
          "وقتی همان نشانه و پاداش بارها در یک شرایط ثابت ظاهر شوند، ارتباط میان آن‌ها قوی‌تر می‌شود. در نهایت، نشانه می‌تواند پیش از آنکه فرد آگاهانه درباره کاری که باید انجام دهد فکر کند، روتین را فعال کند.",

        note:
          "Eventually به نتیجه‌ای اشاره می‌کند که پس از یک فرایند یا گذشت زمان رخ می‌دهد.",
      },
    ],

    vocabulary: [
      {
        id:
          "habits-section-1-vocabulary-1",

        term: "habit",

        pronunciation:
          "/ˈhæbɪt/",

        partOfSpeech: "noun",

        meaning: "عادت",

        contextualMeaning:
          "رفتاری که بر اثر تکرار به‌صورت نسبتاً خودکار انجام می‌شود.",

        example:
          "Reading before bed became a habit.",

        exampleTranslation:
          "مطالعه قبل از خواب به یک عادت تبدیل شد.",

        isCore: true,
      },

      {
        id:
          "habits-section-1-vocabulary-2",

        term: "behavior",

        pronunciation:
          "/bɪˈheɪvjər/",

        partOfSpeech: "noun",

        meaning: "رفتار",

        contextualMeaning:
          "عمل یا شیوه‌ای که یک فرد در شرایط مشخص انجام می‌دهد.",

        example:
          "The study focused on human behavior.",

        exampleTranslation:
          "این پژوهش بر رفتار انسان تمرکز داشت.",

        isCore: true,
      },

      {
        id:
          "habits-section-1-vocabulary-3",

        term: "automatic",

        pronunciation:
          "/ˌɔːtəˈmætɪk/",

        partOfSpeech:
          "adjective",

        meaning: "خودکار",

        contextualMeaning:
          "کاری که بدون نیاز به تصمیم‌گیری آگاهانه زیاد انجام می‌شود.",

        example:
          "The response eventually became automatic.",

        exampleTranslation:
          "پاسخ در نهایت خودکار شد.",

        isCore: true,
      },

      {
        id:
          "habits-section-1-vocabulary-4",

        term: "repetition",

        pronunciation:
          "/ˌrepəˈtɪʃən/",

        partOfSpeech: "noun",

        meaning: "تکرار",

        contextualMeaning:
          "انجام دوباره و دوباره یک عمل.",

        example:
          "Repetition can strengthen a skill.",

        exampleTranslation:
          "تکرار می‌تواند یک مهارت را تقویت کند.",

        isCore: true,
      },

      {
        id:
          "habits-section-1-vocabulary-5",

        term: "conscious",

        pronunciation:
          "/ˈkɒnʃəs/",

        partOfSpeech:
          "adjective",

        meaning: "آگاهانه",

        contextualMeaning:
          "حالتی که فرد عمداً درباره تصمیم یا عمل خود فکر می‌کند.",

        example:
          "It was a conscious decision.",

        exampleTranslation:
          "این یک تصمیم آگاهانه بود.",

        isCore: false,
      },

      {
        id:
          "habits-section-1-vocabulary-6",

        term: "cue",

        pronunciation:
          "/kjuː/",

        partOfSpeech: "noun",

        meaning: "نشانه",

        contextualMeaning:
          "محرکی که شروع یک رفتار یا عادت را یادآوری می‌کند.",

        example:
          "The alarm became a cue to start exercising.",

        exampleTranslation:
          "زنگ ساعت به نشانه‌ای برای شروع ورزش تبدیل شد.",

        isCore: true,
      },

      {
        id:
          "habits-section-1-vocabulary-7",

        term: "routine",

        pronunciation:
          "/ruːˈtiːn/",

        partOfSpeech: "noun",

        meaning:
          "روتین، رفتار تکراری",

        contextualMeaning:
          "بخش عملی چرخه عادت؛ همان رفتاری که انجام می‌شود.",

        example:
          "Walking after dinner is part of my routine.",

        exampleTranslation:
          "پیاده‌روی بعد از شام بخشی از روتین من است.",

        isCore: true,
      },

      {
        id:
          "habits-section-1-vocabulary-8",

        term: "reward",

        pronunciation:
          "/rɪˈwɔːrd/",

        partOfSpeech: "noun",

        meaning: "پاداش",

        contextualMeaning:
          "نتیجه مثبت یا رضایت‌بخشی که باعث تقویت رفتار می‌شود.",

        example:
          "The feeling of progress acts as a reward.",

        exampleTranslation:
          "احساس پیشرفت مانند یک پاداش عمل می‌کند.",

        isCore: true,
      },

      {
        id:
          "habits-section-1-vocabulary-9",

        term: "trigger",

        pronunciation:
          "/ˈtrɪɡər/",

        partOfSpeech: "verb",

        meaning:
          "فعال‌کردن، باعث‌شدن",

        contextualMeaning:
          "باعث آغازشدن یک واکنش یا رفتار شدن.",

        example:
          "Stress can trigger unhealthy habits.",

        exampleTranslation:
          "استرس می‌تواند عادت‌های ناسالم را فعال کند.",

        isCore: true,
      },

      {
        id:
          "habits-section-1-vocabulary-10",

        term: "association",

        pronunciation:
          "/əˌsəʊsiˈeɪʃən/",

        partOfSpeech: "noun",

        meaning:
          "ارتباط ذهنی",

        contextualMeaning:
          "پیوندی که مغز بین یک نشانه و رفتار ایجاد می‌کند.",

        example:
          "The brain forms an association between the sound and the action.",

        exampleTranslation:
          "مغز میان صدا و عمل یک ارتباط ایجاد می‌کند.",

        isCore: false,
      },

      {
        id:
          "habits-section-1-vocabulary-11",

        term: "consistent",

        pronunciation:
          "/kənˈsɪstənt/",

        partOfSpeech:
          "adjective",

        meaning: "ثابت، منظم",

        contextualMeaning:
          "چیزی که به شکل مشابه و منظم ادامه پیدا می‌کند.",

        example:
          "Consistent practice produces better results.",

        exampleTranslation:
          "تمرین منظم نتایج بهتری ایجاد می‌کند.",

        isCore: true,
      },

      {
        id:
          "habits-section-1-vocabulary-12",

        term: "gradually",

        pronunciation:
          "/ˈɡrædʒuəli/",

        partOfSpeech: "adverb",

        meaning:
          "به‌تدریج",

        contextualMeaning:
          "تغییری که آهسته و در طول زمان رخ می‌دهد.",

        example:
          "The task gradually became easier.",

        exampleTranslation:
          "کار به‌تدریج آسان‌تر شد.",

        isCore: false,
      },

      {
        id:
          "habits-section-1-vocabulary-13",

        term: "eventually",

        pronunciation:
          "/ɪˈventʃuəli/",

        partOfSpeech: "adverb",

        meaning:
          "در نهایت",

        contextualMeaning:
          "نتیجه‌ای که پس از مدتی یا پس از طی یک فرایند رخ می‌دهد.",

        example:
          "The new behavior eventually became a habit.",

        exampleTranslation:
          "رفتار جدید در نهایت به یک عادت تبدیل شد.",

        isCore: false,
      },
    ],

    grammarPoints: [
      {
        id:
          "habits-section-1-grammar-1",

        title:
          "Present Simple برای بیان واقعیت‌های عمومی",

        explanation:
          "در متن‌های علمی و آموزشی، Present Simple برای توضیح فرایندها، واقعیت‌ها و الگوهایی استفاده می‌شود که به‌طور کلی درست هستند.",

        pattern:
          "Subject + base verb / verb-s",

        examples: [
          {
            id:
              "habits-section-1-grammar-1-example-1",

            source:
              "The cue triggers the behavior.",

            translation:
              "نشانه رفتار را فعال می‌کند.",
          },

          {
            id:
              "habits-section-1-grammar-1-example-2",

            source:
              "The reward helps the brain remember the behavior.",

            translation:
              "پاداش به مغز کمک می‌کند رفتار را به خاطر بسپارد.",
          },
        ],
      },

      {
        id:
          "habits-section-1-grammar-2",

        title:
          "When برای بیان رابطه شرط و نتیجه",

        explanation:
          "When می‌تواند برای توضیح موقعیتی استفاده شود که وقوع آن باعث نتیجه‌ای قابل پیش‌بینی یا عمومی می‌شود.",

        pattern:
          "When + present simple, present simple",

        examples: [
          {
            id:
              "habits-section-1-grammar-2-example-1",

            source:
              "When a behavior is repeated, it becomes easier.",

            translation:
              "وقتی یک رفتار تکرار می‌شود، آسان‌تر می‌شود.",
          },

          {
            id:
              "habits-section-1-grammar-2-example-2",

            source:
              "When the cue appears, the routine can begin automatically.",

            translation:
              "وقتی نشانه ظاهر می‌شود، روتین می‌تواند به‌طور خودکار آغاز شود.",
          },
        ],
      },
    ],

    comprehensionQuestions: [
      {
        id:
          "habits-section-1-question-1",

        prompt:
          "What are the three main parts of the habit cycle described in the text?",

        options: [
          {
            id:
              "habits-section-1-question-1-option-a",

            label:
              "Cue, routine, and reward",
          },

          {
            id:
              "habits-section-1-question-1-option-b",

            label:
              "Planning, effort, and failure",
          },

          {
            id:
              "habits-section-1-question-1-option-c",

            label:
              "Memory, sleep, and motivation",
          },
        ],

        correctOptionId:
          "habits-section-1-question-1-option-a",

        explanation:
          "The text describes a habit as a cycle made of a cue, a routine, and a reward.",
      },

      {
        id:
          "habits-section-1-question-2",

        prompt:
          "What happens when the same cue and reward are repeated in a consistent context?",

        options: [
          {
            id:
              "habits-section-1-question-2-option-a",

            label:
              "The association becomes stronger",
          },

          {
            id:
              "habits-section-1-question-2-option-b",

            label:
              "The behavior immediately disappears",
          },

          {
            id:
              "habits-section-1-question-2-option-c",

            label:
              "The person always needs more mental effort",
          },
        ],

        correctOptionId:
          "habits-section-1-question-2-option-a",

        explanation:
          "Repeated cues and rewards strengthen the mental association between the cue and the routine.",
      },
    ],
  },
] satisfies readonly ReadingSectionDetail[];