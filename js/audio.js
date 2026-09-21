/* =========================================================
   js/audio.js — ALL SOUND-RELATED CODE
   -----------------------------------------------------------
   Everything about sound lives here: the mascot's talking
   mouth animation, Chinese text-to-speech (speak/speakCurrent),
   and the little correct/wrong tone effects.

   Load order matters: this file must be loaded BEFORE
   wordle_chinese.js (see index.html), because that file calls
   speak(), speakCurrent(), playCorrectSound() and
   playWrongSound() which are all defined here.

   This file itself relies on two globals from wordle_chinese.js
   — `questions` and `currentQuestion` — but only inside
   speakCurrent(), which isn't called until after the game has
   started, so the load order above is all that's required.
========================================================= */

/* =========================
   MASCOT MOUTH / TALKING ANIMATION
   (ໜ້າປາກຂອງ mascot ຈະຂະຫຍັບ ອ້າ-ອັດ ຂະນະທີ່ TTS ກຳລັງເວົ້າ)
========================= */
let mouthInterval = null;
let mouthIsOpen = false;

function startTalking() {
  const closedMouth = document.getElementById("mouthClosed");
  const openMouth = document.getElementById("mouthOpen");
  if (!closedMouth || !openMouth) return;

  stopTalking(); // clear any previous interval first

  mouthIsOpen = false;
  mouthInterval = setInterval(() => {
    mouthIsOpen = !mouthIsOpen;
    closedMouth.style.display = mouthIsOpen ? "none" : "";
    openMouth.style.display = mouthIsOpen ? "" : "none";
  }, 150); // ຄວາມໄວການອ້າ-ອັດປາກ
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

/* =========================
   TEXT-TO-SPEECH (Chinese pronunciation)
========================= */

/* Voice list loads asynchronously on some browsers/devices, so cache it
   and refresh whenever the browser tells us it changed. */
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

/* Mobile browsers (especially iOS Safari) refuse to play any
   speechSynthesis audio until it has been triggered once from inside a
   real user tap/click. This "unlocks" it the first time the player
   touches the page, so the later automatic speak() calls actually work. */
let speechUnlocked = false;
function unlockSpeech() {
  if (speechUnlocked || !("speechSynthesis" in window)) return;
  speechUnlocked = true;
  try {
    const primer = new SpeechSynthesisUtterance(" ");
    primer.volume = 0; // silent, just opens the audio gate
    speechSynthesis.speak(primer);
  } catch (e) {}
}
document.addEventListener("click", unlockSpeech, { once: true, capture: true });
document.addEventListener("touchend", unlockSpeech, { once: true, capture: true });

function speak(text) {
  if (!("speechSynthesis" in window)) return; // browser has no TTS support at all

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.8;
  utterance.pitch = 1;

  const zhVoice = pickChineseVoice();
  if (zhVoice) {
    utterance.voice = zhVoice;
  }
  // If no Chinese voice exists on the device, we still try with lang="zh-CN":
  // some engines can synthesize it without a dedicated voice object, others will
  // just stay silent — that's a device limitation we can't fully work around in JS.

  utterance.onstart = () => startTalking();
  utterance.onend = () => stopTalking();
  utterance.onerror = () => stopTalking();

  speechSynthesis.speak(utterance);
}

function speakCurrent() {
  unlockSpeech();
  speak(questions[currentQuestion].chinese);
}

/* =========================
   CORRECT / WRONG SOUND EFFECTS (Web Audio tones)
========================= */
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