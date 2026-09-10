import {
  assessmentDefinitionSchema,
} from "../schemas/assessment.schema";

import type {
  AssessmentQuestion,
} from "../types/assessment-question.types";

import type {
  AssessmentDefinition,
} from "../types/assessment.types";

import {
  placementAssessmentMock,
} from "./placement-assessment.mock";

export const placementListeningQuestions =
  [
    {
      id:
        "placement-listening-001",

      type:
        "listening_comprehension",

      skill:
        "listening",

      cefrLevel:
        "A2",

      difficulty:
        "easy",

      topic:
        "airport_context",

      prompt:
        "Where does this conversation most likely take place?",

      instruction:
        "ابتدا فایل صوتی را گوش بده و سپس گزینه صحیح را انتخاب کن.",

      points:
        1,

      estimatedSeconds:
        55,

      source: {
        feature:
          "listening",

        sourceId:
          "airport-check-in-conversation",

        resourceId:
          "airport-check-in-conversation",

        sectionId:
          null,

        href:
          null,
      },

      tags: [
        "airport",
        "travel",
        "context",
      ],

      audioUrl:
        "/audio/listening/airport-check-in-conversation.mp3",

      audioAssetId:
        "airport-check-in-conversation",

      transcript:
        null,

      options: [
        {
          id: "a",
          label:
            "At an airport check-in desk",
        },
        {
          id: "b",
          label:
            "At a restaurant",
        },
        {
          id: "c",
          label:
            "At a doctor's office",
        },
        {
          id: "d",
          label:
            "At a school",
        },
      ],

      correctOptionId:
        "a",

      explanation:
        "واژه‌ها و موضوع گفت‌وگو مربوط به پذیرش فرودگاه، چمدان و اطلاعات پرواز است.",
    },

    {
      id:
        "placement-listening-002",

      type:
        "listening_comprehension",

      skill:
        "listening",

      cefrLevel:
        "B1",

      difficulty:
        "medium",

      topic:
        "daily_routine",

      prompt:
        "What is the speaker mainly talking about?",

      instruction:
        "به Main Idea فایل صوتی توجه کن.",

      points:
        1,

      estimatedSeconds:
        65,

      source: {
        feature:
          "listening",

        sourceId:
          "daily-routine-podcast",

        resourceId:
          "daily-routine-podcast",

        sectionId:
          null,

        href:
          null,
      },

      tags: [
        "main-idea",
        "routine",
        "commute",
      ],

      audioUrl:
        "/audio/listening/daily-routine-podcast.mp3",

      audioAssetId:
        "daily-routine-podcast",

      transcript:
        null,

      options: [
        {
          id: "a",
          label:
            "A daily routine and commute",
        },
        {
          id: "b",
          label:
            "A cooking recipe",
        },
        {
          id: "c",
          label:
            "A holiday booking",
        },
        {
          id: "d",
          label:
            "A university exam",
        },
      ],

      correctOptionId:
        "a",

      explanation:
        "موضوع اصلی فایل درباره برنامه روزمره و رفت‌وآمد است.",
    },

    {
      id:
        "placement-listening-003",

      type:
        "listening_comprehension",

      skill:
        "listening",

      cefrLevel:
        "B1",

      difficulty:
        "medium",

      topic:
        "story_main_idea",

      prompt:
        "What is the main idea of the story?",

      instruction:
        "به ایده اصلی داستان و نتیجه اتفاق توجه کن.",

      points:
        1,

      estimatedSeconds:
        70,

      source: {
        feature:
          "listening",

        sourceId:
          "small-act-of-kindness-story",

        resourceId:
          "small-act-of-kindness-story",

        sectionId:
          null,

        href:
          null,
      },

      tags: [
        "story",
        "main-idea",
        "kindness",
      ],

      audioUrl:
        "/audio/listening/small-act-of-kindness-story.mp3",

      audioAssetId:
        "small-act-of-kindness-story",

      transcript:
        null,

      options: [
        {
          id: "a",
          label:
            "A small kind action can change someone's day",
        },
        {
          id: "b",
          label:
            "Business meetings should be shorter",
        },
        {
          id: "c",
          label:
            "Travelling alone is always difficult",
        },
        {
          id: "d",
          label:
            "Technology makes people less productive",
        },
      ],

      correctOptionId:
        "a",

      explanation:
        "داستان روی یک رفتار مهربانانه کوچک و اثری که روی فرد دیگری می‌گذارد تمرکز دارد.",
    },

    {
      id:
        "placement-listening-004",

      type:
        "listening_comprehension",

      skill:
        "listening",

      cefrLevel:
        "B2",

      difficulty:
        "hard",

      topic:
        "remote_work",

      prompt:
        "Which topic is discussed most extensively in the interview?",

      instruction:
        "به موضوع اصلی و نکاتی که دو گوینده تکرار می‌کنند توجه کن.",

      points:
        2,

      estimatedSeconds:
        80,

      source: {
        feature:
          "listening",

        sourceId:
          "remote-work-interview",

        resourceId:
          "remote-work-interview",

        sectionId:
          null,

        href:
          null,
      },

      tags: [
        "remote-work",
        "interview",
        "inference",
      ],

      audioUrl:
        "/audio/listening/remote-work-interview.mp3",

      audioAssetId:
        "remote-work-interview",

      transcript:
        null,

      options: [
        {
          id: "a",
          label:
            "The benefits and challenges of remote work",
        },
        {
          id: "b",
          label:
            "International tourism",
        },
        {
          id: "c",
          label:
            "Professional sports",
        },
        {
          id: "d",
          label:
            "Medical technology",
        },
      ],

      correctOptionId:
        "a",

      explanation:
        "مصاحبه روی مزایا، چالش‌ها و عادت‌های مناسب دورکاری تمرکز دارد.",
    },
  ] satisfies
    readonly AssessmentQuestion[];

const payload = {
  ...placementAssessmentMock,

  title:
    "آزمون تطبیقی تعیین سطح انگلیسی",

  description:
    "تعیین سطح هوشمند انگلیسی با ارزیابی گرامر، واژگان، خواندن و شنیداری. سطح سؤال بعدی بر اساس عملکرد قبلی تغییر می‌کند.",

  estimatedMinutes:
    16,

  questionCount:
    placementAssessmentMock
      .questions.length +
    placementListeningQuestions.length,

  skills: [
    "grammar",
    "vocabulary",
    "reading",
    "listening",
  ],

  adaptiveConfig: {
    ...placementAssessmentMock
      .adaptiveConfig,

    minimumQuestions:
      8,

    maximumQuestions:
      12,

    targetConfidence:
      85,
  },

  sections: [
    ...placementAssessmentMock
      .sections,

    {
      id:
        "placement-listening",

      title:
        "شنیداری",

      description:
        "ارزیابی Main Idea، Context و درک اطلاعات فایل صوتی.",

      order:
        4,

      skill:
        "listening",

      questionIds:
        placementListeningQuestions.map(
          (question) =>
            question.id,
        ),

      estimatedMinutes:
        4,
    },
  ],

  questions: [
    ...placementAssessmentMock
      .questions,

    ...placementListeningQuestions,
  ],
};

export const adaptivePlacementAssessmentMock:
  AssessmentDefinition =
  assessmentDefinitionSchema.parse(
    payload,
  );