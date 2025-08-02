const { Problem } = require("../models");

class ProblemRepository {
  async createProblem(problemData) {
    try {
      const problem = await Problem.create({
        title: problemData.title,
        description: problemData.description,
        testCases: problemData.testCases ? problemData.testCases : [],
      });
      return problem;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getProblem(id) {
    const problem = await Problem.findById(id);
    console.log(problem);
    return problem;
  }

  async getAllProblems() {
    try {
      const problems = await Problem.find({});
      return problems;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async deleteProblem(id) {
    const deletedProblem = await Problem.findByIdAndDelete(id);
    if (!deletedProblem) {
      console.log("not found problem in db");
      throw new Error("Not found in DB");
    }
    return deletedProblem;
  }
}

module.exports = ProblemRepository;
