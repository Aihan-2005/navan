export type ClassroomAssistantContextMessage =
  Readonly<{
    senderName: string;
    body: string;
  }>;

export type ClassroomAssistantRequest =
  Readonly<{
    question: string;

    recentMessages:
      readonly ClassroomAssistantContextMessage[];
  }>;

export type ClassroomAssistantReply =
  Readonly<{
    answer: string;

    suggestions:
      readonly string[];
  }>;

function getLatestConversationLine(
  messages:
    readonly ClassroomAssistantContextMessage[],
): string | null {
  const latest =
    messages[
      messages.length - 1
    ];

  if (!latest) {
    return null;
  }

  return latest.body.trim() ||
    null;
}



export async function getClassroomAssistantReply(
  request:
    ClassroomAssistantRequest,
): Promise<ClassroomAssistantReply> {
  const question =
    request.question
      .trim()
      .toLowerCase();

  const latestLine =
    getLatestConversationLine(
      request.recentMessages,
    );

  if (
    question.includes("گرامر") ||
    question.includes("grammar")
  ) {
    return {
      answer:
        "برای بررسی گرامر، اول جمله را به سه بخش نگاه کن: فاعل، زمان فعل و ادامه جمله. اگر جمله‌ای که می‌خواهی بررسی شود را دقیق بنویسی، می‌توانیم روی ساختار آن تمرکز کنیم. مثلاً در «I have been working here for two years»، از Present Perfect Continuous برای کاری استفاده شده که در گذشته شروع شده و هنوز ادامه دارد.",

      suggestions: [
        "یک مثال ساده‌تر بده",
        "فرقش با Present Perfect چیه؟",
        "۳ جمله برای تمرین بده",
      ],
    };
  }

  if (
    question.includes("جواب") ||
    question.includes("پاسخ") ||
    question.includes("چی بگم")
  ) {
    const context =
      latestLine
        ? `اگر منظورت پاسخ به جمله «${latestLine}» است، `
        : "";

    return {
      answer:
        `${context}بهتر است جواب کوتاه، طبیعی و قابل ادامه دادن باشد. می‌توانی از این الگو استفاده کنی: “That’s interesting. I think … because … . What about you?” این ساختار هم نظر خودت را می‌گوید و هم مکالمه را باز نگه می‌دارد.`,

      suggestions: [
        "جواب دوستانه‌تر بده",
        "جواب سطح B1 بده",
        "جواب حرفه‌ای‌تر بده",
      ],
    };
  }

  if (
    question.includes("طبیعی") ||
    question.includes("native") ||
    question.includes("عبارت")
  ) {
    return {
      answer:
        "برای طبیعی‌تر شدن مکالمه، به جای جمله‌های خیلی رسمی از عبارت‌های کوتاه استفاده کن: “That makes sense.”، “I’m not sure, but …”، “From my point of view …” و “That’s a good question.” این عبارت‌ها برای گرفتن زمان فکر کردن هم مفیدند.",

      suggestions: [
        "عبارت برای مخالفت بده",
        "عبارت برای موافقت بده",
        "عبارت برای وقت خریدن بده",
      ],
    };
  }

  if (
    question.includes("کلمه") ||
    question.includes("word") ||
    question.includes("واژه")
  ) {
    return {
      answer:
        "اگر یک واژه را یادت نیست، لازم نیست مکالمه را متوقف کنی. مفهومش را توضیح بده. مثلاً اگر “umbrella” یادت نیست بگو: “the thing you use when it rains”. این مهارت Paraphrasing در مکالمه واقعی خیلی مهم است.",

      suggestions: [
        "Paraphrasing تمرین کنیم",
        "۵ مثال دیگه بده",
        "واژه‌های همین بحث رو بگو",
      ],
    };
  }

  return {
    answer:
      "برای اینکه سریع‌تر کمکت کنم، می‌توانی جمله‌ای که می‌خواهی بگویی، سؤال طرف مقابل یا بخشی که در آن گیر کردی را بنویسی. من می‌توانم برای ساخت جواب، اصلاح جمله، انتخاب واژه یا توضیح گرامر کمکت کنم.",

    suggestions: [
      "برای جواب دادن کمکم کن",
      "جمله‌ام رو طبیعی‌تر کن",
      "گرامرش رو توضیح بده",
    ],
  };
}