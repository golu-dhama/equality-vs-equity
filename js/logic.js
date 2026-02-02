// ---------- THEME LOGIC ----------

const themeSelect = document.getElementById("themeSelect");
const body = document.body;

const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(mode) {
  if (mode === "dark") {
    body.classList.add("dark");
  } else if (mode === "light") {
    body.classList.remove("dark");
  } else if (mode === "system") {
    if (systemPrefersDark.matches) {
      body.classList.add("dark");
    } else {
      body.classList.remove("dark");
    }
  }
}

const savedTheme = localStorage.getItem("theme") || "system";

themeSelect.value = savedTheme;
applyTheme(savedTheme);

themeSelect.addEventListener("change", (e) => {
  const mode = e.target.value;

  localStorage.setItem("theme", mode);
  applyTheme(mode);
});

systemPrefersDark.addEventListener("change", () => {
  const current = localStorage.getItem("theme");

  if (current === "system") {
    applyTheme("system");
  }
});

// ---------- LANGUAGE LOGIC ----------

const translations = {
  hi: {
    title: "Equality vs Equity in Indian Society",
    intro:
      "Equality sabko same cheez dena hai. Equity sabko wahi dena hai jo use aage badhne me madad kare.",

    priv_title: "Privilege",
    priv_text:
      "Shehar ka student private school me padhta hai, coaching aur internet milta hai.",

    equity_title: "Equity",
    equity_text:
      "Do students ko same kitab dena equality hai, extra support dena equity.",

    struggle_title: "Struggle",
    struggle_text:
      "Gaon ke student ke paas talent hota hai, par resources kam milte hain.",

    justice_title: "Justice",
    justice_text:
      "System ko rules ke sath-sath realities dekh kar decision lene chahiye.",
  },

  en: {
    title: "Equality vs Equity in Indian Society",
    intro:
      "Equality means giving everyone the same thing. Equity means giving what each person needs to move forward.",

    priv_title: "Privilege",
    priv_text:
      "Urban students often get private schooling, coaching and internet access.",

    equity_title: "Equity",
    equity_text:
      "Giving the same book is equality. Providing extra support where needed is equity.",

    struggle_title: "Struggle",
    struggle_text:
      "Rural students have talent but often lack proper guidance and resources.",

    justice_title: "Justice",
    justice_text:
      "A fair system understands different starting points before making decisions.",
  },
};

const langSelect = document.getElementById("langSelect");

function applyLanguage(lang) {
  const elements = document.querySelectorAll("[data-key]");

  elements.forEach((el) => {
    el.classList.add("language-fade");
  });

  setTimeout(() => {
    elements.forEach((el) => {
      const key = el.getAttribute("data-key");

      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }

      el.classList.remove("language-fade");
      el.classList.add("language-visible");
    });
  }, 250);
}

langSelect.addEventListener("change", (e) => {
  const lang = e.target.value;
  localStorage.setItem("lang", lang);
  applyLanguage(lang);
});

const savedLang = localStorage.getItem("lang") || "hi";
langSelect.value = savedLang;
applyLanguage(savedLang);

// ================= QUIZ LOGIC =================
const startQuiz = document.getElementById("startQuiz");
const quizArea = document.getElementById("quizArea");

startQuiz.addEventListener("click", () => {
  quizArea.style.display = "block";
  startQuiz.style.display = "none";
});

const quizData = [
  {
    question: "Giving every student the same book is example of?",
    options: ["Equality", "Equity"],
    answer: "Equality",
  },
  {
    question: "Providing extra coaching to weaker students is example of?",
    options: ["Equality", "Equity"],
    answer: "Equity",
  },
  {
    question: "Same exam fee for all is?",
    options: ["Equality", "Equity"],
    answer: "Equality",
  },
  {
    question: "Scholarship based on need is?",
    options: ["Equality", "Equity"],
    answer: "Equity",
  },
  {
    question: "Extra time to disabled students in exam is?",
    options: ["Equality", "Equity"],
    answer: "Equity",
  },
];

const quizContainer = document.getElementById("quizContainer");
const submitQuiz = document.getElementById("submitQuiz");
const quizResult = document.getElementById("quizResult");
const restartQuiz = document.getElementById("restartQuiz");

function loadQuiz() {
  quizContainer.innerHTML = "";

  quizData.forEach((q, index) => {
    const div = document.createElement("div");
    div.className = "quiz-question";

    div.innerHTML = `
      <strong>${index + 1}. ${q.question}</strong>

      <div class="options">
        ${q.options
          .map(
            (option) =>
              `<label>
   <input type="radio" name="q${index}" value="${option}">
   ${option}
</label>
`,
          )
          .join("")}
      </div>
    `;

    quizContainer.appendChild(div);
  });

  quizResult.innerHTML = "";
  restartQuiz.style.display = "none";
}

submitQuiz.addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);

    if (selected && selected.value === q.answer) {
      score++;
    }
  });

  quizResult.innerHTML = `You scored ${score} out of ${quizData.length}`;

  restartQuiz.style.display = "inline-block";
});

restartQuiz.addEventListener("click", loadQuiz);

loadQuiz();

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (document.activeElement.classList.contains("quiz-btn")) {
      document.activeElement.click();
    }
  }
});

quizContainer.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const active = document.activeElement;

    if (active && active.type === "radio") {
      active.checked = true;
    }
  }
});
// ===== SMART SCROLL HIDE CONTROL PANEL =====

// ===== SMART SCROLL HIDE CONTROL PANEL WITH SMOOTH ANIMATION =====

const panel = document.querySelector(".control-panel");

window.addEventListener("scroll", () => {
  const scrollPercent =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;

  // Mobile detection
  const isMobile = window.innerWidth <= 768;

  // Different threshold for mobile and desktop
  const threshold = isMobile ? 4 : 18;

  if (scrollPercent > threshold) {
    panel.classList.add("hide");

    setTimeout(() => {
      panel.classList.add("hidden-complete");
    }, 500);
  } else {
    panel.classList.remove("hidden-complete");
    panel.classList.remove("hide");
  }
});
