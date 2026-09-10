import {
  SKILL_ASSESSMENT_CATALOG,
  type SkillAssessmentCatalogItem,
} from "../constants/skill-assessment.catalog";

import {
  assessmentDefinitionSchema,
} from "../schemas/assessment.schema";

import type {
  AssessmentQuestion,
  AssessmentSkill,
} from "../types/assessment-question.types";

import type {
  AssessmentDefinition,
} from "../types/assessment.types";

import {
  adaptivePlacementAssessmentMock,
} from "./adaptive-placement-assessment.mock";

const CREATED_AT =
  "2026-09-10T00:00:00.000Z";

const writingQuestions =
  [
    {
      id:
        "skill-writing-001",

      type:
        "short_text",

      skill:
        "writing",

      cefrLevel:
        "A2",

      difficulty:
        "easy",

      topic:
        "daily_routine",

      prompt:
        "Write a short paragraph about your typical weekday.",

      instruction:
        "بین ۴۰ تا ۷۰ کلمه بنویس.",

      points:
        2,

      estimatedSeconds:
        150,

      source: {
        feature:
          "assessment",

        sourceId:
          "skill-writing-bank-v1",

        resourceId:
          null,

        sectionId:
          null,

        href:
          null,
      },

      tags: [
        "routine",
        "present-simple",
      ],

      minimumWords:
        40,

      maximumWords:
        70,

      referenceAnswer:
        "On weekdays, I usually wake up early and have breakfast before work. I spend most of the day working or studying. In the evening, I exercise, practise English, and relax with my family before going to bed.",

      evaluationCriteria: [
        "Task completion",
        "Grammar accuracy",
        "Vocabulary range",
        "Sentence connection",
      ],

      explanation:
        "پاسخ بر اساس انجام Task، دقت گرامری، دامنه واژگان و پیوستگی جمله‌ها تحلیل می‌شود.",
    },

    {
      id:
        "skill-writing-002",

      type:
        "short_text",

      skill:
        "writing",

      cefrLevel:
        "B1",

      difficulty:
        "medium",

      topic:
        "email_writing",

      prompt:
        "Write an email to a colleague explaining that you need to move tomorrow's meeting to another time.",

      instruction:
        "بین ۶۰ تا ۱۰۰ کلمه بنویس و دلیل و زمان جایگزین پیشنهاد بده.",

      points:
        3,

      estimatedSeconds:
        210,

      source: {
        feature:
          "assessment",

        sourceId:
          "skill-writing-bank-v1",

        resourceId:
          null,

        sectionId:
          null,

        href:
          null,
      },

      tags: [
        "email",
        "workplace",
        "register",
      ],

      minimumWords:
        60,

      maximumWords:
        100,

      referenceAnswer:
        "Hi Alex, I’m sorry, but I need to reschedule our meeting tomorrow because I have an urgent appointment in the morning. Would 3 p.m. work for you instead? If not, I’m also available on Thursday morning. Please let me know which time is more convenient for you. Thanks for understanding.",

      evaluationCriteria: [
        "Clear purpose",
        "Appropriate register",
        "Grammar accuracy",
        "Useful vocabulary",
        "Organisation",
      ],

      explanation:
        "در یک ایمیل کاری، هدف، دلیل، پیشنهاد جایگزین و لحن مناسب اهمیت دارند.",
    },

    {
      id:
        "skill-writing-003",

      type:
        "short_text",

      skill:
        "writing",

      cefrLevel:
        "B1",

      difficulty:
        "medium",

      topic:
        "opinion_writing",

      prompt:
        "Do you think working from home is better than working in an office? Explain your opinion.",

      instruction:
        "بین ۸۰ تا ۱۲۰ کلمه بنویس و حداقل دو دلیل ارائه کن.",

      points:
        3,

      estimatedSeconds:
        240,

      source: {
        feature:
          "assessment",

        sourceId:
          "skill-writing-bank-v1",

        resourceId:
          null,

        sectionId:
          null,

        href:
          null,
      },

      tags: [
        "opinion",
        "remote-work",
        "linking-words",
      ],

      minimumWords:
        80,

      maximumWords:
        120,

      referenceAnswer:
        "I think working from home can be better for many people because it saves commuting time and makes the working day more flexible. However, an office is often better for teamwork and communication. Personally, I prefer a combination of both because I can focus at home but still meet colleagues regularly.",

      evaluationCriteria: [
        "Opinion clarity",
        "Supporting reasons",
        "Linking devices",
        "Grammar accuracy",
        "Vocabulary range",
      ],

      explanation:
        "پاسخ Opinion باید موضع روشن، دلیل و اتصال منطقی بین ایده‌ها داشته باشد.",
    },

    {
      id:
        "skill-writing-004",

      type:
        "short_text",

      skill:
        "writing",

      cefrLevel:
        "B2",

      difficulty:
        "hard",

      topic:
        "problem_solution",

      prompt:
        "Your city has a serious traffic problem. Write a short proposal describing the problem and suggesting two practical solutions.",

      instruction:
        "بین ۱۰۰ تا ۱۵۰ کلمه بنویس.",

      points:
        4,

      estimatedSeconds:
        300,

      source: {
        feature:
          "assessment",

        sourceId:
          "skill-writing-bank-v1",

        resourceId:
          null,

        sectionId:
          null,

        href:
          null,
      },

      tags: [
        "proposal",
        "problem-solution",
        "formal-writing",
      ],

      minimumWords:
        100,

      maximumWords:
        150,

      referenceAnswer:
        "Traffic has become a major problem in our city, particularly during rush hour. It causes delays, pollution and unnecessary stress. One practical solution would be to improve public transport by increasing the number of buses and creating reliable schedules. Another solution would be to encourage cycling by building safer cycle lanes. These measures could reduce the number of private cars on the road and make daily travel more efficient.",

      evaluationCriteria: [
        "Problem definition",
        "Solution quality",
        "Organisation",
        "Formal register",
        "Grammar range",
        "Vocabulary range",
      ],

      explanation:
        "در سطح B2 انتظار می‌رود مسئله و راهکارها واضح، منظم و با ساختارهای متنوع توضیح داده شوند.",
    },
  ] satisfies
    readonly AssessmentQuestion[];

const speakingQuestions =
  [
    {
      id:
        "skill-speaking-001",

      type:
        "speaking_response",

      skill:
        "speaking",

      cefrLevel:
        "A2",

      difficulty:
        "easy",

      topic:
        "self_introduction",

      prompt:
        "Introduce yourself and talk briefly about what you do every day.",

      instruction:
        "بین ۳۰ تا ۴۵ ثانیه صحبت کن.",

      points:
        2,

      estimatedSeconds:
        60,

      source: {
        feature:
          "assessment",

        sourceId:
          "skill-speaking-bank-v1",

        resourceId:
          null,

        sectionId:
          null,

        href:
          null,
      },

      tags: [
        "introduction",
        "daily-routine",
      ],

      minimumSeconds:
        30,

      maximumSeconds:
        45,

      referenceText:
        "My name is Alex. I work as a designer and I usually start work at nine. After work, I often exercise or meet my friends.",

      evaluationCriteria: [
        "Task completion",
        "Pronunciation",
        "Basic fluency",
        "Grammar accuracy",
      ],

      explanation:
        "تحلیل صوت باید Fluency، Pronunciation، Grammar و انجام Task را بررسی کند.",
    },

    {
      id:
        "skill-speaking-002",

      type:
        "speaking_response",

      skill:
        "speaking",

      cefrLevel:
        "B1",

      difficulty:
        "medium",

      topic:
        "past_experience",

      prompt:
        "Talk about a trip or experience that you remember clearly. Explain what happened and why it was memorable.",

      instruction:
        "بین ۴۵ تا ۶۰ ثانیه صحبت کن.",

      points:
        3,

      estimatedSeconds:
        75,

      source: {
        feature:
          "assessment",

        sourceId:
          "skill-speaking-bank-v1",

        resourceId:
          null,

        sectionId:
          null,

        href:
          null,
      },

      tags: [
        "past-experience",
        "storytelling",
      ],

      minimumSeconds:
        45,

      maximumSeconds:
        60,

      referenceText:
        "One of my most memorable trips was a visit to Istanbul. I travelled there with my family and we spent several days exploring the city. I especially enjoyed the historic areas because they were very different from places I had visited before.",

      evaluationCriteria: [
        "Fluency",
        "Past tense control",
        "Pronunciation",
        "Coherence",
        "Vocabulary",
      ],

      explanation:
        "برای پاسخ B1، روایت منظم و استفاده قابل قبول از زمان گذشته اهمیت دارد.",
    },

    {
      id:
        "skill-speaking-003",

      type:
        "speaking_response",

      skill:
        "speaking",

      cefrLevel:
        "B1",

      difficulty:
        "medium",

      topic:
        "opinion",

      prompt:
        "Do you think social media helps people communicate better? Give your opinion and reasons.",

      instruction:
        "بین ۴۵ تا ۷۰ ثانیه صحبت کن.",

      points:
        3,

      estimatedSeconds:
        80,

      source: {
        feature:
          "assessment",

        sourceId:
          "skill-speaking-bank-v1",

        resourceId:
          null,

        sectionId:
          null,

        href:
          null,
      },

      tags: [
        "opinion",
        "social-media",
      ],

      minimumSeconds:
        45,

      maximumSeconds:
        70,

      referenceText:
        "I think social media makes communication faster and helps people stay in touch, especially when they live far away. However, it can also reduce face-to-face communication, so I think it should be used in a balanced way.",

      evaluationCriteria: [
        "Clear opinion",
        "Supporting reasons",
        "Fluency",
        "Grammar",
        "Vocabulary",
      ],

      explanation:
        "پاسخ باید نظر روشن و حداقل یک یا دو دلیل قابل‌فهم داشته باشد.",
    },

    {
      id:
        "skill-speaking-004",

      type:
        "speaking_response",

      skill:
        "speaking",

      cefrLevel:
        "B2",

      difficulty:
        "hard",

      topic:
        "problem_solution",

      prompt:
        "Your team is missing deadlines because communication is poor. Explain the problem and suggest practical solutions.",

      instruction:
        "بین ۶۰ تا ۹۰ ثانیه صحبت کن.",

      points:
        4,

      estimatedSeconds:
        105,

      source: {
        feature:
          "assessment",

        sourceId:
          "skill-speaking-bank-v1",

        resourceId:
          null,

        sectionId:
          null,

        href:
          null,
      },

      tags: [
        "workplace",
        "problem-solving",
        "extended-answer",
      ],

      minimumSeconds:
        60,

      maximumSeconds:
        90,

      referenceText:
        "The main problem seems to be that team members do not have clear information about priorities and responsibilities. I would suggest short weekly planning meetings and a shared project board where everyone can see deadlines and updates. It would also help to define who is responsible for each task.",

      evaluationCriteria: [
        "Fluency",
        "Coherence",
        "Problem analysis",
        "Grammar range",
        "Vocabulary range",
        "Pronunciation",
      ],

      explanation:
        "در سطح B2 انتظار می‌رود پاسخ طولانی‌تر، منسجم‌تر و شامل راهکارهای مشخص باشد.",
    },
  ] satisfies
    readonly AssessmentQuestion[];

function getQuestionsForSkill(
  skill:
    AssessmentSkill,
): readonly AssessmentQuestion[] {
  if (
    skill ===
    "writing"
  ) {
    return writingQuestions;
  }

  if (
    skill ===
    "speaking"
  ) {
    return speakingQuestions;
  }

  return adaptivePlacementAssessmentMock
    .questions
    .filter(
      (question) =>
        question.skill ===
        skill,
    );
}

function createSkillAssessment(
  item:
    SkillAssessmentCatalogItem,
): AssessmentDefinition {
  const questions =
    getQuestionsForSkill(
      item.skill,
    );

  if (
    questions.length !==
    item.questionCount
  ) {
    throw new Error(
      `Invalid question count for ${item.id}.`,
    );
  }

  const payload = {
    id:
      item.id,

    slug:
      item.id,

    type:
      "skill_check",

    status:
      "published",

    mode:
      "fixed",

    title:
      item.title,

    description:
      item.description,

    targetLanguageCode:
      "en",

    nativeLanguageCode:
      "fa",

    estimatedMinutes:
      item.estimatedMinutes,

    questionCount:
      questions.length,

    passingScore:
      item.capability ===
      "instant"
        ? 70
        : null,

    xpReward:
      item.xpReward,

    skills: [
      item.skill,
    ],

    sections: [
      {
        id:
          `${item.id}-section`,

        title:
          item.title,

        description:
          item.description,

        order:
          1,

        skill:
          item.skill,

        questionIds:
          questions.map(
            (question) =>
              question.id,
          ),

        estimatedMinutes:
          item.estimatedMinutes,
      },
    ],

    questions: [
      ...questions,
    ],

    adaptiveConfig:
      null,

    version:
      1,

    createdAt:
      CREATED_AT,

    updatedAt:
      CREATED_AT,
  };

  return assessmentDefinitionSchema.parse(
    payload,
  );
}

export const skillCheckAssessmentsMock:
  readonly AssessmentDefinition[] =
  SKILL_ASSESSMENT_CATALOG.map(
    createSkillAssessment,
  );