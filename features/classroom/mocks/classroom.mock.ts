import type {
  ClassroomOverview,
  ClassroomRoom,
} from "../types/classroom.types";

export const CLASSROOM_DEFAULT_ROOM_ID =
  "english-free-talk";

export const classroomRoomsMock:
  readonly ClassroomRoom[] =
  [
    {
      id:
        "english-free-talk",

      title:
        "English Free Talk",

      topic:
        "گفت‌وگوی آزاد روزانه",

      description:
        "یک فضای دوستانه برای تمرین مکالمه آزاد انگلیسی بدون موضوع اجباری.",

      languageCode:
        "en",

      cefrLevel:
        "mixed",

      status:
        "live",

      visibility:
        "public",

      participantCount:
        5,

      capacity:
        10,

      hostName:
        "Mojtaba",

      startedAt:
        "2026-08-16T05:30:00.000Z",

      scheduledFor:
        null,

      inviteCode:
        "FREE-EN-24",

      tags: [
        "Free Talk",
        "English",
        "Daily Conversation",
      ],

      conversationPrompts: [
        "What was the most interesting thing you did this week?",
        "What skill would you like to learn this year?",
        "Would you rather live in a big city or a small town? Why?",
        "What makes a conversation enjoyable for you?",
 ],

      rules: [
        "به دیگران فرصت کامل صحبت بده.",
        "اصلاح خطاها محترمانه و کوتاه باشد.",
        "میکروفون را وقتی صحبت نمی‌کنی ببند.",
        "از اشتراک اطلاعات شخصی حساس خودداری کن.",
      ],

      participants: [
        {
          id:
            "demo-admin",

          name:
            "Admin Demo",

          avatarUrl:
            null,

          role:
            "host",

          isSelf:
            true,

          isMuted:
            true,

          isSpeaking:
            false,

          handRaised:
            false,

          connectionQuality:
            "good",

          joinedAt:
            "2026-08-16T05:30:00.000Z",
        },

        {
          id:
            "participant-sara",

          name:
            "Sara",

          avatarUrl:
            null,

          role:
            "member",

          isSelf:
            false, isMuted:
            false,

          isSpeaking:
            true,

          handRaised:
            false,

          connectionQuality:
            "good",

          joinedAt:
            "2026-08-16T05:34:00.000Z",
        },

        {
          id:
            "participant-ali",

          name:
            "Ali",

          avatarUrl:
            null,

          role:
            "member",

          isSelf:
            false,

          isMuted:
            true,

          isSpeaking:
            false,

          handRaised:
            true,

          connectionQuality:
            "good",

          joinedAt:
            "2026-08-16T05:36:00.000Z",
        },

        {
          id:
            "participant-maryam",

          name:
            "Maryam",

            avatarUrl:
            null,

          role:
            "moderator",

          isSelf:
            false,

          isMuted:
            true,

          isSpeaking:
            false,

          handRaised:
            false,

          connectionQuality:
            "fair",

          joinedAt:
            "2026-08-16T05:37:00.000Z",
        },

        {
          id:
            "participant-reza",

          name:
            "Reza",

          avatarUrl:
            null,

          role:
            "member",

          isSelf:
            false,

          isMuted:
            true,

          isSpeaking:
            false,

          handRaised:
            false,

          connectionQuality:
            "good",

          joinedAt:
            "2026-08-16T05:39:00.000Z",
        },
      ],

      messages: [
        {
          id:
            "room-message-1",

          kind:
            "system",          senderId:
            null,

          senderName:
            null,

          body:
            "اتاق گفتگو شروع شد.",

          createdAt:
            "2026-08-16T05:30:00.000Z",
        },

        {
          id:
            "room-message-2",

          kind:
            "text",

          senderId:
            "participant-sara",

          senderName:
            "Sara",

          body:
            "Hi everyone! What are we talking about today?",

          createdAt:
            "2026-08-16T05:38:00.000Z",
        },

        {
          id:
            "room-message-3",

          kind:
            "text",

          senderId:
            "participant-ali",

          senderName:
            "Ali",
 body:
            "Maybe we can talk about travel experiences.",

          createdAt:
            "2026-08-16T05:39:00.000Z",
        },
      ],

      sharedItems: [
        {
          id:
            "shared-item-1",

          kind:
            "text",

          title:
            "موضوع پیشنهادی امروز",

          description:
            "Describe a memorable journey and explain what made it special.",

          sizeBytes:
            null,

          createdBy: {
            id:
              "demo-admin",

            name:
              "Admin Demo",
          },

          createdAt:
            "2026-08-16T05:31:00.000Z",
        },
      ],
    },

    {
      id:
        "travel-b1-room",

      title:
        "Travel Stories",

      topic:
        "تجربه‌های سفر",

      description:
        "تمرین مکالمه سطح B1 درباره سفر، فرهنگ و تجربه‌های شخصی.",

      languageCode:
        "en",

      cefrLevel: "B1",

      status:
        "live",

      visibility:
        "public",

      participantCount:
        4,

      capacity:
        8,

      hostName:
        "Niloofar",

      startedAt:
        "2026-08-16T05:45:00.000Z",

      scheduledFor:
        null,

      inviteCode:
        "TRAVEL-B1",

      tags: [
        "Travel",
        "B1",
      ],

      conversationPrompts: [
        "What country would you most like to visit?",
        "What was your best travel experience?",
      ],

      rules: [
        "به نوبت صحبت کنید.",
        "روی مکالمه انگلیسی تمرکز کنید.",
      ],

      participants: [],

      messages: [],

      sharedItems: [],
    },

    {
      id: "job-interview-room",

      title:
        "Job Interview Practice",

      topic:
        "مصاحبه کاری",

      description:
        "تمرین گروهی سؤال‌های رایج مصاحبه کاری و دریافت بازخورد از دیگران.",

      languageCode:
        "en",

      cefrLevel:
        "B2",

      status:
        "scheduled",

      visibility:
        "public",

      participantCount:
        2,

      capacity:
        6,

      hostName:
        "Arman",

      startedAt:
        null,

      scheduledFor:
        "2026-08-16T14:30:00.000Z",

      inviteCode:
        "JOB-B2-16",

      tags: [
        "Interview",
        "Career",
        "B2",
      ],

      conversationPrompts: [
        "Tell me about yourself.",
        "What is one professional challenge you solved?",
      ],

      rules: [
        "پاسخ هر نفر حداکثر دو دقیقه.",
        "بازخوردها کوتاه و کاربردی باشند.",
 ],

      participants: [],

      messages: [],

      sharedItems: [],
    },
  ];

export const classroomOverviewMock:
  ClassroomOverview =
  {
    liveRooms:
      classroomRoomsMock.filter(
        (
          room,
        ) =>
          room.status ===
          "live",
      ),

    upcomingRooms:
      classroomRoomsMock.filter(
        (
          room,
        ) =>
          room.status ===
          "scheduled",
      ),

    stats: {
      activeRooms:
        2,

      onlineLearners:
        9,

      sessionsThisWeek:
        14,
    },
  };