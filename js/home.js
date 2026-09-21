// home.js — login guard + language switching for the home page

// Require login (same check as index.html)
try {
  if (localStorage.getItem("chineseWordLoggedIn") !== "true") {
    window.location.replace("./login.html");
  }
} catch (e) { /* storage unavailable — skip guard */ }

const homeTranslations = {
  th: {
    speechBubble: "ฝึกสมองให้สดใสทุกวัน!",
    appTitle: "เกมฝึกความจำ",
    appSubtitle: "เรียนรู้ภาษาจีน สนุก ได้สมอง",
    modeMemory: "จำภาพ", modeMemorySub: "(Memory)",
    modeNumbers: "จำตัวเลข", modeNumbersSub: "(Numbers)",
    modeMatching: "จับคู่รูปภาพ", modeMatchingSub: "(Matching)",
    modeCharacters: "ตัวอักษร", modeCharactersSub: "(Characters)",
    modeWordOrder: "จัดเรียงคำ", modeWordOrderSub: "(Word Order)",
    modeListening: "จำเสียง", modeListeningSub: "(Listening)",
    levelBadge: "🏅 ด่าน 1 / 5",
    navHome: "หน้าหลัก",
    navStats: "สถิติ",
    navSettings: "ตั้งค่า"
  },
  en: {
    speechBubble: "Train your brain every day!",
    appTitle: "Memory Training Game",
    appSubtitle: "Learn Chinese, have fun, train your brain",
    modeMemory: "Memory", modeMemorySub: "(Images)",
    modeNumbers: "Numbers", modeNumbersSub: "(Numbers)",
    modeMatching: "Matching", modeMatchingSub: "(จับคู่)",
    modeCharacters: "Characters", modeCharactersSub: "(ตัวอักษร)",
    modeWordOrder: "Word Order", modeWordOrderSub: "(เรียงคำ)",
    modeListening: "Listening", modeListeningSub: "(ฟังเสียง)",
    levelBadge: "🏅 Level 1 / 5",
    navHome: "Home",
    navStats: "Stats",
    navSettings: "Settings"
  }
};

function setLang(lang) {
  if (!homeTranslations[lang]) lang = "th";
  const t = homeTranslations[lang];

  // Save app-wide so every other page (login, signup, game) matches.
  setAppLang(lang);

  Object.keys(t).forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.textContent = t[id];
  });

  const thaiBtn = document.getElementById("thaiBtn");
  const englishBtn = document.getElementById("englishBtn");
  if (thaiBtn) thaiBtn.classList.toggle("active", lang === "th");
  if (englishBtn) englishBtn.classList.toggle("active", lang === "en");
}

function changeLanguage(lang) {
  setLang(lang);
}

setLang(getAppLang());

// Same greeting + logout as the game screen
function logoutPlayer() {
  localStorage.removeItem("chineseWordLoggedIn");
  localStorage.removeItem("chineseWordPlayerName");
  localStorage.removeItem("chineseWordPlayerEmail");
  window.location.href = "./login.html";
}

(function showGreeting() {
  try {
    const name = localStorage.getItem("chineseWordPlayerName");
    const greeting = document.getElementById("playerGreeting");
    if (name && greeting) greeting.textContent = "Hi, " + name;
  } catch (e) {}
})();