import {
  classroomRoomsMock,
} from "../mocks/classroom.mock";

import {
  classroomRoomSchema,
} from "../schemas/classroom.schema";

import type {
  ClassroomRoom,
} from "../types/classroom.types";

function normalizeRoomIdentifier(
  value:
    string,
): string {
  return decodeURIComponent(
    value,
  )
    .trim()
    .toLowerCase();
}

export async function getClassroomRoom(
  roomIdentifier:
    string,
): Promise<ClassroomRoom | null> {
  const normalizedIdentifier =
    normalizeRoomIdentifier(
      roomIdentifier,
    );

  const room =
    classroomRoomsMock.find(
      (
        candidate,
      ) =>
        candidate.id.toLowerCase() ===
          normalizedIdentifier ||
        candidate.inviteCode.toLowerCase() ===
          normalizedIdentifier,
    );

  if (!room) {
    return null;
  }

  const result =
    classroomRoomSchema.safeParse(
      room,
    );

  if (
    !result.success
  ) {
    console.error(
      "Invalid classroom room payload:",
      result.error.flatten(),
    );

    throw new Error(
      "Classroom room payload is invalid.",
    );
  }

  return result.data;
}