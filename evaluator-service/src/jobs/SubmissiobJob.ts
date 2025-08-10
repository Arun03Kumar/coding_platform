import type { Job } from "bullmq";
import type { IJob } from "../types/bullMQJobDefinition.js";
import type { SubmissionPayload } from "../types/submissionPayload.js";
import createExecutor from "../utils/ExecutorFactory.js";

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
        const codeLanguage = this.payload[key].language;
        const code = this.payload[key].code;
        const inputTestCase = this.payload[key].inputCase;

        const strategy = createExecutor(codeLanguage);
        if (strategy !== null) {
          const response = await strategy.execute(code, inputTestCase);
          if (response.status === "COMPLETED") {
            console.log("execution done");
            console.log(response);
          } else {
            console.log("not executed");
            console.log(response);
          }
        }
        // if (this.payload[key].language === "CPP") {
        //   const response = await runCpp(
        //     this.payload[key].code,
        //     this.payload[key].inputCase
        //   );
        //   console.log("Evaluate response is", response);
        // }
      }
    }
  };

  failed = (job?: Job): void => {
    console.log("job failed", job?.id);
  };
}
