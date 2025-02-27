import * as windows from "./windows.ts";

export const setImeStatus = (active: boolean): void | Promise<void> => {
  if (Deno.build.os === "windows") {
    return windows.setImeStatus(active);
  }

  throw new Error(`unsupported operation: ${Deno.build.os}`);
};
