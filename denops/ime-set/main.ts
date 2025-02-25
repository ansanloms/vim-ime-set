import type { Entrypoint } from "./deps/@denops/std/mod.ts";
import { setIme } from "./mod.ts";

export const main: Entrypoint = (denops) => {
  denops.dispatcher = {
    /**
     * IME 有効設定。
     */
    set: async (active) => {
      if (typeof active !== "number") {
        return;
      }

      if (active === 1) {
        await setIme(true);
      } else if (active === 0) {
        await setIme(false);
      }
    },
  };
};
