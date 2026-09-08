/* =========================
   QUESTIONS DATA
========================= */
const questions = [
  {
    words: ["你", "好"],
    answer: ["你", "好"],
    chinese: "你好",
    pinyin: "nǐ hǎo"
  },
  {
    words: ["我", "是", "学生"],
    answer: ["我", "是", "学生"],
    chinese: "我是学生",
    pinyin: "wǒ shì xuésheng"
  },
  {
    words: ["你", "叫什么", "名字"],
    answer: ["你", "叫什么", "名字"],
    chinese: "你叫什么名字",
    pinyin: "nǐ jiào shénme míngzi"
  },
  {
    words: ["我", "喜欢", "中文"],
    answer: ["我", "喜欢", "中文"],
    chinese: "我喜欢中文",
    pinyin: "wǒ xǐhuan Zhōngwén"
  },
  {
    words: ["谢谢", "你"],
    answer: ["谢谢", "你"],
    chinese: "谢谢你",
    pinyin: "xièxie nǐ"
  },
  {
    words: ["我", "爱", "中国"],
    answer: ["我", "爱", "中国"],
    chinese: "我爱中国",
    pinyin: "wǒ ài Zhōngguó"
  },
  {
    words: ["你", "吃饭", "了吗"],
    answer: ["你", "吃饭", "了吗"],
    chinese: "你吃饭了吗",
    pinyin: "nǐ chīfàn le ma"
  },
  {
    words: ["今天", "天气", "很好"],
    answer: ["今天", "天气", "很好"],
    chinese: "今天天气很好",
    pinyin: "jīntiān tiānqì hěn hǎo"
  }
];

/* =========================
   TRANSLATIONS & LANGUAGE
========================= */
let currentLanguage = "en";

const translations = {
  en: {
    title: "🇨🇳 Chinese Word Order",
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
    tutorialSkip: "Skip Tutorial",
    tutorial: [
      {
        icon: "👋",
        title: "How to Play",
        text: "Arrange the Chinese words to make the correct sentence.",
        button: "Start Tutorial"
      },
      {
        icon: "🔤",
        title: "1. Check Pinyin",
        text: "Click the Pinyin in the middle. The Chinese sentence will appear for 2 seconds and you can hear the pronunciation.",
        button: "Next"
      },
      {
        icon: "🧩",
        title: "2. Arrange Words",
        text: "Click the words below in the correct order. Example: 你 → 好 = 你好",
        button: "Next"
      },
      {
        icon: "✅",
        title: "3. Check Answer",
        text: "After arranging all words, click Check Answer. A correct answer gives +10 XP ⭐.",
        button: "Start Game"
      }
    ]
  },
  th: {
    title: "🇨🇳 เรียงคำภาษาจีน",
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
    tutorialSkip: "ข้าม Tutorial",
    tutorial: [
      {
        icon: "👋",
        title: "วิธีเล่น",
        text: "เรียงคำศัพท์ภาษาจีนให้เป็นประโยคที่ถูกต้อง",
        button: "เริ่มสอน"
      },
      {
        icon: "🔤",
        title: "1. ดู Pinyin",
        text: "กด Pinyin ตรงกลางหน้าจอ คำภาษาจีนจะแสดงเป็นเวลา 2 วินาที และสามารถฟังเสียงได้",
        button: "ต่อไป"
      },
      {
        icon: "🧩",
        title: "2. เรียงคำ",
        text: "กดคำศัพท์ด้านล่างตามลำดับที่ถูกต้อง ตัวอย่าง: 你 → 好 = 你好",
        button: "ต่อไป"
      },
      {
        icon: "✅",
        title: "3. ตรวจคำตอบ",
        text: "เมื่อเรียงคำครบแล้ว ให้กด ตรวจคำตอบ ถ้าถูกต้องจะได้ +10 XP ⭐",
        button: "เริ่มเล่น"
      }
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

let tutorialStep = 0;
let tutorialActive = true;
let tutorialWordIndex = 0;
let revealTimer = null;

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
  document.getElementById("tutorialSkip").textContent = t.tutorialSkip;

  updateAnswerArea();
  renderTutorial();
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
  const questionEl = document.getElementById("question");
  const pinyinEl = document.getElementById("pinyin");

  questionEl.textContent = q.chinese;
  questionEl.classList.remove("show-chinese");
  pinyinEl.textContent = q.pinyin;

  updateProgress();
  createWordButtons();
  updateAnswerArea();
  document.getElementById("message").textContent = "";

  setTimeout(() => {
    speak(q.chinese);
  }, 500);
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

  selectedWords.forEach((word, index) => {
    const button = document.createElement("button");
    button.className = "word answer-word";
    button.textContent = word;
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
    return;
  }

  const correct = selectedWords.every((word, index) => word === q.answer[index]);
  answered = true;

  if (correct) {
    xp += 10;
    score++;
    showMessage(t.correct, "correct");
    playCorrectSound();

    setTimeout(() => {
      currentQuestion++;
      loadQuestion();
    }, 1200);
  } else {
    hearts--;
    updateHearts();
    showMessage(t.wrong, "wrong");
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
    "❤️".repeat(hearts) + "🖤".repeat(3 - hearts);
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
   AUDIO & SPEECH
========================= */
function speak(text) {
  if (!("speechSynthesis" in window)) return;

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.8;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}

function speakCurrent() {
  speak(questions[currentQuestion].chinese);
}

function playCorrectSound() {
  const audio = new Audio("https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg");
  audio.play().catch(() => {});
}

function playWrongSound() {
  const audio = new Audio("https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg");
  audio.play().catch(() => {});
}

/* =========================
   GAME END & RESET
========================= */
function showResult() {
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "block";
  document.getElementById("finalXP").textContent = xp;
  document.getElementById("finalScore").textContent = score + " / " + questions.length;
  document.getElementById("progress").style.width = "100%";
}

function playAgain() {
  currentQuestion = 0;
  selectedWords = [];
  hearts = 3;
  xp = 0;
  score = 0;
  answered = false;

  updateHearts();
  updateXP();
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
}

function highlightPinyin() {
  clearTutorialHighlight();
  document.getElementById("pinyin").classList.add("tutorial-highlight");
}

function highlightFirstCorrectWord() {
  clearTutorialHighlight();
  const needed = questions[currentQuestion].answer[tutorialWordIndex];
  const buttons = document.querySelectorAll("#words .word");

  for (const btn of buttons) {
    if (btn.dataset.word === needed && !btn.classList.contains("selected")) {
      btn.classList.add("tutorial-highlight");
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
    clearTutorialHighlight();
    document.querySelector(".check").classList.add("tutorial-highlight");
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
      clearTutorialHighlight();
      document.querySelector(".check").classList.add("tutorial-highlight");
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
updateHearts();
updateXP();
loadQuestion();
renderTutorial();