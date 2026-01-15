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
const revealButton = document.getElementById("reveal-punchline");

// API endpoint - Official Joke API (Programming Jokes)
const QUOTE_API_URL =
  "https://official-joke-api.appspot.com/jokes/programming/random";

// Function to fetch joke from API
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

    // Parse JSON - Official Joke API returns an ARRAY with one joke object
    const data = await response.json();
    const joke = data[0]; // Get first joke from the array

    // Update DOM with joke data - show setup first
    quoteText.textContent = joke.setup;
    quoteAuthor.textContent = ""; // Clear author field initially

    // Store punchline for reveal button
    quoteText.dataset.punchline = joke.punchline;

    // Show quote container, hide loading
    quoteLoading.style.display = "none";
    quoteContainer.style.display = "flex";

    // Show reveal button
    revealButton.style.display = "block";
    revealButton.textContent = "🎭 Reveal Punchline";
    revealButton.disabled = false;
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
  // Reset reveal button when closing
  revealButton.style.display = "none";
}

// Function to reveal punchline
function revealPunchline() {
  const punchline = quoteText.dataset.punchline;
  if (punchline) {
    quoteAuthor.textContent = punchline;
    quoteAuthor.style.fontStyle = "italic";
    quoteAuthor.style.color = "var(--hover)";

    // Change button text and disable it
    revealButton.textContent = "😂 Haha!";
    revealButton.disabled = true;
    revealButton.style.opacity = "0.5";
  }
}

// Event Listeners
codingIcon.addEventListener("click", openQuoteModal);
modalClose.addEventListener("click", closeQuoteModal);
revealButton.addEventListener("click", revealPunchline);

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

// ===================================
// PORTFOLIO CAROUSEL
// ===================================

const projectsContainer = document.getElementById("projects-container");
const carouselPrev = document.getElementById("carousel-prev");
const carouselNext = document.getElementById("carousel-next");
const carouselIndicators = document.getElementById("carousel-indicators");

let currentIndex = 0;
let projectsPerView = 3; // Desktop default
let totalProjects = 0;
let maxIndex = 0;

// Calculate projects per view based on screen size
function updateProjectsPerView() {
  const width = window.innerWidth;
  if (width < 768) {
    projectsPerView = 1; // Mobile: 1 project
  } else if (width < 1024) {
    projectsPerView = 2; // Tablet: 2 projects
  } else {
    projectsPerView = 3; // Desktop: 3 projects
  }

  totalProjects = document.querySelectorAll(".project").length;
  maxIndex = Math.max(0, totalProjects - projectsPerView);

  // Reset to valid index if needed
  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  updateCarousel();
  createIndicators();
}

// Update carousel position
function updateCarousel() {
  if (!projectsContainer) return;

  // Calculate translation based on current index and column width + gap
  const gap = parseFloat(getComputedStyle(projectsContainer).gap) || 0;
  const containerWidth = projectsContainer.parentElement.offsetWidth;
  const projectWidth = containerWidth / projectsPerView;
  const translateX = -(currentIndex * (projectWidth + gap));

  projectsContainer.style.transform = `translateX(${translateX}px)`;

  // Update arrow states
  if (carouselPrev) {
    carouselPrev.disabled = currentIndex === 0;
  }
  if (carouselNext) {
    carouselNext.disabled = currentIndex >= maxIndex;
  }

  // Update indicators
  updateIndicators();
}

// Create indicator dots
function createIndicators() {
  if (!carouselIndicators) return;

  carouselIndicators.innerHTML = "";

  // Only show indicators if there are more projects than visible
  if (totalProjects <= projectsPerView) {
    return;
  }

  const numIndicators = maxIndex + 1;

  for (let i = 0; i < numIndicators; i++) {
    const indicator = document.createElement("button");
    indicator.classList.add("carousel-indicator");
    indicator.setAttribute("aria-label", `Go to slide ${i + 1}`);

    if (i === currentIndex) {
      indicator.classList.add("active");
    }

    indicator.addEventListener("click", () => {
      currentIndex = i;
      updateCarousel();
    });

    carouselIndicators.appendChild(indicator);
  }
}

// Update indicator states
function updateIndicators() {
  const indicators = document.querySelectorAll(".carousel-indicator");
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

// Navigate to previous projects
function navigatePrev() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
}

// Navigate to next projects
function navigateNext() {
  if (currentIndex < maxIndex) {
    currentIndex++;
    updateCarousel();
  }
}

// Event listeners for carousel
if (carouselPrev) {
  carouselPrev.addEventListener("click", navigatePrev);
}

if (carouselNext) {
  carouselNext.addEventListener("click", navigateNext);
}

// Keyboard navigation for carousel
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    navigatePrev();
  } else if (e.key === "ArrowRight") {
    navigateNext();
  }
});

// Initialize and update on resize
window.addEventListener("resize", updateProjectsPerView);
window.addEventListener("DOMContentLoaded", updateProjectsPerView);

// ===================================
// CONTACT VERIFICATION MODAL
// ===================================

const contactBtn = document.getElementById("open-contact-btn");
const contactModal = document.getElementById("contact-modal");
const contactModalClose = document.getElementById("contact-modal-close");
const verificationInput = document.getElementById("verification-input");
const verifyBtn = document.getElementById("verify-btn");
const verificationError = document.getElementById("verification-error");
const verificationContainer = document.getElementById("verification-container");
const emailRevealContainer = document.getElementById("email-reveal-container");
const verificationQuestion = document.getElementById("verification-question");

// Generate random math problem
let currentAnswer = 0;

function generateMathProblem() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operations = [
    { symbol: "+", calculate: (a, b) => a + b },
    { symbol: "-", calculate: (a, b) => a - b },
    { symbol: "×", calculate: (a, b) => a * b },
  ];

  const operation = operations[Math.floor(Math.random() * operations.length)];
  currentAnswer = operation.calculate(num1, num2);

  verificationQuestion.textContent = `What is ${num1} ${operation.symbol} ${num2}?`;
}

// Open contact modal
function openContactModal() {
  contactModal.classList.add("show");
  generateMathProblem();
  verificationInput.value = "";
  verificationError.style.display = "none";
  verificationContainer.style.display = "block";
  emailRevealContainer.style.display = "none";

  // Focus on input
  setTimeout(() => verificationInput.focus(), 100);
}

// Close contact modal
function closeContactModal() {
  contactModal.classList.remove("show");
}

// Verify answer
function verifyAnswer() {
  const userAnswer = parseInt(verificationInput.value);

  if (userAnswer === currentAnswer) {
    // Correct! Show email
    verificationContainer.style.display = "none";
    emailRevealContainer.style.display = "block";
  } else {
    // Wrong answer
    verificationError.style.display = "block";
    verificationInput.value = "";
    verificationInput.focus();

    // Hide error after 3 seconds
    setTimeout(() => {
      verificationError.style.display = "none";
    }, 3000);
  }
}

// Event Listeners
if (contactBtn) {
  contactBtn.addEventListener("click", openContactModal);
}

if (contactModalClose) {
  contactModalClose.addEventListener("click", closeContactModal);
}

if (verifyBtn) {
  verifyBtn.addEventListener("click", verifyAnswer);
}

// Allow Enter key to submit verification
if (verificationInput) {
  verificationInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      verifyAnswer();
    }
  });
}

// Close modal when clicking outside
if (contactModal) {
  contactModal.addEventListener("click", (e) => {
    if (e.target === contactModal) {
      closeContactModal();
    }
  });
}

// Close contact modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && contactModal.classList.contains("show")) {
    closeContactModal();
  }
});
