import type {
  z,
} from "zod";

import type {
  adaptivePlacementAnswerInputSchema,
  adaptivePlacementSessionViewSchema,
  adaptivePlacementSkillCoverageSchema,
  adaptivePlacementStartInputSchema,
  adaptivePlacementStatusSchema,
} from "../schemas/adaptive-placement.schema";

export type AdaptivePlacementStatus =
  z.infer<
    typeof adaptivePlacementStatusSchema
  >;

export type AdaptivePlacementSkillCoverage =
  z.infer<
    typeof adaptivePlacementSkillCoverageSchema
  >;

export type AdaptivePlacementStartInput =
  z.infer<
    typeof adaptivePlacementStartInputSchema
  >;

export type AdaptivePlacementAnswerInput =
  z.infer<
    typeof adaptivePlacementAnswerInputSchema
  >;

export type AdaptivePlacementSessionView =
  z.infer<
    typeof adaptivePlacementSessionViewSchema
  >;


  
  