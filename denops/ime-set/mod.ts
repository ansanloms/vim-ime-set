import * as windows from "./windows.ts";

export const setIme = (active: boolean): void | Promise<void> => {
  if (Deno.build.os === "windows") {
    return windows.setIme(active);
  }

  throw new Error(`unsupported operation: ${Deno.build.os}`);
};
