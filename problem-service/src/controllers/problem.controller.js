const { StatusCodes } = require("http-status-codes");
const NotImplemented = require("../errors/notImplemented.error");

function pingProblemController(req, res) {
  return res.json({ message: "problem api is working" });
}

function addProblem(req, res, next) {
  try {
    throw new NotImplemented("addProblem");
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
