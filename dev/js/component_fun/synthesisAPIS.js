export function populateVoiceList() {
  const voiceSelectEl = document.getElementById("voice-select");
  let voices = window.speechSynthesis.getVoices();

  for (let i = 0; i < voices.length; i++) {
    console.log(voices[i].lang, voices[i].name);
    console.log(voices[i]);
    var option = document.createElement("option");
    option.textContent = voices[i].name + " (" + voices[i].lang + ")";

    if (voices[i].default) {
      option.textContent += " -- DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    voiceSelectEl.appendChild(option);
  }
}
