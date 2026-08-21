import type {
  JWT,
} from "@auth/core/jwt";

import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";

import {
  z,
} from "zod";

import {
  BackendAuthError,
  loginBackendUser,
  refreshBackendTokens,
} from "./features/auth/server/backend-auth-client";

type AppUserRole =
  | "user"
  | "admin";

const SESSION_MAX_AGE_SECONDS =
  7 * 24 * 60 * 60;

const ACCESS_TOKEN_FALLBACK_LIFETIME_MS =
  14 * 60 * 1000;

const ACCESS_TOKEN_REFRESH_SKEW_MS =
  30 * 1000;

/**
 * Temporary demo account.
 *
 * برای Preview و Vercel فعلاً فعال است.
 * بعداً با اتصال کامل Backend فقط کافی است:
 *
 * ENABLE_DEMO_AUTH=false
 *
 * را در Environment قرار دهیم.
 */
const DEMO_AUTH_ENABLED =
  process.env.ENABLE_DEMO_AUTH !==
  "false";

const DEMO_AUTH_IDENTIFIER =
  (
    process.env
      .DEMO_AUTH_IDENTIFIER ??
    "admin@test.com"
  )
    .trim()
    .toLowerCase();

const DEMO_AUTH_PASSWORD =
  process.env
    .DEMO_AUTH_PASSWORD ??
  "123456";

const credentialsSchema =
  z.object({
    identifier: z
      .string()
      .trim()
      .min(
        1,
        "ایمیل یا شماره تلفن الزامی است.",
      )
      .max(254),

    password: z
      .string()
      .min(
        1,
        "رمز عبور الزامی است.",
      ),
  });

const jwtExpirationPayloadSchema =
  z.object({
    exp: z
      .number()
      .finite()
      .positive(),
  });

function normalizeNullableString(
  value:
    unknown,
): string | null {
  if (
    typeof value !==
    "string"
  ) {
    return null;
  }

  const normalized =
    value.trim();

  return normalized
    ? normalized
    : null;
}

function normalizeRole(
  value:
    unknown,
): AppUserRole {
  return value ===
    "admin"
    ? "admin"
    : "user";
}

function isDemoCredentials(
  identifier:
    string,
  password:
    string,
): boolean {
  if (
    !DEMO_AUTH_ENABLED
  ) {
    return false;
  }

  return (
    identifier
      .trim() .toLowerCase() ===
      DEMO_AUTH_IDENTIFIER &&
    password ===
      DEMO_AUTH_PASSWORD
  );
}

function getAccessTokenExpirationMs(
  accessToken:
    string,
): number {
  try {
    const parts =
      accessToken.split(
        ".",
      );

    const payloadPart =
      parts[1];

    if (!payloadPart) {
      throw new Error(
        "JWT payload is missing.",
      );
    }

    const decodedPayload =
      JSON.parse(
        Buffer.from(
          payloadPart,
          "base64url",
        ).toString(
          "utf8",
        ),
      ) as unknown;

    const parsed =
      jwtExpirationPayloadSchema.safeParse(
        decodedPayload,
      );

    if (!parsed.success) {
      throw new Error(
        "JWT exp is missing.",
      );
    }

    return (
      parsed.data.exp *
      1000
    );
  } catch {
    return (
      Date.now() +
      ACCESS_TOKEN_FALLBACK_LIFETIME_MS
    );
  }
}

async function refreshAccessToken(
  token:
    JWT,
): Promise<JWT> {
  const refreshToken =
    token.backendRefreshToken;

  /**
   * Demo Session هیچ Backend Token ندارد.
   * بنابراین وارد Refresh Flow نمی‌شود.
   */
  if (!refreshToken) {
    return token;
  }

  try {
    const refreshed =
      await refreshBackendTokens(
        refreshToken,
      );

    return {
      ...token,

      backendAccessToken:
        refreshed.access,
backendRefreshToken:
        refreshed.refresh ??
        refreshToken,

      backendAccessTokenExpiresAt:
        getAccessTokenExpirationMs(
          refreshed.access,
        ),

      authError:
        undefined,
    };
  } catch (error) {
    console.error(
      "Backend access token refresh failed:",
      error,
    );

    return {
      ...token,

      authError:
        "RefreshAccessTokenError",
    };
  }
}

const credentialsProvider =
  Credentials({
    name:
      "Credentials",

    credentials: {
      identifier: {
        label:
          "Email or Phone",

        type:
          "text",
      },

      password: {
        label:
          "Password",

        type:
          "password", },
    },

    async authorize(
      credentials,
    ) {
      const parsed =
        credentialsSchema.safeParse(
          credentials,
        );

      if (!parsed.success) {
        return null;
      }

      const {
        identifier,
        password,
      } = parsed.data;

      /**
       * Temporary Vercel / Preview account
       *
       * admin@test.com
       * 123456
       */
      if (
        isDemoCredentials(
          identifier,
          password,
        )
      ) {
        return {
          id:"demo-admin",

          name:
            "Admin Demo",

          email:
            DEMO_AUTH_IDENTIFIER,

          image:
            null,

          username:
            "admin",

          identifier:
            DEMO_AUTH_IDENTIFIER,

          role:
            "admin",
        };
      }

      /**
       * سایر کاربران همچنان از Backend
       * واقعی احراز هویت می‌شوند.
       *
       * بنابراین بعداً برای حذف Demo
       * نیاز به بازطراحی Auth نداریم.
       */
      try {
        const response =
          await loginBackendUser({
            identifier,

            password,
          });

        const {
          user,
          token,
        } = response;

        return {
          id:
            user.id,

          name:  user.name,

          email:
            user.identifier.includes(
              "@",
            )
              ? user.identifier
              : null,

          image:
            null,

          username:
            null,

          identifier:
            user.identifier,

          role:
            "user",

          backendAccessToken:
            token.access,

          backendRefreshToken:
            token.refresh,

          backendAccessTokenExpiresAt:
            getAccessTokenExpirationMs(
              token.access,
            ),
        };
      } catch (error) {
        if (
          error instanceof
            BackendAuthError &&
          error.statusCode >=
            400 &&
          error.statusCode <
            500
        ) {
          return null;
        }

        console.error(
          "Credentials authorize failed:",
          error,
        );

        return null;
      }
    },
  });

const authResult =
  NextAuth({
 secret:
      process.env.AUTH_SECRET,

    trustHost:
      true,

    session: {
      strategy:
        "jwt",

      maxAge:
        SESSION_MAX_AGE_SECONDS,
    },

    pages: {
      signIn:
        "/login",
    },

    providers: [
      credentialsProvider,
    ],

    callbacks: {
      async jwt({
        token,
        user,
      }) {
        /**
         * Initial sign in.
         */
        if (user) {
          token.id =
            user.id ??
            token.sub ??
            "";

          token.username =
            normalizeNullableString(
              user.username,
            );

          token.identifier =
            normalizeNullableString(
              user.identifier,
            );

          token.role =
            normalizeRole(
              user.role,
            );

          token.backendAccessToken =
            user.backendAccessToken;

          token.backendRefreshToken =
            user.backendRefreshToken;

          token.backendAccessTokenExpiresAt =
            user.backendAccessTokenExpiresAt;

          token.authError =
            undefined;

          return token;
        }

        /**
         * Demo Session یا Session بدون
         * Backend Token نیاز به Refresh ندارد.
         */
        if (
          !token.backendAccessToken ||
          !token.backendRefreshToken
        ) {
          return token;
        }
 const expiresAt =
          token.backendAccessTokenExpiresAt;

        if (
          typeof expiresAt ===
            "number" &&
          Date.now() <
            expiresAt -
              ACCESS_TOKEN_REFRESH_SKEW_MS
        ) {
          return token;
        }

        return refreshAccessToken(
          token,
        );
      },

      async session({
        session,
        token,
      }) {
        if (!session.user) {
          return session;
        }

        session.user.id =
          token.id ??
          token.sub ??
          "";

        session.user.username =
          normalizeNullableString(
            token.username,
          );

        session.user.identifier =
          normalizeNullableString(
            token.identifier,
          );
session.user.role =
  normalizeRole(
    token.role,
  );

/**
 * Only expose the short-lived backend access token that the server-side
 * API clients need. Never copy backendRefreshToken into Session.
 *
 * If the refresh flow failed, do not propagate the now-stale access token.
 */
session.backendAccessToken =
  token.authError ===
  "RefreshAccessTokenError"
    ? undefined
    : token.backendAccessToken;

session.authError =
  token.authError;

return session;
      },
    },
  });

export const handlers =
  authResult.handlers;

export const auth =
  authResult.auth;

export const signIn =
  authResult.signIn;

export const signOut =
  authResult.signOut;

export const {
  GET,
  POST,
} = handlers;
      