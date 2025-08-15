export type SubmissionPayload = {
  code: string;
  language: string;
  inputCase: string;
  outputCase?: string;
  userId: string;
  submissionId: string;
    testCases?: TestCase[];
};

export type TestCase = {
    input: string;
    output: string;
};
