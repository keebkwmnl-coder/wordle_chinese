/* =========================
   QUESTIONS DATA (each tagged with a level 1-5)
========================= */
const allQuestions = [
  { level: 1, words: ["你", "好"], answer: ["你", "好"], chinese: "你好", pinyin: "nǐ hǎo", en: "Hello", th: "สวัสดี" },
  { level: 1, words: ["谢谢", "你"], answer: ["谢谢", "你"], chinese: "谢谢你", pinyin: "xièxie nǐ", en: "Thank you", th: "ขอบคุณ" },
  { level: 1, words: ["早上", "好"], answer: ["早上", "好"], chinese: "早上好", pinyin: "zǎoshang hǎo", en: "Good morning", th: "สวัสดีตอนเช้า" },

  { level: 2, words: ["我", "是", "学生"], answer: ["我", "是", "学生"], chinese: "我是学生", pinyin: "wǒ shì xuésheng", en: "I am a student", th: "ฉันเป็นนักเรียน" },
  { level: 2, words: ["我", "喜欢", "中文"], answer: ["我", "喜欢", "中文"], chinese: "我喜欢中文", pinyin: "wǒ xǐhuan Zhōngwén", en: "I like Chinese", th: "ฉันชอบภาษาจีน" },
  { level: 2, words: ["我", "爱", "中国"], answer: ["我", "爱", "中国"], chinese: "我爱中国", pinyin: "wǒ ài Zhōngguó", en: "I love China", th: "ฉันรักประเทศจีน" },

  { level: 3, words: ["你", "叫什么", "名字"], answer: ["你", "叫什么", "名字"], chinese: "你叫什么名字", pinyin: "nǐ jiào shénme míngzi", en: "What is your name?", th: "คุณชื่ออะไร" },
  { level: 3, words: ["你", "吃饭", "了吗"], answer: ["你", "吃饭", "了吗"], chinese: "你吃饭了吗", pinyin: "nǐ chīfàn le ma", en: "Have you eaten?", th: "คุณกินข้าวหรือยัง" },
  { level: 3, words: ["今天", "天气", "很好"], answer: ["今天", "天气", "很好"], chinese: "今天天气很好", pinyin: "jīntiān tiānqì hěn hǎo", en: "The weather is nice today", th: "วันนี้อากาศดีมาก" },

  { level: 4, words: ["我", "每天", "早上", "六点", "起床"], answer: ["我", "每天", "早上", "六点", "起床"], chinese: "我每天早上六点起床", pinyin: "wǒ měitiān zǎoshang liù diǎn qǐchuáng", en: "I get up at six every morning", th: "ฉันตื่นนอนตอนหกโมงเช้าทุกวัน" },
  { level: 4, words: ["我", "每天", "下午", "打", "篮球"], answer: ["我", "每天", "下午", "打", "篮球"], chinese: "我每天下午打篮球", pinyin: "wǒ měitiān xiàwǔ dǎ lánqiú", en: "I play basketball every afternoon", th: "ฉันเล่นบาสเก็ตบอลทุกบ่าย" },
  { level: 4, words: ["我", "喜欢", "听", "中文", "歌曲"], answer: ["我", "喜欢", "听", "中文", "歌曲"], chinese: "我喜欢听中文歌曲", pinyin: "wǒ xǐhuan tīng Zhōngwén gēqǔ", en: "I like listening to Chinese songs", th: "ฉันชอบฟังเพลงจีน" },


  { level: 5, words: ["我们", "下个", "星期", "要", "去", "北京", "旅游"], answer: ["我们", "下个", "星期", "要", "去", "北京", "旅游"], chinese: "我们下个星期要去北京旅游", pinyin: "wǒmen xiàge xīngqī yào qù Běijīng lǚyóu", en: "We are going to travel to Beijing next week", th: "สัปดาห์หน้าเราจะไปเที่ยวปักกิ่ง" },
  { level: 5, words: ["她", "每天", "晚上", "都", "看", "一本", "书"], answer: ["她", "每天", "晚上", "都", "看", "一本", "书"], chinese: "她每天晚上都看一本书", pinyin: "tā měitiān wǎnshàng dōu kàn yìběn shū", en: "She reads a book every night", th: "เธออ่านหนังสือทุกคืน" },
  { level: 5, words: ["他", "昨天", "和", "朋友", "一起", "去", "电影院"], answer: ["他", "昨天", "和", "朋友", "一起", "去", "电影院"], chinese: "他昨天和朋友一起去电影院", pinyin: "tā zuótiān hé péngyou yìqǐ qù diànyǐngyuàn", en: "He went to the cinema with friends yesterday", th: "เมื่อวานเขาไปโรงหนังกับเพื่อน" }
];

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

function colorForWord(word, q) {
  const idx = q.words.indexOf(word);
  const safeIdx = idx === -1 ? 0 : idx;
  return WORD_COLORS[safeIdx % WORD_COLORS.length];
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
let currentLanguage = "en";

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
    result: "Great Job!",
    score: "Score:",
    playAgain: "🔄 Play Again",
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
    result: "เก่งมาก!",
    score: "คะแนน:",
    playAgain: "🔄 เล่นอีกครั้ง",
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
  document.getElementById("thaiBtn").classList.toggle("active", lang === "th");
  document.getElementById("englishBtn").classList.toggle("active", lang === "en");
  updateLanguage();
}

function updateLanguage() {
  const t = translations[currentLanguage];
  document.getElementById("title").textContent = t.title;
  document.getElementById("instruction").textContent = t.instruction;
  document.getElementById("clearBtn").textContent = t.clear;
  document.getElementById("checkBtn").textContent = t.check;
  document.getElementById("resultTitle").textContent = t.result;
  document.getElementById("playAgainBtn").textContent = t.playAgain;
  document.getElementById("nextBtn").textContent = t.next;
  document.getElementById("tutorialSkip").textContent = t.tutorialSkip;

  updateAnswerArea();
  updateLevelBadge();
  renderTutorial();
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
    button.style.color = colorForWord(word, q);
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
    button.style.color = colorForWord(word, q);
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

function speak(text) {
  if (!("speechSynthesis" in window)) return;

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.8;
  utterance.pitch = 1;

  utterance.onstart = () => startTalking();
  utterance.onend = () => stopTalking();
  utterance.onerror = () => stopTalking();

  speechSynthesis.speak(utterance);
}

function speakCurrent() {
  speak(questions[currentQuestion].chinese);
}

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

/* =========================
   GAME END & RESET
========================= */
function showResult() {
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "block";
  document.getElementById("finalXP").textContent = xp;
  document.getElementById("finalScore").textContent = score + " / " + questions.length;
  document.getElementById("finalLevel").textContent = highestLevel;
  document.getElementById("progress").style.width = "100%";
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
updateHearts();
updateXP();
updateLevelBadge();
loadQuestion();
renderTutorial();