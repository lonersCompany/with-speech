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
  const { item, slide, slides } = state;

  if (slide) slide.classList.remove("active");

  slides.forEach(el => {
    if (item.slideKey === el.getAttribute("slide-key")) {
      el.classList.add("active");
      state.slide = el;
    }
  });
};

function play(state, index) {
  // IF PLAYED INDEX IS SAME AS ACTIVE INDEX
  if (state.index === index) {
    // RESUME / PAUSE
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      state.items[index].setAttribute("data-state", "active");
    } else {
      window.speechSynthesis.pause();
      state.items[index].setAttribute("data-state", "pause");
      clearTimeout(window.imager);
    }
  } else {
    // ELSE PLAYED INDEX IS NEW

    console.log(state.items);
    console.log(index);

    document.body.classList.add("speaking");
    state.items[index].setAttribute("data-state", "active");

    // handle index bounds... loop or no?
    const count = state.items.length;

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

    state.index = index;
    state.el = state.items[index];
    state.synthesis = synthetizeElement(state.items[index]);

    // Speak Synthesis
    speakSynthesis(state.synthesis);

    // Scroll
    scrollTo(state.el);

    // if presentation mode
    //setPresentationSlide(state);

    // RECURSION
    const newIndex = (index + state.items.length) % count;
    console.log("play func");
    if (state.items[index].tagName == "IMG") {
      // create callback for image
      console.log("ADD");
      window.imager = setTimeout(() => play(state, newIndex + 1), 2000);
    } else {
      // create callback for image
      state.synthesis.onend = () => {
        play(state, newIndex + 1);
      };
    }
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
  const { items } = state;

  let article = document.getElementById("content");
  
  article.addEventListener("click", e => {
    if (e.target.tagName === "A") {
      return;
    }
    console.log(e.target);
    play(state, parseInt(e.target.getAttribute("data-index")));
  });
};
