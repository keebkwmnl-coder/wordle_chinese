/* =========================
   QUESTIONS DATA
   -----------------------------------------------------------
   The vocabulary/question list now lives in its own file:
   data/questions.js — it defines the global `allQuestions`
   array and MUST be loaded (via <script>) before this file.
   See index.html for the load order.
========================= */

const TOTAL_LEVELS = 5;
let questions = []; // built fresh each playthrough: randomized within each level, ordered level 1 -> 5

/* =========================
   WORD COLOR PALETTE
   (ແຕ່ລະຄຳ/word ຈະຖືກໃສ່ສີຂອງມັນເອງ ໃຫ້ຄືກັນທັງໃນປະໂຫຍກ, ປຸ່ມຄຳສັບ ແລະ ຊ່ອງຄຳຕອບ
    ເພື່ອໃຫ້ເບິ່ງງ່າຍ ວ່າຄຳໃດ ຄືຄຳໃດ)
========================= */
const WORD_COLORS = [
  "#d32f2f", // red
  "#1565c0", // blue
  "#2e7d32", // green
  "#d84315", // orange
  "#7b1fa2", // purple
  "#00695c", // teal
  "#c2185b"  // pink
];

// Colors assigned for the CURRENT question, randomized fresh each time loadQuestion() runs
let currentWordColors = [];

function assignRandomColors(q) {
  // Shuffle a copy of the palette so the word -> color mapping changes every question
  const shuffled = shuffleArray(WORD_COLORS);
  currentWordColors = q.words.map((_, i) => shuffled[i % shuffled.length]);
}

function colorForWord(word, q) {
  const idx = q.words.indexOf(word);
  const safeIdx = idx === -1 ? 0 : idx;
  return currentWordColors[safeIdx] || WORD_COLORS[safeIdx % WORD_COLORS.length];
}

// Build a light tinted background from a word's color, so buttons/boxes match the text color
function tintForColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const mix = (c) => Math.round(c + (255 - c) * 0.88); // 88% toward white
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestionOrder() {
  const order = [];
  for (let lvl = 1; lvl <= TOTAL_LEVELS; lvl++) {
    const levelQs = shuffleArray(allQuestions.filter(q => q.level === lvl));
    order.push(...levelQs);
  }
  questions = order;
}

/* =========================
   TRANSLATIONS & LANGUAGE
========================= */
let currentLanguage = "th";

const translations = {
  en: {
    title: " Chinese Word Order",
    instruction: "Click the words in the correct order.",
    answer: "Click the words below...",
    clear: "↩ Clear",
    check: "✓ Check Answer",
    correct: "✅ Correct! +10 XP ⭐",
    wrong: "❌ Wrong! Try again",
    complete: "⚠️ Please select all words",
    result: "🎉 Complete!",
    resultSubtitle: "Great job! You reached Level {n} 🏅",
    scoreLabel: "Score",
    xpLabel: "XP Earned",
    heartsLabel: "Hearts Left",
    score: "Score:",
    playAgain: "🔄 Play Again",
    home: "🏠 Home",
    next: "➡ Next",
    tutorialSkip: "Skip Tutorial",
    level: "Level",
    levelUp: "🎉 Level {n} unlocked!",
    tutorial: [
      { icon: "👋", title: "How to Play", text: "Arrange the Chinese words to make the correct sentence. There are 5 levels — sentences get harder as you go!", button: "Start Tutorial" },
      { icon: "🔤", title: "1. Check Pinyin", text: "Click the Pinyin in the middle. The Chinese sentence will appear for 2 seconds and you can hear the pronunciation.", button: "Next" },
      { icon: "🧩", title: "2. Arrange Words", text: "Click the words below in the correct order. Example: 你 → 好 = 你好", button: "Next" },
      { icon: "✅", title: "3. Check Answer", text: "After arranging all words, click Check Answer. A correct answer gives +10 XP ⭐.", button: "Start Game" }
    ]
  },
  th: {
    title: " เรียงคำภาษาจีน",
    instruction: "กดคำศัพท์ให้เรียงเป็นประโยคที่ถูกต้อง",
    answer: "กดคำศัพท์ด้านล่าง...",
    clear: "↩ ล้าง",
    check: "✓ ตรวจคำตอบ",
    correct: "✅ ถูกต้อง! +10 XP ⭐",
    wrong: "❌ ผิด! ลองใหม่",
    complete: "⚠️ กรุณาเลือกคำให้ครบ",
    result: "🎉 เสร็จสิ้น!",
    resultSubtitle: "คุณทำได้ดีมาก! ผ่านด่าน {n} แล้ว 🏅",
    scoreLabel: "คะแนน",
    xpLabel: "XP ที่ได้รับ",
    heartsLabel: "หัวใจที่เหลือ",
    score: "คะแนน:",
    playAgain: "🔄 เล่นอีกครั้ง",
    home: "🏠 หน้าหลัก",
    next: "➡ ต่อไป",
    tutorialSkip: "ข้าม Tutorial",
    level: "ด่าน",
    levelUp: "🎉 ปลดล็อกด่าน {n}!",
    tutorial: [
      { icon: "👋", title: "วิธีเล่น", text: "เรียงคำศัพท์ภาษาจีนให้เป็นประโยคที่ถูกต้อง มีทั้งหมด 5 ด่าน ยิ่งไปยิ่งยากขึ้น!", button: "เริ่มสอน" },
      { icon: "🔤", title: "1. ดู Pinyin", text: "กด Pinyin ตรงกลางหน้าจอ คำภาษาจีนจะแสดงเป็นเวลา 2 วินาที และสามารถฟังเสียงได้", button: "ต่อไป" },
      { icon: "🧩", title: "2. เรียงคำ", text: "กดคำศัพท์ด้านล่างตามลำดับที่ถูกต้อง ตัวอย่าง: 你 → 好 = 你好", button: "ต่อไป" },
      { icon: "✅", title: "3. ตรวจคำตอบ", text: "เมื่อเรียงคำครบแล้ว ให้กด ตรวจคำตอบ ถ้าถูกต้องจะได้ +10 XP ⭐", button: "เริ่มเล่น" }
    ]
  }
};

/* =========================
   GAME STATE VARIABLES
========================= */
let currentQuestion = 0;
let selectedWords = [];
let hearts = 3;
let xp = 0;
let score = 0;
let answered = false;
let currentLevel = 1;
let highestLevel = 1;

let tutorialStep = 0;
let tutorialActive = true;
let tutorialWordIndex = 0;
let revealTimer = null;
let levelUpTimer = null;

/* =========================
   LANGUAGE SWITCHING
========================= */
function changeLanguage(lang) {
  currentLanguage = lang;
  // Save app-wide so every other page (login, signup, home) matches.
  setAppLang(lang);
  updateLanguage();
}

function updateLanguage() {
  const t = translations[currentLanguage];
  document.getElementById("title").textContent = t.title;
  document.getElementById("instruction").textContent = t.instruction;
  document.getElementById("clearBtn").textContent = t.clear;
  document.getElementById("checkBtn").textContent = t.check;
  document.getElementById("resultTitle").textContent = t.result;
  document.getElementById("scoreLabel").textContent = t.scoreLabel;
  document.getElementById("xpLabel").textContent = t.xpLabel;
  document.getElementById("heartsLabel").textContent = t.heartsLabel;
  document.getElementById("playAgainBtn").textContent = t.playAgain;
  document.getElementById("homeBtn").textContent = t.home;
  document.getElementById("nextBtn").textContent = t.next;
  document.getElementById("tutorialSkip").textContent = t.tutorialSkip;

  updateAnswerArea();
  updateLevelBadge();
  renderTutorial();

  // Keep the result subtitle's level number in sync if the result screen is showing
  if (document.getElementById("resultScreen").style.display === "block") {
    document.getElementById("resultSubtitle").textContent =
      t.resultSubtitle.replace("{n}", highestLevel);
  }
}

/* =========================
   LEVEL UI
========================= */
function renderLevelDots() {
  const container = document.getElementById("levelDots");
  container.innerHTML = "";
  for (let i = 1; i <= TOTAL_LEVELS; i++) {
    const dot = document.createElement("div");
    dot.className = "level-dot";
    if (i < currentLevel) dot.classList.add("done");
    if (i === currentLevel) dot.classList.add("current");
    container.appendChild(dot);
  }
}

function updateLevelBadge() {
  const t = translations[currentLanguage];
  document.getElementById("levelBadge").textContent = `🏅 ${t.level} ${currentLevel} / ${TOTAL_LEVELS}`;
  renderLevelDots();
}

function showLevelUpBanner(level) {
  const t = translations[currentLanguage];
  const banner = document.getElementById("levelUpBanner");
  banner.textContent = t.levelUp.replace("{n}", level);
  banner.style.display = "block";
  clearTimeout(levelUpTimer);
  levelUpTimer = setTimeout(() => {
    banner.style.display = "none";
  }, 1800);
}

/* =========================
   GAME LOGIC & RENDERING
========================= */
function loadQuestion() {
  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  answered = false;
  selectedWords = [];

  const q = questions[currentQuestion];

  if (q.level !== currentLevel) {
    currentLevel = q.level;
    if (currentLevel > highestLevel) highestLevel = currentLevel;
    updateLevelBadge();
    if (currentQuestion > 0) showLevelUpBanner(currentLevel);
  } else {
    updateLevelBadge();
  }

  const questionEl = document.getElementById("question");
  const pinyinEl = document.getElementById("pinyin");

  assignRandomColors(q);
  renderColoredQuestion(questionEl, q);
  questionEl.classList.remove("show-chinese");
  pinyinEl.textContent = q.pinyin;

  updateProgress();
  createWordButtons();
  updateAnswerArea();
  document.getElementById("message").textContent = "";
  clearTranslation();
  hideNextButton();

  setTimeout(() => {
    speak(q.chinese);
  }, 500);
}

function renderColoredQuestion(questionEl, q) {
  questionEl.innerHTML = "";
  q.words.forEach(word => {
    const span = document.createElement("span");
    span.textContent = word;
    span.style.color = colorForWord(word, q);
    span.style.marginRight = "10px";
    span.style.display = "inline-block";
    questionEl.appendChild(span);
  });
}

function createWordButtons() {
  const container = document.getElementById("words");
  container.innerHTML = "";

  const q = questions[currentQuestion];
  const shuffled = [...q.words].sort(() => Math.random() - 0.5);

  shuffled.forEach(word => {
    const button = document.createElement("button");
    button.className = "word";
    button.textContent = word;
    button.dataset.word = word;
    const c = colorForWord(word, q);
    button.style.color = c;
    button.style.background = tintForColor(c);
    button.style.borderColor = c;
    button.style.boxShadow = `0 4px 0 ${c}`;
    button.onclick = () => selectWord(button, word);
    container.appendChild(button);
  });
}

function selectWord(button, word) {
  if (answered) return;

  selectedWords.push(word);
  button.classList.add("selected");

  tutorialWordClicked(word);
  updateAnswerArea();
  unlockSpeech();
  speak(word);
}

function updateAnswerArea() {
  const area = document.getElementById("answerArea");
  area.innerHTML = "";

  if (selectedWords.length === 0) {
    area.classList.add("empty");
    area.textContent = translations[currentLanguage].answer;
    return;
  }

  area.classList.remove("empty");

  const q = questions[currentQuestion];
  selectedWords.forEach((word, index) => {
    const button = document.createElement("button");
    button.className = "word answer-word";
    button.textContent = word;
    const c = colorForWord(word, q);
    button.style.color = c;
    button.style.background = tintForColor(c);
    button.style.borderColor = c;
    button.style.boxShadow = `0 4px 0 ${c}`;
    button.onclick = () => removeWord(index);
    area.appendChild(button);
  });
}

function removeWord(index) {
  if (answered) return;

  selectedWords.splice(index, 1);
  createWordButtons();

  const used = {};
  selectedWords.forEach(word => {
    used[word] = (used[word] || 0) + 1;
  });

  document.querySelectorAll("#words .word").forEach(btn => {
    const word = btn.dataset.word;
    if (used[word] > 0) {
      btn.classList.add("selected");
      used[word]--;
    }
  });

  updateAnswerArea();
}

function checkAnswer() {
  if (answered) return;

  const q = questions[currentQuestion];
  const t = translations[currentLanguage];

  if (selectedWords.length !== q.answer.length) {
    showMessage(t.complete, "wrong");
    clearTranslation();
    return;
  }

  const correct = selectedWords.every((word, index) => word === q.answer[index]);
  answered = true;

  if (correct) {
    xp += 10;
    score++;
    showMessage(t.correct, "correct");
    showTranslation(q);
    playCorrectSound();
    showNextButton();
  } else {
    hearts--;
    updateHearts();
    showMessage(t.wrong, "wrong");
    clearTranslation();
    playWrongSound();

    if (hearts <= 0) {
      setTimeout(() => {
        showResult();
      }, 1200);
    } else {
      setTimeout(() => {
        answered = false;
        selectedWords = [];
        createWordButtons();
        updateAnswerArea();
        document.getElementById("message").textContent = "";
      }, 1200);
    }
  }

  updateXP();
}

function showNextButton() {
  const buttonsRow = document.getElementById("buttonsRow");
  const nextBtn = document.getElementById("nextBtn");
  if (buttonsRow) buttonsRow.style.display = "none";
  if (nextBtn) nextBtn.style.display = "block";
}

function hideNextButton() {
  const buttonsRow = document.getElementById("buttonsRow");
  const nextBtn = document.getElementById("nextBtn");
  if (buttonsRow) buttonsRow.style.display = "flex";
  if (nextBtn) nextBtn.style.display = "none";
}

function goToNextQuestion() {
  hideNextButton();
  currentQuestion++;
  loadQuestion();
}

function clearAnswer() {
  if (answered) return;
  selectedWords = [];
  createWordButtons();
  updateAnswerArea();
}

/* =========================
   UI STATUS UPDATES
========================= */
function updateHearts() {
  document.getElementById("hearts").textContent =
    "🩷".repeat(hearts) + "🖤".repeat(3 - hearts);
}

function updateXP() {
  document.getElementById("xp").textContent = xp;
}

function updateProgress() {
  const percent = (currentQuestion / questions.length) * 100;
  document.getElementById("progress").style.width = percent + "%";
}

function showMessage(text, type) {
  const message = document.getElementById("message");
  message.textContent = text;
  // Reset first so the pop/shake animation replays even when the same
  // type of message (e.g. "wrong") shows twice in a row.
  message.className = "message";
  void message.offsetWidth;
  message.className = "message " + type;
}

function showTranslation(q) {
  const box = document.getElementById("translation");
  if (!box) return;
  const translated = currentLanguage === "th" ? q.th : q.en;
  box.innerHTML = `${q.chinese} <span style="color:#94a3b8;">→</span> ${translated}`;
  box.style.display = "block";
}

function clearTranslation() {
  const box = document.getElementById("translation");
  if (!box) return;
  box.textContent = "";
  box.style.display = "none";
}

function revealChinese() {
  const question = document.getElementById("question");
  question.classList.add("show-chinese");
  speakCurrent();

  clearTimeout(revealTimer);
  revealTimer = setTimeout(() => {
    question.classList.remove("show-chinese");
  }, 2000);
}

/* =========================
   SOUND (mascot talking animation, TTS pronunciation, correct/wrong tones)
   -----------------------------------------------------------
   All moved to its own file: js/audio.js — it defines
   speak(), speakCurrent(), playCorrectSound(), playWrongSound(),
   startTalking()/stopTalking() and the voice-picking helpers.
   js/audio.js MUST be loaded (via <script>) before this file.
   See index.html for the load order.
========================= */

/* =========================
   GAME END & RESET
========================= */
function showResult() {
  const t = translations[currentLanguage];

  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "block";

  document.getElementById("resultTitle").textContent = t.result;
  document.getElementById("resultSubtitle").textContent =
    t.resultSubtitle.replace("{n}", highestLevel);
  document.getElementById("finalScore").textContent = score + " / " + questions.length;
  document.getElementById("finalXP").textContent = "+" + xp;
  document.getElementById("finalHearts").textContent = hearts;
  document.getElementById("progress").style.width = "100%";

  renderConfetti();
}

/* Scatter a handful of animated confetti emoji behind the result card */
function renderConfetti() {
  const container = document.getElementById("confetti");
  if (!container) return;

  container.innerHTML = "";
  const pieces = ["🎉", "⭐", "🎊", "💛", "💙", "💚", "✨"];

  for (let i = 0; i < 22; i++) {
    const span = document.createElement("span");
    span.textContent = pieces[Math.floor(Math.random() * pieces.length)];
    span.style.left = Math.random() * 100 + "%";
    span.style.fontSize = 14 + Math.random() * 14 + "px";
    span.style.animationDelay = (Math.random() * 2.2) + "s";
    span.style.animationDuration = (2.6 + Math.random() * 1.6) + "s";
    container.appendChild(span);
  }
}

/* Reset the whole game back to its starting state (used by the "Home" button) */
function goHome() {
  window.location.href = "./home.html";
}

function playAgain() {
  buildQuestionOrder();
  currentQuestion = 0;
  selectedWords = [];
  hearts = 3;
  xp = 0;
  score = 0;
  answered = false;
  currentLevel = 1;
  highestLevel = 1;

  updateHearts();
  updateXP();
  updateLevelBadge();
  document.getElementById("gameScreen").style.display = "block";
  document.getElementById("resultScreen").style.display = "none";
  loadQuestion();
}

/* =========================
   TUTORIAL SYSTEM
========================= */
function renderTutorial() {
  const data = translations[currentLanguage].tutorial[tutorialStep];
  document.getElementById("tutorialIcon").textContent = data.icon;
  document.getElementById("tutorialTitle").textContent = data.title;
  document.getElementById("tutorialText").textContent = data.text;
  document.getElementById("tutorialStep").textContent = `Step ${tutorialStep + 1} / 4`;
  document.getElementById("tutorialButton").textContent = data.button;
}

function clearTutorialHighlight() {
  document.querySelectorAll(".tutorial-highlight").forEach(el => {
    el.classList.remove("tutorial-highlight");
  });
  document.getElementById("tutorialOverlay").classList.remove("spotlight-mode");
}

function setTutorialHighlight(el) {
  clearTutorialHighlight();
  if (el) {
    el.classList.add("tutorial-highlight");
    document.getElementById("tutorialOverlay").classList.add("spotlight-mode");
  }
}

function highlightPinyin() {
  setTutorialHighlight(document.getElementById("pinyin"));
}

function highlightFirstCorrectWord() {
  const needed = questions[currentQuestion].answer[tutorialWordIndex];
  const buttons = document.querySelectorAll("#words .word");

  for (const btn of buttons) {
    if (btn.dataset.word === needed && !btn.classList.contains("selected")) {
      setTutorialHighlight(btn);
      break;
    }
  }
}

function tutorialNext() {
  if (tutorialStep === 0) {
    tutorialStep = 1;
    renderTutorial();
    highlightPinyin();
    return;
  }

  if (tutorialStep === 1) {
    tutorialStep = 2;
    renderTutorial();
    highlightFirstCorrectWord();
    return;
  }

  if (tutorialStep === 2) {
    tutorialStep = 3;
    renderTutorial();
    setTutorialHighlight(document.querySelector(".check"));
    return;
  }

  closeTutorial();
}

function closeTutorial() {
  tutorialActive = false;
  clearTutorialHighlight();
  document.getElementById("tutorialOverlay").style.display = "none";
}

function tutorialWordClicked(word) {
  if (!tutorialActive || tutorialStep !== 2) return;

  const expected = questions[currentQuestion].answer[tutorialWordIndex];

  if (word === expected) {
    tutorialWordIndex++;

    if (tutorialWordIndex >= questions[currentQuestion].answer.length) {
      setTutorialHighlight(document.querySelector(".check"));
      tutorialStep = 3;
      renderTutorial();
    } else {
      highlightFirstCorrectWord();
    }
  }
}

/* =========================
   INITIALIZATION
========================= */
buildQuestionOrder();
currentLanguage = getAppLang();
updateHearts();
updateXP();
updateLevelBadge();
loadQuestion();
renderTutorial();
updateLanguage();