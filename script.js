// Your code goes here

// Speech synthesis utterance object
const msg = new SpeechSynthesisUtterance();
msg.text = document.querySelector('[name="text"]').value;

// Elements
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Load voices and populate dropdown
function populateVoices() {
  voices = speechSynthesis.getVoices();

  voicesDropdown.innerHTML = voices
    .map(
      voice =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join('');
}

// Set selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggleSpeech(); // restart speech with new voice
}

// Start / Restart speech
function toggleSpeech(startOver = true) {
  speechSynthesis.cancel(); // stop existing speech
  if (startOver) {
    speechSynthesis.speak(msg); // start speaking
  }
}

// Handle rate, pitch & text changes
function setOption() {
  msg[this.name] = this.value;
  toggleSpeech(); // restart to apply changes live
}

// ---- Event Listeners ----

// Populate voices dropdown
speechSynthesis.addEventListener('voiceschanged', populateVoices);

// Change voice
voicesDropdown.addEventListener('change', setVoice);

// Update rate, pitch, text
options.forEach(option => option.addEventListener('change', setOption));

// Speak
speakButton.addEventListener('click', () => {
  if (msg.text.trim() === '') return; // prevent empty speech
  toggleSpeech(true);
});

// Stop
stopButton.addEventListener('click', () => toggleSpeech(false));
