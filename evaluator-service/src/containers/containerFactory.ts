import Docker from "dockerode";
import { ensureImageExists } from "./dockerHelper.js";

async function createContainer(imageName: string, cmdExecutable: string[]) {
  const docker = new Docker();
  await ensureImageExists(docker, imageName);

  const container = await docker.createContainer({
    Image: imageName,
    Cmd: cmdExecutable,
    AttachStdin: true,
    AttachStdout: true,
    AttachStderr: true,
    Tty: false,
    HostConfig: {
      Memory: 1024 * 1024 * 512,
    },
    OpenStdin: true,
  });

  return container;
}

export default createContainer;
