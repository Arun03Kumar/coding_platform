import type { Job } from "bullmq";
import type { IJob } from "../types/bullMQJobDefinition.js";
import type { SubmissionPayload } from "../types/submissionPayload.js";
import createExecutor from "../utils/ExecutorFactory.js";
import evaluationQueueProducer from "../producers/evaluationQueueProducer.js";

export default class SubmissionJob implements IJob {
  name: string;
  payload?: Record<string, SubmissionPayload>;

  constructor(payload: Record<string, SubmissionPayload>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }

  handle = async (job?: Job): Promise<void> => {
    console.log("handle of the job called");
    if (job && this.payload) {
      const key = Object.keys(this.payload)[0];
      if (key && this.payload[key]) {
        const codeLanguage = this.payload[key].language;
        const code = this.payload[key].code;
        const inputTestCase = this.payload[key].inputCase;
        const outputTestCase = this.payload[key].outputCase;

        const strategy = createExecutor(codeLanguage);
        if (strategy !== null) {
          const response = await strategy.execute(
            code,
            inputTestCase,
            outputTestCase
          );

          evaluationQueueProducer({
            response,
            userId: this.payload[key].userId,
            submissionId: this.payload[key].submissionId,
          });

          if (response.status === "SUCCESS") {
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
