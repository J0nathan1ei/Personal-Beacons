const langButtons = document.querySelectorAll(".lang-option");
const translatableItems = document.querySelectorAll("[data-en][data-zh]");

function setLanguage(language) {
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";

  translatableItems.forEach((item) => {
    item.textContent = item.dataset[language];
  });

  langButtons.forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage("en");
