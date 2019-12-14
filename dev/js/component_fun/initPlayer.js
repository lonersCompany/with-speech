import { scrollTo } from "../util_fun";

const setState = (el, state) => {
  el.setAttribute("data-state", state);
};

const synthetizeElement = element => {
  const synthesis = new SpeechSynthesisUtterance();
  synthesis.lang = "en";

  // synthesis.voice = getVoice();

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

const pauseOrResume = el => {
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    setState(el, "active");
  } else {
    window.speechSynthesis.pause();
    setState(el, "pause");
  }
};

const setPresentationSlide = state => {
  const { item, slide, slides } = state;

  if (slide) slide.classList.remove("active");

  slides.forEach(el => {
    if (item.slideKey === el.getAttribute("slide-key")) {
      el.classList.add("active");
      state.slide = el;
    }
  });

  console.log(slide);
};

function play(state, itemIndex) {
  // RESUME / PAUSE
  if (itemIndex === state.index) {
    pauseOrResume(state.item.el);
  } else {
    document.body.classList.add("speaking");
    // handle index bounds... loop or no?
    const count = state.items.length;
    const newIndex = (itemIndex + count) % count;

    // uninit prev Item
    if (state.item) {
      state.item.synthesis.onend = null;
      window.speechSynthesis.cancel();
      setState(state.item.el, "pasive");
    }

    // update state
    state.index = newIndex;
    state.item = state.items[newIndex];

    // RECURSION

    if (state.item.el.tagName == "IMG") {
      setTimeout(() => play(state, newIndex + 1), 2000);
    } else {
      state.item.synthesis.onend = () => {
        play(state, newIndex + 1);
      };
    }

    // Change state
    setState(state.item.el, "active");

    // Speak
    speakSynthesis(state.item.synthesis);

    // Speak
    scrollTo(state.item.el);

    // if presentation mode
    setPresentationSlide(state);
  }
}

const createItem = (el, index) => {
  return {
    el,
    itemIndex: index,
    slideKey: el.getAttribute("slide-key"),
    synthesis: synthetizeElement(el)
  };
};

function loadState(blocksArr, slidesArr) {
  const state = {
    index: -1,
    item: null, // keep both item and index for convenience
    items: blocksArr.map(createItem),
    slide: null,
    slides: slidesArr
  };

  return state;
}

export const initPlayer = (blocksArr, slidesArr) => {
  // GENERATE AUDIO TEXT TO SENTENCES
  const state = loadState(blocksArr, slidesArr);
  const { items } = state;

  items.forEach(item => {
    const { el, itemIndex } = item;
    el.addEventListener("click", e => {
      if (e.target.tagName === "A") {
        return;
      }
      play(state, itemIndex);
    });
  });
};
