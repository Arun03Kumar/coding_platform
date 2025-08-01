const sanitizeMarkdownContent = require("../utils/markdownSanitizer");

class ProblemService {
  constructor(problemRepository) {
    this.problemRepository = problemRepository;
  }

  async createProblem(problemData) {
    try {
      problemData.description = sanitizeMarkdownContent(
        problemData.description
      );
      const problem = await this.problemRepository.createProblem(problemData);
      return problem;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getProblem(id) {
    try {
      const problem = await this.problemRepository.getProblem(id);
      return problem;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getAllProblems() {
    try {
      const problems = await this.problemRepository.getAllProblems();
      return problems;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

module.exports = ProblemService;
