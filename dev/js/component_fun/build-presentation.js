import { scrollTo } from "../util_fun";

const createNewSlide = (imgEl, slideKey) => {
  const wrapperEl = document.getElementById("presentation-wrapper");
  const newSlide = document.createElement("div");

  newSlide.setAttribute("slide-key", slideKey);
  newSlide.classList.add("absolute");
  newSlide.classList.add("w-full");
  newSlide.classList.add("h-full");
  newSlide.classList.add("slide");

  const clonedImage = imgEl.cloneNode(true);
  clonedImage.classList.add("w-full");
  clonedImage.classList.add("h-full");
  clonedImage.classList.add("object-contain");
  clonedImage.classList.remove("speakable");

  newSlide.appendChild(clonedImage);
  wrapperEl.appendChild(newSlide);

  return newSlide;
};

export const buildPresentation = blocksArr => {
  let slideKey = null;

  let slidesArr = [];

  // Loop speakable blocks
  // If block is image set new key and create slide
  // Else add key to block
  blocksArr.forEach(el => {
    if (el.tagName === "IMG") {
      slideKey = Math.floor(100000 + Math.random() * 900000);
      const slideEl = createNewSlide(el, slideKey);
      slidesArr.push(slideEl);
    }

    el.setAttribute("slide-key", slideKey);
  });

  if (slidesArr.length) {
  }

  window.document.addEventListener("keydown", e => {
    if (slidesArr.length) {
    }
    if (e.ctrlKey && e.key === "p") {
      if (slidesArr.length) {
        document.body.classList.toggle("presentation-mode");

        const isActiveElement = document.querySelector(
          '.speakable[data-state="active"]'
        );

        // const isActiveElement = blocksArr.filter(el =>{
        //   const state = el.getAttribute("data-state")
        //   if(state == "active")
        // })

        blocksArr;
        if (isActiveElement) scrollTo(isActiveElement);
      } else {
        alert("Ups, there are no images in article");
      }
    }
  });

  return slidesArr;
};
