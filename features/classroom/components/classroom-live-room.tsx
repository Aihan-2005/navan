"use client";

import Link from "next/link";

import {
  useEffect,
  useState,
} from "react";

import {
  ArrowRight,
  Check,
  Clipboard,
  Copy,
  Hand,
  LoaderCircle,
  LogOut,
  Mic,
  MicOff,
  Radio,
  Sparkles,
  UsersRound,
  Wifi,
  WifiOff,
} from "lucide-react";

import {
  Card,
} from "../../../components/ui/card";

import {
  cn,
} from "../../../lib/utils/cn";

import {
  CLASSROOM_SPEAKING_ACTIVITY_THRESHOLD,
} from "../constants/classroom.constants";

import {
  useClassroomRoom,
} from "../hooks/use-classroom-room";

import {
  useRoomMicrophone,
} from "../hooks/use-room-microphone";

import type {
  ClassroomParticipant,
  ClassroomRoom,
} from "../types/classroom.types";

import type {ClassroomRoomTransportStatus,
} from "../realtime/classroom-room-transport";

import {
  ClassroomParticipantsPanel,
} from "./classroom-participants-panel";

import {
  ClassroomRoomSidebar,
} from "./classroom-room-sidebar";

type ClassroomLiveRoomProps =
  Readonly<{
    room:
      ClassroomRoom;
  }>;

function getInitials(
  name:
    string,
): string {
  return name
    .trim()
    .split(
      /\s+/u,
    )
    .slice(
      0,
      2,
    )
    .map(
      (
        part,
      ) =>
        part
          .charAt(
            0,
          )
          .toUpperCase(),
    )
    .join("");
}

function getTransportLabel(
  status:
    ClassroomRoomTransportStatus,
): string {
  switch (
    status
  ) {case "connected":
      return "Local realtime فعال";

    case "connecting":
      return "در حال اتصال";

    case "unsupported":
      return "حالت Local";

    case "error":
      return "خطای Realtime";

    case "idle":
    default:
      return "Realtime غیرفعال";
  }
}

function getFallbackParticipant():
  ClassroomParticipant {
  return {
    id:
      "local-demo-user",

    name:
      "Demo User",

    avatarUrl:
      null,

    role:
      "member",

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
      new Date()
        .toISOString(),
  };}

export function ClassroomLiveRoom({
  room,
}: ClassroomLiveRoomProps) {
  const roomSession =
    useClassroomRoom(
      room,
    );

  const {
    status:
      microphoneStatus,

    inputLevel,

    errorMessage:
      microphoneError,

    toggleMicrophone,
  } =
    useRoomMicrophone();

  const [
    copied,
    setCopied,
  ] =
    useState(false);

  const [
    activePromptIndex,
    setActivePromptIndex,
  ] =
    useState(0);

  const currentUser =
    roomSession
      .currentParticipant ??
    getFallbackParticipant();

  const isMicrophoneEnabled =
    microphoneStatus ===
    "enabled";

  const isRequestingMicrophone =
 microphoneStatus ===
    "requesting";

  const isLocallySpeaking =
    isMicrophoneEnabled &&
    inputLevel >=
      CLASSROOM_SPEAKING_ACTIVITY_THRESHOLD;

  useEffect(() => {
    roomSession.setMicrophoneEnabled(
      isMicrophoneEnabled,
    );
  }, [
    isMicrophoneEnabled,
    roomSession.setMicrophoneEnabled,
  ]);

  useEffect(() => {
    roomSession.setLocalSpeaking(
      isLocallySpeaking,
    );
  }, [
    isLocallySpeaking,
    roomSession.setLocalSpeaking,
  ]);

  async function copyInvite(): Promise<void> {
    const inviteUrl =
      `${window.location.origin}/classroom/rooms/${room.inviteCode}`;

    try {
      await navigator.clipboard.writeText(
        inviteUrl,
      );

      setCopied(
        true,
      );

      window.setTimeout(
        () => {
          setCopied(
            false,
          );
        },
        1_800,
      );
    } catch {
      setCopied(
        false, );
    }
  }

  function showNextPrompt(): void {
    if (
      room.conversationPrompts.length ===
      0
    ) {
      return;
    }

    setActivePromptIndex(
      (
        current,
      ) =>
        (
          current +
          1
        ) %
        room
          .conversationPrompts
          .length,
    );
  }

  const realtimeConnected =
    roomSession
      .transportStatus ===
    "connected";

  return (
    <main
      className="
        mx-auto
        w-full
        max-w-[1500px]
        space-y-5
      "
      aria-labelledby="live-room-title"
    >
      <header
        className="
          flex
          flex-col
          gap-4
          xl:flex-row
          xl:items-center
          xl:justify-between
 "
      >
        <div
          className="
            flex
            min-w-0
            items-start
            gap-4
          "
        >
          <Link
            href="/classroom"
            aria-label="بازگشت به اتاق‌های گفتگو"
            className="
              mt-1
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.025]
              text-slate-400
              transition
              hover:bg-white/[0.06]
              hover:text-white
            "
          >
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4"
            />
          </Link>

          <div className="min-w-0">
            <div
              className="
                flex
                 flex-wrap
                items-center
                gap-2
              "
            >
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-emerald-400/10
                  px-2.5
                  py-1
                  text-[10px]
                  font-medium
                  text-emerald-300
                "
              >
                <Radio
                  aria-hidden="true"
                  className="h-3 w-3"
                />

                LIVE
              </span>

              <span
                dir="ltr"
                className="
                  rounded-full
                  bg-violet-400/10
                  px-2.5
                  py-1
                  text-[10px]
                  text-violet-300
                "
              >
                {room.cefrLevel}
              </span>

              <span
                className="
                  inline-flex
                  items-center
                  gap-1
                  text-xs
                  text-slate-600
               "
              >
                <UsersRound
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                />

                {
                  roomSession
                    .participants
                    .length
                }
                /
                {room.capacity}
              </span>

              <span
                className={cn(
                  "inline-flex",
                  "items-center",
                  "gap-1.5",
                  "rounded-full",
                  "border",
                  "px-2.5",
                  "py-1",
                  "text-[10px]",

                  realtimeConnected
                    ? [
                        "border-cyan-400/15",
                        "bg-cyan-400/[0.05]",
                        "text-cyan-300",
                      ]
                    : [
                        "border-white/[0.05]",
                        "bg-white/[0.02]",
                        "text-slate-600",
                      ],
                )}
              >
                {realtimeConnected ? (
                  <Wifi
                    aria-hidden="true"
                    className="h-3 w-3"
                  />
                ) : ( <WifiOff
                    aria-hidden="true"
                    className="h-3 w-3"
                  />
                )}

                {getTransportLabel(
                  roomSession
                    .transportStatus,
                )}
              </span>
            </div>

            <h1
              id="live-room-title"
              dir="ltr"
              className="
                mt-2
                truncate
                text-left
                text-xl
                font-bold
                text-white
                sm:text-2xl
              "
            >
              {room.title}
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              {room.topic}
            </p>
          </div>
        </div>

        <div
          className="
            flex
            flex-wrap
            gap-2
          "
        > <button
            type="button"
            onClick={() => {
              void copyInvite();
            }}
            className="
              inline-flex
              h-10
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/[0.07]
              bg-white/[0.025]
              px-4
              text-xs
              text-slate-300
              transition
              hover:bg-white/[0.06]
            "
          >
            {copied ? (
              <Check
                aria-hidden="true"
                className="
                  h-4
                  w-4
                  text-emerald-300
                "
              />
            ) : (
              <Copy
                aria-hidden="true"
                className="h-4 w-4"
              />
            )}

            {copied
              ? "کپی شد"
              : "دعوت دوستان"}
          </button>

          <div
            dir="ltr"
            className="
              inline-flex
              h-10
              items-center
              gap-2
              rounded-xl
              border
              border-white/[0.07]
              bg-black/15
              px-3
              text-xs
              text-slate-500
            "
          >
            <Clipboard
              aria-hidden="true"
              className="h-3.5 w-3.5"
            />

            {room.inviteCode}
          </div>
        </div>
      </header>

      <section
        className="
          grid
          gap-5
          2xl:grid-cols-[240px_minmax(0,1fr)_360px]
        "
      >
        <aside
          className="
            order-2
            space-y-5
            2xl:order-1
          "
        >
          <ClassroomParticipantsPanel
            participants={
              roomSession
                .participants
            }
          />

          <Card className="p-5">
            <div
              className="
                flex
                items-center
                           gap-2
                text-amber-300
              "
            >
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4"
              />

              <h2
                className="
                  text-xs
                  font-bold
                "
              >
                قوانین کوتاه
              </h2>
            </div>

            <ul
              className="
                mt-4
                space-y-3
              "
            >
              {room.rules.map(
                (
                  rule,
                ) => (
                  <li
                    key={
                      rule
                    }
                    className="
                      flex
                      items-start
                      gap-2
                      text-xs
                         leading-6
                      text-slate-600
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        mt-2.5
                        h-1
                        w-1
                        shrink-0
                        rounded-full
                        bg-amber-300
                      "
                    />

                    {rule}
                  </li>
                ),
              )}
            </ul>
          </Card>
        </aside>

        <div
          className="
            order-1
            min-w-0
            space-y-5
            2xl:order-2
          "
        >
          <Card
            className="
              relative
              min-h-[520px]
              overflow-hidden
              p-5
              sm:p-6
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                h-[420px]
                w-[420px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-violet-500/[0.05]
                blur-3xl
              "
            />

            <div
              className="
                relative
                flex
                min-h-[470px]
                flex-col
              "
            >
              <div
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      font-medium
                      text-violet-300
                    "
                  >
                    فضای مکالمه
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      text-slate-700
                    " >
                    Chat و Room State اکنون Transport مستقل دارند؛ Audio هنوز برای ارسال به دیگران WebRTC نشده است.
                  </p>
                </div>

                <span
                  className="
                    rounded-full
                    border
                    border-white/[0.05]
                    bg-white/[0.025]
                    px-3
                    py-1.5
                    text-[10px]
                    text-slate-600
                  "
                >
                  WebRTC مرحله بعد
                </span>
              </div>

              <div
                className="
                  flex
                  flex-1
                  flex-col
                  items-center
                  justify-center
                  py-8
                  text-center
                "
              >
                <div
                  className={cn(
                    "relative",
                    "flex",
                    "h-28",
                    "w-28",
                    "items-center",
                    "justify-center",
                    "rounded-full",
                    "border",
                    "text-2xl",
                    "font-bold",
                    "transition",

                    isLocallySpeaking
                      ? [
                          "border-emerald-300/35",
                          "bg-emerald-400/15",
                          "text-emerald-100",
                          "shadow-[0_0_90px_rgba(52,211,153,0.16)]",
                        ]
                      : isMicrophoneEnabled
                        ? [
                            "border-emerald-300/20",
                            "bg-emerald-400/10",
                            "text-emerald-100",
                          ]
                        : [
                            "border-violet-300/15",
                            "bg-violet-400/10",
                            "text-violet-100",
                          ],
                  )}
                >
                  {getInitials(
                    currentUser.name,
                  )}

                  {isLocallySpeaking ? (
                    <span
                      aria-hidden="true"
                      className="
                        absolute
                        inset-0
                        animate-ping
                        rounded-full
                        border
                        border-emerald-400/10
                      "
                    />
                  ) : null}
                </div>

                <h2
                  className="
                    mt-5
                    text-lg
                    font-bold
                    text-white
                  "
                >
                  {currentUser.name}
                </h2>

                 <p
                  className={cn(
                    "mt-2",
                    "text-sm",

                    isMicrophoneEnabled
                      ? "text-emerald-300"
                      : "text-slate-600",
                  )}
                >
                  {isLocallySpeaking
                    ? "در حال صحبت"
                    : isMicrophoneEnabled
                      ? "میکروفون آماده است"
                      : "میکروفون بسته است"}
                </p>

                <div
                  aria-label="سطح میکروفون"
                  className="
                    mt-5
                    flex
                    h-9
                    items-center
                    gap-1
                  "
                >
                  {[
                    0.35,
                    0.55,
                    0.8,
                    1,
                    0.65,
                    0.9,
                    0.45,
                    0.7,
                  ].map(
                    (
                      factor,
                      index,
                    ) => (
                      <span
                        key={`${factor}-${index}`}
                        className={cn(
                          "w-1",
                          "rounded-full",
                          "transition-[height]",

                          isMicrophoneEnabled
                            ? "bg-emerald-300"
                            : "bg-white/[0.08]",
                      )}
                        style={{
                          height:
                            `${
                              isMicrophoneEnabled
                                ? Math.max(
                                    5,
                                    5 +
                                      inputLevel *
                                        28 *
                                        factor,
                                  )
                                : 5
                            }px`,
                        }}
                      />
                    ),
                  )}
                </div>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-violet-400/10
                  bg-violet-400/[0.035]
                  p-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >
                  <span
                    className="
                      text-xs
                      text-violet-300
                    "
                  >
                    موضوع پیشنهادی
                  </span>

                  <button
                    type="button"
                    onClick={
                      showNextPrompt }
                    className="
                      text-[10px]
                      text-slate-600
                      transition
                      hover:text-white
                    "
                  >
                    موضوع بعدی
                  </button>
                </div>

                <p
                  dir="ltr"
                  className="
                    mt-3
                    text-left
                    text-sm
                    leading-7
                    text-slate-200
                  "
                >
                  {room.conversationPrompts[
                    activePromptIndex
                  ] ??
                    "Start talking about any topic you like."}
                </p>
              </div>
            </div>
          </Card>

          {microphoneError ? (
            <div
              role="alert"
              className="
                rounded-xl
                border
                border-red-400/15
                bg-red-400/[0.05]
                px-4
                py-3
                text-sm
                text-red-200
              "
            >
              {microphoneError}
            </div>
          ) : null}

          <Card
            className="
              flexflex-wrap
              items-center
              justify-center
              gap-3
              p-4
            "
          >
            <button
              type="button"
              onClick={() => {
                void toggleMicrophone();
              }}
              disabled={
                isRequestingMicrophone
              }
              className={cn(
                "inline-flex",
                "h-12",
                "min-w-32",
                "items-center",
                "justify-center",
                "gap-2",
                "rounded-xl",
                "px-4",
                "text-sm",
                "font-bold",
                "transition",

                isMicrophoneEnabled
                  ? [
                      "bg-emerald-400",
                      "text-slate-950",
                      "hover:bg-emerald-300",
                    ]
                  : [
                      "bg-white/[0.07]",
                      "text-slate-300",
                      "hover:bg-white/[0.1]",
                    ],
              )}
            >
              {isRequestingMicrophone ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="h-4
                    w-4
                    animate-spin
                  "
                />
              ) : isMicrophoneEnabled ? (
                <Mic
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              ) : (
                <MicOff
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              )}

              {isRequestingMicrophone
                ? "در حال اتصال..."
                : isMicrophoneEnabled
                  ? "میکروفون باز"
                  : "باز کردن میکروفون"}
            </button>

            <button
              type="button"
              onClick={
                roomSession
                  .toggleHandRaised
              }
              className={cn(
                "inline-flex",
                "h-12",
                "items-center",
                "justify-center",
                "gap-2",
                "rounded-xl",
                "border",
                "px-4",
                "text-sm",
                "font-medium",
                "transition",

                currentUser.handRaised
                  ? [
                      "border-amber-300/20",
                      "bg-amber-400/10",
                      "text-amber-200",
                    ]
                  : [
                      "border-white/[0.07]",
                      "bg-white/[0.025]",
                      "text-slate-400",
                      "hover:bg-white/[0.06]",
                    ],
              )}
            >
              <Hand
                aria-hidden="true"
                className="h-4 w-4"
              />

              {currentUser.handRaised
                ? "دست بالا است"
                : "دست بالا"}
            </button>

            <Link
              href="/classroom"
              className="
                inline-flex
                h-12
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-400/15
                bg-red-400/[0.05]
                px-4
                text-sm
                font-medium
                text-red-300
                transition
                hover:bg-red-400/10
              "
            > <LogOut
                aria-hidden="true"
                className="h-4 w-4"
              />

              خروج از اتاق
            </Link>
          </Card>
        </div>

        <aside
          className="
            order-3
            min-w-0
          "
        >
          <ClassroomRoomSidebar
            roomId={
              room.id
            }
            messages={
              roomSession
                .messages
            }
            sharedItems={
              roomSession
                .sharedItems
            }
            currentUser={{
              id:
                currentUser.id,

              name:
                currentUser.name,
            }}
            onSendMessage={
              roomSession
                .sendChatMessage
            }
            onShareItem={
              roomSession
                .shareItem
            }
          />
        </aside>
      </section>
    </main>
  );
}