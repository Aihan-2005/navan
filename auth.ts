import NextAuth from "next-auth";

import Credentials from "next-auth/providers/credentials";

import Google from "next-auth/providers/google";

import { z } from "zod";

type AppUserRole =
  | "user"
  | "admin";

type DemoUser = Readonly<{
  id: string;

  username: string;

  email: string;

  password: string;

  name: string;

  role: AppUserRole;
}>;

const credentialsSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(
      1,
      "ایمیل یا نام کاربری الزامی است",
    ),

  password: z
    .string()
    .min(
      6,
      "رمز عبور باید حداقل ۶ کاراکتر باشد",
    ),
});

const demoUsers:
  readonly DemoUser[] = [
  {
    id: "1",

    username: "admin",

    email: "admin@test.com",

    password: "123456",

    name: "Admin User",

    role: "admin",
  },

  {
    id: "2",

    username: "user",

    email: "user@test.com",

    password: "123456",

    name: "Normal User",

    role: "user",
  },
];

function normalizeIdentifier(
  identifier: string,
): string {
  return identifier
    .trim()
    .toLowerCase();
}

function normalizeUsername(
  username: unknown,
): string | null {
  if (
    typeof username !==
    "string"
  ) {
    return null;
  }

  const normalizedUsername =
    username.trim();

  return normalizedUsername
    ? normalizedUsername
    : null;
}

function normalizeRole(
  role: unknown,
): AppUserRole {
  return role === "admin"
    ? "admin"
    : "user";
}

function findDemoUser(
  identifier: string,
  password: string,
): DemoUser | null {
  const normalizedIdentifier =
    normalizeIdentifier(
      identifier,
    );

  const user =
    demoUsers.find(
      (candidate) => {
        const sameEmail =
          candidate.email
            .toLowerCase() ===
          normalizedIdentifier;

        const sameUsername =
          candidate.username
            .toLowerCase() ===
          normalizedIdentifier;

        const samePassword =
          candidate.password ===
          password;

        return (
          (sameEmail ||
            sameUsername) &&
          samePassword
        );
      },
    );

  return user ?? null;
}

const credentialsProvider =
  Credentials({
    name: "Credentials",

    credentials: {
      identifier: {
        label:
          "Email or Username",

        type: "text",
      },

      password: {
        label: "Password",

        type: "password",
      },
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

      const user =
        findDemoUser(
          parsed.data.identifier,
          parsed.data.password,
        );

      if (!user) {
        return null;
      }

      return {
        id: user.id,

        email: user.email,

        name: user.name,

        username:
          user.username,

        role: user.role,
      };
    },
  });

const providers = [
  credentialsProvider,

  ...(
    process.env
      .AUTH_GOOGLE_ID &&
    process.env
      .AUTH_GOOGLE_SECRET
      ? [
          Google({
            clientId:
              process.env
                .AUTH_GOOGLE_ID,

            clientSecret:
              process.env
                .AUTH_GOOGLE_SECRET,
          }),
        ]
      : []
  ),
];

const authResult =
  NextAuth({
    secret:
      process.env.AUTH_SECRET,

    trustHost: true,

    session: {
      strategy: "jwt",
    },

    pages: {
      signIn: "/login",
    },

    providers,

    callbacks: {
      async jwt({
        token,
        user,
      }) {
        /**
         * `user` only exists during
         * the initial sign-in.
         *
         * We copy the custom fields
         * into the JWT so they remain
         * available on future requests.
         */
        if (user) {
          token.id =
            user.id ??
            token.sub ??
            "";

          token.username =
            normalizeUsername(
              user.username,
            );

          token.role =
            normalizeRole(
              user.role,
            );
        }

        return token;
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
          normalizeUsername(
            token.username,
          );

        session.user.role =
          normalizeRole(
            token.role,
          );

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