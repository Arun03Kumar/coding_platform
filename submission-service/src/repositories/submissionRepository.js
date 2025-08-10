const Submission = require("../models/submissionModel");

class SubmissionRepository {
  constructor() {
    this.submissionModel = Submission;
  }

  async createSubmission(submission) {
    console.log("from", submission);
    try {
      const response = await this.submissionModel.create(submission);
      //   console.log("not coming here ");
      return response;
    } catch (error) {
      console.log("error", error);
      throw "Not woeking";
    }
  }
}

module.exports = SubmissionRepository;
