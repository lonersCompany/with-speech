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

const setPresentationSlide = state => {
  const { items, index, slide, slides } = state;

  if (slide) slide.el.classList.remove("active");

  const itemSlideKey = items[index].getAttribute("slide-key");
  slides.forEach(obj => {
    if (obj.key == itemSlideKey) {
      console.log(obj.key);
      obj.el.classList.add("active");
      state.slide = obj;
    }
  });
};

function play(state, index) {
  console.log("NOW");
  // IF PLAYED INDEX IS SAME AS ACTIVE INDEX
  if (state.index === index) {
    const currenItem = state.items[index];
    const link = currenItem.getAttribute("data-url");

    document.body.classList.toggle("speaking");
    // RESUME / PAUSE
    if (state.audioObject) {
      if (state.audioObject.paused) {
        state.audioObject.play();
        currenItem.setAttribute("data-state", "active");
      } else {
        state.audioObject.pause();
        currenItem.setAttribute("data-state", "pause");
      }
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        currenItem.setAttribute("data-state", "active");
      } else {
        window.speechSynthesis.pause();
        currenItem.setAttribute("data-state", "pause");
        clearTimeout(window.imager);
      }
    }
  } else {
    // ELSE PLAYED INDEX IS NEW
    const currenItem = state.items[index];
    const link = currenItem.getAttribute("data-url");

    document.body.classList.add("speaking");
    scrollTo(currenItem);
    currenItem.setAttribute("data-state", "active");

    // handle index bounds... loop or no?
    const count = state.items.length;
    const newIndex = (index + state.items.length) % count;

    // uninit prev Item
    if (state.el) {
      state.el.setAttribute("data-state", "pasive");
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    if (state.synthesis) {
      state.synthesis.onend = null;
    }

    if (state.audioObject) {
      state.audioObject.pause();
      state.audioObject.removeEventListener("ended", () => {
        play(state, newIndex + 1);
      });
    }

    state.index = index;
    state.el = currenItem;

    if (link) {
      const serverbuckerlink =
        "https://text-with-speech.s3.eu-central-1.amazonaws.com/";
      const linkToAudioFile = serverbuckerlink + link;
      state.audioObject = new Audio(linkToAudioFile);

      // Play audio
      state.audioObject.play();

      // Set recursion
      state.audioObject.addEventListener("ended", () => {
        play(state, newIndex + 1);
      });
    } else {
      state.synthesis = synthetizeElement(currenItem);
      // Speak Synthesis
      speakSynthesis(state.synthesis);

      // Set recursion
      if (currenItem.tagName == "IMG") {
        // create callback for image
        window.imager = setTimeout(() => play(state, newIndex + 1), 2000);
      } else {
        // create callback for image
        state.synthesis.onend = () => {
          play(state, newIndex + 1);
        };
      }
    }

    // if presentation mode
    setPresentationSlide(state);

    // RECURSION
  }
}

function loadState(blocksArr, slidesArr) {
  const state = {
    index: -1,
    el: null,
    synthesis: null,
    items: blocksArr,
    slide: null,
    slides: slidesArr
  };

  return state;
}

export const initPlayer = (blocksArr, slidesArr) => {
  // GENERATE AUDIO TEXT TO SENTENCES
  const state = loadState(blocksArr, slidesArr);

  state.items.forEach((el, index) => {
    el.addEventListener("click", () => {
      if (el.tagName === "A") return;

      play(state, index);
    });
  });
};
