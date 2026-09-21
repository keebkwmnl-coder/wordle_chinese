// ===============================
// lang.js — SHARED APP-WIDE LANGUAGE STATE
// Include this on every page (login, signup, home, game).
// All pages read/write the SAME localStorage key, so switching
// the language anywhere carries over everywhere else.
// ===============================

const APP_LANG_KEY = "chineseWordAppLang";
const APP_LANG_EVENT = "applangchange";

// Read the app-wide language. Defaults to Thai the very first time.
function getAppLang() {
  try {
    const saved = localStorage.getItem(APP_LANG_KEY);
    return (saved === "th" || saved === "en") ? saved : "th";
  } catch (e) {
    return "th";
  }
}

// Save the app-wide language and tell any listeners on THIS page
// (other already-open pages/tabs pick it up next time they load,
// or immediately via the "storage" event if you want that later).
function setAppLang(lang) {
  if (lang !== "th" && lang !== "en") lang = "th";
  try { localStorage.setItem(APP_LANG_KEY, lang); } catch (e) {}
  document.documentElement.lang = lang;
  window.dispatchEvent(new CustomEvent(APP_LANG_EVENT, { detail: lang }));
  return lang;
}
