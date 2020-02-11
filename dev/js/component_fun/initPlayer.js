import { scrollTo } from "../util_fun";

const setState = (el, state) => {
  el.setAttribute("data-state", state);
};

const synthetizeElement = element => {
  const synthesis = new SpeechSynthesisUtterance();
  synthesis.lang = "en";

  synthesis.rate = 0.9;

  if (element.innerText) {
    synthesis.text = element.innerText;
  } else if (element.tagName == "IMG") {
    synthesis.text = " ";
  } else {
    synthesis.text = " ";
  }

  return synthesis;
};

const speakSynthesis = synthesis => {
  window.speechSynthesis.speak(synthesis);
};

// const setPresentationSlide = state => {
//   const { items, index, slide, slides } = state;

//   if (slide) slide.el.classList.remove("active");

//   const itemSlideKey = items[index].getAttribute("slide-key");
//   slides.forEach(obj => {
//     if (obj.key == itemSlideKey) {
//       console.log(obj.key);
//       obj.el.classList.add("active");
//       state.slide = obj;
//     }
//   });
// };

function play(state, item) {
  console.log("NOW");
  // IF PLAYED INDEX IS SAME AS ACTIVE INDEX
  if (state.item === item) {
    document.body.classList.toggle("speaking");
    console.log("AAAA");
    // RESUME / PAUSE

    if (state.audioObject.paused) {
      state.audioObject.play();
    } else {
      state.audioObject.pause();
    }
  } else {
    // ELSE PLAYED INDEX IS NEW

    if (state.item) {
      state.item.el.classList.remove("active");
    }
    const currentItem = item;

    state.item = currentItem;

    state.item.el.classList.add("active");

    document.body.classList.add("speaking");
    console.log(currentItem.el);
    scrollTo(currentItem.el);

    // handle index bounds... loop or no?

    if (!state.audioObject) {
      const serverbuckerlink =
        "https://text-with-speech.s3.eu-central-1.amazonaws.com/";
      const linkToAudioFile = serverbuckerlink + state.audioKey;
      state.audioObject = new Audio(linkToAudioFile);
    }
    console.log(item.marks[0]);
    const itemStartingMark = item.marks[0];
    // Play audio
    state.audioObject.currentTime = itemStartingMark;
    console.log(state.audioObject.currentTime);
    state.audioObject.play();

    // Set recursion
    state.audioObject.addEventListener("ended", () => {
      document.body.classList.remove("speaking");
      state.item.el.classList.remove("active");
    });

    state.audioObject.addEventListener("timeupdate", function(e) {
      const currentTime = e.target.currentTime;
      state.items.forEach(item => {
        if (currentTime >= item.marks[0] && currentTime <= item.marks[1])
          if (item != state.item) {
            state.item.el.classList.remove("active");
            item.el.classList.add("active");
            state.item = item;
            scrollTo(item.el);
          }
      });
    });
  }
}

function loadState(speakableItems, audioKey) {
  const state = {
    index: -1,
    item: null,
    items: speakableItems,
    audioObject: null,
    audioKey
  };

  return state;
}

export const initPlayer = ({ speakableItems, audioKey }) => {
  // GENERATE AUDIO TEXT TO SENTENCES
  console.log(speakableItems);

  const state = loadState(speakableItems, audioKey);
  state.items.forEach((item, index) => {
    item.el.addEventListener("click", () => {
      if (item.el.tagName === "A") return;
      play(state, item);
    });
  });
};
