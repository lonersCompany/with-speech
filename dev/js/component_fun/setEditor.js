const setEditor = () => {
  document.body.classList.remove("player-active");
  synth.cancel();
  editorEl.setAttribute("contenteditable", true);
  editorEl.innerHTML = editorEl.innerText;
  editorEl.focus();
};
