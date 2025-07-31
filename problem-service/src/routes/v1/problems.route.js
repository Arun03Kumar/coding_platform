const express = require("express");
const { ProblemController } = require("../../controllers");

const problemRouter = express.Router();

problemRouter.get("/ping", ProblemController.pingProblemController);
problemRouter.get("/:id", ProblemController.getProblem);
problemRouter.get("/", ProblemController.getProblems);
problemRouter.post("/:id", ProblemController.addProblem);
problemRouter.delete("/:id", ProblemController.deleteProblems);
problemRouter.put("/:id", ProblemController.updateProblems);

module.exports = problemRouter;
