if exists("g:loaded_ime_set")
  finish
endif
let g:loaded_ime_set = 1

if has("nvim")
  finish
endif

function s:ImActivateFunc(active)
  call denops#request("ime-set", "set", [a:active])
endfunction

function s:Init()
  if denops#request("ime-set", "valid", [])
    set imactivatefunc=<SID>ImActivateFunc

    "  起動時に IME を off にする。
    call <SID>ImActivateFunc(0)
  endif
endfunction

augroup denops-ime-set
  autocmd!

  autocmd User DenopsPluginPost:ime-set call <SID>Init()
augroup END
