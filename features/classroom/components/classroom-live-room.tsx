"use client";

import Link from "next/link";

import {
  ArrowRight,
  Check,
  Clipboard,
  Copy,
  Hand,
  Info,
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
  useEffect,
  useState,
} from "react";

import {
  cn,
} from "../../../lib/utils/cn";

import {
  CLASSROOM_SPEAKING_ACTIVITY_THRESHOLD,
} from "../constants/classroom.constants";

import {
  useClassroomRoom,
  type ClassroomRoomViewer,
} from "../hooks/use-classroom-room";

import {
  useRoomMicrophone,
} from "../hooks/use-room-microphone";

import type {
  ClassroomParticipant,
  ClassroomRoom,
} from "../types/classroom.types";

import type {
  ClassroomRoomTransportStatus,
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

    viewer:
      ClassroomRoomViewer | null;
  }>;

const microphoneBars =
  [
    0.35,
    0.55,
    0.8,
    1,
    0.65,
    0.9,
    0.45,
    0.7,
  ] as const;

function getInitials(
  name: string,
): string {
  const initials =
    name
      .trim()
      .split(/\s+/u)
      .slice(0, 2)
      .map(
        (part) =>
          part
            .charAt(0)
            .toUpperCase(),
      )
      .join("");

  return initials ||
    "U";
}

function getTransportLabel(
  status:
    ClassroomRoomTransportStatus,
): string {
  switch (status) {
    case "connected":
      return "Realtime متصل";

    case "connecting":
      return "در حال اتصال";

    case "unsupported":
      return "حالت Local";

    case "error":
      return "خطای اتصال";

    case "idle":
    default:
      return "Realtime آماده نیست";
  }
}

function getFallbackParticipant(
  viewer:
    ClassroomRoomViewer | null,
): ClassroomParticipant {
  return {
    id:
      viewer?.id ??
      "local-classroom-user",

    name:
      viewer?.name ??
      "Language Learner",

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
  };
}

export function ClassroomLiveRoom({
  room,
  viewer,
}: ClassroomLiveRoomProps) {
  const roomSession =
    useClassroomRoom(
      room,
      viewer,
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
    roomSession.currentParticipant ??
    getFallbackParticipant(
      viewer,
    );

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

  const realtimeConnected =
    roomSession.transportStatus ===
    "connected";

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
      `${window.location.origin}/classroom/rooms/${encodeURIComponent(
        room.inviteCode,
      )}`;

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
        false,
      );
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
      (current) =>
        (
          current +
          1
        ) %
        room.conversationPrompts.length,
    );
  }

  return (
    <main
      dir="rtl"
      aria-labelledby="live-room-title"
      className="
        mx-auto
        w-full
        max-w-[1450px]
        space-y-5
        pb-12
      "
    >
      <header
        className="
          flex
          flex-col
          gap-4
          rounded-2xl
          border
          border-[#DCE7E5]
          bg-white
          p-5
          shadow-[0_8px_26px_rgba(15,23,42,0.04)]
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
            gap-3
          "
        >
          <Link
            href="/classroom"
            aria-label="بازگشت به بحث آزاد"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-[#DCE7E5]
              bg-[#F8FAF9]
              text-[#64748B]
              transition
              hover:border-[#B9D7D1]
              hover:bg-[#F0F8F6]
              hover:text-[#00685F]
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
                  bg-[#ECFDF5]
                  px-2.5
                  py-1
                  text-[10px]
                  font-black
                  text-[#047857]
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
                  bg-[#F4EFFF]
                  px-2.5
                  py-1
                  text-[10px]
                  font-black
                  text-[#712AE2]
                "
              >
                {room.cefrLevel}
              </span>

              <span
                className="
                  inline-flex
                  items-center
                  gap-1
                  text-[10px]
                  text-[#64748B]
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
                        "border-[#B8E3DA]",
                        "bg-[#F0FBF8]",
                        "text-[#047857]",
                      ]
                    : [
                        "border-[#E2E8F0]",
                        "bg-[#F8FAFC]",
                        "text-[#64748B]",
                      ],
                )}
              >
                {realtimeConnected ? (
                  <Wifi
                    aria-hidden="true"
                    className="h-3 w-3"
                  />
                ) : (
                  <WifiOff
                    aria-hidden="true"
                    className="h-3 w-3"
                  />
                )}

                {getTransportLabel(
                  roomSession.transportStatus,
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
                font-black
                text-[#172321]
                sm:text-2xl
              "
            >
              {room.title}
            </h1>

            <p
              className="
                mt-1
                text-sm
                font-medium
                text-[#00685F]
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
            items-center
            gap-2
          "
        >
          <button
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
              border-[#DCE7E5]
              bg-white
              px-4
              text-xs
              font-medium
              text-[#52615F]
              transition
              hover:bg-[#F8FAF9]
            "
          >
            {copied ? (
              <Check
                aria-hidden="true"
                className="
                  h-4
                  w-4
                  text-[#047857]
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
              bg-[#F1F6F5]
              px-3
              text-xs
              font-bold
              text-[#52615F]
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
          xl:grid-cols-[250px_minmax(0,1fr)_360px]
        "
      >
        <aside
          className="
            order-2
            space-y-5
            xl:order-1
          "
        >
          <ClassroomParticipantsPanel
            participants={
              roomSession.participants
            }
          />

          <section
            className="
              rounded-2xl
              border
              border-[#F1DEB4]
              bg-[#FFFBF2]
              p-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                text-[#D97706]
              "
            >
              <Sparkles
                aria-hidden="true"
                className="h-4 w-4"
              />

              <h2
                className="
                  text-xs
                  font-black
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
                (rule) => (
                  <li
                    key={rule}
                    className="
                      flex
                      items-start
                      gap-2
                      text-xs
                      leading-6
                      text-[#6D6253]
                    "
                  >
                    <span
                      aria-hidden="true"
                      className="
                        mt-2.5
                        h-1.5
                        w-1.5
                        shrink-0
                        rounded-full
                        bg-[#F59E0B]
                      "
                    />

                    {rule}
                  </li>
                ),
              )}
            </ul>
          </section>
        </aside>

        <div
          className="
            order-1
            min-w-0
            space-y-4
            xl:order-2
          "
        >
          <section
            className="
              relative
              overflow-hidden
              rounded-[24px]
              border
              border-[#CDE2DE]
              bg-[linear-gradient(180deg,#F6FBFA_0%,#FFFFFF_100%)]
              p-5
              shadow-[0_10px_30px_rgba(15,23,42,0.045)]
              sm:p-6
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-[45%]
                h-[380px]
                w-[380px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[#14B8A6]/[0.055]
                blur-3xl
              "
            />

            <div className="relative">
              <div
                className="
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:items-start
                  sm:justify-between
                "
              >
                <div>
                  <p
                    className="
                      text-xs
                      font-black
                      text-[#00685F]
                    "
                  >
                    فضای مکالمه
                  </p>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      leading-6
                      text-[#64748B]
                    "
                  >
                    میکروفون و Activity
                    Meter آماده‌اند. انتقال
                    صدای چندکاربره در نسخه
                    production باید به
                    WebRTC backend متصل شود.
                  </p>
                </div>

                <span
                  className="
                    w-fit
                    rounded-full
                    bg-[#E7F4F2]
                    px-3
                    py-1.5
                    text-[10px]
                    font-bold
                    text-[#00685F]
                  "
                >
                  Free Discussion
                </span>
              </div>

              <div
                className="
                  flex
                  min-h-[360px]
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
                    "border-4",
                    "text-2xl",
                    "font-black",
                    "transition-all",

                    isLocallySpeaking
                      ? [
                          "border-[#6EE7B7]",
                          "bg-[#D1FAE5]",
                          "text-[#047857]",
                          "shadow-[0_0_60px_rgba(16,185,129,0.20)]",
                        ]
                      : isMicrophoneEnabled
                        ? [
                            "border-[#A7F3D0]",
                            "bg-[#ECFDF5]",
                            "text-[#047857]",
                          ]
                        : [
                            "border-[#DDD4F4]",
                            "bg-[#F6F2FF]",
                            "text-[#712AE2]",
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
                        inset-[-10px]
                        animate-ping
                        rounded-full
                        border
                        border-[#10B981]/20
                      "
                    />
                  ) : null}
                </div>

                <h2
                  className="
                    mt-5
                    text-lg
                    font-black
                    text-[#172321]
                  "
                >
                  {currentUser.name}
                </h2>

                <p
                  className={cn(
                    "mt-2",
                    "text-sm",
                    "font-medium",

                    isMicrophoneEnabled
                      ? "text-[#047857]"
                      : "text-[#64748B]",
                  )}
                >
                  {isLocallySpeaking
                    ? "در حال صحبت"
                    : isMicrophoneEnabled
                      ? "میکروفون آماده است"
                      : "میکروفون خاموش است"}
                </p>

                <div
                  aria-label="سطح ورودی میکروفون"
                  className="
                    mt-5
                    flex
                    h-10
                    items-end
                    gap-1.5
                  "
                >
                  {microphoneBars.map(
                    (
                      factor,
                      index,
                    ) => (
                      <span
                        key={
                          factor
                        }
                        className={cn(
                          "w-1.5",
                          "rounded-full",
                          "transition-[height]",

                          isMicrophoneEnabled
                            ? "bg-[#10B981]"
                            : "bg-[#D7E0DE]",
                        )}
                        style={{
                          height:
                            `${Math.max(
                              6,
                              isMicrophoneEnabled
                                ? 6 +
                                  inputLevel *
                                    30 *
                                    factor
                                : 6 +
                                  index
                                    % 2,
                            )}px`,
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
                  border-[#DDD3F4]
                  bg-[#F9F7FE]
                  p-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <span
                    className="
                      text-xs
                      font-black
                      text-[#712AE2]
                    "
                  >
                    موضوع پیشنهادی
                  </span>

                  <button
                    type="button"
                    onClick={
                      showNextPrompt
                    }
                    className="
                      text-[10px]
                      font-bold
                      text-[#64748B]
                      transition
                      hover:text-[#712AE2]
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
                    text-[#334155]
                  "
                >
                  {room
                    .conversationPrompts[
                    activePromptIndex
                  ] ??
                    "Start talking about any topic you like."}
                </p>
              </div>
            </div>
          </section>

          {microphoneError ? (
            <div
              role="alert"
              className="
                rounded-xl
                border
                border-[#FECACA]
                bg-[#FEF2F2]
                px-4
                py-3
                text-sm
                leading-6
                text-[#B91C1C]
              "
            >
              {microphoneError}
            </div>
          ) : null}

          <section
            className="
              flex
              flex-wrap
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-[#DCE7E5]
              bg-white
              p-4
              shadow-[0_6px_20px_rgba(15,23,42,0.035)]
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
                "min-w-36",
                "items-center",
                "justify-center",
                "gap-2",
                "rounded-xl",
                "px-4",
                "text-sm",
                "font-black",
                "transition",

                isMicrophoneEnabled
                  ? [
                      "bg-[#10B981]",
                      "text-[#FFFFFF]",
                      "hover:bg-[#059669]",
                    ]
                  : [
                      "bg-[#00685F]",
                      "text-[#FFFFFF]",
                      "hover:bg-[#005A52]",
                    ],
              )}
            >
              {isRequestingMicrophone ? (
                <LoaderCircle
                  aria-hidden="true"
                  className="
                    h-4
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
                  ? "میکروفون روشن"
                  : "روشن کردن میکروفون"}
            </button>

            <button
              type="button"
              onClick={
                roomSession.toggleHandRaised
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
                "font-bold",
                "transition",

                currentUser.handRaised
                  ? [
                      "border-[#F6D391]",
                      "bg-[#FFF8E8]",
                      "text-[#B45309]",
                    ]
                  : [
                      "border-[#DCE7E5]",
                      "bg-white",
                      "text-[#52615F]",
                      "hover:bg-[#F8FAF9]",
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
                border-[#FECACA]
                bg-[#FEF2F2]
                px-4
                text-sm
                font-bold
                text-[#B91C1C]
                transition
                hover:bg-[#FEE2E2]
              "
            >
              <LogOut
                aria-hidden="true"
                className="h-4 w-4"
              />

              خروج از اتاق
            </Link>
          </section>

          <div
            className="
              flex
              items-start
              gap-2
              rounded-xl
              border
              border-[#CDE4DF]
              bg-[#F1FAF8]
              px-4
              py-3
            "
          >
            <Info
              aria-hidden="true"
              className="
                mt-0.5
                h-4
                w-4
                shrink-0
                text-[#00685F]
              "
            />

            <p
              className="
                text-[11px]
                leading-6
                text-[#52615F]
              "
            >
              Chat و Room State با
              Transport مستقل کار می‌کنند.
              برای انتقال صدای واقعی بین
              کاربران باید WebRTC و
              Signalling Server در Backend
              متصل شوند.
            </p>
          </div>
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
              roomSession.messages
            }
            sharedItems={
              roomSession.sharedItems
            }
            currentUser={{
              id:
                currentUser.id,

              name:
                currentUser.name,
            }}
            onSendMessage={
              roomSession.sendChatMessage
            }
            onShareItem={
              roomSession.shareItem
            }
          />
        </aside>
      </section>
    </main>
  );
}