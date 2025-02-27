if exists("g:loaded_ime_set")
  finish
endif
let g:loaded_ime_set = 1

function s:ImActivateFunc(active)
  call denops#request("ime-set", "set", [a:active])
endfunction

function s:SetImActivateFunc()
  if denops#request("ime-set", "valid", [])
    set imactivatefunc=<SID>ImActivateFunc
  endif
endfunction

augroup denops_helloworld
  autocmd!

  autocmd User DenopsPluginPost:ime-set call <SID>SetImActivateFunc()
augroup END
