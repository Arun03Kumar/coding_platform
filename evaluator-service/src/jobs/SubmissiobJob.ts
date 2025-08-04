import type { Job } from "bullmq";
import type { IJob } from "../types/bullMQJobDefinition.js";
import type { SubmissionPayload } from "../types/submissionPayload.js";
import { runCpp } from "../containers/runCppDocker.js";

export default class SubmissionJob implements IJob {
  name: string;
  payload?: Record<string, SubmissionPayload>;

  constructor(payload: Record<string, SubmissionPayload>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handle = async (job?: Job): Promise<void> => {
    // console.log("handle of the job called", job);
    if (job && this.payload) {
      const key = Object.keys(this.payload)[0];
      if (key && this.payload[key]) {
        if (this.payload[key].language === "CPP") {
          const response = await runCpp(
            this.payload[key].code,
            this.payload[key].inputCase
          );
          console.log("Evaluate response is", response);
        }
      }
    }
  };

  failed = (job?: Job): void => {
    console.log("job failed", job?.id);
  };
}
