const user32 = Deno.dlopen("user32.dll", {
  GetForegroundWindow: {
    parameters: [],
    result: "pointer",
  },
  SendMessageW: {
    parameters: ["pointer", "u32", "usize", "usize"],
    result: "pointer",
  },
});

const imm32 = Deno.dlopen("imm32.dll", {
  ImmGetDefaultIMEWnd: {
    parameters: ["pointer"],
    result: "pointer",
  },
});

/**
 * IME に関連する操作を行うためのメッセージコード。
 */
const WM_IME_CONTROL = 0x0283;

/**
 * IME の開閉状態を設定する操作コマンド。
 */
const IMC_SETOPENSTATUS = 0x0006;

/**
 * IME の状態を設定する。
 */
export const setIme = (active: boolean): void => {
  // アクティブウィンドウの取得。
  const hwnd = user32.symbols.GetForegroundWindow();

  // IME ウィンドウの取得。
  const imeWnd = imm32.symbols.ImmGetDefaultIMEWnd(hwnd);

  // IME状態の設定
  user32.symbols.SendMessageW(
    imeWnd,
    WM_IME_CONTROL,
    BigInt(IMC_SETOPENSTATUS),
    BigInt(active ? 1 : 0),
  );
};
