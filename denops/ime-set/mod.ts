import * as windows from "./windows.ts";
import * as wsl from "./wsl.ts";

export const setImeStatus = async (active: boolean): Promise<void> => {
  if (windows.isRunningOnWindows()) {
    return windows.setImeStatus(active);
  }

  if (await wsl.isRunningOnWsl()) {
    return await wsl.setImeStatus(active);
  }

  throw new Error(`unsupported operation: ${Deno.build.os}`);
};
