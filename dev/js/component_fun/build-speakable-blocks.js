import { wrapIn, cutToSentences } from "../util_fun";

const createSpeakableBlock = node => {
  if (node.classList.contains("highlighter-rouge")) {
    node.classList.add("speakable");
    node.setAttribute("data-state", "pasive");
    return node;
  }
  if (node.querySelector("IMG")) {
    const img = node.querySelector("IMG");
    img.classList.add("speakable");
    img.setAttribute("data-state", "pasive");
    return img;
  }

  const rawText = node.innerHTML;

  const sentencesArr = cutToSentences(rawText);

  const wrapedSentencesArr = sentencesArr.map(string => wrapIn("span", string));

  node.innerText = "";
  wrapedSentencesArr.forEach(wrapedSentence =>
    node.appendChild(wrapedSentence)
  );

  return wrapedSentencesArr;
};

export const buildSpeakableBlocks = appEl => {
  const blocksArr = Array.from(appEl.children);
  const blocksArray = blocksArr.map(createSpeakableBlock);
  const elements = blocksArray.flat(1);
  elements.forEach((el, index) => el.setAttribute("data-index", index));

  const documentKey = appEl.getAttribute("data-key")

  console.log(documentKey);
  
  const forSpeak = elements.map((element, index)  => 
    {

      const text = element.tagName == "IMG" ? element.getAttribute("alt") : element.innerText;
      const key = documentKey + "-" + index;
      const voice = "Ivy";

      return {
        voice,
        text,
        key
      }
    });

  console.log(forSpeak);
  return elements;
};
