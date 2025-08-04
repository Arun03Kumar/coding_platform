import submissionQueue from "../queues/submissionQueue.js";

export default async function (name: string, payload: Record<string, unknown>) {
  await submissionQueue.add(name, payload);
  console.log("Successfully added a new submission job");
}
