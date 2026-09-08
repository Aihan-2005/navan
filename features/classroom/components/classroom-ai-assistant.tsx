"use client";

import {
  Bot,
  Lightbulb,
  Send,
  Sparkles,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  getClassroomAssistantReply,
  type ClassroomAssistantContextMessage,
} from "../api/get-classroom-assistant-reply";

import type {
  ClassroomChatMessage,
} from "../types/classroom.types";

type ClassroomAIAssistantProps =
  Readonly<{
    roomId: string;

    messages:
      readonly ClassroomChatMessage[];

    currentUserName: string;
  }>;

type AssistantMessage =
  Readonly<{
    id: string;

    role:
      | "user"
      | "assistant";

    body: string;
  }>;

const QUICK_PROMPTS = [
  "برای جواب دادن کمکم کن",
  "جمله‌ام رو طبیعی‌تر کن",
  "گرامر جمله رو توضیح بده",
  "۳ عبارت کاربردی پیشنهاد بده",
] as const;

const WELCOME_MESSAGE:
  AssistantMessage = {
    id: "assistant-welcome",
    role: "assistant",
    body:
      "من دستیار جلسه‌ام. اگر وسط گفتگو برای ساخت جواب، واژه، گرامر یا طبیعی‌تر کردن جمله گیر کردی، همین‌جا بپرس.",
  };

function createMessageId(
  prefix: string,
): string {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function ClassroomAIAssistant({
  roomId,
  messages,
  currentUserName,
}: ClassroomAIAssistantProps) {
  const storageKey =
    `classroom-ai:${roomId}`;

  const [
    assistantMessages,
    setAssistantMessages,
  ] =
    useState<readonly AssistantMessage[]>(
      [WELCOME_MESSAGE],
    );

  const [
    question,
    setQuestion,
  ] =
    useState("");

  const [
    isPending,
    setIsPending,
  ] =
    useState(false);

  const [
    suggestions,
    setSuggestions,
  ] =
    useState<readonly string[]>(
      QUICK_PROMPTS,
    );

  const [
    isLoaded,
    setIsLoaded,
  ] =
    useState(false);

  const endRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  const recentRoomMessages =
    useMemo<
      readonly ClassroomAssistantContextMessage[]
    >(
      () =>
        messages
          .filter(
            (message) =>
              message.kind === "text",
          )
          .slice(-8)
          .map((message) => ({
            senderName:
              message.senderName ??
              "عضو اتاق",

            body:
              message.body,
          })),

      [messages],
    );

  useEffect(() => {
    try {
      const saved =
        window.localStorage.getItem(
          storageKey,
        );

      if (!saved) {
        setIsLoaded(true);
        return;
      }

      const parsed =
        JSON.parse(saved) as
          unknown;

      if (
        Array.isArray(parsed)
      ) {
        setAssistantMessages(
          parsed as AssistantMessage[],
        );
      }
    } catch {
      setAssistantMessages([
        WELCOME_MESSAGE,
      ]);
    } finally {
      setIsLoaded(true);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    window.localStorage.setItem(
      storageKey,
      JSON.stringify(
        assistantMessages,
      ),
    );
  }, [
    assistantMessages,
    isLoaded,
    storageKey,
  ]);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [
    assistantMessages,
    isPending,
  ]);

  async function submitQuestion(
    value?: string,
  ): Promise<void> {
    const normalized =
      (
        value ??
        question
      ).trim();

    if (
      !normalized ||
      isPending
    ) {
      return;
    }

    const userMessage:
      AssistantMessage = {
        id:
          createMessageId("user"),

        role:
          "user",

        body:
          normalized,
      };

    setAssistantMessages(
      (current) => [
        ...current,
        userMessage,
      ],
    );

    setQuestion("");
    setIsPending(true);

    try {
      const reply =
        await getClassroomAssistantReply({
          question:
            normalized,

          recentMessages:
            recentRoomMessages,
        });

      const replyMessage:
        AssistantMessage = {
          id:
            createMessageId(
              "assistant",
            ),

          role:
            "assistant",

          body:
            reply.answer,
        };

      setAssistantMessages(
        (current) => [
          ...current,
          replyMessage,
        ],
      );

      setSuggestions(
        reply.suggestions,
      );
    } catch {
      setAssistantMessages(
        (current) => [
          ...current,
          {
            id:
              createMessageId(
                "assistant-error",
              ),

            role:
              "assistant",

            body:
              "در حال حاضر امکان دریافت پاسخ وجود ندارد. دوباره تلاش کن.",
          },
        ],
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div
      className="
        flex
        min-h-0
        flex-1
        flex-col
      "
    >
      <div
        className="
          border-b
          border-[#E2E8F0]
          bg-[linear-gradient(135deg,#F1FAF8_0%,#F8F5FF_100%)]
          p-4
        "
      >
        <div
          className="
            flex
            items-start
            gap-3
          "
        >
          <span
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#00685F]
              text-[#FFFFFF]
            "
          >
            <Bot
              aria-hidden="true"
              className="h-5 w-5"
            />
          </span>

          <div>
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <h3
                className="
                  text-sm
                  font-black
                  text-[#0F172A]
                "
              >
                دستیار هوشمند جلسه
              </h3>

              <span
                className="
                  rounded-full
                  bg-[#E7F4F2]
                  px-2
                  py-0.5
                  text-[9px]
                  font-black
                  text-[#00685F]
                "
              >
                AI Assistant
              </span>
            </div>

            <p
              className="
                mt-1
                text-[11px]
                leading-5
                text-[#64748B]
              "
            >
              سؤال‌های این بخش خصوصی‌اند
              و داخل چت عمومی اتاق فرستاده
              نمی‌شوند.
            </p>
          </div>
        </div>
      </div>

      <div
        className="
          min-h-0
          flex-1
          space-y-3
          overflow-y-auto
          p-4
        "
        aria-live="polite"
      >
        {assistantMessages.map(
          (message) => {
            const isUser =
              message.role ===
              "user";

            return (
              <div
                key={message.id}
                className={
                  isUser
                    ? "mr-auto max-w-[88%]"
                    : "ml-auto max-w-[92%]"
                }
              >
                <div
                  className={
                    isUser
                      ? `
                        rounded-2xl
                        rounded-bl-md
                        bg-[#00685F]
                        px-3.5
                        py-2.5
                        text-sm
                        leading-7
                        text-[#FFFFFF]
                      `
                      : `
                        rounded-2xl
                        rounded-br-md
                        border
                        border-[#E2E8F0]
                        bg-[#F8FAFC]
                        px-3.5
                        py-2.5
                        text-sm
                        leading-7
                        text-[#334155]
                      `
                  }
                >
                  {message.body}
                </div>
              </div>
            );
          },
        )}

        {isPending ? (
          <div
            className="
              ml-auto
              flex
              w-fit
              items-center
              gap-2
              rounded-2xl
              border
              border-[#DDE7E5]
              bg-[#F8FAFC]
              px-4
              py-3
              text-xs
              text-[#64748B]
            "
          >
            <Sparkles
              aria-hidden="true"
              className="
                h-4
                w-4
                animate-pulse
                text-[#712AE2]
              "
            />

            در حال آماده‌کردن پیشنهاد...
          </div>
        ) : null}

        <div ref={endRef} />
      </div>

      <div
        className="
          border-t
          border-[#E2E8F0]
          p-3
        "
      >
        <div
          className="
            mb-3
            flex
            gap-2
            overflow-x-auto
            pb-1
          "
        >
          {suggestions.map(
            (suggestion) => (
              <button
                key={suggestion}
                type="button"
                disabled={isPending}
                onClick={() => {
                  void submitQuestion(
                    suggestion,
                  );
                }}
                className="
                  shrink-0
                  rounded-full
                  border
                  border-[#D8E7E4]
                  bg-white
                  px-3
                  py-1.5
                  text-[10px]
                  font-medium
                  text-[#52615F]
                  transition
                  hover:border-[#A8D8D1]
                  hover:bg-[#F1FAF8]
                  hover:text-[#00685F]
                  disabled:opacity-40
                "
              >
                {suggestion}
              </button>
            ),
          )}
        </div>

        <div
          className="
            flex
            items-end
            gap-2
            rounded-2xl
            border
            border-[#D8E7E4]
            bg-white
            p-2
            focus-within:border-[#8FC7BF]
            focus-within:ring-2
            focus-within:ring-[#14B8A6]/10
          "
        >
          <textarea
            rows={1}
            value={question}
            disabled={isPending}
            onChange={(event) => {
              setQuestion(
                event.target.value,
              );
            }}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();

                void submitQuestion();
              }
            }}
            placeholder={`${currentUserName}، سوالت رو اینجا بپرس...`}
            className="
              max-h-28
              min-h-10
              min-w-0
              flex-1
              resize-none
              bg-transparent
              px-2
              py-2
              text-sm
              leading-6
              text-[#0F172A]
              outline-none
              placeholder:text-[#94A3B8]
            "
          />

          <button
            type="button"
            disabled={
              !question.trim() ||
              isPending
            }
            onClick={() => {
              void submitQuestion();
            }}
            aria-label="ارسال سؤال به دستیار"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#00685F]
              text-[#FFFFFF]
              transition
              hover:bg-[#005A52]
              disabled:cursor-not-allowed
              disabled:opacity-35
            "
          >
            <Send
              aria-hidden="true"
              className="h-4 w-4"
            />
          </button>
        </div>

        <div
          className="
            mt-3
            flex
            items-start
            gap-2
            rounded-xl
            bg-[#FFF8E8]
            px-3
            py-2.5
          "
        >
          <Lightbulb
            aria-hidden="true"
            className="
              mt-0.5
              h-3.5
              w-3.5
              shrink-0
              text-[#F97316]
            "
          />

          <p
            className="
              text-[10px]
              leading-5
              text-[#7C6547]
            "
          >
            نسخه فعلی پاسخ‌ها از adapter
            محلی استفاده می‌کند. هنگام اتصال
            Backend AI فقط فایل API این feature
            جایگزین می‌شود.
          </p>
        </div>
      </div>
    </div>
  );
}