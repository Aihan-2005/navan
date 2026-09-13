import type {
  z,
} from "zod";

import type {
  listeningAttemptCreateInputSchema,
  listeningAttemptCreateResultSchema,
  listeningAttemptDraftSaveResultSchema,
  listeningAttemptDraftUpdateInputSchema,
  listeningAttemptSubmitInputSchema,
} from "../schemas/listening-attempt-command.schema";

export type ListeningAttemptCreateInput =
  z.input<
    typeof listeningAttemptCreateInputSchema
  >;

export type ListeningAttemptCreateResult =
  z.infer<
    typeof listeningAttemptCreateResultSchema
  >;

export type ListeningAttemptDraftUpdateInput =
  z.input<
    typeof listeningAttemptDraftUpdateInputSchema
  >;

export type ListeningAttemptDraftSaveResult =
  z.infer<
    typeof listeningAttemptDraftSaveResultSchema
  >;

export type ListeningAttemptSubmitInput =
  z.input<
    typeof listeningAttemptSubmitInputSchema
  >;