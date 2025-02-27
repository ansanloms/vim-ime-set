const user32 = Deno.dlopen("user32.dll", {
  /**
   * アクティブウィンドウを取得する。
   * @see https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-getforegroundwindow
   */
  GetForegroundWindow: {
    parameters: [],
    result: "pointer",
  },

  /**
   * メッセージを送信する。
   * @see https://learn.microsoft.com/ja-jp/windows/win32/api/winuser/nf-winuser-sendmessagew
   */
  SendMessageW: {
    parameters: ["pointer", "u32", "usize", "usize"],
    result: "pointer",
  },
});

const imm32 = Deno.dlopen("imm32.dll", {
  /**
   * 指定ウィンドウに関連する IME ウィンドウを取得する。
   * @see https://learn.microsoft.com/ja-jp/windows/win32/api/imm/nf-imm-immgetdefaultimewnd
   */
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
export const setImeStatus = (active: boolean): void => {
  // アクティブウィンドウの取得。
  const hwnd = user32.symbols.GetForegroundWindow();

  // IME ウィンドウの取得。
  const imeWnd = imm32.symbols.ImmGetDefaultIMEWnd(hwnd);

  // IME 状態の設定。
  user32.symbols.SendMessageW(
    imeWnd,
    WM_IME_CONTROL,
    BigInt(IMC_SETOPENSTATUS),
    BigInt(active ? 1 : 0),
  );
};
