import {
  Crown,
  Hand,
  Mic,
  MicOff,
  ShieldCheck,
  Signal,
  UsersRound,
} from "lucide-react";

import {
  cn,
} from "../../../lib/utils/cn";


import type {
  ClassroomParticipant,
} from "../types/classroom.types";

type ClassroomParticipantsPanelProps =
  Readonly<{
    participants:
      readonly ClassroomParticipant[];
  }>;

function getInitials(
  name: string,
): string {
  return (
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
      .join("") ||
    "U"
  );
}

function getConnectionLabel(
  quality:
    ClassroomParticipant[
      "connectionQuality"
    ],
): string {
  switch (quality) {
    case "good":
      return "اتصال خوب";

    case "fair":
      return "اتصال متوسط";

    default:
      return "اتصال ضعیف";
  }
}

export function ClassroomParticipantsPanel({
  participants,
}: ClassroomParticipantsPanelProps) {
  return (
    <section
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[#DCE7E5]
        bg-white
        shadow-[0_6px_20px_rgba(15,23,42,0.035)]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          border-b
          border-[#E6ECEB]
          px-4
          py-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <UsersRound
            aria-hidden="true"
            className="
              h-4
              w-4
              text-[#00685F]
            "
          />

          <h2
            className="
              text-sm
              font-black
              text-[#172321]
            "
          >
            افراد حاضر
          </h2>
        </div>

        <span
          className="
            rounded-full
            bg-[#F1F5F4]
            px-2.5
            py-1
            text-[10px]
            font-bold
            text-[#64748B]
          "
        >
          {participants.length}
        </span>
      </div>

      <div
        className="
          max-h-[390px]
          overflow-y-auto
          p-3
        "
      >
        <div className="space-y-1">
          {participants.map(
            (participant) => (
              <article
                key={
                  participant.id
                }
                className={cn(
                  "flex",
                  "items-center",
                  "gap-3",
                  "rounded-xl",
                  "px-3",
                  "py-2.5",
                  "transition",

                  participant.isSpeaking
                    ? [
                        "bg-[#ECFDF5]",
                        "ring-1",
                        "ring-[#A7F3D0]",
                      ]
                    : "hover:bg-[#F8FAF9]",
                )}
              >
                <div
                  className={cn(
                    "relative",
                    "flex",
                    "h-10",
                    "w-10",
                    "shrink-0",
                    "items-center",
                    "justify-center",
                    "rounded-full",
                    "text-xs",
                    "font-black",

                    participant.isSpeaking
                      ? [
                          "bg-[#D1FAE5]",
                          "text-[#047857]",
                        ]
                      : [
                          "bg-[#F4EFFF]",
                          "text-[#712AE2]",
                        ],
                  )}
                >
                  {getInitials(
                    participant.name,
                  )}

                  <span
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-0
                      right-0
                      h-2.5
                      w-2.5
                      rounded-full
                      border-2
                      border-[#FFFFFF]
                      bg-[#10B981]
                    "
                  />
                </div>

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-1.5
                    "
                  >
                    <p
                      className="
                        truncate
                        text-sm
                        font-bold
                        text-[#334155]
                      "
                    >
                      {participant.name}

                      {participant.isSelf
                        ? " (شما)"
                        : ""}
                    </p>

                    {participant.role ===
                    "host" ? (
                      <Crown
                        aria-label="میزبان"
                        className="
                          h-3.5
                          w-3.5
                          shrink-0
                          text-[#D97706]
                        "
                      />
                    ) : null}

                    {participant.role ===
                    "moderator" ? (
                      <ShieldCheck
                        aria-label="مدیر"
                        className="
                          h-3.5
                          w-3.5
                          shrink-0
                          text-[#00685F]
                        "
                      />
                    ) : null}
                  </div>

                  <div
                    className="
                      mt-1
                      flex
                      items-center
                      gap-1.5
                      text-[9px]
                      text-[#7C8987]
                    "
                  >
                    <Signal
                      aria-hidden="true"
                      className="h-3 w-3"
                    />

                    {getConnectionLabel(
                      participant.connectionQuality,
                    )}
                  </div>
                </div>

                <div
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-1.5
                  "
                >
                  {participant.handRaised ? (
                    <Hand
                      aria-label="دست بالا"
                      className="
                        h-4
                        w-4
                        text-[#D97706]
                      "
                    />
                  ) : null}

                  {participant.isMuted ? (
                    <MicOff
                      aria-label="میکروفون بسته"
                      className="
                        h-4
                        w-4
                        text-[#94A3B8]
                      "
                    />
                  ) : (
                    <Mic
                      aria-label="میکروفون باز"
                      className={cn(
                        "h-4",
                        "w-4",

                        participant.isSpeaking
                          ? "text-[#10B981]"
                          : "text-[#64748B]",
                      )}
                    />
                  )}
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </section>
  );
}