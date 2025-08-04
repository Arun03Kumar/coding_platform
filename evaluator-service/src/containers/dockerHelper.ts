import type DockerStreamOutput from "../types/dockerStreamOutput.js";
import { DOCKER_STREAM_HEADER_SIZE } from "../utils/constants.js";

export default function decodeDocekerStream(
  buffer: Buffer
): DockerStreamOutput {
  let offset = 0;
  const output: DockerStreamOutput = { stdout: "", stderr: "" };
  while (offset < buffer.length) {
    const channel = buffer[offset];
    const length = buffer.readUint32BE(offset + 4);
    offset += DOCKER_STREAM_HEADER_SIZE;
    if (channel === 1) {
      output.stdout += buffer.toString("utf-8", offset, offset + length);
    } else if (channel === 2) {
      output.stderr += buffer.toString("utf-8", offset, offset + length);
    }
    offset += length;
  }
  return output;
}

export async function ensureImageExists(docker: any, imageName: string) {
  try {
    await docker.getImage(imageName).inspect();
    console.log(`${imageName} already present`);
  } catch (err) {
    console.log(`${imageName} not found. Pulling...`);
    await new Promise((resolve, reject) => {
      docker.pull(imageName, (err: any, stream: any) => {
        if (err) return reject(err);
        docker.modem.followProgress(stream, onFinished, onProgress);

        function onFinished(err: any, output: any) {
          if (err) return reject(err);
          resolve(output);
        }

        function onProgress(event: any) {
          process.stdout.write(".");
        }
      });
    });
    console.log(`\n${imageName} pulled successfully`);
  }
}
