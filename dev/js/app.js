// //import { syncTextWithSpeech } from "./component_fun/setPlayer.js";
import { initPlayer } from "./component_fun/initPlayer.js";
import { initEditor } from "./component_fun/initEditor.js";
import { buildPresentation } from "./component_fun/build-presentation.js";
import { buildSpeakableBlocks } from "./component_fun/build-speakable-blocks.js";

const init = appEl => {
  window.speechSynthesis.cancel();
  const editorState = appEl.getAttribute("editor");
  const presentationState = appEl.getAttribute("presentation");

  const contentEl = document.getElementById("content");

  const state = {
    editor: false
  };

  const buildIU = () => {
    if (state.editor) {
      initEditor(appEl);
    } else {
      const blocksArr = buildSpeakableBlocks(contentEl);
      const slidesArr = buildPresentation(blocksArr);
      const play = initPlayer(blocksArr, slidesArr);
    }
  };

  buildIU();

  window.document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "e") {
      state.editor = state.editor ? false : true;
      console.log(state.editor);
      buildIU();
    }
  });
};

// ON LOAD EVENT
window.document.addEventListener("DOMContentLoaded", function(event) {
  const appEl = document.getElementById("app");
  if (appEl) init(appEl);
});
