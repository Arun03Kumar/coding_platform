const SubmissionProducer = require("../producers/submissionQueueProduer");

class SubmissionService {
  constructor(submissionRepository) {
    this.submissionRepository = submissionRepository;
  }

  async pingCheck() {
    return "pong1";
  }

  async addSubmission(submission) {
    const submission = this.submissionRepository.createSubmission(submission);
    if (!submission) {
      throw { message: "Not able to create submission" };
    }
    console.log(submission);
    const response = await SubmissionProducer(submission);
    return { queueResponse: response, submission };
  }
}

module.exports = SubmissionService;
