vim.api.nvim_create_augroup("denops-ime-set", { clear = true })

vim.api.nvim_create_autocmd("User", {
  group = "denops-ime-set",
  pattern = "DenopsPluginPost:ime-set",
  callback = function()
    vim.fn["denops#request"]("ime-set", "set", { 0 })
  end
})

vim.api.nvim_create_autocmd("InsertEnter", {
  group = "denops-ime-set",
  callback = function()
    vim.fn["denops#request"]("ime-set", "set", { 1 })
  end,
})

vim.api.nvim_create_autocmd("InsertLeave", {
  group = "denops-ime-set",
  callback = function()
    vim.fn["denops#request"]("ime-set", "set", { 0 })
  end,
})
