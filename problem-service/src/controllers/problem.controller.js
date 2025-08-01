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

function getProblem(req, res, next) {
  try {
    throw new NotImplemented("getProblem");
  } catch (err) {
    next(err);
  }
}

function getProblems(req, res, next) {
  try {
    throw new NotImplemented("getProblems");
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
