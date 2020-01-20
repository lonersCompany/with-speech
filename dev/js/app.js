// //import { syncTextWithSpeech } from "./component_fun/setPlayer.js";
import { initPlayer } from "./component_fun/initPlayer.js";
import { initEditor } from "./component_fun/initEditor.js";
import { buildPresentation } from "./component_fun/build-presentation.js";
import { buildSpeakableBlocks } from "./component_fun/build-speakable-blocks.js";

// const postwomen = params => {
//   console.log("fetch it");
//   fetch(
//     "https://p819b49zc4.execute-api.eu-central-1.amazonaws.com/dev/audio-gen",
//     {
//       method: "POST",
//       mode: "no-cors",
//       body: {
//         arguments: {
//           voice: "Ivy",
//           text: "What the fuck?",
//           key: "00a35c5a-9850-4016-9787-be02feec966c-2"
//         }
//       },

//       auth: {
//         username: "simon@loners.company",
//         password: "DZ9XmMK7D6oo5ZCTB231AUuFlTo5C"
//       },

//       headers: {
//         Authorization:
//         "Content-Length": 111,
//         "Content-Type": "application/json; charset=utf-8",
//         "Access-Control-Allow-Origin": "*"
//       },
//       credentials: "same-origin"
//     }
//   )
//     .then(function(response) {
//       response.status;
//       response.statusText;
//       response.headers;
//       response.url;

//       console.log(response);

//       return response.text();
//     })
//     .catch(function(error) {
//       console.log(error);
//       error.message;
//     });
// };

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
      buildIU();
    }
  });
};

// ON LOAD EVENT
window.document.addEventListener("DOMContentLoaded", function(event) {
  const appEl = document.getElementById("app");
  if (appEl) init(appEl);
});
