export type ClassroomActiveRoomLease =
  Readonly<{
    userId:
      string;

    roomId:
      string;

    roomTitle:
      string;

    ownerId:
      string;

    acquiredAt:
      number;

    heartbeatAt:
      number;
  }>;

export type AcquireClassroomRoomResult =
  | Readonly<{
      ok:
        true;

      lease:
        ClassroomActiveRoomLease;
    }>
  | Readonly<{
      ok:
        false;

      activeLease:
        ClassroomActiveRoomLease;
    }>;

const CLASSROOM_ACTIVE_ROOM_STORAGE_PREFIX =
  "navan:classroom:active-room";

export const CLASSROOM_ACTIVE_ROOM_LEASE_TTL_MS =
  20_000;
export const CLASSROOM_ACTIVE_ROOM_HEARTBEAT_MS =
  5_000;

function isRecord(
  value:
    unknown,
): value is Record<
  string,
  unknown
> {
  return (
    typeof value ===
      "object" &&
    value !==
      null
  );
}

function parseLease(
  value:
    unknown,
): ClassroomActiveRoomLease | null {
  if (
    !isRecord(
      value,
    )
  ) {
    return null;
  }

  const {
    userId,
    roomId,
    roomTitle,
    ownerId,
    acquiredAt,
    heartbeatAt,
  } = value;

  if (
    typeof userId !==
      "string" ||
    !userId.trim()  ||
    typeof roomId !==
      "string" ||
    !roomId.trim() ||
    typeof roomTitle !==
      "string" ||
    !roomTitle.trim() ||
    typeof ownerId !==
      "string" ||
    !ownerId.trim() ||
    typeof acquiredAt !==
      "number" ||
    !Number.isFinite(
      acquiredAt,
    ) ||
    typeof heartbeatAt !==
      "number" ||
    !Number.isFinite(
      heartbeatAt,
    )
  ) {
    return null;
  }

  return {
    userId:
      userId.trim(),

    roomId:
      roomId.trim(),

    roomTitle:
      roomTitle.trim(),

    ownerId:
      ownerId.trim(),

    acquiredAt,

    heartbeatAt,
  };
}
function parseSerializedLease(
  serialized:
    string,
): ClassroomActiveRoomLease | null {
  try {
    return parseLease(
      JSON.parse(
        serialized,
      ),
    );
  } catch {
    return null;
  }
}

function isLeaseExpired(
  lease:
    ClassroomActiveRoomLease,

  now =
    Date.now(),
): boolean {
  return (
    now -
      lease.heartbeatAt >
    CLASSROOM_ACTIVE_ROOM_LEASE_TTL_MS
  );
}

function removeStorageValueIfUnchanged(
  storageKey:
    string,

  expectedValue:
    string,
): void {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  try {
    const currentValue =
      window.localStorage.getItem(
        storageKey,
      );
 if (
      currentValue ===
      expectedValue
    ) {
      window.localStorage.removeItem(
        storageKey,
      );
    }
  } catch {
    // localStorage can be unavailable in restrictive browser modes.
  }
}

export function getClassroomActiveRoomStorageKey(
  userId:
    string,
): string {
  return `${CLASSROOM_ACTIVE_ROOM_STORAGE_PREFIX}:${encodeURIComponent(
    userId,
  )}`;
}

export function readClassroomActiveRoomLease(
  userId:
    string,
): ClassroomActiveRoomLease | null {
  if (
    typeof window ===
    "undefined"
  ) {
    return null;
  }

  const normalizedUserId =
    userId.trim();

  if (
    !normalizedUserId
  ) {
    return null;
  }

  const storageKey =
    getClassroomActiveRoomStorageKey(
      normalizedUserId,
    );

  let serialized:
    string | null;try {
    serialized =
      window.localStorage.getItem(
        storageKey,
      );
  } catch {
    return null;
  }

  if (!serialized) {
    return null;
  }

  const lease =
    parseSerializedLease(
      serialized,
    );

  if (
    !lease ||
    lease.userId !==
      normalizedUserId ||
    isLeaseExpired(
      lease,
    )
  ) {
    removeStorageValueIfUnchanged(
      storageKey,
      serialized,
    );

    return null;
  }

  return lease;
}

export function acquireClassroomActiveRoomLease({
  userId,
  roomId,
  roomTitle,
  ownerId,
}: Readonly<{
  userId:
    string;

  roomId:
    string;roomTitle:
    string;

  ownerId:
    string;
}>): AcquireClassroomRoomResult {
  const normalizedUserId =
    userId.trim();

  const normalizedRoomId =
    roomId.trim();

  const normalizedRoomTitle =
    roomTitle.trim();

  const normalizedOwnerId =
    ownerId.trim();

  const activeLease =
    readClassroomActiveRoomLease(
      normalizedUserId,
    );

  if (
    activeLease &&
    activeLease.ownerId !==
      normalizedOwnerId
  ) {
    return {
      ok:
        false,

      activeLease,
    };
  }

  const now =
    Date.now();

  const nextLease:
    ClassroomActiveRoomLease =
    {
      userId:
 normalizedUserId,

      roomId:
        normalizedRoomId,

      roomTitle:
        normalizedRoomTitle,

      ownerId:
        normalizedOwnerId,

      acquiredAt:
        activeLease?.ownerId ===
        normalizedOwnerId
          ? activeLease
              .acquiredAt
          : now,

      heartbeatAt:
        now,
    };

  const storageKey =
    getClassroomActiveRoomStorageKey(
      normalizedUserId,
    );

  try {
    window.localStorage.setItem(
      storageKey,
      JSON.stringify(
        nextLease,
      ),
    );
  } catch {
    /**
     * اگر Storage در دسترس نباشد نمی‌توانیم
     * Exclusive Room را قابل اعتماد enforce کنیم.
     */
    return {
      ok:
        false,

      activeLease:
        nextLease,
    };
  }


   const confirmedLease =
    readClassroomActiveRoomLease(
      normalizedUserId,
    );

  if (
    !confirmedLease ||
    confirmedLease.ownerId !==
      normalizedOwnerId ||
    confirmedLease.roomId !==
      normalizedRoomId
  ) {
    return {
      ok:
        false,

      activeLease:
        confirmedLease ??
        nextLease,
    };
  }

  return {
    ok:
      true,

    lease:
      confirmedLease,
  };
}

export function refreshClassroomActiveRoomLease({
  userId,
  ownerId,
}: Readonly<{
  userId:
    string;

  ownerId:
    string;
}>): boolean {
  if (
    typeof window ===
    "undefined"
  ) {
    return false;
  }
const activeLease =
    readClassroomActiveRoomLease(
      userId,
    );

  if (
    !activeLease ||
    activeLease.ownerId !==
      ownerId
  ) {
    return false;
  }

  const nextLease:
    ClassroomActiveRoomLease =
    {
      ...activeLease,

      heartbeatAt:
        Date.now(),
    };

  try {
    window.localStorage.setItem(
      getClassroomActiveRoomStorageKey(
        userId,
      ),
      JSON.stringify(
        nextLease,
      ),
    );

    return true;
  } catch {
    return false;
  }
}

export function releaseClassroomActiveRoomLease({
  userId,
  ownerId,
}: Readonly<{
  userId:
    string;

  ownerId:
    string;
}>): boolean {
  if (
    typeof window ===
    "undefined"
  ) {
    return false;
  }

  const activeLease =
    readClassroomActiveRoomLease(
      userId,
    );

  if (
    !activeLease ||
    activeLease.ownerId !==
      ownerId
  ) {
    return false;
  }

  try {
    window.localStorage.removeItem(
      getClassroomActiveRoomStorageKey(
        userId,
      ),
    );

    return true;
  } catch {
    return false;
  }
}