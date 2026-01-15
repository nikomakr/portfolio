// ===================================
// THEME SWITCHER
// ===================================

// Get all theme buttons
const themeButtons = document.querySelectorAll("[data-theme]");
const html = document.documentElement;

// Function to set theme
function setTheme(theme) {
  // Remove all theme classes
  html.classList.remove(
    "theme--dark",
    "theme--light",
    "theme--colorblind",
    "theme--bw"
  );

  // Add the selected theme
  html.classList.add(`theme--${theme}`);

  // Update active state on buttons
  themeButtons.forEach((btn) => {
    const btnTheme = btn.getAttribute("data-theme");
    const parentLi = btn.closest(".nav-icons-size");

    if (btnTheme === theme) {
      parentLi.classList.add("active");
    } else {
      parentLi.classList.remove("active");
    }
  });

  // Save theme preference to localStorage
  localStorage.setItem("preferred-theme", theme);
}

// Add click event to all theme buttons
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedTheme = button.getAttribute("data-theme");
    setTheme(selectedTheme);
  });
});

// Load saved theme on page load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("preferred-theme") || "dark";
  setTheme(savedTheme);
});

// ===================================
// PROGRAMMING QUOTE API MODAL
// ===================================

// Get modal elements
const codingIcon = document.getElementById("coding-icon");
const quoteModal = document.getElementById("quote-modal");
const modalClose = document.querySelector(".modal-close");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const quoteContainer = document.getElementById("quote-container");
const quoteLoading = document.getElementById("quote-loading");
const quoteError = document.getElementById("quote-error");

// API endpoint
const QUOTE_API_URL = "https://programming-quotesapi.vercel.app/api/random";

// Function to fetch quote from API
async function fetchProgrammingQuote() {
  try {
    // Show loading state
    quoteContainer.style.display = "none";
    quoteError.style.display = "none";
    quoteLoading.style.display = "block";

    // Fetch from API
    const response = await fetch(QUOTE_API_URL);

    // Check if response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Parse JSON
    const data = await response.json();

    // Update DOM with quote data
    quoteText.textContent = data.quote;
    quoteAuthor.textContent = data.author;

    // Show quote container, hide loading
    quoteLoading.style.display = "none";
    quoteContainer.style.display = "flex";
  } catch (error) {
    // Handle errors
    console.error("Error fetching quote:", error);

    // Show error message
    quoteLoading.style.display = "none";
    quoteError.style.display = "block";

    // Hide error after 3 seconds and retry
    setTimeout(() => {
      quoteError.style.display = "none";
      quoteContainer.style.display = "flex";
      quoteText.textContent =
        "Click the icon again to try fetching a new quote!";
      quoteAuthor.textContent = "";
    }, 3000);
  }
}

// Function to open modal
function openQuoteModal() {
  quoteModal.classList.add("show");
  fetchProgrammingQuote();
}

// Function to close modal
function closeQuoteModal() {
  quoteModal.classList.remove("show");
}

// Event Listeners
codingIcon.addEventListener("click", openQuoteModal);
modalClose.addEventListener("click", closeQuoteModal);

// Close modal when clicking outside the modal content
quoteModal.addEventListener("click", (e) => {
  if (e.target === quoteModal) {
    closeQuoteModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && quoteModal.classList.contains("show")) {
    closeQuoteModal();
  }
});
