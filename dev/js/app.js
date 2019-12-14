// //import { syncTextWithSpeech } from "./component_fun/setPlayer.js";
import { initPlayer } from "./component_fun/initPlayer.js";
import { buildPresentation } from "./component_fun/build-presentation.js";
import { buildSpeakableBlocks } from "./component_fun/build-speakable-blocks.js";

window.speechSynthesis.cancel();

const init = appEl => {
  const editorState = appEl.getAttribute("editor");
  const presentationState = appEl.getAttribute("presentation");

  const contentEl = document.getElementById("content");

  if (editorState == "true") {
    buildEditor();
  } else {
    const blocksArr = buildSpeakableBlocks(contentEl);
    const slidesArr = buildPresentation(blocksArr);
    initPlayer(blocksArr, slidesArr);
  }
};

// ON LOAD EVENT
window.document.addEventListener("DOMContentLoaded", function(event) {
  const appEl = document.getElementById("app");
  if (appEl) init(appEl);
});
