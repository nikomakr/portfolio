document.addEventListener("DOMContentLoaded", () => {
  const themeToggles = document.querySelectorAll("[data-theme]");
  const toggleItems = document.querySelectorAll(".nav-icons-size");

  themeToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const theme = toggle.dataset.theme;

      document.documentElement.className = `theme--${theme}`;
      localStorage.setItem("theme", theme);

      toggleItems.forEach((item) => item.classList.remove("active"));

      toggle.closest(".nav-icon-size").classList.add("active");
    });
  });

  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.className = `theme--${savedTheme}`;

  const savedToggle = document.querySelector(`[data-theme="${savedTheme}"]`);
  if (savedToggle) {
    savedToggle.closest(".nav-icon-size").classList.add("active");
  }
});
