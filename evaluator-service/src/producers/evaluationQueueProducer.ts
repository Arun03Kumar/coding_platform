import evaluationQueue from "../queues/evaluationQueue.js";

export default async function (payload: Record<string, unknown>) {
  console.log("Adding job to evaluation queue with payload:", payload);
  await evaluationQueue.add("EvaluationJob", payload);
  console.log("Job added to evaluation queue successfully");
}
