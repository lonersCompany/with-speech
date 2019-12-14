const switchAppMode = () => {
  const editorState = document.body.getAttribute("editor-state");

  switch (editorState) {
    case "player":
      document.body.setAttribute("editor-state", "editor");
      setEditor();
      break;

    case "editor":
      document.body.setAttribute("editor-state", "player");
      setPlayer();
      break;
  }
};
