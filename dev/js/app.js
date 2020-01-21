// //import { syncTextWithSpeech } from "./component_fun/setPlayer.js";
import { initPlayer } from "./component_fun/initPlayer.js";
import { initEditor } from "./component_fun/initEditor.js";
import { buildPresentation } from "./component_fun/build-presentation.js";
import { buildSpeakableBlocks } from "./component_fun/build-speakable-blocks.js";

const init = appEl => {
  window.speechSynthesis.cancel();
  const speakableElementsAreReady = appEl.getAttribute("data-cut");
  const presentationState = appEl.getAttribute("presentation");

  const contentEl = document.getElementById("content");

  const state = {
    editor: false
  };

  //TODO: CLEAN IN UP!

  const buildIU = () => {
    const blocksArr =
      speakableElementsAreReady == "true"
        ? Array.from(document.getElementsByClassName("speakable"))
        : buildSpeakableBlocks(contentEl);
    console.log(blocksArr);
    const slidesArr = buildPresentation(blocksArr);

    const play = initPlayer(blocksArr, slidesArr);
  };

  buildIU();

  window.document.addEventListener("keydown", e => {
    if (e.ctrlKey && e.key === "e") {
      state.editor = state.editor ? false : true;
      buildIU();
    }
  });
};

// ON LOAD EVENT
window.document.addEventListener("DOMContentLoaded", function(event) {
  const appEl = document.getElementById("app");
  if (appEl) init(appEl);
});
