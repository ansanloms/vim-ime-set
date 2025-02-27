import type { Entrypoint } from "./deps/@denops/std/mod.ts";
import * as variable from "./deps/@denops/std/variable/mod.ts";
import { setImeStatus } from "./mod.ts";

export const main: Entrypoint = async (denops) => {
  denops.dispatcher = {
    /**
     * 当該機能が有効かどうか。
     * デフォルトは有効。
     */
    valid: async () => {
      return await variable.globals.get(denops, "ime_set#valid", true) === true;
    },

    /**
     * IME 有効状態を更新する。
     */
    set: async (active) => {
      await setImeStatus(active === 1);
    },
  };

  // 起動時に IME を off にする。
  if (await denops.dispatcher.valid()) {
    await denops.dispatcher.set(0);
  }
};
