const fetchProblemDetails = require("../apis/problemAdminApi");
const SubmissionProducer = require("../producers/submissionQueueProduer");

class SubmissionService {
  constructor(submissionRepository) {
    this.submissionRepository = submissionRepository;
  }

  async pingCheck() {
    return "pong1";
  }

  async addSubmission(submissionPayload) {
    const res = await fetchProblemDetails(submissionPayload.problemId);
    // console.log(res);
    if (!res) {
      throw "Submission creation error";
    }

    // console.log(res.data.codeStubs, "adfhjk", submissionPayload);
    const languageCodeStub = res.data.codeStubs.find(
      (codeStub) =>
        codeStub.language.toLowerCase() ===
        submissionPayload.language.toLowerCase()
    );

    const completeSubmissionCode =
      languageCodeStub.startSnippet +
      "\n\n" +
      submissionPayload.code +
      "\n\n" +
      languageCodeStub.endSnippet;

    // console.log(completeSubmissionCode);
    submissionPayload.code = completeSubmissionCode;

    const submission = await this.submissionRepository.createSubmission(
      submissionPayload
    );
    if (!submission) {
      throw { message: "Not able to create submission" };
    }
    console.log(submission);
    const response = await SubmissionProducer(submission);
    return { queueResponse: response, submission };
  }
}

module.exports = SubmissionService;
