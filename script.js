const langButtons = document.querySelectorAll(".lang-option");
const translatableItems = document.querySelectorAll("[data-en][data-zh]");
const visitorCount = document.querySelector(".visitor-count");
const visitorCounterEndpoint =
  "https://personal-beacon-counter.jonathanlei-ps.workers.dev";
const localPreviewVisitorNumber = 128;

let currentLanguage = "en";
let visitorNumber = null;

function isLocalPreview() {
  return (
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.protocol === "file:"
  );
}

function setLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

  translatableItems.forEach((item) => {
    item.textContent = item.dataset[language];
  });

  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  updateVisitorText();
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

function updateVisitorText() {
  if (!visitorCount || !visitorNumber) return;

  visitorCount.textContent =
    currentLanguage === "zh"
      ? `您是第 ${visitorNumber} 个访问者, 谢谢 :)`
      : `You are visitor No. ${visitorNumber}, thank you :)`;
  visitorCount.hidden = false;
}

async function loadVisitorCount() {
  if (!visitorCount) return;

  if (!visitorCounterEndpoint) {
    if (isLocalPreview()) {
      visitorNumber = localPreviewVisitorNumber;
      updateVisitorText();
    }

    return;
  }

  try {
    const response = await fetch(visitorCounterEndpoint, {
      method: "POST",
      cache: "no-store",
    });

    if (!response.ok) return;

    const data = await response.json();
    if (!Number.isFinite(data.count)) return;

    visitorNumber = data.count;
    updateVisitorText();
  } catch {
    if (isLocalPreview()) {
      visitorNumber = localPreviewVisitorNumber;
      updateVisitorText();
      return;
    }

    visitorCount.hidden = true;
  }
}

setLanguage("en");
loadVisitorCount();
