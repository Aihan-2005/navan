"use client";

import {
  useCallback,
  useState,
} from "react";

import {
  submitWritingAnalysis,
  type SubmitWritingAnalysisRequest,
} from "../api/submit-writing-analysis";


type AnalysisState =
  | "idle"
  | "loading"
  | "success"
  | "error";


export function useWritingAnalysis() {

  const [
    state,
    setState,
  ] =
    useState<AnalysisState>(
      "idle",
    );


  const [
    error,
    setError,
  ] =
    useState<string | null>(
      null,
    );


  const [
    submissionId,
    setSubmissionId,
  ] =
    useState<string | null>(
      null,
    );



  const analyze =
    useCallback(
      async (
        payload:
          SubmitWritingAnalysisRequest,
      ) => {

        setState(
          "loading",
        );

        setError(
          null,
        );


        try {

          const response =
            await submitWritingAnalysis(
              payload,
            );


          if (
            !response.success ||
            !response.submissionId
          ) {

            throw new Error(
              response.error ??
              "Analysis failed",
            );

          }


          setSubmissionId(
            response.submissionId,
          );


          setState(
            "success",
          );


          return response.submissionId;


        } catch (
          error
        ) {

          const message =
            error instanceof Error
              ? error.message
              : "خطای ناشناخته";


          setError(
            message,
          );


          setState(
            "error",
          );


          return null;

        }

      },
      [],
    );



  const reset =
    useCallback(
      () => {

        setState(
          "idle",
        );

        setError(
          null,
        );

        setSubmissionId(
          null,
        );

      },
      [],
    );



  return {

    analyze,

    state,

    error,

    submissionId,

    reset,

    isLoading:
      state === "loading",

    isSuccess:
      state === "success",

    isError:
      state === "error",

  };

}