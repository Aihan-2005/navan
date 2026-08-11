import {
  NextResponse,
} from "next/server";

import {
  BackendAuthError,
  registerBackendUser,
} from "../../../../features/auth/server/backend-auth-client";

import {
  frontendRegisterRequestSchema,
  frontendRegisterResponseSchema,
} from "../../../../features/auth/schemas/backend-auth.schema";

export const runtime =
  "nodejs";

export const dynamic =
  "force-dynamic";

export async function POST(
  request: Request,
) {
  let payload:
    unknown;

  try {
    payload =
      await request.json();
  } catch {
    return NextResponse.json(
      {
        error:
          "بدنه درخواست JSON معتبر نیست.",
      },
      {
        status:
          400,
      },
    );
  }

  const parsed =
    frontendRegisterRequestSchema.safeParse(
      payload,
    );

  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          parsed.error
            .issues[0]
            ?.message ??
          "اطلاعات ثبت‌نام معتبر نیست.",
      },
      {
        status:
          400,
      },
    );
  }

  try {
    const backendResponse =
      await registerBackendUser(
        parsed.data,
      );

   
    const response =
      frontendRegisterResponseSchema.parse(
        {
          message:
            "حساب کاربری با موفقیت ساخته شد.",

          user: {
            name:
              backendResponse
                .user.name,

            identifier:
              backendResponse
                .user.identifier,
          },
        },
      );

    return NextResponse.json(
      response,
      {
        status:
          201,
      },
    );
  } catch (error) {
    if (
      error instanceof
      BackendAuthError
    ) {
      const status =
        error.statusCode >=
          400 &&
        error.statusCode <
          500
          ? error.statusCode
          : 502;

      return NextResponse.json(
        {
          error:
            error.message,
        },
        {
          status,
        },
      );
    }

    console.error(
      "Frontend register route failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "ثبت‌نام با خطای غیرمنتظره مواجه شد.",
      },
      {
        status:
          500,
      },
    );
  }
}