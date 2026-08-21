import type {
  ReadingExpressionItem,
  ReadingSectionDetail,
} from "../types/reading.types";

type GrammarEnrichment =
  Readonly<{
    sourceBlockId:
      string;

    masteryTip:
      string;

    commonMistake:
      string;

    practicePrompt:
      string;
  }>;

const CONCEPTS:
  Readonly<
    Record<
      string,
      string
    >
  > = {
    "blue-section-1-paragraph-1":
      "این پاراگراف صحنه شروع داستان را می‌سازد: واتسون وارد می‌شود و هولمز در حال بررسی دو شیء ظاهراً عادی است که بعداً اهمیت پیدا می‌کنند.",

    "blue-section-1-paragraph-2":
      "اطلاعات این بخش توضیح می‌دهد اشیا چگونه پیدا شده‌اند و چرا هویت صاحب آن‌ها هنوز نامشخص است.",

    "blue-section-1-paragraph-3":
      "تفاوت اصلی واتسون و هولمز برجسته می‌شود؛ واتسون فقط یک کلاه قدیمی می‌بیند اما هولمز جزئیات را به شواهد تبدیل می‌کند.",

    "blue-section-2-paragraph-1":
      "هولمز از وضعیت و اندازه کلاه برای ساختن فرضیه‌هایی درباره وضعیت مالی و ویژگی‌های صاحب آن استفاده می‌کند.",

    "blue-section-2-paragraph-2":
      "نویسنده تأکید می‌کند که نتیجه‌گیری‌های هولمز حدس تصادفی نیستند و هر کدام به یک سرنخ قابل مشاهده متصل‌اند.",

    "blue-section-2-paragraph-3":
      "پیام اصلی این قسمت درباره روش استدلال است: مقایسه توضیح‌های مختلف، تطبیق آن‌ها با شواهد و خودداری از نتیجه‌گیری عجولانه.",
  };

const VOCABULARY_BLOCKS:
  Readonly<
    Record<
      string,
      string
    >
  > = {
    "blue-section-1-vocabulary-observation":
      "blue-section-1-paragraph-3",

    "blue-section-1-vocabulary-reveal":
      "blue-section-1-paragraph-3",

    "blue-section-1-vocabulary-damaged":
      "blue-section-1-paragraph-3",

    "blue-section-1-vocabulary-unknown":
      "blue-section-1-paragraph-3",

    "blue-section-2-vocabulary-afford":
      "blue-section-2-paragraph-1",

    "blue-section-2-vocabulary-conclusion":
      "blue-section-2-paragraph-2",

    "blue-section-2-vocabulary-evidence":
      "blue-section-2-paragraph-3",

    "blue-section-2-vocabulary-restraint":
      "blue-section-2-paragraph-3",
  };

const GRAMMAR_ENRICHMENTS:
  Readonly<
    Record<
      string,
      GrammarEnrichment
    >
  > = {
    "blue-section-1-grammar-past-perfect": {
      sourceBlockId:
        "blue-section-1-paragraph-2",

      masteryTip:
        "وقتی دو اتفاق هر دو در گذشته‌اند، از Past Perfect برای اتفاقی استفاده کن که زودتر رخ داده است.",

      commonMistake:
        "برای هر فعل گذشته از had + past participle استفاده نکن؛ فقط زمانی لازم است که ترتیب دو اتفاق گذشته اهمیت داشته باشد.",

      practicePrompt:
        "یک جمله بساز که در آن یک اتفاق قبل از رسیدن شخص دیگری رخ داده باشد.",
    },

    "blue-section-1-grammar-however": {
      sourceBlockId:
        "blue-section-1-paragraph-3",

      masteryTip:
        "however را برای ایجاد Contrast بین دو ایده مستقل استفاده کن و به نشانه‌گذاری آن دقت داشته باش.",

      commonMistake:
        "however را دقیقاً مثل but بین دو Clause بدون نشانه‌گذاری مناسب قرار نده.",

      practicePrompt:
        "دو جمله متضاد درباره Watson و Holmes بنویس و آن‌ها را با however مرتبط کن.",
    },

    "blue-section-2-grammar-modal-deduction": {
      sourceBlockId:
        "blue-section-2-paragraph-1",

      masteryTip:
        "Modal را براساس میزان اطمینان انتخاب کن؛ might معمولاً احتمال ضعیف‌تری از must نشان می‌دهد.",

      commonMistake:
        "بعد از Modal از شکل ساده فعل استفاده می‌شود؛ نه infinitive همراه با to و نه فعل صرف‌شده.",

      practicePrompt:
        "با might، could و must سه حدس با سطح اطمینان متفاوت درباره صاحب کلاه بنویس.",
    },

    "blue-section-2-grammar-relative-clause": {
      sourceBlockId:
        "blue-section-2-paragraph-3",

      masteryTip:
        "Relative Clause را به اسمی بچسبان که می‌خواهی درباره آن اطلاعات بیشتری بدهی.",

      commonMistake:
        "فاعل یا مفعولی را که Relative Pronoun جایگزین آن شده دوباره داخل Clause تکرار نکن.",

      practicePrompt:
        "با الگوی noun + that + verb یک جمله درباره evidence بساز.",
    },
  };

const EXPRESSIONS:
  Readonly<
    Record<
      string,
      readonly ReadingExpressionItem[]
    >
  > = {
    "blue-carbuncle-section-1": [
      {
        id:
          "blue-section-1-expression-had-been-left",

        sourceBlockId:
          "blue-section-1-paragraph-1",

        expression:
          "had been left",

        meaning:
          "جا گذاشته شده بود",

        usageNote:
          "یک ساختار طبیعی برای توضیح چیزی است که پیش از نقطه اصلی روایت در جایی باقی مانده است.",

        example:
          "The bag had been left near the door.",

        exampleTranslation:
          "کیف نزدیک در جا گذاشته شده بود.",

        register:
          "neutral",

        isHighlighted:
          true,
      },

      {
        id:
          "blue-section-1-expression-run-away",

        sourceBlockId:
          "blue-section-1-paragraph-2",

        expression:
          "run away",

        meaning:
          "فرار کردن / از محل دور شدن",

        usageNote:
          "Phrasal verb بسیار رایج برای ترک سریع یک موقعیت یا مکان است.",

        example:
          "The man ran away before anyone could stop him.",

        exampleTranslation:
          "مرد پیش از آنکه کسی بتواند متوقفش کند فرار کرد.",

        register:
          "neutral",

        isHighlighted:
          true,
      },

      {
        id:
          "blue-section-1-expression-build-picture",

        sourceBlockId:
          "blue-section-1-paragraph-3",

        expression:
          "build a picture of",

        meaning:
          "به‌تدریج تصویری یا درکی از چیزی ساختن",

        usageNote:
          "برای زمانی مناسب است که از چند تکه اطلاعات، تصور کامل‌تری درباره یک فرد یا موقعیت ایجاد می‌کنیم.",

        example:
          "The interviews helped us build a picture of what happened.",

        exampleTranslation:
          "مصاحبه‌ها کمک کردند تصویری از آنچه اتفاق افتاده بود بسازیم.",

        register:
          "neutral",

        isHighlighted:
          true,
      },
    ],

    "blue-carbuncle-section-2": [
      {
        id:
          "blue-section-2-expression-could-no-longer-afford",

        sourceBlockId:
          "blue-section-2-paragraph-1",

        expression:
          "could no longer afford",

        meaning:
          "دیگر توان مالی انجام یا خرید چیزی را نداشت",

        usageNote:
          "ترکیب no longer با could برای نشان‌دادن از بین رفتن یک توانایی یا امکان قبلی بسیار طبیعی است.",

        example:
          "He could no longer afford to live in the city centre.",

        exampleTranslation:
          "او دیگر توان مالی زندگی در مرکز شهر را نداشت.",

        register:
          "neutral",

        isHighlighted:
          true,
      },

      {
        id:
          "blue-section-2-expression-come-from",

        sourceBlockId:
          "blue-section-2-paragraph-2",

        expression:
          "come from",

        meaning:
          "از چیزی ناشی شدن / منشأ داشتن",

        usageNote:
          "فقط برای مکان نیست؛ برای منشأ یک ایده، نتیجه، مشکل یا احساس هم کاربرد زیادی دارد.",

        example:
          "The conclusion comes from several small clues.",

        exampleTranslation:
          "این نتیجه‌گیری از چند سرنخ کوچک ناشی می‌شود.",

        register:
          "neutral",

        isHighlighted:
          true,
      },

      {
        id:
          "blue-section-2-expression-best-matched",

        sourceBlockId:
          "blue-section-2-paragraph-3",

        expression:
          "best matched the evidence",

        meaning:
          "بیشترین تطابق را با شواهد داشت",

        usageNote:
          "عبارتی کاربردی برای مقایسه چند توضیح و انتخاب گزینه‌ای است که با اطلاعات موجود هماهنگ‌تر است.",

        example:
          "We selected the theory that best matched the evidence.",

        exampleTranslation:
          "نظریه‌ای را انتخاب کردیم که بیشترین تطابق را با شواهد داشت.",

        register:
          "academic",

        isHighlighted:
          true,
      },

      {
        id:
          "blue-section-2-expression-requires-both",

        sourceBlockId:
          "blue-section-2-paragraph-3",

        expression:
          "requires both ... and ...",

        meaning:
          "هم به ... و هم به ... نیاز دارد",

        usageNote:
          "یک الگوی طبیعی برای تأکید بر ضروری‌بودن هم‌زمان دو عامل است.",

        example:
          "Good writing requires both clarity and practice.",

        exampleTranslation:
          "نوشتن خوب هم به وضوح و هم به تمرین نیاز دارد.",

        register:
          "neutral",

        isHighlighted:
          true,
      },
    ],
  };

export function enrichReadingSectionMock(
  section:
    ReadingSectionDetail,
): ReadingSectionDetail {
  const enrichedExpressions =
    EXPRESSIONS[
      section.id
    ] ??
    [];

  const existingExpressions =
    section.expressions ??
    [];

  const existingExpressionIds =
    new Set(
      existingExpressions.map(
        (
          item,
        ) =>
          item.id,
      ),
    );

  return {
    ...section,

    content:
      section.content.map(
        (
          block,
        ) => ({
          ...block,

          conceptSummary:
            CONCEPTS[
              block.id
            ] ??
            block.conceptSummary ??
            null,
        }),
      ),

    vocabulary:
      section.vocabulary.map(
        (
          item,
        ) => ({
          ...item,

          sourceBlockId:
            VOCABULARY_BLOCKS[
              item.id
            ] ??
            item.sourceBlockId ??
            null,
        }),
      ),

    grammarPoints:
      section.grammarPoints.map(
        (
          point,
        ) => {
          const enrichment =
            GRAMMAR_ENRICHMENTS[
              point.id
            ];

          if (
            !enrichment
          ) {
            return point;
          }

          return {
            ...point,

            ...enrichment,
          };
        },
      ),

    expressions: [
      ...existingExpressions,

      ...enrichedExpressions.filter(
        (
          item,
        ) =>
          !existingExpressionIds.has(
            item.id,
          ),
      ),
    ],
  };
}