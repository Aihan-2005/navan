"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import {
  BookPlus,
  CircleAlert,
  Sparkles,
  X,
} from "lucide-react";

import type {
  AddVocabularyWordInput,
  AddWordResult,
  VocabularyCollection,
  VocabularyDifficulty,
  VocabularyPartOfSpeech,
} from "../types/vocabulary.types";

type AddWordDialogProps = {
  open: boolean;

  collections:
    readonly VocabularyCollection[];

  onClose: () => void;

  onSubmit: (
    input:
      AddVocabularyWordInput,
  ) => AddWordResult;
};

const partsOfSpeech: {
  value:
    VocabularyPartOfSpeech;
  label: string;
}[] = [
  {
    value: "noun",
    label: "اسم",
  },
  {
    value: "verb",
    label: "فعل",
  },
  {
    value: "adjective",
    label: "صفت",
  },
  {
    value: "adverb",
    label: "قید",
  },
  {
    value: "phrase",
    label: "عبارت",
  },
  {
    value: "other",
    label: "سایر",
  },
];

export function AddWordDialog({
  open,
  collections,
  onClose,
  onSubmit,
}: AddWordDialogProps) {
  const [
    word,
    setWord,
  ] = useState("");

  const [
    translation,
    setTranslation,
  ] = useState("");

  const [
    phonetic,
    setPhonetic,
  ] = useState("");

  const [
    definition,
    setDefinition,
  ] = useState("");

  const [
    example,
    setExample,
  ] = useState("");

  const [
    exampleTranslation,
    setExampleTranslation,
  ] = useState("");

  const [
    tags,
    setTags,
  ] = useState("");

  const [
    partOfSpeech,
    setPartOfSpeech,
  ] =
    useState<VocabularyPartOfSpeech>(
      "noun",
    );

  const [
    difficulty,
    setDifficulty,
  ] =
    useState<VocabularyDifficulty>(
      "medium",
    );

  const [
    collectionId,
    setCollectionId,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (!open) {
      setError(null);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  function resetForm() {
    setWord("");
    setTranslation("");
    setPhonetic("");
    setDefinition("");
    setExample("");
    setExampleTranslation("");
    setTags("");
    setPartOfSpeech(
      "noun",
    );
    setDifficulty(
      "medium",
    );
    setCollectionId("");
    setError(null);
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError(null);

    if (
      !word.trim() ||
      !translation.trim()
    ) {
      setError(
        "واژه و معنی فارسی الزامی هستند.",
      );

      return;
    }

    const parsedTags =
      tags
        .split(
          /[,،]/,
        )
        .map(
          (tag) =>
            tag.trim(),
        )
        .filter(Boolean);

    const result =
      onSubmit({
        word:
          word.trim(),

        translation:
          translation.trim(),

        phonetic:
          phonetic.trim() ||
          undefined,

        definition:
          definition.trim() ||
          undefined,

        example:
          example.trim() ||
          undefined,

        exampleTranslation:
          exampleTranslation.trim() ||
          undefined,

        partOfSpeech,

        difficulty,

        tags:
          parsedTags,

        collectionId:
          collectionId ||
          undefined,
      });

    if (!result.ok) {
      if (
        result.reason ===
        "duplicate"
      ) {
        setError(
          "این واژه قبلاً در کتابخانه شما وجود دارد.",
        );

        return;
      }

      setError(
        "اطلاعات وارد شده معتبر نیست.",
      );

      return;
    }

    resetForm();
    onClose();
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[120]
        flex
        items-center
        justify-center
        bg-black/30
        p-4
        backdrop-blur-sm
      "
      onMouseDown={
        handleClose
      }
    >
      <div
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-word-title"
        onMouseDown={(
          event,
        ) =>
          event.stopPropagation()
        }
        className="
          max-h-[90vh]
          w-full
          max-w-[680px]
          overflow-y-auto
          rounded-[24px]
          border
          border-[#BCC9C6]
          bg-white
          shadow-[0_24px_60px_rgba(0,0,0,0.16)]
        "
      >
        <header
          className="
            sticky
            top-0
            z-10
            flex
            items-center
            justify-between
            border-b
            border-[#E0E3E5]
            bg-white/95
            px-6
            py-5
            backdrop-blur-md
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#E6F6F4]
                text-[#0D9488]
              "
            >
              <BookPlus
                className="h-5 w-5"
              />
            </span>

            <div>
              <h2
                id="add-word-title"
                className="
                  text-base
                  font-black
                  text-[#191C1E]
                "
              >
                افزودن واژه جدید
              </h2>

              <p
                className="
                  mt-0.5
                  text-[11px]
                  text-[#6D7A77]
                "
              >
                واژه جدید از جعبه اول شروع می‌شود.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={
              handleClose
            }
            aria-label="بستن"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              text-[#6D7A77]
              hover:bg-[#F2F4F6]
            "
          >
            <X
              className="h-5 w-5"
            />
          </button>
        </header>

        <form
          onSubmit={
            handleSubmit
          }
          className="
            space-y-5
            p-6
          "
        >
          {error ? (
            <div
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-[#FECACA]
                bg-[#FFF1F2]
                px-4
                py-3
                text-xs
                font-medium
                text-[#BE123C]
              "
            >
              <CircleAlert
                className="h-4 w-4"
              />

              {error}
            </div>
          ) : null}

          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
            "
          >
            <label className="text-xs font-bold text-[#3D4947]">
              واژه انگلیسی

              <input
                autoFocus
                dir="ltr"
                value={word}
                onChange={(
                  event,
                ) =>
                  setWord(
                    event.target
                      .value,
                  )
                }
                placeholder="accomplish"
                className="
                  mt-2
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#BCC9C6]
                  bg-[#F9FBFB]
                  px-4
                  text-left
                  text-sm
                  outline-none
                  focus:border-[#14B8A6]
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#14B8A6]/10
                "
              />
            </label>

            <label className="text-xs font-bold text-[#3D4947]">
              معنی فارسی

              <input
                value={
                  translation
                }
                onChange={(
                  event,
                ) =>
                  setTranslation(
                    event.target
                      .value,
                  )
                }
                placeholder="به انجام رساندن"
                className="
                  mt-2
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#BCC9C6]
                  bg-[#F9FBFB]
                  px-4
                  text-sm
                  outline-none
                  focus:border-[#14B8A6]
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#14B8A6]/10
                "
              />
            </label>
          </div>

          <div
            className="
              grid
              gap-4
              sm:grid-cols-3
            "
          >
            <label className="text-xs font-bold text-[#3D4947]">
              نوع کلمه

              <select
                value={
                  partOfSpeech
                }
                onChange={(
                  event,
                ) =>
                  setPartOfSpeech(
                    event.target
                      .value as
                      VocabularyPartOfSpeech,
                  )
                }
                className="
                  mt-2
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#BCC9C6]
                  bg-[#F9FBFB]
                  px-3
                  text-sm
                  outline-none
                "
              >
                {partsOfSpeech.map(
                  (item) => (
                    <option
                      key={
                        item.value
                      }
                      value={
                        item.value
                      }
                    >
                      {
                        item.label
                      }
                    </option>
                  ),
                )}
              </select>
            </label>

            <label className="text-xs font-bold text-[#3D4947]">
              سختی

              <select
                value={
                  difficulty
                }
                onChange={(
                  event,
                ) =>
                  setDifficulty(
                    event.target
                      .value as
                      VocabularyDifficulty,
                  )
                }
                className="
                  mt-2
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#BCC9C6]
                  bg-[#F9FBFB]
                  px-3
                  text-sm
                  outline-none
                "
              >
                <option value="easy">
                  آسان
                </option>

                <option value="medium">
                  متوسط
                </option>

                <option value="hard">
                  سخت
                </option>
              </select>
            </label>

            <label className="text-xs font-bold text-[#3D4947]">
              مجموعه

              <select
                value={
                  collectionId
                }
                onChange={(
                  event,
                ) =>
                  setCollectionId(
                    event.target
                      .value,
                  )
                }
                className="
                  mt-2
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#BCC9C6]
                  bg-[#F9FBFB]
                  px-3
                  text-sm
                  outline-none
                "
              >
                <option value="">
                  بدون مجموعه
                </option>

                {collections.map(
                  (collection) => (
                    <option
                      key={
                        collection.id
                      }
                      value={
                        collection.id
                      }
                    >
                      {
                        collection.emoji
                      }{" "}
                      {
                        collection.title
                      }
                    </option>
                  ),
                )}
              </select>
            </label>
          </div>

          <label className="block text-xs font-bold text-[#3D4947]">
            تلفظ

            <input
              dir="ltr"
              value={
                phonetic
              }
              onChange={(
                event,
              ) =>
                setPhonetic(
                  event.target
                    .value,
                )
              }
              placeholder="/əˈkʌmplɪʃ/"
              className="
                mt-2
                h-11
                w-full
                rounded-xl
                border
                border-[#BCC9C6]
                bg-[#F9FBFB]
                px-4
                text-left
                text-sm
                outline-none
                focus:border-[#14B8A6]
              "
            />
          </label>

          <label className="block text-xs font-bold text-[#3D4947]">
            تعریف انگلیسی

            <textarea
              dir="ltr"
              value={
                definition
              }
              onChange={(
                event,
              ) =>
                setDefinition(
                  event.target
                    .value,
                )
              }
              rows={2}
              placeholder="To successfully complete something..."
              className="
                mt-2
                w-full
                resize-none
                rounded-xl
                border
                border-[#BCC9C6]
                bg-[#F9FBFB]
                px-4
                py-3
                text-left
                text-sm
                leading-6
                outline-none
                focus:border-[#14B8A6]
              "
            />
          </label>

          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
            "
          >
            <label className="text-xs font-bold text-[#3D4947]">
              مثال انگلیسی

              <textarea
                dir="ltr"
                value={
                  example
                }
                onChange={(
                  event,
                ) =>
                  setExample(
                    event.target
                      .value,
                  )
                }
                rows={3}
                className="
                  mt-2
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-[#BCC9C6]
                  bg-[#F9FBFB]
                  px-4
                  py-3
                  text-left
                  text-sm
                  outline-none
                "
              />
            </label>

            <label className="text-xs font-bold text-[#3D4947]">
              ترجمه مثال

              <textarea
                value={
                  exampleTranslation
                }
                onChange={(
                  event,
                ) =>
                  setExampleTranslation(
                    event.target
                      .value,
                  )
                }
                rows={3}
                className="
                  mt-2
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-[#BCC9C6]
                  bg-[#F9FBFB]
                  px-4
                  py-3
                  text-sm
                  outline-none
                "
              />
            </label>
          </div>

          <label className="block text-xs font-bold text-[#3D4947]">
            برچسب‌ها

            <input
              value={tags}
              onChange={(
                event,
              ) =>
                setTags(
                  event.target
                    .value,
                )
              }
              placeholder="travel, B1, work"
              className="
                mt-2
                h-11
                w-full
                rounded-xl
                border
                border-[#BCC9C6]
                bg-[#F9FBFB]
                px-4
                text-sm
                outline-none
              "
            />
          </label>

          <div
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-[#F0FDFA]
              px-4
              py-3
              text-[11px]
              text-[#00685F]
            "
          >
            <Sparkles
              className="h-4 w-4"
            />

            بعداً می‌توانیم معنی، تلفظ و مثال را با AI
            به‌صورت خودکار تکمیل کنیم.
          </div>

          <div
            className="
              flex
              justify-end
              gap-3
              border-t
              border-[#EEF1F2]
              pt-5
            "
          >
            <button
              type="button"
              onClick={
                handleClose
              }
              className="
                h-10
                rounded-lg
                border
                border-[#BCC9C6]
                px-5
                text-sm
                font-bold
                text-[#52615E]
              "
            >
              انصراف
            </button>

            <button
              type="submit"
              className="
                h-10
                rounded-lg
                bg-[#0D9488]
                px-6
                text-sm
                font-bold
                text-white
                hover:bg-[#0F766E]
              "
            >
              افزودن به جعبه
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}