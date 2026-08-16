"use client";

import {
  CLASSROOM_BROADCAST_PROTOCOL_VERSION,
} from "../constants/classroom.constants";

import {
  classroomRoomEventSchema,
} from "../schemas/classroom.schema";

import type {
  ClassroomRoomEvent,
} from "../types/classroom.types";

import type {
  ClassroomRoomEventListener,
  ClassroomRoomTransport,
  ClassroomRoomTransportStatus,
  ClassroomRoomTransportStatusListener,
} from "./classroom-room-transport";

function createChannelName(
  roomId:
    string,
): string {
  return [
    "navan",
    "classroom",
    `v${CLASSROOM_BROADCAST_PROTOCOL_VERSION}`,
    roomId,
  ].join(
    ":",
  );
}

export class BrowserClassroomRoomTransport
  implements ClassroomRoomTransport
{
  readonly roomId:
    string;

  private channel:
    BroadcastChannel | null =
      null;

  private status:
    ClassroomRoomTransportStatus =
      "idle";

  private readonly eventListeners =
    new Set<ClassroomRoomEventListener>();
private readonly statusListeners =
    new Set<ClassroomRoomTransportStatusListener>();

  constructor(
    roomId:
      string,
  ) {
    this.roomId =
      roomId;
  }

  connect(): void {
    if (
      this.status ===
        "connected" ||
      this.status ===
        "connecting"
    ) {
      return;
    }

    this.setStatus(
      "connecting",
    );

    if (
      typeof window ===
        "undefined" ||
      typeof BroadcastChannel ===
        "undefined"
    ) {
      this.setStatus(
        "unsupported",
      );

      return;
    }

    try {
      const channel =
        new BroadcastChannel(
          createChannelName(
            this.roomId,
          ),
        );

      channel.onmessage =
        (
          message:
             MessageEvent<unknown>,
        ): void => {
          const result =
            classroomRoomEventSchema.safeParse(
              message.data,
            );

          if (
            !result.success
          ) {
            console.warn(
              "Ignoring invalid classroom realtime event:",
              result.error.flatten(),
            );

            return;
          }

          if (
            result.data.roomId !==
            this.roomId
          ) {
            return;
          }

          this.emitEvent(
            result.data,
          );
        };

      channel.onmessageerror =
        (): void => {
          this.setStatus(
            "error",
          );
        };

      this.channel =
        channel;

      this.setStatus(
        "connected",
      );
    } catch (
      error
    ) {
      console.error(
        "Classroom BroadcastChannel connection failed:",
        error,
      );

      this.channel =
        null;

      this.setStatus(
        "error",
      );
    }
  }

  disconnect(): void {
    const channel =
      this.channel;

    this.channel =
      null;

    if (channel) {
      channel.onmessage =
        null;

      channel.onmessageerror =
        null;

      channel.close();
    }

    this.setStatus(
      "idle",
    );
  }

  publish(
    event:
      ClassroomRoomEvent,
  ): boolean {
    const result =
      classroomRoomEventSchema.safeParse(
        event,
      );

    if (
      !result.success
    ) {
      console.error(
        "Cannot publish invalid classroom event:",
       result.error.flatten(),
      );

      return false;
    }

    if (
      result.data.roomId !==
      this.roomId
    ) {
      return false;
    }

    if (
      this.status !==
        "connected" ||
      !this.channel
    ) {
      return false;
    }

    try {
      this.channel.postMessage(
        result.data,
      );

      return true;
    } catch (
      error
    ) {
      console.error(
        "Classroom realtime publish failed:",
        error,
      );

      this.setStatus(
        "error",
      );

      return false;
    }
  }

  subscribe(
    listener:
      ClassroomRoomEventListener,
  ): () => void {
    this.eventListeners.add(
      listener,
    );

    return () => {
      this.eventListeners.delete(
        listener,
      );
    };
  }

  subscribeStatus(
    listener:
      ClassroomRoomTransportStatusListener,
  ): () => void {
    this.statusListeners.add(
      listener,
    );

    listener(
      this.status,
    );

    return () => {
      this.statusListeners.delete(
        listener,
      );
    }; }

  private emitEvent(
    event:
      ClassroomRoomEvent,
  ): void {
    this.eventListeners.forEach(
      (
        listener,
      ) => {
        listener(
          event,
        );
      },
    );
  }

  private setStatus(
    status:
      ClassroomRoomTransportStatus,
  ): void {
    if (
      this.status ===
      status
    ) {
      return;
    }

    this.status =
      status;

    this.statusListeners.forEach(
      (
        listener,
      ) => {
        listener(
          status,
        );
      },
    );
  }
}

export function createBrowserClassroomRoomTransport(
  roomId:
    string,
): ClassroomRoomTransport {
  return new BrowserClassroomRoomTransport(
    roomId,
  );
}