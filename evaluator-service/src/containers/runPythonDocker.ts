import type { TestCases } from "../types/testCases.js";
import { PYTHON_IMAGE } from "../utils/constants.js";
import createContainer from "./containerFactory.js";
import decodeDocekerStream from "./dockerHelper.js";

export async function runPython(code: string, inputData: string) {
  const rawLogBuffer: Buffer[] = [];
  const runCommand = `echo '${code.replace(
    /'/g,
    `'\\"`
  )}' > test.py && echo '${inputData.replace(/'/g, `'\\"`)}' | python3 test.py`;
  const pythonDockerContainer = await createContainer(PYTHON_IMAGE, [
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
  await pythonDockerContainer.start();
  const loggerStream = await pythonDockerContainer.logs({
    stdout: true,
    stderr: true,
    timestamps: false,
    follow: true,
  });

  loggerStream.on("data", (chunk) => {
    rawLogBuffer.push(chunk);
  });

  loggerStream.on("end", () => {
    const completeBuffer = Buffer.concat(rawLogBuffer);
    const decodeStream = decodeDocekerStream(completeBuffer);
    console.log(decodeStream.stdout);
  });
  return pythonDockerContainer;
}
