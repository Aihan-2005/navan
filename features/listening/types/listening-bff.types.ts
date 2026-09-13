import type {
  z,
} from "zod";

import type {
  createListeningAttemptInputSchema,
  createListeningAttemptResponseSchema,
  submitListeningAttemptInputSchema,
  updateListeningDraftInputSchema,
  updateListeningDraftResponseSchema,
} from "../schemas/listening-bff.schema";

export type CreateListeningAttemptInput =
  z.infer<
    typeof createListeningAttemptInputSchema
  >;

export type CreateListeningAttemptResponse =
  z.infer<
    typeof createListeningAttemptResponseSchema
  >;

export type UpdateListeningDraftInput =
  z.infer<
    typeof updateListeningDraftInputSchema
  >;

export type UpdateListeningDraftResponse =
  z.infer<
    typeof updateListeningDraftResponseSchema
  >;

export type SubmitListeningAttemptInput =
  z.infer<
    typeof submitListeningAttemptInputSchema
  >;