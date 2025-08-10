const SubmissionProducer = require("../producers/submissionQueueProduer");

class SubmissionService {
  constructor(submissionRepository) {
    this.submissionRepository = submissionRepository;
  }

  async pingCheck() {
    return "pong1";
  }

  async addSubmission(submissionPayload) {
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
