import * as path from "./deps/@std/path/mod.ts";
import { toFileUrl } from "./deps/@std/path/windows/mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));

/**
 * IME の状態を設定する。
 */
export const setImeStatus = async (active: boolean): Promise<void> => {
  const src = await getWindowsFileUrl(path.join(__dirname, "./cli.ts"));
  const command = new Deno.Command("deno.exe", {
    args: [
      "run",
      "--allow-ffi",
      src,
      active ? "1" : "0",
    ],
  });

  const { code, stderr } = await command.output();

  if (code !== 0) {
    throw new Error(new TextDecoder().decode(stderr) + ` (${code})`);
  }
};

/**
 * wsl 上で動作しているかどうか。
 */
export const isRunningOnWsl = async (): Promise<boolean> => {
  try {
    if (Deno.build.os !== "linux") {
      return false;
    }

    const version = await Deno.readTextFile("/proc/version");
    return version.toLowerCase().includes("microsoft");
  } catch {
    return false;
  }
};

/**
 * wsl 上の path から windows の file URL を取得する。
 */
const getWindowsFileUrl = async (basePath: string) => {
  if (!isRunningOnWsl()) {
    throw new Error("Not running on wsl.");
  }

  const command = new Deno.Command("wslpath", { args: ["-w", basePath] });
  const { code, stdout, stderr } = await command.output();

  if (code !== 0) {
    throw new Error(new TextDecoder().decode(stderr) + ` (${code})`);
  }

  const windowsPath = new TextDecoder().decode(stdout);
  return toFileUrl(windowsPath).toString();
};
