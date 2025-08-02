import type { Job } from "bullmq";
import type { IJob } from "../types/bullMQJobDefinition.js";

export default class SampleJob implements IJob {
  name: string;
  payload?: Record<string, unknown>;

  constructor(payload: Record<string, unknown>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handle = (job?: Job): void => {
    console.log("handle of the job called", job);
  };

  failed = (job?: Job): void => {
    console.log("job failed", job?.id);
  };
}
