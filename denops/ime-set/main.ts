import type { Entrypoint } from "./deps/@denops/std/mod.ts";
import { has } from "./deps/@denops/std/function/mod.ts";
import { setIme } from "./mod.ts";

export const main: Entrypoint = async (denops) => {
  /**
   * IME 設定を行うかどうか。
   */
  const valid = async () => {
    // @todo: 一旦固定値。
    return !(await Promise.all([
      has(denops, "win32"),
      has(denops, "gui_running").then((v) => !v),
    ])).some((v) => !v);
  };

  /**
   * IME 有効設定。
   */
  const set = async (active: unknown) => {
    console.log("valid", await valid());
    if (!(await valid())) {
      return;
    }

    if (typeof active !== "number") {
      return;
    }

    if (active === 1) {
      await setIme(true);
    } else if (active === 0) {
      await setIme(false);
    }
  };

  // 起動時は IME を OFF にする。
  await set(0);

  denops.dispatcher = {
    valid,
    set,
  };
};
