import type {
  Session,
} from "next-auth";

import {
  unstable_rethrow,
} from "next/navigation";

import {
  auth,
} from "../../auth";


export async function getOptionalSession(): Promise<Session | null> {
  try {
    return await auth();
  } catch (error) {

    
    unstable_rethrow(
      error,
    );

    console.error(
      "Unable to resolve Auth.js session:",
      error,
    );

    return null;
  }
}