import { setImeStatus } from "./mod.ts";
setImeStatus(Deno.args[0] === "1");
