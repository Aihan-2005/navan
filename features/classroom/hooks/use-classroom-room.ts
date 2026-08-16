"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import {
  classroomChatMessageInputSchema,
  classroomShareItemInputSchema,
} from "../schemas/classroom.schema";

import type {
  ClassroomChatMessage,
  ClassroomParticipant,
  ClassroomRoom,
  ClassroomRoomEvent,
  ClassroomSharedItem,
  ClassroomShareItemInput,
} from "../types/classroom.types";

import {
  createBrowserClassroomRoomTransport,
} from "../realtime/browser-classroom-room-transport";

import type {
  ClassroomRoomTransport,
  ClassroomRoomTransportStatus,
} from "../realtime/classroom-room-transport";

type ClassroomRoomState =
  Readonly<{
    participants:
      readonly ClassroomParticipant[];

    messages:
      readonly ClassroomChatMessage[];

    sharedItems:
      readonly ClassroomSharedItem[];
  }>;
type ClassroomRoomStateAction =
  | Readonly<{
      type:
        "room.event";

      event:
        ClassroomRoomEvent;
    }>
  | Readonly<{
      type:
        "participant.local-speaking";

      participantId:
        string;

      isSpeaking:
        boolean;
    }>;

function createClientId(
  prefix:
    string,
): string {
  if (
    typeof crypto !==
      "undefined" &&
    typeof crypto.randomUUID ===
      "function"
  ) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function upsertParticipant(
  participants:
    readonly ClassroomParticipant[],

  participant:
    ClassroomParticipant,
): readonly ClassroomParticipant[] {
  const existingIndex =
    participants.findIndex(
      (
        candidate,
      ) =>
        candidate.id ===
        participant.id,
    );

  if (
    existingIndex ===
    -1
  ) {
    return [
      ...participants,
      participant,
    ];
  }

  return participants.map(
    (
      candidate,
      index,
    ) =>
      index ===
      existingIndex
        ? participant
        : candidate,
  );
}

function updateParticipant(
  participants:
    readonly ClassroomParticipant[],

  participantId:
    string,

  patch:
    Partial<ClassroomParticipant>,
): readonly ClassroomParticipant[] {
  return participants.map(
    (
      participant,
    ) =>
      participant.id ===
      participantId
        ? {
            ...participant,
            ...patch,
          }
        : participant,
  );
}

function appendMessage(
  messages: readonly ClassroomChatMessage[],

  message:
    ClassroomChatMessage,
): readonly ClassroomChatMessage[] {
  if (
    messages.some(
      (
        candidate,
      ) =>
        candidate.id ===
        message.id,
    )
  ) {
    return messages;
  }

  return [
    ...messages,
    message,
  ];
}

function prependSharedItem(
  sharedItems:
    readonly ClassroomSharedItem[],

  item:
    ClassroomSharedItem,
): readonly ClassroomSharedItem[] {
  if (
    sharedItems.some(
      (
        candidate,
      ) =>
        candidate.id ===
        item.id,
    )
  ) {
    return sharedItems;
  }

  return [
    item,
    ...sharedItems,
  ];
}

function classroomRoomReducer(
  state:
    ClassroomRoomState,

  action:
    ClassroomRoomStateAction,
): ClassroomRoomState {
  if (
    action.type ===
    "participant.local-speaking"
  ) {
    return {
      ...state,

      participants:
        updateParticipant(
          state.participants,
          action.participantId,
          {
            isSpeaking:
              action.isSpeaking,
          },
        ),
    };
  }

  const {
    event,
  } =
    action;

  switch (
    event.type
  ) {
    case "chat.message.created":
      return {
        ...state,

        messages:
          appendMessage(
            state.messages,
            event.payload,
          ),
      };

    case "resource.shared":
      return {
        ...state,
sharedItems:
          prependSharedItem(
            state.sharedItems,
            event.payload,
          ),
      };

    case "participant.microphone.updated":
  return {
    ...state,

    participants:
      state.participants.map(
        (
          participant,
        ) => {
          if (
            participant.id !==
            event.payload
              .participantId
          ) {
            return participant;
          }

          return {
            ...participant,

            isMuted:
              event.payload
                .isMuted,

            isSpeaking:
              event.payload
                .isMuted
                ? false
                : participant.isSpeaking,
          };
        },
      ),
  };
    case "participant.hand.updated":
      return {
        ...state,

        participants:
          updateParticipant(
            state.participants,
            event.payload
              .participantId,
            {
              handRaised:
                event.payload
                  .handRaised,
            },
          ),
      };

    case "participant.speaking.updated":
      return {
        ...state,
participants:
          updateParticipant(
            state.participants,
            event.payload
              .participantId,
            {
              isSpeaking:
                event.payload
                  .isSpeaking,
            },
          ),
      };

    default:
      return state;
  }
}

function buildInitialState(
  room:
    ClassroomRoom,
): ClassroomRoomState {
  return {
    participants: [
      ...room.participants,
    ],

    messages: [
      ...room.messages,
    ],

    sharedItems: [
      ...room.sharedItems,
    ],
  };
}

export function useClassroomRoom(
  room:
    ClassroomRoom,
) {
  const [
    state,
    dispatch,
  ] =
    useReducer(
  classroomRoomReducer,
      room,
      buildInitialState,
    );

  const [
    transportStatus,
    setTransportStatus,
  ] =
    useState<ClassroomRoomTransportStatus>(
      "idle",
    );

  const transportRef =
    useRef<ClassroomRoomTransport | null>(
      null,
    );

  const currentParticipant =
    useMemo(
      () =>
        state.participants.find(
          (
            participant,
          ) =>
            participant.isSelf,
        ) ??
        null,
      [
        state.participants,
      ],
    );

  useEffect(() => {
    const transport =
      createBrowserClassroomRoomTransport(
        room.id,
      );

    transportRef.current =
      transport;

    const unsubscribeEvents =
      transport.subscribe(
        (
          event,
        ) => {
          dispatch({
            type:
              "room.event",
 event,
          });
        },
      );

    const unsubscribeStatus =
      transport.subscribeStatus(
        (
          status,
        ) => {
          setTransportStatus(
            status,
          );
        },
      );

    transport.connect();

    return () => {
      unsubscribeEvents();
      unsubscribeStatus();

      transport.disconnect();

      if (
        transportRef.current ===
        transport
      ) {
        transportRef.current =
          null;
      }
    };
  }, [
    room.id,
  ]);

  const publishEvent =
    useCallback(
      (
        event:
          ClassroomRoomEvent,
      ): void => {
        /*
         * BroadcastChannel پیام خود فرستنده
         * را به همان Channel object برنمی‌گرداند.
         *
         * بنابراین ابتدا Local State را Update
         * می‌کنیم و سپس Event را Publish می‌کنیم.
         */
        dispatch({
          type:
            "room.event", event,
        });

        transportRef.current?.publish(
          event,
        );
      },
      [],
    );

  const sendChatMessage =
    useCallback(
      (
        body:
          string,
      ): boolean => {
        const parsed =
          classroomChatMessageInputSchema.safeParse(
            {
              body,
            },
          );

        if (
          !parsed.success ||
          !currentParticipant
        ) {
          return false;
        }

        const createdAt =
          new Date()
            .toISOString();

        const message:
          ClassroomChatMessage =
          {
            id:
              createClientId(
                "chat",
              ),

            kind:
              "text",

            senderId:
              currentParticipant.id,

            senderName:
                            currentParticipant.name,
 body:
              parsed.data.body,

            createdAt,
          };

        const event:
          ClassroomRoomEvent =
          {
            eventId:
              createClientId(
                "event",
              ),

            roomId:
              room.id,

            actorId:
              currentParticipant.id,

            type:
              "chat.message.created",

            payload:
              message,

            createdAt,
          };

        publishEvent(
          event,
        );

        return true;
      },
      [
        currentParticipant,
        publishEvent,
        room.id,
      ],
    );
const shareItem =
    useCallback(
      (
        input:
          ClassroomShareItemInput,
      ): boolean => {
        const parsed =
          classroomShareItemInputSchema.safeParse(
            input,
          );

        if (
          !parsed.success ||
          !currentParticipant
        ) {
          return false;
        }

        const createdAt =
          new Date()
            .toISOString();

        const item:
          ClassroomSharedItem =
          {
            id:
              createClientId(
                "resource",
              ),

            ...parsed.data,

            createdBy: {
              id:
                currentParticipant.id,

              name:
                currentParticipant.name,
            },

            createdAt,
          };

        const event:
          ClassroomRoomEvent =
          {
            eventId:
              createClientId(
                "event",
              ),

            roomId:
              room.id,

            actorId:
              currentParticipant.id,

            type:
              "resource.shared",

            payload:
              item,

            createdAt,
          };

        publishEvent(
          event,
        );

        return true;
      },
      [
        currentParticipant,
        publishEvent,
        room.id,
      ],
    );

  const setMicrophoneEnabled =
    useCallback(
      (
        enabled:
          boolean,
      ): void => {
        if (
          !currentParticipant
        ) {
          return;
        }

        const nextMutedState =
          !enabled;
if (
          currentParticipant.isMuted ===
          nextMutedState
        ) {
          return;
        }

        const createdAt =
          new Date()
            .toISOString();

        publishEvent({
          eventId:
            createClientId(
              "event",
            ),

          roomId:
            room.id,

          actorId:
            currentParticipant.id,

          type:
            "participant.microphone.updated",

          payload: {
            participantId:
              currentParticipant.id,

            isMuted:
              nextMutedState,
          },

          createdAt,
        });
      },
      [
        currentParticipant,
        publishEvent,
        room.id,
      ],
    );

  const toggleHandRaised =
    useCallback(
      (): void => {
        if (
          !currentParticipant
        ) {
          return;
        }

        const createdAt =
          new Date()
            .toISOString();

        publishEvent({
          eventId:
            createClientId(
              "event",
            ),

          roomId:
            room.id,

          actorId:
            currentParticipant.id,

          type:
            "participant.hand.updated",

          payload: {
            participantId:
              currentParticipant.id,

            handRaised:
              !currentParticipant
                .handRaised,
          },

          createdAt,
        });
      }, [
        currentParticipant,
        publishEvent,
        room.id,
      ],
    );

  const setLocalSpeaking =
    useCallback(
      (
        isSpeaking:
          boolean,
      ): void => {
        if (
          !currentParticipant ||
          currentParticipant.isSpeaking ===
            isSpeaking
        ) {
          return;
        }

        /*
         * فعلاً Audio Level فقط Local است.
         *
         * بعد از WebRTC/WebSocket، Speaking State
         * را می‌توانیم با throttling برای دیگران
         * نیز Publish کنیم.
         */
        dispatch({
          type:
            "participant.local-speaking",

          participantId:
            currentParticipant.id,

          isSpeaking,
        });
      },
      [
        currentParticipant,
      ],
    );

  return {
    participants:
      state.participants,

    messages:
      state.messages,

    sharedItems:
      state.sharedItems,
currentParticipant,

    transportStatus,

    sendChatMessage,

    shareItem,

    setMicrophoneEnabled,

    setLocalSpeaking,

    toggleHandRaised,
  };
}