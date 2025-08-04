import { JAVA_IMAGE } from "../utils/constants.js";
import createContainer from "./containerFactory.js";
import decodeDocekerStream from "./dockerHelper.js";

export async function runJava(code: string, inputData: string) {
  const rawLogBuffer: Buffer[] = [];
  const runCommand = `echo '${code.replace(
    /'/g,
    `'\\"`
  )}' > Main.java && javac Main.java && echo '${inputData.replace(
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

  await new Promise((res, rej) => {
    loggerStream.on("end", () => {
      const completeBuffer = Buffer.concat(rawLogBuffer);
      const decodedStream = decodeDocekerStream(completeBuffer);
      console.log(decodedStream.stdout);
      res(decodeDocekerStream);
    });
  });

  await javaDockerContainer.remove();

  //   return pythonDockerContainer;
}
