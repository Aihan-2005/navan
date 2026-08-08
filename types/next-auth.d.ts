import type {
  DefaultSession,
} from "@auth/core/types";

type AppUserRole =
  | "user"
  | "admin";

/**
 * Auth.js core User / Session augmentation.
 *
 * NextAuth v5 re-exports these types from @auth/core,
 * so keeping the source augmentation here makes
 * callbacks, auth(), useSession() and server sessions
 * share the same contract.
 */
declare module "@auth/core/types" {
  interface User {
    username?: string | null;

    role?: AppUserRole;
  }

  interface Session {
    user: {
      id: string;

      username: string | null;

      role: AppUserRole;
    } & DefaultSession["user"];
  }
}

/**
 * Custom values persisted inside JWT sessions.
 */
declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;

    username?: string | null;

    role?: AppUserRole;
  }
}