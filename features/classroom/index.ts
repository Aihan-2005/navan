export {
  getClassroomOverview,
} from "./api/get-classroom-overview";

export {
  getClassroomRoom,
} from "./api/get-classroom-room";

export {
  ClassroomLiveRoom,
} from "./components/classroom-live-room";

export {
  ClassroomOverview,
} from "./components/classroom-overview";

export {
  ClassroomParticipantsPanel,
} from "./components/classroom-participants-panel";

export {
  ClassroomRoomAccessGuard,
} from "./components/classroom-room-access-guard";

export {
  ClassroomRoomSidebar,
} from "./components/classroom-room-sidebar";

export {
  useActiveClassroomRoom,
  useClassroomRoomAccess,
} from "./hooks/use-classroom-active-room";

export {
  useClassroomRoom,
} from "./hooks/use-classroom-room";

export {
  useRoomMicrophone,
} from "./hooks/use-room-microphone";

export {
  CLASSROOM_DEFAULT_ROOM_ID,
} from "./mocks/classroom.mock";

export {
  createBrowserClassroomRoomTransport,
  BrowserClassroomRoomTransport,
} from "./realtime/browser-classroom-room-transport";

export type {
  ClassroomRoomEventListener,
  ClassroomRoomTransport,
  ClassroomRoomTransportStatus,
  ClassroomRoomTransportStatusListener,
} from "./realtime/classroom-room-transport";

export {
  acquireClassroomActiveRoomLease,
  CLASSROOM_ACTIVE_ROOM_HEARTBEAT_MS,
  CLASSROOM_ACTIVE_ROOM_LEASE_TTL_MS,
  getClassroomActiveRoomStorageKey,
  readClassroomActiveRoomLease,
  refreshClassroomActiveRoomLease,
  releaseClassroomActiveRoomLease,
} from "./session/classroom-active-room";

export type {
  AcquireClassroomRoomResult,
  ClassroomActiveRoomLease,
} from "./session/classroom-active-room";

export {
  classroomChatMessageCreatedEventSchema,
  classroomChatMessageInputSchema,
  classroomChatMessageSchema,
  classroomConnectionQualitySchema,
  classroomMessageKindSchema,
  classroomOverviewSchema,
  classroomParticipantHandUpdatedEventSchema,
  classroomParticipantMicrophoneUpdatedEventSchema,
  classroomParticipantRoleSchema,
  classroomParticipantSchema,
  classroomParticipantSpeakingUpdatedEventSchema,
  classroomRoomEventSchema,
  classroomRoomSchema,
  classroomRoomStatusSchema,
  classroomRoomSummarySchema,
  classroomRoomVisibilitySchema,
  classroomSharedItemCreatedEventSchema,
  classroomSharedItemKindSchema,
  classroomSharedItemSchema,
  classroomShareItemInputSchema,
} from "./schemas/classroom.schema";

export type {
  ClassroomChatMessage,
  ClassroomChatMessageInput,
  ClassroomConnectionQuality,
  ClassroomMessageKind,
  ClassroomOverview as ClassroomOverviewData,
  ClassroomParticipant,
  ClassroomParticipantRole,
  ClassroomRoom,
  ClassroomRoomEvent,
  ClassroomRoomStatus,
  ClassroomRoomSummary,
  ClassroomRoomVisibility,
  ClassroomSharedItem,
  ClassroomSharedItemKind,
  ClassroomShareItemInput,
} from "./types/classroom.types";