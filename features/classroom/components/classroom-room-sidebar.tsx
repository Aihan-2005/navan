"use client";

import {
  Bot,
  ExternalLink,
  FileAudio2,
  FileText,
  Link2,
  MessageCircle,
  NotebookPen,
  Paperclip,
  Plus,
  Send,
  Type,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  cn,
} from "../../../lib/utils/cn";

import {
  CLASSROOM_CHAT_MESSAGE_MAX_LENGTH,
  CLASSROOM_SHARED_AUDIO_MAX_BYTES,
  CLASSROOM_SHARED_FILE_ACCEPT,
  CLASSROOM_SHARED_FILE_MAX_BYTES,
  CLASSROOM_SHARED_TEXT_MAX_LENGTH,
} from "../constants/classroom.constants";

import type {
  ClassroomChatMessage,
  ClassroomSharedItem,
  ClassroomShareItemInput,
} from "../types/classroom.types";

import {
  ClassroomAIAssistant,
} from "./classroom-ai-assistant";

type RoomSidebarTab =
  | "chat"
  | "notes"
  | "resources"
  | "assistant";

type ClassroomRoomSidebarProps =
  Readonly<{
    roomId: string;

    messages:
      readonly ClassroomChatMessage[];

    sharedItems:
      readonly ClassroomSharedItem[];

    currentUser:
      Readonly<{
        id: string;
        name: string;
      }>;

    onSendMessage:
      (
        body: string,
      ) => boolean;

    onShareItem:
      (
        input:
          ClassroomShareItemInput,
      ) => boolean;
  }>;

const dateFormatter =
  new Intl.DateTimeFormat(
    "fa-IR",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

function formatFileSize(
  bytes: number,
): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (
    bytes <
    1024 * 1024
  ) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    bytes /
    (
      1024 *
      1024
    )
  ).toFixed(1)} MB`;
}

function getSafeExternalUrl(
  value: string | null,
): string | null {
  if (!value) {
    return null;
  }

  try {
    const url =
      new URL(value);

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      return null;
    }

    return url.toString();
  } catch {
    return null;
  }
}

export function ClassroomRoomSidebar({
  roomId,
  messages,
  sharedItems,
  currentUser,
  onSendMessage,
  onShareItem,
}: ClassroomRoomSidebarProps) {
  const [
    activeTab,
    setActiveTab,
  ] =
    useState<RoomSidebarTab>(
      "chat",
    );

  return (
    <section
      className="
        flex
        min-h-[620px]
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-[#DCE7E5]
        bg-white
        shadow-[0_12px_36px_rgba(15,23,42,0.055)]
      "
    >
      <div
        className="
          grid
          grid-cols-4
          border-b
          border-[#E2E8F0]
          bg-[#FAFCFC]
        "
      >
        <TabButton
          active={
            activeTab === "chat"
          }
          label="چت"
          icon={MessageCircle}
          onClick={() => {
            setActiveTab("chat");
          }}
        />

        <TabButton
          active={
            activeTab === "notes"
          }
          label="یادداشت"
          icon={NotebookPen}
          onClick={() => {
            setActiveTab("notes");
          }}
        />

        <TabButton
          active={
            activeTab === "resources"
          }
          label="منابع"
          icon={Paperclip}
          onClick={() => {
            setActiveTab(
              "resources",
            );
          }}
        />

        <TabButton
          active={
            activeTab === "assistant"
          }
          label="دستیار"
          icon={Bot}
          onClick={() => {
            setActiveTab(
              "assistant",
            );
          }}
        />
      </div>

      {activeTab === "chat" ? (
        <ChatPanel
          messages={messages}
          currentUser={
            currentUser
          }
          onSendMessage={
            onSendMessage
          }
        />
      ) : null}

      {activeTab === "notes" ? (
        <NotesPanel
          roomId={roomId}
        />
      ) : null}

      {activeTab ===
      "resources" ? (
        <ResourcesPanel
          items={sharedItems}
          onShareItem={
            onShareItem
          }
        />
      ) : null}

      {activeTab ===
      "assistant" ? (
        <ClassroomAIAssistant
          roomId={roomId}
          messages={messages}
          currentUserName={
            currentUser.name
          }
        />
      ) : null}
    </section>
  );
}

function TabButton({
  active,
  label,
  icon: Icon,
  onClick,
}: Readonly<{
  active: boolean;
  label: string;
  icon: typeof MessageCircle;
  onClick: () => void;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative",
        "flex",
        "min-h-14",
        "items-center",
        "justify-center",
        "gap-1.5",
        "border-b-2",
        "px-2",
        "text-[11px]",
        "font-bold",
        "transition",

        active
          ? [
              "border-[#00685F]",
              "bg-[#EAF6F4]",
              "text-[#00685F]",
            ]
          : [
              "border-transparent",
              "text-[#64748B]",
              "hover:bg-[#F1F5F4]",
              "hover:text-[#334155]",
            ],
      )}
    >
      <Icon
        aria-hidden="true"
        className="h-4 w-4"
      />

      <span
        className="
          hidden
          sm:inline
        "
      >
        {label}
      </span>
    </button>
  );
}

function ChatPanel({
  messages,
  currentUser,
  onSendMessage,
}: Readonly<{
  messages:
    readonly ClassroomChatMessage[];

  currentUser:
    Readonly<{
      id: string;
      name: string;
    }>;

  onSendMessage:
    (
      body: string,
    ) => boolean;
}>) {
  const [
    message,
    setMessage,
  ] =
    useState("");

  const endRef =
    useRef<HTMLDivElement | null>(
      null,
    );

  useEffect(() => {
    endRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [messages]);

  function sendMessage(): void {
    const normalized =
      message.trim();

    if (!normalized) {
      return;
    }

    const success =
      onSendMessage(
        normalized,
      );

    if (success) {
      setMessage("");
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
          min-h-0
          flex-1
          space-y-3
          overflow-y-auto
          p-4
        "
      >
        {messages.map(
          (item) => {
            if (
              item.kind ===
              "system"
            ) {
              return (
                <div
                  key={item.id}
                  className="
                    py-2
                    text-center
                  "
                >
                  <span
                    className="
                      rounded-full
                      bg-[#F1F5F4]
                      px-3
                      py-1.5
                      text-[10px]
                      text-[#64748B]
                    "
                  >
                    {item.body}
                  </span>
                </div>
              );
            }

            const isSelf =
              item.senderId ===
              currentUser.id;

            return (
              <article
                key={item.id}
                className={cn(
                  "max-w-[88%]",

                  isSelf
                    ? "mr-auto"
                    : "ml-auto",
                )}
              >
                <div
                  className="
                    mb-1
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    text-[#64748B]
                  "
                >
                  <span>
                    {item.senderName}
                  </span>

                  <span>
                    {dateFormatter.format(
                      new Date(
                        item.createdAt,
                      ),
                    )}
                  </span>
                </div>

                <div
                  dir="auto"
                  className={cn(
                    "rounded-2xl",
                    "px-3.5",
                    "py-2.5",
                    "text-sm",
                    "leading-6",

                    isSelf
                      ? [
                          "rounded-bl-md",
                          "bg-[#00685F]",
                          "text-[#FFFFFF]",
                        ]
                      : [
                          "rounded-br-md",
                          "border",
                          "border-[#E2E8F0]",
                          "bg-[#F8FAFC]",
                          "text-[#334155]",
                        ],
                  )}
                >
                  {item.body}
                </div>
              </article>
            );
          },
        )}

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
            flex
            items-end
            gap-2
            rounded-2xl
            border
            border-[#D8E7E4]
            bg-white
            p-2
            focus-within:border-[#9BCFC7]
            focus-within:ring-2
            focus-within:ring-[#14B8A6]/10
          "
        >
          <textarea
            value={message}
            maxLength={
              CLASSROOM_CHAT_MESSAGE_MAX_LENGTH
            }
            rows={1}
            onChange={(event) => {
              setMessage(
                event.target.value,
              );
            }}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();
                sendMessage();
              }
            }}
            placeholder="پیام بنویس..."
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
            onClick={sendMessage}
            disabled={
              !message.trim()
            }
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
              disabled:opacity-30
            "
            aria-label="ارسال پیام"
          >
            <Send
              aria-hidden="true"
              className="h-4 w-4"
            />
          </button>
        </div>

        <p
          className="
            mt-2
            text-left
            text-[9px]
            text-[#94A3B8]
          "
          dir="ltr"
        >
          {message.length}/
          {
            CLASSROOM_CHAT_MESSAGE_MAX_LENGTH
          }
        </p>
      </div>
    </div>
  );
}

function NotesPanel({
  roomId,
}: Readonly<{
  roomId: string;
}>) {
  const storageKey =
    `classroom-notes:${roomId}`;

  const [
    notes,
    setNotes,
  ] =
    useState("");

  const [
    isLoaded,
    setIsLoaded,
  ] =
    useState(false);

  const [
    savedAt,
    setSavedAt,
  ] =
    useState<Date | null>(
      null,
    );

  useEffect(() => {
    const savedValue =
      window.localStorage.getItem(
        storageKey,
      );

    if (savedValue) {
      setNotes(savedValue);
    }

    setIsLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const timerId =
      window.setTimeout(
        () => {
          window.localStorage.setItem(
            storageKey,
            notes,
          );

          setSavedAt(
            new Date(),
          );
        },
        450,
      );

    return () => {
      window.clearTimeout(
        timerId,
      );
    };
  }, [
    isLoaded,
    notes,
    storageKey,
  ]);

  return (
    <div
      className="
        flex
        min-h-0
        flex-1
        flex-col
        p-4
      "
    >
      <div
        className="
          rounded-2xl
          bg-[#F1FAF8]
          p-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
          "
        >
          <NotebookPen
            aria-hidden="true"
            className="
              h-5
              w-5
              text-[#00685F]
            "
          />

          <h3
            className="
              text-sm
              font-black
              text-[#0F172A]
            "
          >
            دفترچه شخصی جلسه
          </h3>
        </div>

        <p
          className="
            mt-2
            text-xs
            leading-6
            text-[#64748B]
          "
        >
          کلمات جدید، اصلاح‌ها، جمله‌های
          کاربردی و نکات جلسه را اینجا
          نگه دار. این محتوا داخل چت عمومی
          منتشر نمی‌شود.
        </p>
      </div>

      <textarea
        value={notes}
        onChange={(event) => {
          setNotes(
            event.target.value,
          );
        }}
        placeholder="مثلاً:
• عبارت جدید: That makes sense
• اشتباه من: ...
• جمله‌ای که باید تمرین کنم: ..."
        className="
          mt-4
          min-h-[360px]
          flex-1
          resize-none
          rounded-2xl
          border
          border-[#D8E7E4]
          bg-[#FCFDFD]
          p-4
          text-sm
          leading-8
          text-[#334155]
          outline-none
          placeholder:text-[#94A3B8]
          focus:border-[#9BCFC7]
          focus:ring-2
          focus:ring-[#14B8A6]/10
        "
      />

      <div
        className="
          mt-3
          flex
          items-center
          justify-between
          gap-3
          text-[10px]
          text-[#64748B]
        "
      >
        <span>
          ذخیره خودکار در مرورگر
        </span>

        <span>
          {savedAt
            ? `آخرین ذخیره ${dateFormatter.format(
                savedAt,
              )}`
            : "در انتظار تغییر"}
        </span>
      </div>
    </div>
  );
}

function ResourcesPanel({
  items,
  onShareItem,
}: Readonly<{
  items:
    readonly ClassroomSharedItem[];

  onShareItem:
    (
      input:
        ClassroomShareItemInput,
    ) => boolean;
}>) {
  const [
    textValue,
    setTextValue,
  ] =
    useState("");

  const [
    linkValue,
    setLinkValue,
  ] =
    useState("");

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState<string | null>(
      null,
    );

  const fileInputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  const audioInputRef =
    useRef<HTMLInputElement | null>(
      null,
    );

  function shareFile(
    file: File,
    kind:
      | "file"
      | "audio",
  ): void {
    setErrorMessage(null);

    const maxBytes =
      kind === "audio"
        ? CLASSROOM_SHARED_AUDIO_MAX_BYTES
        : CLASSROOM_SHARED_FILE_MAX_BYTES;

    if (
      file.size >
      maxBytes
    ) {
      setErrorMessage(
        kind === "audio"
          ? "حجم فایل صوتی بیش از ۳۰ مگابایت است."
          : "حجم فایل بیش از ۲۰ مگابایت است.",
      );

      return;
    }

    const success =
      onShareItem({
        kind,

        title:
          file.name,

        description:
          kind === "audio"
            ? "فایل صوتی انتخاب‌شده برای اشتراک در اتاق"
            : "فایل انتخاب‌شده برای اشتراک در اتاق",

        sizeBytes:
          file.size,
      });

    if (!success) {
      setErrorMessage(
        "امکان اضافه کردن منبع وجود ندارد.",
      );
    }
  }

  function shareText(): void {
    const normalized =
      textValue.trim();

    if (!normalized) {
      return;
    }

    const success =
      onShareItem({
        kind: "text",

        title:
          "متن اشتراک‌گذاری‌شده",

        description:
          normalized,

        sizeBytes:
          null,
      });

    if (success) {
      setTextValue("");
      setErrorMessage(null);
    }
  }

  function shareLink(): void {
    const normalized =
      linkValue.trim();

    if (!normalized) {
      return;
    }

    let url: URL;

    try {
      url =
        new URL(normalized);
    } catch {
      setErrorMessage(
        "آدرس لینک معتبر نیست.",
      );

      return;
    }

    if (
      url.protocol !== "https:" &&
      url.protocol !== "http:"
    ) {
      setErrorMessage(
        "فقط لینک‌های HTTP و HTTPS قابل اشتراک هستند.",
      );

      return;
    }

    const success =
      onShareItem({
        kind: "link",

        title:
          url.hostname,

        description:
          url.toString(),

        sizeBytes:
          null,
      });

    if (success) {
      setLinkValue("");
      setErrorMessage(null);
    }
  }

  return (
    <div
      className="
        min-h-0
        flex-1
        overflow-y-auto
        p-4
      "
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={
          CLASSROOM_SHARED_FILE_ACCEPT
        }
        className="sr-only"
        onChange={(event) => {
          const file =
            event.target
              .files?.[0];

          if (file) {
            shareFile(
              file,
              "file",
            );
          }

          event.target.value =
            "";
        }}
      />

      <input
        ref={audioInputRef}
        type="file"
        accept="audio/*"
        className="sr-only"
        onChange={(event) => {
          const file =
            event.target
              .files?.[0];

          if (file) {
            shareFile(
              file,
              "audio",
            );
          }

          event.target.value =
            "";
        }}
      />

      <div
        className="
          rounded-2xl
          bg-[#F1FAF8]
          p-4
        "
      >
        <h3
          className="
            text-sm
            font-black
            text-[#0F172A]
          "
        >
          منابع مشترک جلسه
        </h3>

        <p
          className="
            mt-2
            text-xs
            leading-6
            text-[#64748B]
          "
        >
          فایل، صوت، متن یا لینک آموزشی
          را با اعضای اتاق به اشتراک
          بگذار.
        </p>
      </div>

      <div
        className="
          mt-4
          grid
          grid-cols-2
          gap-2
        "
      >
        <button
          type="button"
          onClick={() => {
            fileInputRef.current?.click();
          }}
          className="
            flex
            min-h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#DCE7E5]
            bg-white
            text-xs
            font-bold
            text-[#475569]
            transition
            hover:border-[#A8D8D1]
            hover:bg-[#F1FAF8]
            hover:text-[#00685F]
          "
        >
          <FileText
            aria-hidden="true"
            className="h-4 w-4"
          />

          فایل
        </button>

        <button
          type="button"
          onClick={() => {
            audioInputRef.current?.click();
          }}
          className="
            flex
            min-h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-[#DCE7E5]
            bg-white
            text-xs
            font-bold
            text-[#475569]
            transition
            hover:border-[#A8D8D1]
            hover:bg-[#F1FAF8]
            hover:text-[#00685F]
          "
        >
          <FileAudio2
            aria-hidden="true"
            className="h-4 w-4"
          />

          صوت
        </button>
      </div>

      <div
        className="
          mt-4
          rounded-2xl
          border
          border-[#DCE7E5]
          bg-white
          p-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-xs
            font-bold
            text-[#52615F]
          "
        >
          <Type
            aria-hidden="true"
            className="h-4 w-4"
          />

          اشتراک متن
        </div>

        <textarea
          value={textValue}
          maxLength={
            CLASSROOM_SHARED_TEXT_MAX_LENGTH
          }
          onChange={(event) => {
            setTextValue(
              event.target.value,
            );
          }}
          placeholder="متن، سؤال یا عبارت آموزشی..."
          className="
            mt-3
            min-h-20
            w-full
            resize-none
            bg-transparent
            text-sm
            leading-6
            text-[#334155]
            outline-none
            placeholder:text-[#94A3B8]
          "
        />

        <button
          type="button"
          onClick={shareText}
          disabled={
            !textValue.trim()
          }
          className="
            mt-2
            inline-flex
            h-9
            items-center
            gap-2
            rounded-lg
            bg-[#E7F4F2]
            px-3
            text-xs
            font-bold
            text-[#00685F]
            transition
            hover:bg-[#D9EFEB]
            disabled:opacity-30
          "
        >
          <Plus
            aria-hidden="true"
            className="h-3.5 w-3.5"
          />

          اشتراک متن
        </button>
      </div>

      <div
        className="
          mt-3
          rounded-2xl
          border
          border-[#DCE7E5]
          bg-white
          p-3
        "
      >
        <div
          className="
            flex
            items-center
            gap-2
            text-xs
            font-bold
            text-[#52615F]
          "
        >
          <Link2
            aria-hidden="true"
            className="h-4 w-4"
          />

          اشتراک لینک
        </div>

        <div
          className="
            mt-3
            flex
            gap-2
          "
          dir="ltr"
        >
          <input
            type="url"
            value={linkValue}
            onChange={(event) => {
              setLinkValue(
                event.target.value,
              );
            }}
            onKeyDown={(event) => {
              if (
                event.key === "Enter"
              ) {
                shareLink();
              }
            }}
            placeholder="https://..."
            className="
              h-10
              min-w-0
              flex-1
              rounded-xl
              border
              border-[#DCE7E5]
              bg-[#F8FAFC]
              px-3
              text-left
              text-xs
              text-[#0F172A]
              outline-none
              placeholder:text-[#94A3B8]
              focus:border-[#9BCFC7]
            "
          />

          <button
            type="button"
            onClick={shareLink}
            disabled={
              !linkValue.trim()
            }
            aria-label="اشتراک لینک"
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
              disabled:opacity-30
            "
          >
            <Plus
              aria-hidden="true"
              className="h-4 w-4"
            />
          </button>
        </div>
      </div>

      {errorMessage ? (
        <div
          role="alert"
          className="
            mt-3
            rounded-xl
            border
            border-[#FECACA]
            bg-[#FEF2F2]
            px-3
            py-2
            text-xs
            leading-6
            text-[#B91C1C]
          "
        >
          {errorMessage}
        </div>
      ) : null}

      <div
        className="
          mt-5
          space-y-3
        "
      >
        {items.length === 0 ? (
          <div
            className="
              rounded-2xl
              border
              border-dashed
              border-[#CBD5E1]
              bg-[#F8FAFC]
              px-4
              py-8
              text-center
            "
          >
            <Paperclip
              aria-hidden="true"
              className="
                mx-auto
                h-6
                w-6
                text-[#94A3B8]
              "
            />

            <p
              className="
                mt-3
                text-xs
                text-[#64748B]
              "
            >
              هنوز منبعی در این جلسه
              به اشتراک گذاشته نشده.
            </p>
          </div>
        ) : (
          items.map((item) => {
            const safeUrl =
              item.kind === "link"
                ? getSafeExternalUrl(
                    item.description,
                  )
                : null;

            return (
              <article
                key={item.id}
                className="
                  rounded-xl
                  border
                  border-[#DFE8E6]
                  bg-white
                  p-3
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
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#F4F0FF]
                      text-[#712AE2]
                    "
                  >
                    {item.kind ===
                    "audio" ? (
                      <FileAudio2
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    ) : item.kind ===
                      "text" ? (
                      <Type
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    ) : item.kind ===
                      "link" ? (
                      <Link2
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    ) : (
                      <FileText
                        aria-hidden="true"
                        className="h-4 w-4"
                      />
                    )}
                  </span>

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <p
                      className="
                        break-words
                        text-xs
                        font-bold
                        text-[#334155]
                      "
                    >
                      {item.title}
                    </p>

                    {item.description ? (
                      <p
                        dir={
                          item.kind === "link"
                            ? "ltr"
                            : "auto"
                        }
                        className="
                          mt-1
                          line-clamp-3
                          break-all
                          text-[11px]
                          leading-5
                          text-[#64748B]
                        "
                      >
                        {
                          item.description
                        }
                      </p>
                    ) : null}

                    <div
                      className="
                        mt-2
                        flex
                        flex-wrap
                        items-center
                        gap-2
                        text-[9px]
                        text-[#94A3B8]
                      "
                    >
                      <span>
                        {
                          item.createdBy
                            .name
                        }
                      </span>

                      {item.sizeBytes !==
                      null ? (
                        <span>
                          {formatFileSize(
                            item.sizeBytes,
                          )}
                        </span>
                      ) : null}

                      {safeUrl ? (
                        <a
                          href={safeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            inline-flex
                            items-center
                            gap-1
                            font-bold
                            text-[#00685F]
                            hover:text-[#005A52]
                          "
                        >
                          باز کردن

                          <ExternalLink
                            aria-hidden="true"
                            className="h-3 w-3"
                          />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      <p
        className="
          mt-5
          rounded-xl
          border
          border-[#FDE68A]
          bg-[#FFFBEB]
          px-3
          py-3
          text-[10px]
          leading-5
          text-[#92400E]
        "
      >
        File و Audio در وضعیت فعلی به
        شکل metadata در Session ثبت
        می‌شوند. Upload واقعی باید به
        Storage backend متصل شود.
      </p>
    </div>
  );
 }