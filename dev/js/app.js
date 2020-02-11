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
    const speakableElArr = Array.from(
      document.getElementsByClassName("speakable")
    );
    const speakableItems = speakableElArr.map(el => {
      const startMark = parseInt(el.getAttribute("data-start"));
      const endMark = parseInt(el.getAttribute("data-end"));
      return {
        el: el,
        marks: [startMark * 0.001, endMark * 0.001]
      };
    });

    const audioKey = document
      .getElementById("content")
      .getAttribute("data-key");
    // TODO: Multi blocks
    const blockObj = {
      speakableItems,
      audioKey
    };
    //const slidesArr = buildPresentation(blocksArr);
    console.log(audioKey);
    const play = initPlayer(blockObj);
  };

  buildIU();

  // window.document.addEventListener("keydown", e => {
  //   if (e.ctrlKey && e.key === "e") {
  //     state.editor = state.editor ? false : true;
  //     buildIU();
  //   }
  // });
};

// ON LOAD EVENT
window.document.addEventListener("DOMContentLoaded", function(event) {
  const appEl = document.getElementById("app");
  if (appEl) init(appEl);
});
