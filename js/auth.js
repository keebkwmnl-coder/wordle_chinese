// ===============================
// SHARED HELPERS
// ===============================
function getUsers() {
  const raw = localStorage.getItem("chineseWordUsers");
  return raw ? JSON.parse(raw) : [];
}

function saveUsers(users) {
  localStorage.setItem("chineseWordUsers", JSON.stringify(users));
}

// ===============================
// LANGUAGE (shared app-wide, via lang.js)
// ===============================
const authTranslations = {
  th: {
    loginTitle: "ยินดีต้อนรับกลับ!",
    loginSubtitle: "เข้าสู่ระบบเพื่อเรียนภาษาจีนต่อ",
    signupTitle: "สร้างบัญชี",
    signupSubtitle: "เริ่มต้นการเรียนภาษาจีนของคุณ",
    labelName: "ชื่อ",
    labelEmail: "อีเมล",
    labelPassword: "รหัสผ่าน",
    labelConfirmPassword: "ยืนยันรหัสผ่าน",
    phName: "กรอกชื่อของคุณ",
    phEmail: "กรอกอีเมลของคุณ",
    phPasswordLogin: "กรอกรหัสผ่านของคุณ",
    phPasswordSignup: "ตั้งรหัสผ่าน",
    phConfirmPassword: "ยืนยันรหัสผ่านของคุณ",
    loginBtn: "เข้าสู่ระบบ",
    signupBtn: "สร้างบัญชี",
    or: "หรือ",
    noAccount: "ยังไม่มีบัญชี?",
    haveAccount: "มีบัญชีอยู่แล้ว?",
    signupLink: "สมัครสมาชิก",
    loginLink: "เข้าสู่ระบบ",
    msgPasswordShort: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
    msgPasswordMismatch: "รหัสผ่านไม่ตรงกัน",
    msgEmailTaken: "อีเมลนี้ถูกใช้ลงทะเบียนแล้ว",
    msgAccountCreated: "สร้างบัญชีสำเร็จ! กำลังไปหน้าเข้าสู่ระบบ...",
    msgNoAccount: "ไม่พบบัญชี กรุณาสมัครสมาชิกก่อน",
    msgLoginSuccess: "เข้าสู่ระบบสำเร็จ! 🎉",
    msgLoginWrong: "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
  },
  en: {
    loginTitle: "Welcome Back!",
    loginSubtitle: "Login to continue your Chinese learning",
    signupTitle: "Create Account",
    signupSubtitle: "Start your Chinese learning journey",
    labelName: "Name",
    labelEmail: "Email",
    labelPassword: "Password",
    labelConfirmPassword: "Confirm Password",
    phName: "Enter your name",
    phEmail: "Enter your email",
    phPasswordLogin: "Enter your password",
    phPasswordSignup: "Create a password",
    phConfirmPassword: "Confirm your password",
    loginBtn: "Login",
    signupBtn: "Create Account",
    or: "or",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    signupLink: "Sign Up",
    loginLink: "Login",
    msgPasswordShort: "Password must be at least 6 characters.",
    msgPasswordMismatch: "Passwords do not match.",
    msgEmailTaken: "This email is already registered.",
    msgAccountCreated: "Account created! Going to login...",
    msgNoAccount: "No account found. Please Sign Up first.",
    msgLoginSuccess: "Login successful! 🎉",
    msgLoginWrong: "Email or password is incorrect."
  }
};

let currentAuthLang = "th";

function applyAuthLang(lang) {
  if (!authTranslations[lang]) lang = "th";
  currentAuthLang = lang;
  const t = authTranslations[lang];

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };
  const setPh = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.placeholder = value;
  };

  // Login page
  setText("loginTitle", t.loginTitle);
  setText("loginSubtitle", t.loginSubtitle);
  setText("labelEmail", t.labelEmail);
  setText("labelPassword", t.labelPassword);
  setPh("loginEmail", t.phEmail);
  setPh("loginPassword", t.phPasswordLogin);
  setText("loginBtnText", t.loginBtn);
  setText("dividerText", t.or);
  setText("noAccountText", t.noAccount);
  setText("signupLinkText", t.signupLink);

  // Signup page
  setText("signupTitle", t.signupTitle);
  setText("signupSubtitle", t.signupSubtitle);
  setText("labelName", t.labelName);
  setText("labelEmailSignup", t.labelEmail);
  setText("labelPasswordSignup", t.labelPassword);
  setText("labelConfirmPassword", t.labelConfirmPassword);
  setPh("signupName", t.phName);
  setPh("signupEmail", t.phEmail);
  setPh("signupPassword", t.phPasswordSignup);
  setPh("confirmPassword", t.phConfirmPassword);
  setText("signupBtnText", t.signupBtn);
  setText("haveAccountText", t.haveAccount);
  setText("loginLinkText", t.loginLink);

  const thaiBtn = document.getElementById("authThaiBtn");
  const enBtn = document.getElementById("authEnBtn");
  if (thaiBtn) thaiBtn.classList.toggle("active", lang === "th");
  if (enBtn) enBtn.classList.toggle("active", lang === "en");
}

function setAuthLang(lang) {
  setAppLang(lang);
  applyAuthLang(lang);
}

// Apply the app-wide language as soon as this script runs.
applyAuthLang(getAppLang());

// Shake the whole card so a wrong entry is obvious (styles in css/auth.css)
function shakeCard() {
  const card = document.querySelector(".auth-card");
  if (!card) return;
  card.classList.remove("shake");
  void card.offsetWidth;   // restart the animation if it is already showing
  card.classList.add("shake");
}

// ===============================
// SIGN UP
// ===============================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const message = document.getElementById("signupMessage");
    const t = authTranslations[currentAuthLang];

    if (password.length < 6) {
      message.textContent = t.msgPasswordShort;
      message.style.color = "#e34d6f";
      shakeCard();
      return;
    }

    if (password !== confirmPassword) {
      message.textContent = t.msgPasswordMismatch;
      message.style.color = "#e34d6f";
      shakeCard();
      return;
    }

    const users = getUsers();

    if (users.some(u => u.email === email)) {
      message.textContent = t.msgEmailTaken;
      message.style.color = "#e34d6f";
      shakeCard();
      return;
    }

    users.push({ name, email, password });
    saveUsers(users);

    message.textContent = t.msgAccountCreated;
    message.style.color = "#35a56b";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  });
}


// ===============================
// LOGIN
// ===============================
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const message = document.getElementById("loginMessage");
    const t = authTranslations[currentAuthLang];

    const users = getUsers();

    if (users.length === 0) {
      message.textContent = t.msgNoAccount;
      message.style.color = "#e34d6f";
      shakeCard();
      return;
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem("chineseWordLoggedIn", "true");
      localStorage.setItem("chineseWordPlayerName", user.name);
      localStorage.setItem("chineseWordPlayerEmail", user.email);

      message.textContent = t.msgLoginSuccess;
      message.style.color = "#35a56b";

      setTimeout(() => {
        window.location.href = "home.html";
      }, 700);
    } else {
      message.textContent = t.msgLoginWrong;
      message.style.color = "#e34d6f";
      shakeCard();
    }
  });
}