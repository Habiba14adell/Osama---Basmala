function padNumber(value) {
  return String(value).padStart(2, "0");
}

function getTimeParts(distance) {
  const seconds = Math.max(0, Math.floor(distance / 1000));

  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

function updateCountdown(countdown) {
  const target = new Date(countdown.dataset.countdown).getTime();
  const parts = getTimeParts(target - Date.now());

  countdown.querySelector("[data-days]").textContent = padNumber(parts.days);
  countdown.querySelector("[data-hours]").textContent = padNumber(parts.hours);
  countdown.querySelector("[data-minutes]").textContent = padNumber(parts.minutes);
  countdown.querySelector("[data-seconds]").textContent = padNumber(parts.seconds);
}

function initCountdown() {
  const countdown = document.querySelector("[data-countdown]");

  if (!countdown) return;

  updateCountdown(countdown);
  window.setInterval(() => updateCountdown(countdown), 1000);
}

function updateMusicButton(button, isPlaying) {
  button.hidden = false;
  const language = document.documentElement.lang === "ar" ? "ar" : "en";
  const labels = {
    en: {
      play: "Play Music",
      stop: "Stop Music",
    },
    ar: {
      play: "تشغيل الموسيقى",
      stop: "إيقاف الموسيقى",
    },
  };

  button.textContent = isPlaying ? labels[language].stop : labels[language].play;
  button.setAttribute("aria-pressed", String(isPlaying));
}

function initMusic() {
  const audio = document.querySelector(".wedding-audio");
  const button = document.querySelector(".music-toggle");

  if (!audio || !button) return;

  audio.volume = 0.55;

  const playMusic = () => {
    const playAttempt = audio.play();

    if (!playAttempt) {
      updateMusicButton(button, true);
      return;
    }

    playAttempt
      .then(() => updateMusicButton(button, true))
      .catch(() => updateMusicButton(button, false));
  };

  button.addEventListener("click", () => {
    if (audio.paused) {
      playMusic();
      return;
    }

    audio.pause();
    updateMusicButton(button, false);
  });

  playMusic();
}

function setLanguage(language) {
  const isArabic = language === "ar";
  const nextLanguage = isArabic ? "ar" : "en";
  const toggle = document.querySelector("[data-language-toggle]");
  const musicButton = document.querySelector(".music-toggle");
  const audio = document.querySelector(".wedding-audio");

  document.documentElement.lang = nextLanguage;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";

  document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
    element.textContent = element.dataset[nextLanguage];
  });

  if (toggle) {
    toggle.textContent = isArabic ? "EN" : "AR";
    toggle.setAttribute("aria-label", isArabic ? "Switch to English" : "Switch to Arabic");
  }

  if (musicButton && audio) {
    updateMusicButton(musicButton, !audio.paused);
  }
}

function initLanguageToggle() {
  const toggle = document.querySelector("[data-language-toggle]");

  if (!toggle) return;

  toggle.addEventListener("click", () => {
    const nextLanguage = document.documentElement.lang === "ar" ? "en" : "ar";
    setLanguage(nextLanguage);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCountdown();
  initMusic();
  initLanguageToggle();
});
