import type {
  ReadingOverviewInput,
  ReadingResourceDetail,
  ReadingResourceSummary,
} from "../types/reading.types";

import {
  readingResourcesMock,
} from "./reading-resources.mock";

function findReadingResource(
  resourceId:
    string,
): ReadingResourceDetail {
  const resource =
    readingResourcesMock.find(
      (item) =>
        item.id ===
        resourceId,
    );

  if (!resource) {
    throw new Error(
      `Reading mock resource "${resourceId}" was not found.`,
    );
  }

  return resource;
}

function toReadingResourceSummary(
  resource:
    ReadingResourceDetail,
): ReadingResourceSummary {
  return {
    id:
      resource.id,

    title:
      resource.title,

    author:
      resource.author,

    description:
      resource.description,

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
    totalSessions: 26,

    weeklyMinutes: 68,

    completedSections: 27,

 masteredWords: 146,

    currentStreakDays: 6,
  },

  continueReading: {
    resourceId:
      sherlockHolmesResource.id,

    title:
      sherlockHolmesResource.title,

    currentSectionId:
      "blue-carbuncle-section-2",

    currentSectionTitle:
      "بخش دوم: صاحب ناشناس",

    currentSectionOrder: 2,

    completedSections: 1,

    totalSections: 5,

    progressPercent: 42,

    remainingMinutes: 12,

    comprehensionScore: 84,

    updatedAt: "2026-08-13T18:30:00.000Z",
  },

  weeklyGoal: {
    targetSections: 4,

    completedSections: 2,

    targetNewWords: 20,

    reviewedWords: 8,
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
      "مسیر یادگیری این متن",

    description:
      "مراحل را به ترتیب برای تسلط کامل طی کنید.",

    steps: [
      {id:
          "reading-journey-read-listen",

        order: 1,

        title:
          "خواندن و شنیدن بخش",

        description:
          "متن کوتاه را بخوان و همزمان صوت طبیعی همان بخش را پخش کن.",

        status:
          "completed",
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
          "active",
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
      }, ],
  },

  primaryInsight: {
    id:
      "reading-insight-001",

    type:
      "recommendation",

    title:
      "پیشنهاد مربی هوشمند",

    description:
      "با توجه به پیشرفت اخیر شما در درک مطلب، خواندن داستان‌های کوتاه سطح B1 با تمرکز بر اصطلاحات روزمره پیشنهاد می‌شود.",

    actionLabel:
      "مشاهده پیشنهادها",

    /**
     * در این مرحله Library پیشنهادی
     * را وارد جریان نمی‌کنیم.
     */
    actionHref:
      null,

    createdAt:
      "2026-08-13T08:00:00.000Z",
  },

  recentActivities: [
    {id:
        "reading-activity-001",

      resourceId:
        sherlockHolmesResource.id,

      title:
        sherlockHolmesResource.title,

      sectionTitle:
        "بخش اول",

      durationMinutes: 16,

      learnedWords: 11,

      comprehensionScore: 84,

      completedAt:
        "2026-08-11T18:20:00.000Z",
    },

    {
      id:
        "reading-activity-002",

      resourceId: everydayCafeResource.id,

      title:
        everydayCafeResource.title,

      sectionTitle:
        "بخش اول",

      durationMinutes: 12,

      learnedWords: 8,

      comprehensionScore: 91,

      completedAt:
        "2026-08-06T14:10:00.000Z",
    },
  ],
} satisfies ReadingOverviewInput;