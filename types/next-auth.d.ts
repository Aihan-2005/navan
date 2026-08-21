import type {
  DefaultSession,
} from "@auth/core/types";

type AppUserRole =
  | "user"
  | "admin";

type AuthSessionError =
  | "RefreshAccessTokenError";

declare module "@auth/core/types" {
  interface User {
    username?:
      string | null;

    identifier?:
      string | null;

    role?:
      AppUserRole;

    backendAccessToken?:
      string;

    backendRefreshToken?:
      string;

    backendAccessTokenExpiresAt?:
      number;
  }

  interface Session {
    user: {
      id: string;
      username:
        string | null;

      identifier:
        string | null;

      role:
        AppUserRole;
    } & DefaultSession["user"];

    /**
     * Short-lived backend access token.
     *
     * This is populated by the Auth.js session callback and is used by
     * server-only API clients such as listening-server-client.ts.
     * The refresh token intentionally stays out of Session.
     */
    backendAccessToken?:
      string;

    authError?:
      AuthSessionError;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;

    username?:
      string | null;

    identifier?:
      string | null;

    role?:
      AppUserRole;

    backendAccessToken?:
      string;

    backendRefreshToken?:
      string;

    backendAccessTokenExpiresAt?:
      number;

    authError?:
      AuthSessionError;
  }
}