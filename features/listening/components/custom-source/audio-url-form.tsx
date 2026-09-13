"use client";

import {
  Link2,
  LoaderCircle,
  RotateCcw,
  Send,
} from "lucide-react";

import {
  useState,
} from "react";

import {
  useCustomAudioUrlImport,
} from "../../hooks/use-custom-listening-source";

import {
  CustomSourceResultCard,
} from "./custom-source-result-card";

export function AudioUrlForm() {
  const [
    url,
    setUrl,
  ] =
    useState("");

  const [
    title,
    setTitle,
  ] =
    useState("");

  const [
    languageCode,
    setLanguageCode,
  ] =
    useState(
      "en",
    );

  const {
    status,
    result,
    errorMessage,

    submit,
    reset,
  } =
    useCustomAudioUrlImport();

  const isSubmitting =
    status ===
    "submitting";

  function resetForm(): void {
    reset();

    setUrl(
      "",
    );

    setTitle(
      "",
    );

    setLanguageCode(
      "en",
    );
  }

  return (
    <section
      className="
        rounded-2xl
        border
        border-[#DCE5E3]
        bg-white
        p-5
        shadow-[0_5px_20px_rgba(15,23,42,0.035)]
        sm:p-6
      "
    >
      <div
        className="
          flex
          items-center
          gap-2
          text-[#712AE2]
        "
      >
        <Link2
          aria-hidden="true"
          className="h-5 w-5"
        />

        <span
          className="
            text-sm
            font-black
          "
        >
          واردکردن لینک
        </span>
      </div>

      <h2
        className="
          mt-2
          text-xl
          font-black
          text-[#0F172A]
        "
      >
        لینک فایل صوتی یا Podcast را ثبت کن
      </h2>

      <p
        className="
          mt-2
          text-xs
          leading-6
          text-[#64748B]
        "
      >
        BFF فقط URL و Metadata را اعتبارسنجی
        می‌کند. Download و Speech-to-Text در
        Backend انجام می‌شود.
      </p>

      <form
        className="
          mt-6
          space-y-4
        "
        onSubmit={(event) => {
          event.preventDefault();

          void submit({
            url,

            title:
              title.trim() ||
              null,

            languageCode,
          });
        }}
      >
        <FormField
          label="لینک HTTPS"
          htmlFor="custom-audio-url"
        >
          <input
            id="custom-audio-url"
            type="url"
            required
            value={url}
            onChange={(event) => {
              setUrl(
                event.target.value,
              );
            }}
            placeholder="https://example.com/podcast.mp3"
            className="
              h-11
              w-full
              rounded-xl
              border
              border-[#D8E2E0]
              bg-[#F8FAF9]
              px-4
              text-left
              text-sm
              text-[#0F172A]
              outline-none
              transition
              placeholder:text-[#94A3B8]
              focus:border-[#8B5CF6]
              focus:bg-white
              focus:ring-2
              focus:ring-[#8B5CF6]/10
            "
            dir="ltr"
          />
        </FormField>

        <FormField
          label="عنوان اختیاری"
          htmlFor="custom-url-title"
        >
          <input
            id="custom-url-title"
            value={title}
            maxLength={120}
            onChange={(event) => {
              setTitle(
                event.target.value,
              );
            }}
            placeholder="عنوان تمرین"
            className="
              h-11
              w-full
              rounded-xl
              border
              border-[#D8E2E0]
              bg-[#F8FAF9]
              px-4
              text-sm
              text-[#0F172A]
              outline-none
              placeholder:text-[#94A3B8]
              focus:border-[#8B5CF6]
              focus:bg-white
              focus:ring-2
              focus:ring-[#8B5CF6]/10
            "
          />
        </FormField>

        <FormField
          label="زبان صوت"
          htmlFor="custom-url-language"
        >
          <select
            id="custom-url-language"
            value={languageCode}
            onChange={(event) => {
              setLanguageCode(
                event.target.value,
              );
            }}
            className="
              h-11
              w-full
              rounded-xl
              border
              border-[#D8E2E0]
              bg-[#F8FAF9]
              px-4
              text-sm
              text-[#334155]
              outline-none
              focus:border-[#8B5CF6]
              focus:bg-white
            "
          >
            <option value="en">
              انگلیسی
            </option>

            <option value="de">
              آلمانی
            </option>

            <option value="fr">
              فرانسوی
            </option>

            <option value="es">
              اسپانیایی
            </option>
          </select>
        </FormField>

        <div
          className="
            flex
            flex-wrap
            gap-3
            pt-2
          "
        >
          <button
            type="submit"
            disabled={
              isSubmitting ||
              !url.trim()
            }
            className="
              inline-flex
              min-h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#712AE2]
              px-5
              py-2.5
              text-sm
              font-black
              text-white
              transition
              hover:bg-[#5F20C5]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {isSubmitting ? (
              <LoaderCircle
                aria-hidden="true"
                className="
                  h-4
                  w-4
                  animate-spin
                "
              />
            ) : (
              <Send
                aria-hidden="true"
                className="h-4 w-4"
              />
            )}

            {isSubmitting
              ? "در حال ثبت لینک..."
              : "ثبت و شروع پردازش"}
          </button>

          <button
            type="button"
            onClick={
              resetForm
            }
            className="
              inline-flex
              min-h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#D8E2E0]
              bg-white
              px-4
              py-2.5
              text-sm
              font-bold
              text-[#52615F]
              transition
              hover:bg-[#F8FAF9]
            "
          >
            <RotateCcw
              aria-hidden="true"
              className="h-4 w-4"
            />

            پاک‌کردن فرم
          </button>
        </div>
      </form>

      {errorMessage ? (
        <div
          role="alert"
          className="
            mt-5
            rounded-xl
            border
            border-[#FECACA]
            bg-[#FEF2F2]
            px-4
            py-3
            text-xs
            leading-6
            text-[#B91C1C]
          "
        >
          {errorMessage}
        </div>
      ) : null}

      {result ? (
        <CustomSourceResultCard
          result={
            result
          }
        />
      ) : null}
    </section>
  );
}

function FormField({
  label,
  htmlFor,
  children,
}: Readonly<{
  label:
    string;

  htmlFor:
    string;

  children:
    React.ReactNode;
}>) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="
          mb-2
          block
          text-xs
          font-bold
          text-[#334155]
        "
      >
        {label}
      </label>

      {children}
    </div>
  );
}