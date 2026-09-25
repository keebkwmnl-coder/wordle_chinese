// home.js — login guard + text/language handling for the home screen

try {
  if (localStorage.getItem("chineseWordLoggedIn") !== "true") {
    window.location.replace("./index.html");
  }
} catch (e) {
  // storage not available, just skip the guard
}

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

// Repaints text only — doesn't touch localStorage, so it's safe to call
// from the cross-tab listener below.
function renderHomeLang(lang) {
  if (!homeTranslations[lang]) lang = "th";
  const t = homeTranslations[lang];

  Object.keys(t).forEach(function (id) {
    const el = document.getElementById(id);
    if (el) el.textContent = t[id];
  });

  const thaiBtn = document.getElementById("thaiBtn");
  const englishBtn = document.getElementById("englishBtn");
  if (thaiBtn) thaiBtn.classList.toggle("active", lang === "th");
  if (englishBtn) englishBtn.classList.toggle("active", lang === "en");
}

// Persists the choice app-wide, then repaints. Wire click handlers to this.
function setLang(lang) {
  const saved = setAppLang(lang);
  renderHomeLang(saved);
}

function changeLanguage(lang) {
  setLang(lang);
}

renderHomeLang(getAppLang());

function logoutPlayer() {
  localStorage.removeItem("chineseWordLoggedIn");
  localStorage.removeItem("chineseWordPlayerName");
  localStorage.removeItem("chineseWordPlayerEmail");
  window.location.href = "./index.html";
}

(function showGreeting() {
  try {
    const name = localStorage.getItem("chineseWordPlayerName");
    const greeting = document.getElementById("playerGreeting");
    if (name && greeting) greeting.textContent = "Hi, " + name;
  } catch (e) {}
})();

// Bottom-nav Home / Stats / Settings buttons.
(function wireBottomNav() {
  const navButtons = document.querySelectorAll(".bottom-nav .nav-item");
  const destinations = ["./home.html","./setting.html"];

  navButtons.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      if (btn.classList.contains("active")) return;
      const target = destinations[i];
      if (target) window.location.href = target;
    });
  });
})();

// Another tab/page changed the language — repaint only.
window.addEventListener(APP_LANG_EVENT, function (e) {
  renderHomeLang(e.detail);
});
