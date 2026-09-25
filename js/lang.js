// lang.js
// Shared language state for the whole app. Include this on every page.
// Everything reads/writes the same localStorage key so switching the
// language on one page carries over to the rest.

const APP_LANG_KEY = "chineseWordAppLang";
const APP_LANG_EVENT = "applangchange";

function getAppLang() {
  try {
    const saved = localStorage.getItem(APP_LANG_KEY);
    return (saved === "th" || saved === "en") ? saved : "th";
  } catch (e) {
    return "th";
  }
}

function setAppLang(lang) {
  if (lang !== "th" && lang !== "en") lang = "th";
  try { localStorage.setItem(APP_LANG_KEY, lang); } catch (e) {}
  document.documentElement.lang = lang;
  window.dispatchEvent(new CustomEvent(APP_LANG_EVENT, { detail: lang }));
  return lang;
}

// Fires in every OTHER already-open tab when the key changes, so both
// cases (changed here vs. changed elsewhere) end up going through the
// same APP_LANG_EVENT and pages only need one listener.
window.addEventListener("storage", function (e) {
  if (e.key !== APP_LANG_KEY) return;
  const lang = (e.newValue === "en") ? "en" : "th";
  document.documentElement.lang = lang;
  window.dispatchEvent(new CustomEvent(APP_LANG_EVENT, { detail: lang }));
});

// Make sure <html lang="..."> matches the saved choice as soon as this
// file loads, not just after someone clicks a language button.
document.documentElement.lang = getAppLang();
