import type { z } from "zod";

import type {
  backendAuthTokenPairSchema,
  backendAuthUserSchema,
  backendLoginInputSchema,
  backendLoginResponseSchema,
  backendRefreshResponseSchema,
  backendRegisteredUserSchema,
  backendRegisterInputSchema,
  backendRegisterResponseSchema,
  frontendRegisterRequestSchema,
  frontendRegisterResponseSchema,
} from "../schemas/backend-auth.schema";

export type BackendAuthUser =
  z.infer<
    typeof backendAuthUserSchema
  >;

export type BackendRegisteredUser =
  z.infer<
    typeof backendRegisteredUserSchema
  >;

export type BackendAuthTokenPair =
  z.infer<
    typeof backendAuthTokenPairSchema
  >;

export type BackendLoginInput =
  z.infer<
    typeof backendLoginInputSchema
  >;

export type BackendLoginResponse =
  z.infer<
    typeof backendLoginResponseSchema
  >;

export type BackendRegisterInput =
  z.infer<
    typeof backendRegisterInputSchema
  >;

export type BackendRegisterResponse =
  z.infer<
    typeof backendRegisterResponseSchema
  >;

export type BackendRefreshResponse =
  z.infer<
    typeof backendRefreshResponseSchema
  >;

export type FrontendRegisterRequest =
  z.infer<
    typeof frontendRegisterRequestSchema
  >;

export type FrontendRegisterResponse =
  z.infer<
    typeof frontendRegisterResponseSchema
  >;