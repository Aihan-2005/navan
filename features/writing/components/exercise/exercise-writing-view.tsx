"use client";

import type {
  WritingExercise,
} from "../../types/writing.types";

import {
  WritingWorkspace,
} from "../workspace/writing-workspace";

type ExerciseWritingViewProps =
  Readonly<{
    exercise: WritingExercise;
  }>;

export function ExerciseWritingView({
  exercise,
}: ExerciseWritingViewProps) {
  return (
    <WritingWorkspace
      mode="exercise"
      exercise={exercise}
    />
  );
}

