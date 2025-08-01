class ProblemRepository {
  async createProblem(problemData) {
    try {
      const problem = await Problem.create({
        title: problemData.title,
        description: problemData.description,
        testCases: problemData.testCases ? problemData.testCases : [],
      });
    } catch (err) {
      console.log(error);
      throw err;
    }
  }
}

module.exports = ProblemRepository;
