import type { ExecutionResponse } from "../types/codeExecutorStrategy.js";
import type CodeExecutorStrategy from "../types/codeExecutorStrategy.js";
import { JAVA_IMAGE } from "../utils/constants.js";
import createContainer from "./containerFactory.js";
import decodeDocekerStream from "./dockerHelper.js";

class JavaExecutor implements CodeExecutorStrategy {
  async execute(
    code: string,
    inputTestCase: string,
    outputTestCase?: string
  ): Promise<ExecutionResponse> {
    const rawLogBuffer: Buffer[] = [];
    const runCommand = `echo '${code.replace(
      /'/g,
      `'\\"`
    )}' > Main.java && javac Main.java && echo '${inputTestCase.replace(
      /'/g,
      `'\\"`
    )}' | java Main`;
    const javaDockerContainer = await createContainer(JAVA_IMAGE, [
      "/bin/sh",
      "-c",
      runCommand,
    ]);
    //   const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
    //     "python3",
    //     "-c",
    //     code,
    //     "stty -echo",
    //   ]);
    await javaDockerContainer.start();
    const loggerStream = await javaDockerContainer.logs({
      stdout: true,
      stderr: true,
      timestamps: false,
      follow: true,
    });

    loggerStream.on("data", (chunk) => {
      rawLogBuffer.push(chunk);
    });

    try {
      const codeResponse: string = await this.fetchDecodedStream(
        loggerStream,
        rawLogBuffer
      );
      if (codeResponse.trim() === outputTestCase?.trim()) {
        return { output: codeResponse, status: "SUCCESS" };
      } else {
        return { output: codeResponse, status: "WA" };
      }
      // return { output: codeResponse, status: "COMPLETED" };
    } catch (error) {
      if (error === "TLE") {
        await javaDockerContainer.kill();
      }
      return { output: error as string, status: "ERROR" };
    } finally {
      await javaDockerContainer.remove();
    }
  }

  fetchDecodedStream(
    loggerStream: NodeJS.ReadableStream,
    rawLogBuffer: Buffer[]
  ): Promise<string> {
    return new Promise((res, rej) => {
      const timeOut = setTimeout(() => {
        console.log("Timeout reached, ending stream");
        rej("TLE");
      }, 2000);

      loggerStream.on("end", () => {
        clearTimeout(timeOut);
        const completeBuffer = Buffer.concat(rawLogBuffer);
        const decodedStream = decodeDocekerStream(completeBuffer);
        console.log(decodedStream);
        // res(decodeDocekerStream);
        if (decodedStream.stderr) {
          rej(decodedStream.stderr);
        } else {
          res(decodedStream.stdout);
        }
      });
    });
  }
}

export default JavaExecutor;
