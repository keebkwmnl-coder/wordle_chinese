// audio.js — mascot talking animation, Chinese TTS, and the little
// correct/wrong tones.
//
// Load this before wordle_chinese.js — that file calls speak(),
// speakCurrent(), playCorrectSound() and playWrongSound(), all defined
// here. speakCurrent() also reads `questions`/`currentQuestion` from
// wordle_chinese.js, but not until the game has actually started, so
// load order is the only thing that matters.

let mouthInterval = null;
let mouthIsOpen = false;

function startTalking() {
  const closedMouth = document.getElementById("mouthClosed");
  const openMouth = document.getElementById("mouthOpen");
  if (!closedMouth || !openMouth) return;

  stopTalking();

  mouthIsOpen = false;
  mouthInterval = setInterval(() => {
    mouthIsOpen = !mouthIsOpen;
    closedMouth.style.display = mouthIsOpen ? "none" : "";
    openMouth.style.display = mouthIsOpen ? "" : "none";
  }, 150);
}

function stopTalking() {
  if (mouthInterval) {
    clearInterval(mouthInterval);
    mouthInterval = null;
  }
  mouthIsOpen = false;
  const closedMouth = document.getElementById("mouthClosed");
  const openMouth = document.getElementById("mouthOpen");
  if (closedMouth) closedMouth.style.display = "";
  if (openMouth) openMouth.style.display = "none";
}

// Voice list can load asynchronously on some browsers, so cache it and
// refresh whenever the browser tells us it changed.
let cachedVoices = [];
function refreshVoices() {
  if ("speechSynthesis" in window) {
    cachedVoices = speechSynthesis.getVoices();
  }
}
if ("speechSynthesis" in window) {
  refreshVoices();
  speechSynthesis.onvoiceschanged = refreshVoices;
}

function pickChineseVoice() {
  if (!cachedVoices.length) refreshVoices();
  return (
    cachedVoices.find(v => v.lang === "zh-CN") ||
    cachedVoices.find(v => v.lang && v.lang.toLowerCase().startsWith("zh")) ||
    null
  );
}

// Mobile Safari won't play any speechSynthesis audio until it's been
// triggered once from a real tap/click. This "unlocks" it on the first
// touch so the later automatic speak() calls actually work.
let speechUnlocked = false;
function unlockSpeech() {
  if (speechUnlocked || !("speechSynthesis" in window)) return;
  speechUnlocked = true;
  try {
    const primer = new SpeechSynthesisUtterance(" ");
    primer.volume = 0;
    speechSynthesis.speak(primer);
  } catch (e) {}
}
document.addEventListener("click", unlockSpeech, { once: true, capture: true });
document.addEventListener("touchend", unlockSpeech, { once: true, capture: true });

function speak(text) {
  if (!("speechSynthesis" in window)) return;

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.8;
  utterance.pitch = 1;

  const zhVoice = pickChineseVoice();
  if (zhVoice) utterance.voice = zhVoice;
  // If the device has no zh voice we still try with lang="zh-CN" — some
  // engines can still synthesize it, some just stay silent. Nothing we
  // can fix from here.

  utterance.onstart = () => startTalking();
  utterance.onend = () => stopTalking();
  utterance.onerror = () => stopTalking();

  speechSynthesis.speak(utterance);
}

function speakCurrent() {
  unlockSpeech();
  speak(questions[currentQuestion].chinese);
}

// Correct/wrong feedback tones, plain Web Audio oscillators.
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, startTime, duration, type, peakGain) {
  const ctx = getAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}

function playCorrectSound() {
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;
    playTone(523.25, now, 0.14, "sine", 0.25);
    playTone(659.25, now + 0.1, 0.14, "sine", 0.25);
    playTone(783.99, now + 0.2, 0.22, "sine", 0.25);
  } catch (e) {}
}

function playWrongSound() {
  try {
    const ctx = getAudioCtx();
    const now = ctx.currentTime;
    playTone(220, now, 0.18, "sawtooth", 0.2);
    playTone(174.61, now + 0.14, 0.22, "sawtooth", 0.2);
  } catch (e) {}
}
