import type {
  ReadingMyResourcesInput,
} from "../types/reading-my-resources.types";

export const readingMyResourcesMock = {
  stats: {
    totalResources: 5,

    completedResources: 2,

    analyzedVocabularyCount:
      3_450,
  },

  resources: [
    {
      id:
        "my-resource-great-gatsby",

      title:
        "The Great Gatsby - Chapter 1",

      sourceKind:
        "pdf",

      cefrLevel:
        "B2",

      status:
        "ready",
 progressPercent:
        45,

      analyzedVocabularyCount:
        820,

      uploadedAt:
        "2026-08-13T09:30:00.000Z",

      completedAt:
        null,

      href:
        null,
    },

    {
      id:
        "my-resource-ai-trends",

      title:
        "News Article: AI Trends in 2024",

      sourceKind:
        "link",

      cefrLevel:
        "B2",

      status: "ready",

      progressPercent:
        100,

      analyzedVocabularyCount:
        740,

      uploadedAt:
        "2026-08-07T13:10:00.000Z",

      completedAt:
        "2026-08-08T14:00:00.000Z",

      href:
        null,
    },

    {
      id:
        "my-resource-short-stories",

      title:
        "English Short Stories for Learners",

      sourceKind:
        "pdf",

      cefrLevel:
        "A2",
status:
        "ready",

      progressPercent:
        20,

      analyzedVocabularyCount:
        510,

      uploadedAt:
        "2026-08-14T18:20:00.000Z",

      completedAt:
        null,

      href:
        null,
    },

    {
      id:
        "my-resource-remote-work",

      title:
        "Remote Work and Modern Teams",

      sourceKind:
        "text",

      cefrLevel:
        "B1",
        status:
        "ready",

      progressPercent:
        100,

      analyzedVocabularyCount:
        680,

      uploadedAt:
        "2026-08-01T08:45:00.000Z",

      completedAt:
        "2026-08-03T16:00:00.000Z",

      href:
        null,
    },

    {
      id:
        "my-resource-personal-notes",

      title:
        "Personal Reading Notes",

      sourceKind:
        "docx",
cefrLevel:
        "B1",

      status:
        "ready",

      progressPercent:
        72,

      analyzedVocabularyCount:
        700,

      uploadedAt:
        "2026-08-10T11:15:00.000Z",

      completedAt:
        null,

      href:
        null,
    },
  ],
} satisfies ReadingMyResourcesInput;