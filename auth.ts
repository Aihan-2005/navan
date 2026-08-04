import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { z } from "zod";

const credentialsSchema = z.object({
  identifier: z.string().trim().min(1, "ایمیل یا نام کاربری الزامی است"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

type DemoUser = {
  id: string;
  username: string;
  email: string;
  password: string;
  name: string;
  role: "user" | "admin";
};

const demoUsers: DemoUser[] = [
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

function findDemoUser(identifier: string, password: string) {
  const normalizedIdentifier = identifier.trim().toLowerCase();

  return demoUsers.find((user) => {
    const sameEmail = user.email.toLowerCase() === normalizedIdentifier;
    const sameUsername = user.username.toLowerCase() === normalizedIdentifier;
    const samePassword = user.password === password;

    return (sameEmail || sameUsername) && samePassword;
  });
}

const providers = [
  Credentials({
    name: "Credentials",
    credentials: {
      identifier: {
        label: "Email or Username",
        type: "text",
      },
      password: {
        label: "Password",
        type: "password",
      },
    },

    async authorize(credentials) {
      const parsed = credentialsSchema.safeParse(credentials);

      if (!parsed.success) {
        return null;
      }

      const user = findDemoUser(parsed.data.identifier, parsed.data.password);

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        role: user.role,
      };
    },
  }),

  ...(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET
    ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID,
          clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
      ]
    : []),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username ?? null;
        token.role = user.role ?? "user";
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id ?? "");
        session.user.username = token.username as string | null;
        session.user.role = token.role as string | null;
      }

      return session;
    },
  },
});

export const { GET, POST } = handlers;