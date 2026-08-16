import type {
  ClassroomRoomEvent,
} from "../types/classroom.types";

export type ClassroomRoomTransportStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "unsupported"
  | "error";

export type ClassroomRoomEventListener =
  (
    event:
      ClassroomRoomEvent,
  ) => void;

export type ClassroomRoomTransportStatusListener =
  (
    status:
      ClassroomRoomTransportStatus,
  ) => void;

export interface ClassroomRoomTransport {
  readonly roomId:
    string;

  connect():
    void;

  disconnect():
    void;

  publish(
    event:
      ClassroomRoomEvent,
  ):
    boolean;

  subscribe(
    listener:
      ClassroomRoomEventListener,
  ):
    () => void;

  subscribeStatus(
    listener:
      ClassroomRoomTransportStatusListener,
  ):
    () => void;
}