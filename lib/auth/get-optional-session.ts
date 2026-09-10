import type {
  Session,
} from "next-auth";

import {
  auth,
} from "../../auth";

export async function getOptionalSession(): Promise<Session | null> {
  try {
    return await auth();
  } catch (error) {
    console.error(
      "Unable to resolve Auth.js session:",
      error,
    );

    return null;
  }
}