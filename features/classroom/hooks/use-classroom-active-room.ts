"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  acquireClassroomActiveRoomLease,
  CLASSROOM_ACTIVE_ROOM_HEARTBEAT_MS,
  getClassroomActiveRoomStorageKey,
  readClassroomActiveRoomLease,
  refreshClassroomActiveRoomLease,
  releaseClassroomActiveRoomLease,
  type ClassroomActiveRoomLease,
} from "../session/classroom-active-room";

export type ClassroomRoomAccessStatus =
  | "checking"
  | "granted"
  | "blocked";

function createOwnerId():
  string {
  if (
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {
    return `classroom-tab-${crypto.randomUUID()}`;
  }

  return `classroom-tab-${Date.now()}-${Math.random()
    .toString(
      36,
    )
    .slice(
      2,
    )}`;
}

export function useActiveClassroomRoom(
  userId:
    string | null,
) {
  const [   activeLease,
    setActiveLease,
  ] =
    useState<ClassroomActiveRoomLease | null>(
      null,
    );

  const refresh =
    useCallback(
      (): void => {
        if (
          !userId
        ) {
          setActiveLease(
            null,
          );

          return;
        }

        setActiveLease(
          readClassroomActiveRoomLease(
            userId,
          ),
        );
      },
      [
        userId,
      ],
    );

  useEffect(() => {
    refresh();

    if (
      !userId
    ) {
      return;
    }

    const storageKey =
      getClassroomActiveRoomStorageKey(
        userId,
      );

    const handleStorage = (
      event:
 StorageEvent,
    ): void => {
      if (
        event.key !==
        storageKey
      ) {
        return;
      }

      refresh();
    };

    window.addEventListener(
      "storage",
      handleStorage,
    );

    /**
     * Storage event فقط برای Tabهای دیگر اجرا می‌شود.
     * Interval همچنین Lease منقضی‌شده را پاک می‌کند.
     */
    const intervalId =
      window.setInterval(
        refresh,
        CLASSROOM_ACTIVE_ROOM_HEARTBEAT_MS,
      );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage,
      );

      window.clearInterval(
        intervalId,
      );
    };
  }, [
    refresh,
    userId,
  ]);

  return {
    activeLease,

    refresh,
  };
}
export function useClassroomRoomAccess({
  userId,
  roomId,
  roomTitle,
  enabled =
    true,
}: Readonly<{
  userId:
    string | null;

  roomId:
    string;

  roomTitle:
    string;

  enabled?:
    boolean;
}>) {
  const ownerIdRef =
    useRef<string | null>(
      null,
    );

  const [
    status,
    setStatus,
  ] =
    useState<ClassroomRoomAccessStatus>(
      enabled
        ? "checking"
        : "granted",
    );

  const [
    blockingLease,
    setBlockingLease,
  ] =
    useState<ClassroomActiveRoomLease | null>(
      null,
    );

  if (
    ownerIdRef.current ===
      null &&
    typeof window !==
      "undefined"
  ) {ownerIdRef.current =
      createOwnerId();
  }

  const attemptAcquire =
    useCallback(
      (): void => {
        if (
          !enabled
        ) {
          setBlockingLease(
            null,
          );

          setStatus(
            "granted",
          );

          return;
        }

        if (
          !userId ||
          !ownerIdRef.current
        ) {
          setStatus(
            "checking",
          );

          return;
        }

        const result =
          acquireClassroomActiveRoomLease({
            userId,

            roomId,

            roomTitle,

            ownerId:
              ownerIdRef.current,
          });

        if (
          result.ok
        ) {
          setBlockingLease(
            null,
          );

          setStatus(
            "granted",
          );

          return;
        }

        setBlockingLease(
          result.activeLease,
        );

        setStatus(
          "blocked",
        );
      },
      [
        enabled,
        roomId,
        roomTitle,
        userId,
      ],
    );

  useEffect(() => {
    if (
      !enabled
    ) {
      setStatus(
        "granted",
      );

      setBlockingLease(
        null,
      );

    return;
    }

    if (
      !userId ||
      !ownerIdRef.current
    ) {
      setStatus(
        "checking",
      );

      return;
    }

    const ownerId =
      ownerIdRef.current;

    const storageKey =
      getClassroomActiveRoomStorageKey(
        userId,
      );

    attemptAcquire();

    const heartbeatId =
      window.setInterval(
        () => {
          const refreshed =
            refreshClassroomActiveRoomLease({
              userId,

              ownerId,
            });

          if (
            refreshed
          ) {
            return;
          }

          /**
           * ممکن است Tab دیگری Lock را گرفته
           * یا Lock قبلی منقضی شده باشد.
           */
          attemptAcquire();
        },
        CLASSROOM_ACTIVE_ROOM_HEARTBEAT_MS,
      );
const handleStorage = (
      event:
        StorageEvent,
    ): void => {
      if (
        event.key !==
        storageKey
      ) {
        return;
      }

      const currentLease =
        readClassroomActiveRoomLease(
          userId,
        );

      if (
        currentLease?.ownerId ===
        ownerId &&
        currentLease.roomId ===
        roomId
      ) {
        setBlockingLease(
          null,
        );

        setStatus(
          "granted",
        );

        return;
      }

      /**
       * اگر Room فعال در Tab دیگر بسته شود،
       * همین Tab دوباره تلاش می‌کند Lock را بگیرد.
       */
      attemptAcquire();
    };

    window.addEventListener(
      "storage",
      handleStorage,
    );

    const releaseOwnedLease =
      (): void => {
        releaseClassroomActiveRoomLease({
          userId,ownerId,
        });
      };

    window.addEventListener(
      "pagehide",
      releaseOwnedLease,
    );

    return () => {
      window.clearInterval(
        heartbeatId,
      );

      window.removeEventListener(
        "storage",
        handleStorage,
      );

      window.removeEventListener(
        "pagehide",
        releaseOwnedLease,
      );

      /**
       * هنگام خروج از Route کلاس، حضور فعلی تمام می‌شود.
       *
       * بنابراین کاربر بعد از خروج می‌تواند
       * وارد کلاس دیگری شود.
       */
      releaseOwnedLease();
    };
  }, [
    attemptAcquire,
    enabled,
    roomId,
    userId,
  ]);

  return {
    status,

    blockingLease,

    retry:
      attemptAcquire,
  };
}