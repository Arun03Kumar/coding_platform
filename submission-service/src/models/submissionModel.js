const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "UserId fro the submission is missing"],
  },
  problemId: {
    type: String,
    required: [true, "Problem id from the submission is missing"],
  },
  code: {
    type: String,
    required: [true, "Code from the submission is missing"],
  },
  language: {
    type: String,
    required: [true, "Language from the submission is missing"],
  },
  staus: {
    type: String,
    enum: ["Pending", "Success", "RE", "TLE", "MLE", "WA"],
    default: "Pending",
  },
});

const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
