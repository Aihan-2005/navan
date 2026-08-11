import { z } from "zod";

export const backendAuthIdentifierSchema =
  z
    .string()
    .trim()
    .min(
      3,
      "ایمیل یا شماره تلفن معتبر وارد کنید.",
    )
    .max(
      254,
      "شناسه کاربری بیش از حد طولانی است.",
    );

export const backendLoginInputSchema =
  z.object({
    identifier:
      backendAuthIdentifierSchema,

    password: z
      .string()
      .min(
        1,
        "رمز عبور الزامی است.",
      ),
  });

export const backendRegisterInputSchema =
  z
    .object({
      name: z
        .string()
        .trim()
        .min(
          2,
          "نام باید حداقل ۲ کاراکتر باشد.",
        )
        .max(
          150,
          "نام بیش از حد طولانی است.",
        ),

      identifier:
        backendAuthIdentifierSchema,

      password: z
        .string()
        .min(
          8,
          "رمز عبور باید حداقل ۸ کاراکتر باشد.",
        ),

      passwordConfirm: z
        .string()
        .min(
          8,
          "تکرار رمز عبور الزامی است.",
        ),
    })
    .superRefine(
      (
        value,
        context,
      ) => {
        if (
          value.password !==
          value.passwordConfirm
        ) {
          context.addIssue({
            code: "custom",

            path: [
              "passwordConfirm",
            ],

            message:
              "رمز عبور و تکرار آن یکسان نیستند.",
          });
        }
      },
    );

const backendUserIdSchema =
  z
    .union([
      z
        .string()
        .trim()
        .min(1),

      z
        .number()
        .int()
        .positive(),
    ])
    .transform(
      (value) =>
        String(value),
    );

export const backendAuthUserSchema =
  z.object({
    id:
      backendUserIdSchema,

    name: z
      .string()
      .trim()
      .min(1),

    identifier:
      backendAuthIdentifierSchema,
  });


export const backendRegisteredUserSchema =
  z.object({
    name: z
      .string()
      .trim()
      .min(1),

    identifier:
      backendAuthIdentifierSchema,
  });

export const backendAuthTokenPairSchema =
  z.object({
    access: z
      .string()
      .trim()
      .min(1),

    refresh: z
      .string()
      .trim()
      .min(1),
  });

export const backendLoginResponseSchema =
  z.object({
    message: z
      .string()
      .trim()
      .min(1),

    user:
      backendAuthUserSchema,

    token:
      backendAuthTokenPairSchema,
  });

export const backendRegisterResponseSchema =
  z.object({
    user:
      backendRegisteredUserSchema,

    token:
      backendAuthTokenPairSchema,
  });


export const backendRefreshResponseSchema =
  z.object({
    access: z
      .string()
      .trim()
      .min(1),

    refresh: z
      .string()
      .trim()
      .min(1)
      .optional(),
  });


export const frontendRegisterRequestSchema =
  backendRegisterInputSchema;

export const frontendRegisterResponseSchema =
  z.object({
    message: z
      .string()
      .trim()
      .min(1),

    user:
      backendRegisteredUserSchema,
  });