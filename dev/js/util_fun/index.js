export const createNode = ({ tag, className, path }) => {
  const node = document.createElement(tag);

  if (path) {
    node.setAttribute("src", path);
  }
  if (className) {
    node.classList.add(className);
  }

  return node;
};

export const cutToSentences = string => {
  const sentencesArray = string.match(/[^\.!:\?]+[\.!:\?]|([^\.!\?]+$)+/g);
  return sentencesArray;
};

export const scrollTo = element => {
  const position =
    document.body.classList.contains("presentation-mode") === true
      ? "end"
      : "center";

  element.scrollIntoView({
    behavior: "smooth",
    block: position
  });
};

export const wrapIn = (tag, string) => {
  const el = document.createElement(tag);
  el.classList.add("speakable");
  el.setAttribute("data-state", "pasive");
  el.innerHTML = string;
  return el;
};
