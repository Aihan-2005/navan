import type {
  z,
} from "zod";

import type {
  classroomChatMessageInputSchema,
  classroomChatMessageSchema,
  classroomConnectionQualitySchema,
  classroomMessageKindSchema,
  classroomOverviewSchema,
  classroomParticipantRoleSchema,
  classroomParticipantSchema,
  classroomRoomEventSchema,
  classroomRoomSchema,
  classroomRoomStatusSchema,
  classroomRoomSummarySchema,
  classroomRoomVisibilitySchema,
  classroomSharedItemKindSchema,
  classroomSharedItemSchema,
  classroomShareItemInputSchema,
} from "../schemas/classroom.schema";

export type ClassroomRoomStatus =
  z.infer<
    typeof classroomRoomStatusSchema
  >;

export type ClassroomRoomVisibility =
  z.infer<
    typeof classroomRoomVisibilitySchema
  >;

export type ClassroomParticipantRole =
  z.infer<
    typeof classroomParticipantRoleSchema
  >;

export type ClassroomConnectionQuality =
  z.infer<
    typeof classroomConnectionQualitySchema
  >;

export type ClassroomSharedItemKind =
  z.infer<
    typeof classroomSharedItemKindSchema
  >;

export type ClassroomMessageKind =
  z.infer<
    typeof classroomMessageKindSchema
  >;
export type ClassroomParticipant =
  z.infer<
    typeof classroomParticipantSchema
  >;

export type ClassroomSharedItem =
  z.infer<
    typeof classroomSharedItemSchema
  >;

export type ClassroomChatMessage =
  z.infer<
    typeof classroomChatMessageSchema
  >;

export type ClassroomChatMessageInput =
  z.infer<
    typeof classroomChatMessageInputSchema
  >;

export type ClassroomShareItemInput =
  z.infer<
    typeof classroomShareItemInputSchema
  >;

export type ClassroomRoomSummary =
  z.infer<
    typeof classroomRoomSummarySchema
  >;

export type ClassroomRoom =
  z.infer<
    typeof classroomRoomSchema
  >;

export type ClassroomOverview =
  z.infer<
    typeof classroomOverviewSchema
  >;

export type ClassroomRoomEvent =
  z.infer<
    typeof classroomRoomEventSchema
  >;