import type {
  ReadingOverviewInput,
  ReadingResourceDetail,
  ReadingResourceSummary,
} from "../types/reading.types";

import {
  readingResourcesMock,
} from "./reading-resources.mock";

function findReadingResource(
  resourceId: string,
): ReadingResourceDetail {
  const resource =
    readingResourcesMock.find(
      (item) => item.id === resourceId,
    );

  if (!resource) {
    throw new Error(
      `Reading mock resource "${resourceId}" was not found.`,
    );
  }

  return resource;
}

function toReadingResourceSummary(
  resource: ReadingResourceDetail,
): ReadingResourceSummary {
  return {
    id: resource.id,

    title: resource.title,
    author: resource.author,
    description: resource.description,

    resourceType:
      resource.resourceType,

    sourceType:
      resource.sourceType,

    status:
      resource.status,

    languageCode:
      resource.languageCode,

    cefrLevel:
      resource.cefrLevel,

    coverImageUrl:
      resource.coverImageUrl,

    estimatedMinutes:
      resource.estimatedMinutes,

    totalSections:
      resource.totalSections,

    completedSections:
      resource.completedSections,

    progressPercent:
      resource.progressPercent,

    topics:
      resource.topics,

    learningFocuses:
      resource.learningFocuses,

    isFeatured:
      resource.isFeatured,
  };
}

const sherlockHolmesResource =
  toReadingResourceSummary(
    findReadingResource(
      "sherlock-holmes-blue-carbuncle",
    ),
  );

const everydayCafeResource =
  toReadingResourceSummary(
    findReadingResource(
      "everyday-english-cafe",
    ),
  );

const habitsResource =
  toReadingResourceSummary(
    findReadingResource(
      "science-of-habits",
    ),
  );

export const readingOverviewMock = {
  stats: {
    totalSessions: 18,
    weeklyMinutes: 94,
    completedSections: 27,
    masteredWords: 146,
    currentStreakDays: 5,
  },

  continueReading: {
    resourceId:
      sherlockHolmesResource.id,

    title:
      sherlockHolmesResource.title,

    currentSectionTitle:
      "بخش دوم: صاحب ناشناس",

    completedSections:
      sherlockHolmesResource.completedSections,

    totalSections:
      sherlockHolmesResource.totalSections,

    progressPercent:
      sherlockHolmesResource.progressPercent,

    updatedAt:
      "2026-08-02T12:30:00.000Z",
  },

  featuredResources: [
    sherlockHolmesResource,
    everydayCafeResource,
  ],

  recommendedResources: [
    habitsResource,
  ],

  learningJourney: {
    title:
      "مسیر یادگیری هر متن",

    description:
      "هر منبع به بخش‌های کوتاه تبدیل می‌شود و پس از یادگیری هر بخش، مرحله بعد در دسترس قرار می‌گیرد.",

    steps: [
      {
        id:
          "reading-journey-read-listen",

        order: 1,

        title:
          "خواندن و شنیدن بخش",

        description:
          "متن کوتاه را بخوان و هم‌زمان صوت طبیعی همان بخش را پخش کن.",

        status:
          "active",
      },

      {
        id:
          "reading-journey-sentence-analysis",

        order: 2,

        title:
          "تحلیل جمله‌های مهم",

        description:
          "ساختارهای گرامری، عبارت‌های طبیعی و دلیل اهمیت جمله‌ها را بررسی کن.",

        status:
          "upcoming",
      },

      {
        id:
          "reading-journey-vocabulary",

        order: 3,

        title:
          "یادگیری واژگان کلیدی",

        description:
          "معنی، تلفظ، نقش کلمه و مثال‌های مرتبط با متن را یاد بگیر.",

        status:
          "upcoming",
      },

      {
        id:
          "reading-journey-mastery",

        order: 4,

        title:
          "تأیید تسلط",

        description:
          "با یک مرور کوتاه، یادگیری بخش را تأیید کن تا بخش بعدی باز شود.",

        status:
          "upcoming",
      },
    ],
  },

  primaryInsight: {
    id:
      "reading-insight-001",

    type:
      "recommendation",

    title:
      "داستان‌های کوتاه B1 انتخاب مناسبی برای تو هستند",

    description:
      "در فعالیت‌های اخیر، درک ایده اصلی خوب بوده است؛ اما واژگان توصیفی و عبارت‌های چندکلمه‌ای به تمرین بیشتری نیاز دارند.",

    actionLabel:
      "مشاهده کتابخانه",

    actionHref:
      "/reading/library",

    createdAt:
      "2026-08-02T08:00:00.000Z",
  },

  recentActivities: [
    {
      id:
        "reading-activity-001",

      resourceId:
        sherlockHolmesResource.id,

      title:
        sherlockHolmesResource.title,

      sectionTitle:
        "بخش اول: یک کلاه قدیمی",

      durationMinutes: 16,
      learnedWords: 11,
      comprehensionScore: 84,

      completedAt:
        "2026-08-01T18:20:00.000Z",
    },

    {
      id:
        "reading-activity-002",

      resourceId:
        everydayCafeResource.id,

      title:
        everydayCafeResource.title,

      sectionTitle:
        "بخش اول: ورود و سفارش",

      durationMinutes: 12,
      learnedWords: 8,
      comprehensionScore: 91,

      completedAt:
        "2026-07-30T14:10:00.000Z",
    },
  ],
} satisfies ReadingOverviewInput;