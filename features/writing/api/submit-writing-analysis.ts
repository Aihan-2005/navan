export type SubmitWritingAnalysisRequest = Readonly<{
  content: string;
  exerciseId?: string;
  mode: "free" | "exercise" | "draft";
}>;

export type SubmitWritingAnalysisResponse = Readonly<{
  success: boolean;
  submissionId?: string;
  error?: string;
}>;

export async function submitWritingAnalysis(
  request: SubmitWritingAnalysisRequest,
): Promise<SubmitWritingAnalysisResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Mock submission - in production this would call your actual API
  const submissionId = `submission-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  return {
    success: true,
    submissionId,
  };
}
