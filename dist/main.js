/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./dev/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dev/index.js":
/*!**********************!*\
  !*** ./dev/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/app.js */ \"./dev/js/app.js\");\n\n\n\n//# sourceURL=webpack:///./dev/index.js?");

/***/ }),

/***/ "./dev/js/app.js":
/*!***********************!*\
  !*** ./dev/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _component_fun_initPlayer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component_fun/initPlayer.js */ \"./dev/js/component_fun/initPlayer.js\");\n/* harmony import */ var _component_fun_build_presentation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./component_fun/build-presentation.js */ \"./dev/js/component_fun/build-presentation.js\");\n/* harmony import */ var _component_fun_build_speakable_blocks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./component_fun/build-speakable-blocks.js */ \"./dev/js/component_fun/build-speakable-blocks.js\");\n// //import { syncTextWithSpeech } from \"./component_fun/setPlayer.js\";\n\n\n\n\nwindow.speechSynthesis.cancel();\n\nconst init = appEl => {\n  const editorState = appEl.getAttribute(\"editor\");\n  const presentationState = appEl.getAttribute(\"presentation\");\n\n  const contentEl = document.getElementById(\"content\");\n\n  if (editorState == \"true\") {\n    buildEditor();\n  } else {\n    const blocksArr = Object(_component_fun_build_speakable_blocks_js__WEBPACK_IMPORTED_MODULE_2__[\"buildSpeakableBlocks\"])(contentEl);\n    const slidesArr = Object(_component_fun_build_presentation_js__WEBPACK_IMPORTED_MODULE_1__[\"buildPresentation\"])(blocksArr);\n    Object(_component_fun_initPlayer_js__WEBPACK_IMPORTED_MODULE_0__[\"initPlayer\"])(blocksArr, slidesArr);\n  }\n};\n\n// ON LOAD EVENT\nwindow.document.addEventListener(\"DOMContentLoaded\", function(event) {\n  const appEl = document.getElementById(\"app\");\n  if (appEl) init(appEl);\n});\n\n\n//# sourceURL=webpack:///./dev/js/app.js?");

/***/ }),

/***/ "./dev/js/component_fun/build-presentation.js":
/*!****************************************************!*\
  !*** ./dev/js/component_fun/build-presentation.js ***!
  \****************************************************/
/*! exports provided: buildPresentation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildPresentation\", function() { return buildPresentation; });\n/* harmony import */ var _util_fun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util_fun */ \"./dev/js/util_fun/index.js\");\n\n\nconst createNewSlide = (imgEl, slideKey) => {\n  const wrapperEl = document.getElementById(\"presentation-wrapper\");\n  const newSlide = document.createElement(\"div\");\n\n  newSlide.setAttribute(\"slide-key\", slideKey);\n  newSlide.classList.add(\"absolute\");\n  newSlide.classList.add(\"w-full\");\n  newSlide.classList.add(\"h-full\");\n  newSlide.classList.add(\"slide\");\n\n  const clonedImage = imgEl.cloneNode(true);\n  clonedImage.classList.add(\"w-full\");\n  clonedImage.classList.add(\"h-full\");\n  clonedImage.classList.add(\"object-contain\");\n  clonedImage.classList.remove(\"speakable\");\n\n  newSlide.appendChild(clonedImage);\n  wrapperEl.appendChild(newSlide);\n\n  return newSlide;\n};\n\nconst buildPresentation = blocksArr => {\n  let slideKey = null;\n\n  let slidesArr = [];\n\n  // Loop speakable blocks\n  // If block is image set new key and create slide\n  // Else add key to block\n  blocksArr.forEach(el => {\n    if (el.tagName === \"IMG\") {\n      slideKey = Math.floor(100000 + Math.random() * 900000);\n      const slideEl = createNewSlide(el, slideKey);\n      slidesArr.push(slideEl);\n    }\n\n    el.setAttribute(\"slide-key\", slideKey);\n  });\n\n  if (slidesArr.length) {\n  }\n\n  window.document.addEventListener(\"keydown\", e => {\n    if (slidesArr.length) {\n    }\n    if (e.ctrlKey && e.key === \"p\") {\n      if (slidesArr.length) {\n        document.body.classList.toggle(\"presentation-mode\");\n\n        const isActiveElement = document.querySelector(\n          '.speakable[data-state=\"active\"]'\n        );\n\n        // const isActiveElement = blocksArr.filter(el =>{\n        //   const state = el.getAttribute(\"data-state\")\n        //   if(state == \"active\")\n        // })\n\n        blocksArr;\n        if (isActiveElement) Object(_util_fun__WEBPACK_IMPORTED_MODULE_0__[\"scrollTo\"])(isActiveElement);\n      } else {\n        alert(\"Ups, there are no images in article\");\n      }\n    }\n  });\n\n  return slidesArr;\n};\n\n\n//# sourceURL=webpack:///./dev/js/component_fun/build-presentation.js?");

/***/ }),

/***/ "./dev/js/component_fun/build-speakable-blocks.js":
/*!********************************************************!*\
  !*** ./dev/js/component_fun/build-speakable-blocks.js ***!
  \********************************************************/
/*! exports provided: buildSpeakableBlocks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"buildSpeakableBlocks\", function() { return buildSpeakableBlocks; });\n/* harmony import */ var _util_fun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util_fun */ \"./dev/js/util_fun/index.js\");\n\n\nconst createSpeakableBlock = node => {\n  if (node.classList.contains(\"highlighter-rouge\")) {\n    node.classList.add(\"speakable\");\n    node.setAttribute(\"data-state\", \"pasive\");\n    return node;\n  }\n  if (node.querySelector(\"IMG\")) {\n    const img = node.querySelector(\"IMG\");\n    img.classList.add(\"speakable\");\n    img.setAttribute(\"data-state\", \"pasive\");\n    return img;\n  }\n\n  const rawText = node.innerHTML;\n\n  const sentencesArr = Object(_util_fun__WEBPACK_IMPORTED_MODULE_0__[\"cutToSentences\"])(rawText);\n  const wrapedSentencesArr = sentencesArr.map(string => Object(_util_fun__WEBPACK_IMPORTED_MODULE_0__[\"wrapIn\"])(\"span\", string));\n\n  node.innerText = \"\";\n  wrapedSentencesArr.forEach(wrapedSentence =>\n    node.appendChild(wrapedSentence)\n  );\n\n  return wrapedSentencesArr;\n};\n\nconst buildSpeakableBlocks = appEl => {\n  const blocksArr = Array.from(appEl.children);\n  const blocksArray = blocksArr.map(createSpeakableBlock);\n  const elements = blocksArray.flat(1);\n  return elements;\n};\n\n\n//# sourceURL=webpack:///./dev/js/component_fun/build-speakable-blocks.js?");

/***/ }),

/***/ "./dev/js/component_fun/initPlayer.js":
/*!********************************************!*\
  !*** ./dev/js/component_fun/initPlayer.js ***!
  \********************************************/
/*! exports provided: initPlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initPlayer\", function() { return initPlayer; });\n/* harmony import */ var _util_fun__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util_fun */ \"./dev/js/util_fun/index.js\");\n\n\nconst setState = (el, state) => {\n  el.setAttribute(\"data-state\", state);\n};\n\nconst synthetizeElement = element => {\n  const synthesis = new SpeechSynthesisUtterance();\n  synthesis.lang = \"en\";\n\n  // synthesis.voice = getVoice();\n\n  if (element.innerText) {\n    synthesis.text = element.innerText;\n  } else if (element.tagName == \"IMG\") {\n    synthesis.text = \" \";\n  } else {\n    synthesis.text = \" \";\n  }\n\n  return synthesis;\n};\n\nconst speakSynthesis = synthesis => {\n  window.speechSynthesis.speak(synthesis);\n};\n\nconst pauseOrResume = el => {\n  if (window.speechSynthesis.paused) {\n    window.speechSynthesis.resume();\n    setState(el, \"active\");\n  } else {\n    window.speechSynthesis.pause();\n    setState(el, \"pause\");\n  }\n};\n\nconst setPresentationSlide = state => {\n  const { item, slide, slides } = state;\n\n  if (slide) slide.classList.remove(\"active\");\n\n  slides.forEach(el => {\n    if (item.slideKey === el.getAttribute(\"slide-key\")) {\n      el.classList.add(\"active\");\n      state.slide = el;\n    }\n  });\n\n  console.log(slide);\n};\n\nfunction play(state, itemIndex) {\n  // RESUME / PAUSE\n  if (itemIndex === state.index) {\n    pauseOrResume(state.item.el);\n  } else {\n    document.body.classList.add(\"speaking\");\n    // handle index bounds... loop or no?\n    const count = state.items.length;\n    const newIndex = (itemIndex + count) % count;\n\n    // uninit prev Item\n    if (state.item) {\n      state.item.synthesis.onend = null;\n      window.speechSynthesis.cancel();\n      setState(state.item.el, \"pasive\");\n    }\n\n    // update state\n    state.index = newIndex;\n    state.item = state.items[newIndex];\n\n    // RECURSION\n\n    if (state.item.el.tagName == \"IMG\") {\n      setTimeout(() => play(state, newIndex + 1), 2000);\n    } else {\n      state.item.synthesis.onend = () => {\n        play(state, newIndex + 1);\n      };\n    }\n\n    // Change state\n    setState(state.item.el, \"active\");\n\n    // Speak\n    speakSynthesis(state.item.synthesis);\n\n    // Speak\n    Object(_util_fun__WEBPACK_IMPORTED_MODULE_0__[\"scrollTo\"])(state.item.el);\n\n    // if presentation mode\n    setPresentationSlide(state);\n  }\n}\n\nconst createItem = (el, index) => {\n  return {\n    el,\n    itemIndex: index,\n    slideKey: el.getAttribute(\"slide-key\"),\n    synthesis: synthetizeElement(el)\n  };\n};\n\nfunction loadState(blocksArr, slidesArr) {\n  const state = {\n    index: -1,\n    item: null, // keep both item and index for convenience\n    items: blocksArr.map(createItem),\n    slide: null,\n    slides: slidesArr\n  };\n\n  return state;\n}\n\nconst initPlayer = (blocksArr, slidesArr) => {\n  // GENERATE AUDIO TEXT TO SENTENCES\n  const state = loadState(blocksArr, slidesArr);\n  const { items } = state;\n\n  items.forEach(item => {\n    const { el, itemIndex } = item;\n    el.addEventListener(\"click\", e => {\n      if (e.target.tagName === \"A\") {\n        return;\n      }\n      play(state, itemIndex);\n    });\n  });\n};\n\n\n//# sourceURL=webpack:///./dev/js/component_fun/initPlayer.js?");

/***/ }),

/***/ "./dev/js/util_fun/index.js":
/*!**********************************!*\
  !*** ./dev/js/util_fun/index.js ***!
  \**********************************/
/*! exports provided: createNode, cutToSentences, scrollTo, wrapIn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createNode\", function() { return createNode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"cutToSentences\", function() { return cutToSentences; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scrollTo\", function() { return scrollTo; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"wrapIn\", function() { return wrapIn; });\nconst createNode = ({ tag, className, path }) => {\n  const node = document.createElement(tag);\n\n  if (path) {\n    node.setAttribute(\"src\", path);\n  }\n  if (className) {\n    node.classList.add(className);\n  }\n\n  return node;\n};\n\nconst cutToSentences = string => {\n  const sentencesArray = string.match(/[^\\.!\\?]+[\\.!\\?]|([^\\.!\\?]+$)+/g);\n  return sentencesArray;\n};\n\nconst scrollTo = element => {\n  const position =\n    document.body.classList.contains(\"presentation-mode\") === true\n      ? \"end\"\n      : \"center\";\n\n  element.scrollIntoView({\n    behavior: \"smooth\",\n    block: position\n  });\n};\n\nconst wrapIn = (tag, string) => {\n  const el = document.createElement(tag);\n  el.classList.add(\"speakable\");\n  el.setAttribute(\"data-state\", \"pasive\");\n  el.innerHTML = string;\n  return el;\n};\n\n\n//# sourceURL=webpack:///./dev/js/util_fun/index.js?");

/***/ })

/******/ });