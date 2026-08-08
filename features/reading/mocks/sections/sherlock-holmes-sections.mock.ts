
import type {
  ReadingSectionDetail,
} from "../../types/reading.types";

export const sherlockHolmesSectionsMock = [
  {
    id: "blue-carbuncle-section-1",
    resourceId: "sherlock-holmes-blue-carbuncle",

    resourceTitle:
      "The Adventure of the Blue Carbuncle",

    resourceAuthor: "Arthur Conan Doyle",

    languageCode: "en",
    cefrLevel: "B1",

    order: 1,

    title: "بخش اول: یک کلاه قدیمی",

    summary:
      "واتسون در روز کریسمس به دیدن هولمز می‌رود و با یک کلاه کهنه و یک غاز روبه‌رو می‌شود.",

    wordCount: 420,
    estimatedMinutes: 12,

    status: "completed",
    audioStatus: "ready",
    audioUrl: null,

    vocabularyCount: 4,
    grammarPointCount: 2,

    previousSectionId: null,
    nextSectionId: "blue-carbuncle-section-2",

    content: [
      {
        id: "blue-section-1-paragraph-1",
        order: 1,

        text:
          "On the second morning after Christmas, Watson visited Sherlock Holmes. Holmes was sitting near the fire, studying an old black hat that had been left in the street together with a large white goose.",

        translation:
          "صبح دوم پس از کریسمس، واتسون به دیدن شرلوک هولمز رفت. هولمز کنار آتش نشسته بود و یک کلاه سیاه قدیمی را بررسی می‌کرد که همراه با یک غاز سفید بزرگ در خیابان جا مانده بود.",

        note:
          "عبارت was sitting نمونه‌ای از Past Continuous است و عملی را نشان می‌دهد که در زمان ورود واتسون در حال انجام بوده است.",
      },

      {
        id: "blue-section-1-paragraph-2",
        order: 2,

        text:
          "A man named Peterson had found the objects after a small street fight. The owner had run away, and there was no clear name or address inside the hat.",

        translation:
          "مردی به نام پترسون این اشیا را پس از یک درگیری کوچک خیابانی پیدا کرده بود. صاحب آن‌ها فرار کرده بود و داخل کلاه نام یا نشانی مشخصی وجود نداشت.",

        note:
          "ساختارهای had found و had run away در زمان Past Perfect هستند و اتفاق‌هایی را نشان می‌دهند که پیش از زمان اصلی داستان رخ داده‌اند.",
      },

      {
        id: "blue-section-1-paragraph-3",
        order: 3,

        text:
          "Watson first saw only a damaged hat. Holmes, however, noticed its size, its dusty surface, and the way it had been repaired. From these details, he began to build a picture of the unknown owner.",

        translation:
          "واتسون در ابتدا فقط یک کلاه آسیب‌دیده دید. اما هولمز به اندازه آن، سطح خاک‌آلودش و شیوه تعمیرشدن آن توجه کرد. او از این جزئیات شروع به ساختن تصویری از صاحب ناشناس کرد.",

        note:
          "however برای ایجاد تضاد میان نگاه ساده واتسون و مشاهده دقیق هولمز استفاده شده است.",
      },
    ],

    vocabulary: [
      {
        id: "blue-section-1-vocabulary-observation",

        term: "observation",
        pronunciation: "/ˌɒbzəˈveɪʃən/",
        partOfSpeech: "noun",

        meaning: "مشاهده",

        contextualMeaning:
          "بررسی آگاهانه و دقیق جزئیات برای رسیدن به یک نتیجه",

        example:
          "Careful observation helped Holmes understand the owner.",

        exampleTranslation:
          "مشاهده دقیق به هولمز کمک کرد صاحب کلاه را بهتر بشناسد.",

        isCore: true,
      },

      {
        id: "blue-section-1-vocabulary-reveal",

        term: "reveal",
        pronunciation: "/rɪˈviːl/",
        partOfSpeech: "verb",

        meaning: "آشکار کردن",

        contextualMeaning:
          "نشان‌دادن اطلاعاتی که پیش از این مشخص نبوده است",

        example:
          "Small details can reveal an unexpected story.",

        exampleTranslation:
          "جزئیات کوچک می‌توانند داستانی غیرمنتظره را آشکار کنند.",

        isCore: true,
      },

      {
        id: "blue-section-1-vocabulary-damaged",

        term: "damaged",
        pronunciation: "/ˈdæmɪdʒd/",
        partOfSpeech: "adjective",

        meaning: "آسیب‌دیده",

        contextualMeaning:
          "چیزی که ظاهر یا کیفیت آن بر اثر استفاده یا حادثه خراب شده است",

        example:
          "The damaged hat looked old and dusty.",

        exampleTranslation:
          "کلاه آسیب‌دیده، قدیمی و خاک‌آلود به نظر می‌رسید.",

        isCore: false,
      },

      {
        id: "blue-section-1-vocabulary-unknown",

        term: "unknown",
        pronunciation: "/ˌʌnˈnəʊn/",
        partOfSpeech: "adjective",

        meaning: "ناشناخته",

        contextualMeaning:
          "شخص یا چیزی که هویت آن هنوز مشخص نشده است",

        example:
          "Holmes studied the belongings of an unknown man.",

        exampleTranslation:
          "هولمز وسایل یک مرد ناشناس را بررسی کرد.",

        isCore: false,
      },
    ],

    grammarPoints: [
      {
        id: "blue-section-1-grammar-past-perfect",

        title:
          "Past Perfect برای ترتیب اتفاق‌های گذشته",

        explanation:
          "از Past Perfect برای اتفاقی استفاده می‌کنیم که پیش از یک اتفاق دیگر در گذشته رخ داده است.",

        pattern:
          "Subject + had + past participle",

        examples: [
          {
            id: "blue-section-1-past-perfect-example-1",

            source:
              "Peterson had found the objects before Watson arrived.",

            translation:
              "پترسون پیش از رسیدن واتسون اشیا را پیدا کرده بود.",
          },

          {
            id: "blue-section-1-past-perfect-example-2",

            source:
              "The owner had run away.",

            translation:
              "صاحب وسایل فرار کرده بود.",
          },
        ],
      },

      {
        id: "blue-section-1-grammar-however",

        title:
          "ایجاد تضاد با however",

        explanation:
          "however برای متصل‌کردن دو ایده متضاد استفاده می‌شود و معمولاً پس از آن ویرگول قرار می‌گیرد.",

        pattern:
          "Sentence. However, contrasting sentence.",

        examples: [
          {
            id: "blue-section-1-however-example-1",

            source:
              "Watson saw an old hat. However, Holmes saw useful evidence.",

            translation:
              "واتسون یک کلاه قدیمی دید؛ اما هولمز مدرکی مفید دید.",
          },
        ],
      },
    ],

    comprehensionQuestions: [
      {
        id: "blue-section-1-question-1",

        prompt:
          "Who found the hat and the goose?",

        options: [
          {
            id: "blue-section-1-question-1-option-a",
            label: "Watson",
          },
          {
            id: "blue-section-1-question-1-option-b",
            label: "Peterson",
          },
          {
            id: "blue-section-1-question-1-option-c",
            label: "Sherlock Holmes",
          },
        ],

        correctOptionId:
          "blue-section-1-question-1-option-b",

        explanation:
          "Peterson found the hat and the goose after a small street fight.",
      },

      {
        id: "blue-section-1-question-2",

        prompt:
          "What did Holmes use to understand the unknown owner?",

        options: [
          {
            id: "blue-section-1-question-2-option-a",
            label: "A written address",
          },
          {
            id: "blue-section-1-question-2-option-b",
            label: "Watson's memory",
          },
          {
            id: "blue-section-1-question-2-option-c",
            label: "Small visible details",
          },
        ],

        correctOptionId:
          "blue-section-1-question-2-option-c",

        explanation:
          "Holmes studied details such as the size, dust and repairs of the hat.",
      },
    ],
  },

  {
    id: "blue-carbuncle-section-2",
    resourceId: "sherlock-holmes-blue-carbuncle",

    resourceTitle:
      "The Adventure of the Blue Carbuncle",

    resourceAuthor: "Arthur Conan Doyle",

    languageCode: "en",
    cefrLevel: "B1",

    order: 2,

    title: "بخش دوم: صاحب ناشناس",

    summary:
      "هولمز با مشاهده کلاه، اطلاعات زیادی درباره صاحب آن نتیجه‌گیری می‌کند.",

    wordCount: 455,
    estimatedMinutes: 13,

    status: "available",
    audioStatus: "ready",
    audioUrl: null,

    vocabularyCount: 4,
    grammarPointCount: 2,

    previousSectionId:
      "blue-carbuncle-section-1",

    nextSectionId: null,

    content: [
      {
        id: "blue-section-2-paragraph-1",
        order: 1,

        text:
          "Holmes explained that the hat had once been expensive, but its owner could no longer afford to replace it. The man was probably intelligent because the hat was unusually large.",

        translation:
          "هولمز توضیح داد که کلاه زمانی گران‌قیمت بوده است، اما صاحبش دیگر توان مالی جایگزین‌کردن آن را نداشت. این مرد احتمالاً باهوش بود، زیرا کلاه اندازه‌ای غیرمعمول داشت.",

        note:
          "عبارت could no longer afford یعنی شخص دیگر توان مالی انجام یا خرید چیزی را نداشته است.",
      },

      {
        id: "blue-section-2-paragraph-2",
        order: 2,

        text:
          "Watson was surprised by the number of conclusions. Holmes reminded him that each conclusion came from a visible clue: the quality of the material, the repairs, the dust, and several grey hairs inside the hat.",

        translation:
          "واتسون از تعداد نتیجه‌گیری‌ها شگفت‌زده شد. هولمز به او یادآوری کرد که هر نتیجه از یک سرنخ قابل مشاهده آمده است: کیفیت جنس، تعمیرها، گردوغبار و چند تار موی خاکستری داخل کلاه.",

        note:
          "عبارت come from برای بیان منشأ یک نتیجه، ایده یا اتفاق استفاده می‌شود.",
      },

      {
        id: "blue-section-2-paragraph-3",
        order: 3,

        text:
          "The reasoning was not magic. Holmes compared possible explanations and chose the one that best matched all the evidence. Watson began to understand that good reasoning requires both attention and restraint.",

        translation:
          "این استدلال جادو نبود. هولمز توضیح‌های احتمالی را مقایسه کرد و موردی را انتخاب کرد که با همه شواهد بیشترین هماهنگی را داشت. واتسون کم‌کم فهمید استدلال خوب هم به توجه و هم به خویشتن‌داری نیاز دارد.",

        note:
          "best matched نشان می‌دهد یک گزینه در مقایسه با گزینه‌های دیگر هماهنگی بیشتری با شواهد داشته است.",
      },
    ],

    vocabulary: [
      {
        id: "blue-section-2-vocabulary-afford",

        term: "afford",
        pronunciation: "/əˈfɔːd/",
        partOfSpeech: "verb",

        meaning: "توان مالی داشتن",

        contextualMeaning:
          "داشتن پول کافی برای خرید یا انجام کاری",

        example:
          "The owner could not afford a new hat.",

        exampleTranslation:
          "صاحب کلاه توان مالی خرید یک کلاه جدید را نداشت.",

        isCore: true,
      },

      {
        id: "blue-section-2-vocabulary-conclusion",

        term: "conclusion",
        pronunciation: "/kənˈkluːʒən/",
        partOfSpeech: "noun",

        meaning: "نتیجه‌گیری",

        contextualMeaning:
          "نتیجه‌ای که با بررسی اطلاعات و شواهد به دست می‌آید",

        example:
          "Every conclusion needed a visible clue.",

        exampleTranslation:
          "هر نتیجه‌گیری به یک سرنخ قابل مشاهده نیاز داشت.",

        isCore: true,
      },

      {
        id: "blue-section-2-vocabulary-evidence",

        term: "evidence",
        pronunciation: "/ˈevɪdəns/",
        partOfSpeech: "noun",

        meaning: "شواهد",

        contextualMeaning:
          "اطلاعات یا نشانه‌هایی که از یک ادعا یا نتیجه پشتیبانی می‌کنند",

        example:
          "Holmes compared the explanation with the evidence.",

        exampleTranslation:
          "هولمز توضیح را با شواهد مقایسه کرد.",

        isCore: true,
      },

      {
        id: "blue-section-2-vocabulary-restraint",

        term: "restraint",
        pronunciation: "/rɪˈstreɪnt/",
        partOfSpeech: "noun",

        meaning: "خویشتن‌داری",

        contextualMeaning:
          "کنترل‌کردن خود و پرهیز از تصمیم یا نتیجه‌گیری عجولانه",

        example:
          "Good reasoning requires attention and restraint.",

        exampleTranslation:
          "استدلال خوب به توجه و خویشتن‌داری نیاز دارد.",

        isCore: false,
      },
    ],

    grammarPoints: [
      {
        id: "blue-section-2-grammar-modal-deduction",

        title:
          "افعال Modal برای احتمال و نتیجه‌گیری",

        explanation:
          "برای بیان میزان اطمینان درباره یک نتیجه می‌توان از افعالی مانند might، could و must استفاده کرد.",

        pattern:
          "Subject + modal + base verb",

        examples: [
          {
            id: "blue-section-2-modal-example-1",

            source:
              "The owner might be an older man.",

            translation:
              "ممکن است صاحب کلاه مردی مسن باشد.",
          },

          {
            id: "blue-section-2-modal-example-2",

            source:
              "He could no longer afford a replacement.",

            translation:
              "او دیگر توان مالی خرید یک جایگزین را نداشت.",
          },
        ],
      },

      {
        id: "blue-section-2-grammar-relative-clause",

        title:
          "Relative Clause با that",

        explanation:
          "that می‌تواند جمله‌ای را آغاز کند که اطلاعات تکمیلی درباره اسم قبل از خود ارائه می‌دهد.",

        pattern:
          "noun + that + verb",

        examples: [
          {
            id: "blue-section-2-relative-example-1",

            source:
              "Holmes chose the explanation that matched the evidence.",

            translation:
              "هولمز توضیحی را انتخاب کرد که با شواهد هماهنگ بود.",
          },
        ],
      },
    ],

    comprehensionQuestions: [
      {
        id: "blue-section-2-question-1",

        prompt:
          "Why did Holmes think the owner was intelligent?",

        options: [
          {
            id: "blue-section-2-question-1-option-a",
            label: "Because the hat was unusually large",
          },
          {
            id: "blue-section-2-question-1-option-b",
            label: "Because the hat was new",
          },
          {
            id: "blue-section-2-question-1-option-c",
            label: "Because Watson knew him",
          },
        ],

        correctOptionId:
          "blue-section-2-question-1-option-a",

        explanation:
          "In Holmes's reasoning, the unusually large hat suggested that its owner was intelligent.",
      },

      {
        id: "blue-section-2-question-2",

        prompt:
          "What made Holmes's reasoning reliable?",

        options: [
          {
            id: "blue-section-2-question-2-option-a",
            label: "He guessed without checking details",
          },
          {
            id: "blue-section-2-question-2-option-b",
            label: "He matched explanations with evidence",
          },
          {
            id: "blue-section-2-question-2-option-c",
            label: "He already knew the owner",
          },
        ],

        correctOptionId:
          "blue-section-2-question-2-option-b",

        explanation:
          "Holmes compared possible explanations and selected the one that matched all the visible evidence.",
      },
    ],
  },
] satisfies readonly ReadingSectionDetail[];