const { StatusCodes } = require("http-status-codes");
const NotImplemented = require("../errors/notImplemented.error");
const { ProblemService } = require("../services/");
const { ProblemRepository } = require("../repositories");

const problemService = new ProblemService(new ProblemRepository());

function pingProblemController(req, res) {
  return res.json({ message: "problem api is working" });
}

async function addProblem(req, res, next) {
  try {
    // console.log(req.body);
    const newproblem = await problemService.createProblem(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created a new problem",
      error: {},
      data: newproblem,
    });
  } catch (err) {
    next(err);
  }
}

async function getProblem(req, res, next) {
  try {
    const problem = await problemService.getProblem(req.params.id);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched a problem",
      error: {},
      data: problem,
    });
  } catch (err) {
    next(err);
  }
}

async function getProblems(req, res, next) {
  try {
    const allProblems = await problemService.getAllProblems();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched all problems",
      error: {},
      data: allProblems,
    });
  } catch (err) {
    next(err);
  }
}

function deleteProblems(req, res, next) {
  try {
    throw new NotImplemented("deleteProblems");
  } catch (err) {
    next(err);
  }
}

function updateProblems(req, res, next) {
  try {
    throw new NotImplemented("updateProblems");
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addProblem,
  getProblem,
  getProblems,
  deleteProblems,
  updateProblems,
  pingProblemController,
};
