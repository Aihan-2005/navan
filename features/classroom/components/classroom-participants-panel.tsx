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
  Card,
} from "../../../components/ui/card";

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

export function ClassroomParticipantsPanel({
  participants,
}: ClassroomParticipantsPanelProps) {
  return (<Card
      className="
        overflow-hidden
        p-0
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          border-b
          border-white/[0.06]
          px-5
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
              text-violet-300
            "
          />

          <h2
            className="
              text-sm
              font-bold
              text-white
            "
          >
            افراد حاضر
          </h2>
        </div>

        <span
          className="
            text-xs
            text-slate-600
          "
        >
          {participants.length}
        </span>
      </div>

      <div
        className="
          max-h-[360px]
          overflow-y-auto
          p-3
        " >
        <div className="space-y-1">
          {participants.map(
            (
              participant,
            ) => (
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

                  participant.isSpeaking
                    ? [
                        "bg-emerald-400/[0.06]",
                        "ring-1",
                        "ring-emerald-400/15",
                      ]
                    : "hover:bg-white/[0.025]",
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
                    "font-bold",

                    participant.isSpeaking
                      ? [
                          "bg-emerald-400/15",
                          "text-emerald-200",
                        ]
                      : [
                          "bg-violet-400/10",
                          "text-violet-200",
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
                      border-[#07111f]
                      bg-emerald-400
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
                        font-medium
                        text-slate-200
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
                          text-amber-300
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
                          text-cyan-300
                        "
                      />
                    ) : null}
                  </div>

                  <div
                    className="
                      mt-1
                      flex
                      items-center
                      gap-2
                      text-[10px]
                      text-slate-600
                    "
                  >
                    <Signal
                      aria-hidden="true"
                      className="h-3 w-3"
                    />

                    {participant.connectionQuality ===
                    "good"
                      ? "اتصال خوب"
                      : participant.connectionQuality ===
                          "fair"
                        ? "اتصال متوسط"
                        : "اتصال ضعیف"}
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
                        text-amber-300
                      "
                    />
                  ) : null}


                  {participant.isMuted ? (
                    <MicOff
                      aria-label="میکروفون بسته"
                      className="
                        h-4
                        w-4
                        text-slate-600
                      "
                    />
                  ) : (
                    <Mic
                      aria-label="میکروفون باز"
                      className={cn(
                        "h-4",
                        "w-4",

                        participant.isSpeaking
                          ? "text-emerald-300"
                          : "text-slate-400",
                      )}
                    />
                  )}
                </div>
              </article>
            ),
          )}
        </div>
      </div>
    </Card>
  );
}