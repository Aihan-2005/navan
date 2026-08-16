import {
  z,
} from "zod";

import {
  CLASSROOM_CHAT_MESSAGE_MAX_LENGTH,
  CLASSROOM_SHARED_TEXT_MAX_LENGTH,
  CLASSROOM_SHARED_TITLE_MAX_LENGTH,
} from "../constants/classroom.constants";

export const classroomRoomStatusSchema =
  z.enum([
    "live",
    "scheduled",
    "ended",
  ]);

export const classroomRoomVisibilitySchema =
  z.enum([
    "public",
    "private",
  ]);

export const classroomParticipantRoleSchema =
  z.enum([
    "host",
    "moderator",
    "member",
  ]);

export const classroomConnectionQualitySchema =
  z.enum([
    "good",
    "fair",
    "poor",
  ]);

export const classroomSharedItemKindSchema =
  z.enum([
    "file",
    "audio",
    "text",
    "link",
  ]);

export const classroomMessageKindSchema =
  z.enum([
    "text",
    "system",
  ]);
export const classroomParticipantSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    name: z
      .string()
      .trim()
      .min(1),

    avatarUrl: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    role:
      classroomParticipantRoleSchema,

    isSelf:
      z.boolean(),

    isMuted:
      z.boolean(),

    isSpeaking:
      z.boolean(),

    handRaised:
      z.boolean(),

    connectionQuality:
      classroomConnectionQualitySchema,

    joinedAt:
      z.string().datetime(),
  });

export const classroomSharedItemSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    kind:
      classroomSharedItemKindSchema,

    title: z
      .string()
      .trim()
      .min(1)
      .max(
        CLASSROOM_SHARED_TITLE_MAX_LENGTH,
      ),

    description: z
      .string()
      .trim()
      .min(1)
      .max(
        CLASSROOM_SHARED_TEXT_MAX_LENGTH,
      )
      .nullable(),

    sizeBytes: z
      .number()
      .int()
      .nonnegative()
      .nullable(),

    createdBy: z.object({
      id: z
        .string()
        .trim()
        .min(1),

      name: z
        .string()
        .trim()
        .min(1),
    }),

    createdAt:
      z.string().datetime(),
  });

export const classroomChatMessageSchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    kind: classroomMessageKindSchema,

    senderId: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    senderName: z
      .string()
      .trim()
      .min(1)
      .nullable(),

    body: z
      .string()
      .trim()
      .min(1)
      .max(
        CLASSROOM_CHAT_MESSAGE_MAX_LENGTH,
      ),

    createdAt:
      z.string().datetime(),
  });

export const classroomChatMessageInputSchema =
  z.object({
    body: z
      .string()
      .trim()
      .min(
        1,
        "متن پیام خالی است.",
      )
      .max(
        CLASSROOM_CHAT_MESSAGE_MAX_LENGTH,
        "پیام بیش از حد طولانی است.",
      ),
  });

export const classroomShareItemInputSchema =
  z.object({
    kind:
      classroomSharedItemKindSchema,

    title: z
      .string()
      .trim()
      .min(1)
      .max(
        
        CLASSROOM_SHARED_TITLE_MAX_LENGTH,
      ),

    description: z
      .string()
      .trim()
      .min(1)
      .max(
        CLASSROOM_SHARED_TEXT_MAX_LENGTH,
      )
      .nullable(),

    sizeBytes: z
      .number()
      .int()
      .nonnegative()
      .nullable(),
  });

export const classroomRoomSummarySchema =
  z.object({
    id: z
      .string()
      .trim()
      .min(1),

    title: z
      .string()
      .trim()
      .min(1),

    topic: z
      .string()
      .trim()
      .min(1),

    description: z
      .string()
      .trim()
      .min(1),

    languageCode: z
      .string()
      .trim()
      .min(2)
      .max(10),

    cefrLevel: z.enum([
      "A1",
      "A2",
      "B1",
      "B2",
      "C1",
      "C2",
      "mixed",
    ]),

    status:
      classroomRoomStatusSchema,

    visibility:
      classroomRoomVisibilitySchema,

    participantCount: z
      .number()
      .int()
      .nonnegative(),

    capacity: z
      .number()
      .int()
      .positive(),

    hostName: z
      .string()
      .trim()
      .min(1),

    startedAt: z
      .string()
      .datetime()
      .nullable(),
scheduledFor: z
      .string()
      .datetime()
      .nullable(),

    tags: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),
  });

export const classroomRoomSchema =
  classroomRoomSummarySchema.extend({
    inviteCode: z
      .string()
      .trim()
      .min(4),

    participants: z
      .array(
        classroomParticipantSchema,
      ),

    messages: z
      .array(
        classroomChatMessageSchema,
      ),

    sharedItems: z
      .array(
        classroomSharedItemSchema,
      ),

    conversationPrompts: z
      .array(
        z
          .string()
          .trim()
          .min(1),
      )
      .default([]),

    rules: z
      .array(
        z
          .string() .trim()
          .min(1),
      )
      .default([]),
  });

export const classroomOverviewSchema =
  z.object({
    liveRooms: z.array(
      classroomRoomSummarySchema,
    ),

    upcomingRooms: z.array(
      classroomRoomSummarySchema,
    ),

    stats: z.object({
      activeRooms: z
        .number()
        .int()
        .nonnegative(),

      onlineLearners: z
        .number()
        .int()
        .nonnegative(),

      sessionsThisWeek: z
        .number()
        .int()
        .nonnegative(),
    }),
  });

const classroomRoomEventBaseShape = {
  eventId: z
    .string()
    .trim()
    .min(1),

  roomId: z
    .string()
    .trim()
    .min(1),

  actorId: z
    .string()
    .trim()
    .min(1),

  createdAt:
    z.string().datetime(),
};

export const classroomParticipantMicrophoneUpdatedEventSchema =
  z.object({
    ...classroomRoomEventBaseShape,

    type:
      z.literal(
        "participant.microphone.updated",
      ),

    payload: z.object({
      participantId: z
        .string()
        .trim()
        .min(1),

      isMuted:
        z.boolean(),
    }),
  });

export const classroomParticipantHandUpdatedEventSchema =
  z.object({
    ...classroomRoomEventBaseShape,

    type:
      z.literal(
        "participant.hand.updated",
      ),

    payload: z.object({
      participantId: z
        .string()
        .trim()
        .min(1),

      handRaised:
        z.boolean(),
    }),
  });

export const classroomParticipantSpeakingUpdatedEventSchema =
   z.object({
    ...classroomRoomEventBaseShape,

    type:
      z.literal(
        "participant.speaking.updated",
      ),

    payload: z.object({
      participantId: z
        .string()
        .trim()
        .min(1),

      isSpeaking:
        z.boolean(),
    }),
  });

export const classroomChatMessageCreatedEventSchema =
  z.object({
    ...classroomRoomEventBaseShape,

    type:
      z.literal(
        "chat.message.created",
      ),

    payload:
      classroomChatMessageSchema,
  });

export const classroomSharedItemCreatedEventSchema =
  z.object({
    ...classroomRoomEventBaseShape,

    type:
      z.literal(
        "resource.shared",
      ),

    payload:
      classroomSharedItemSchema,
  });

export const classroomRoomEventSchema =
  z.discriminatedUnion(
    "type",
    [
      classroomParticipantMicrophoneUpdatedEventSchema,
      classroomParticipantHandUpdatedEventSchema,
      classroomParticipantSpeakingUpdatedEventSchema,
      classroomChatMessageCreatedEventSchema,
      classroomSharedItemCreatedEventSchema,
    ],
    );