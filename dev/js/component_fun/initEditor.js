import { EditorState, Plugin } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema, DOMParser } from "prosemirror-model";
import { schema } from "prosemirror-schema-basic";
import { baseKeymap } from "prosemirror-commands";
import { keymap } from "prosemirror-keymap";
import { getSentenceFocusPlugin } from "../editor/get-sentence-plugin.js";

let myPlugin = new Plugin({
  props: {
    handleKeyDown(view, event) {
      console.log("A key was pressed!");
      return false; // We did not handle this
    }
  }
});

const trivialSchema = new Schema({
  nodes: {
    doc: { content: "paragraph+" },
    paragraph: {
      content: "text*",
      toDOM() {
        return [
          "p",
          { "data-label": "property-label", class: "orgProperty" },
          0
        ];
      },
      parseDOM: [{ tag: "p" }]
    },
    text: {}
  }
});

export const initEditor = appEl => {
  let state = EditorState.create({
    schema: trivialSchema,
    plugins: [getSentenceFocusPlugin, keymap(baseKeymap)]
  });

  if (!window.view) {
    window.view = new EditorView(appEl, {
      state
    });
  }
};
