import {
  randomUUID,
} from "node:crypto";

import {
  NextResponse,
} from "next/server";

import {
  auth,
} from "../../../../../auth";

import {
  buildMockSpeakingTurnAnalysis,
} from "../../../../../features/speaking/mocks/speaking-turn.mock";

import {
  speakingTurnAnalysisSchema,
  speakingTurnAnalyzeMetadataSchema,
} from "../../../../../features/speaking/schemas/speaking-turn.schema";

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

const MAX_AUDIO_SIZE_BYTES =
  20 *
  1024 *
  1024;

function shouldUseSpeakingAiMock():
  boolean {
  return (
    process.env
      .USE_SPEAKING_AI_MOCKS !==
    "false"
  );
}

function parseMetadata(
  rawValue:
    FormDataEntryValue | null,
) {
  if (
    typeof rawValue !==
    "string"
  ) {
    return {
      success:
        false as const,

      message:
        "metadata درخواست وجود ندارد.",
    };
  }

  let parsedJson:
    unknown;
try {
    parsedJson =
      JSON.parse(
        rawValue,
      );
  } catch {
    return {
      success:
        false as const,

      message:
        "metadata درخواست JSON معتبر نیست.",
    };
  }

  const result =
    speakingTurnAnalyzeMetadataSchema.safeParse(
      parsedJson,
    );

  if (
    !result.success
  ) {
    return {
      success:
        false as const,

      message:
        result.error
          .issues[0]
          ?.message ??
        "metadata تحلیل مکالمه معتبر نیست.",
    };
  }

  return {
    success:
      true as const,

    data:
      result.data,
  };
}

export async function POST(
  request:
    Request,
) {
  const session =
    await auth();

  if (
    !session?.user?.id
  ) {
    return NextResponse.json(
      {
        error:
          "برای تحلیل مکالمه باید وارد حساب کاربری شوید.",
      }, {
        status:
          401,
      },
    );
  }

  let formData:
    FormData;

  try {
    formData =
      await request.formData();
  } catch {
    return NextResponse.json(
      {
        error:
          "بدنه درخواست صوتی معتبر نیست.",
      },
      {
        status:
          400,
      },
    );
  }

  const audio =
    formData.get(
      "audio",
    );

  if (
    !(audio instanceof
      File)
  ) {
    return NextResponse.json(
      {
        error:
          "فایل صوتی ارسال نشده است.",
      },
      {
        status:
          400,
      },
    );
  }

  if (
    audio.size <=
    0
  ) {
    return NextResponse.json(
      {
        error:
          "فایل صوتی خالی است.",
      },
      {
        status:
          400, },
    );
  }

  if (
    audio.size >
    MAX_AUDIO_SIZE_BYTES
  ) {
    return NextResponse.json(
      {
        error:
          "حجم فایل صوتی بیش از حد مجاز است.",
      },
      {
        status:
          413,
      },
    );
  }

  if (
    audio.type &&
    !audio.type.startsWith(
      "audio/",
    )
  ) {
    return NextResponse.json(
      {
        error:
          "نوع فایل ارسال‌شده صوتی نیست.",
      },
      {
        status:
          415,
      },
    );
  }

  const metadataResult =
    parseMetadata(
      formData.get(
        "metadata",
      ),
    );

  if (
    !metadataResult.success
  ) {
    return NextResponse.json(
      {
        error:
          metadataResult.message,
      },
      {
        status:
          400,
      },
    ); }

  /**
   * Backend Speaking هنوز STT / AI endpoint
   * قابل استفاده ندارد.
   *
   * تا زمان اتصال Django این Route با Mock
   * قرارداد واقعی Frontend را شبیه‌سازی می‌کند.
   */
  if (
    !shouldUseSpeakingAiMock()
  ) {
    return NextResponse.json(
      {
        error:
          "سرویس واقعی Speaking AI هنوز به Backend متصل نشده است.",
      },
      {
        status:
          503,
      },
    );
  }

  const createdAt =
    new Date()
      .toISOString();

  const turnId =
    `speaking-turn-${randomUUID()}`;

  const analysis =
    buildMockSpeakingTurnAnalysis(
      metadataResult.data,
      {
        turnId,

        createdAt,
      },
    );

  const validated =
    speakingTurnAnalysisSchema.parse(
      analysis,
    );

  return NextResponse.json(
    validated,
    {
      status:
        201,
    },
  );
}