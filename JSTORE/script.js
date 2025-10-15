// Wait for the DOM to be fully loaded before running scripts
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Page navigation logic
  const pageSections = document.querySelectorAll(".page-section");
  const navLinks = document.querySelectorAll(".nav-link");

  function showPage(pageId) {
    pageSections.forEach((section) => {
      section.classList.remove("active");
    });

    const targetPage = document.getElementById(pageId + "-page");
    if (targetPage) {
      targetPage.classList.add("active");
    }

    navLinks.forEach((link) => {
      if (link.dataset.page === pageId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    if (mobileMenu) {
      mobileMenu.classList.add("hidden");
    }
    window.scrollTo(0, 0);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const pageId = link.dataset.page;
      if (pageId) {
        showPage(pageId);
      }
    });
  });

  // --- Services Slider Logic ---
  const sliderTrack = document.getElementById("slider-track");
  const prevButton = document.getElementById("prev-slide");
  const nextButton = document.getElementById("next-slide");

  if (sliderTrack && prevButton && nextButton) {
    const slides = Array.from(sliderTrack.children);
    let slideWidth =
      slides.length > 0 ? slides[0].getBoundingClientRect().width : 0;
    let currentIndex = 0;
    let autoSlideInterval;

    const goToSlide = (index) => {
      if (slides.length === 0) return;
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }
      sliderTrack.style.transform = `translateX(-${slideWidth * index}px)`;
      currentIndex = index;
    };

    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideInterval);
    };

    nextButton.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
      startAutoSlide();
    });

    prevButton.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
      startAutoSlide();
    });

    window.addEventListener("resize", () => {
      if (slides.length > 0) {
        slideWidth = slides[0].getBoundingClientRect().width;
        sliderTrack.style.transition = "none";
        goToSlide(currentIndex);
        setTimeout(() => {
          sliderTrack.style.transition = "transform 0.5s ease-in-out";
        }, 50);
      }
    });

    startAutoSlide();
  }

  // --- Chatbot Logic ---
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatWindow = document.getElementById("chat-window");
  const closeChat = document.getElementById("close-chat");
  const chatForm = document.getElementById("chat-form");
  const chatInput = document.getElementById("chat-input");
  const chatMessages = document.getElementById("chat-messages");

  if (
    chatbotToggle &&
    chatWindow &&
    closeChat &&
    chatForm &&
    chatInput &&
    chatMessages
  ) {
    const toggleChatWindow = () => {
      chatWindow.classList.toggle("hidden");
      if (!chatWindow.classList.contains("hidden")) {
        lucide.createIcons(); // Re-render icons if they are inside the chat
      }
    };

    chatbotToggle.addEventListener("click", toggleChatWindow);
    closeChat.addEventListener("click", toggleChatWindow);

    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const messageText = chatInput.value.trim();
      if (messageText) {
        addMessage(messageText, "user");
        chatInput.value = "";
        // Simulate a bot response
        setTimeout(getBotResponse, 1000);
      }
    });

    function addMessage(text, sender) {
      const messageElement = document.createElement("div");
      messageElement.classList.add("chat-message", sender);

      const p = document.createElement("p");
      p.textContent = text;
      messageElement.appendChild(p);

      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }

    function getBotResponse() {
      // This is a mock response. In a real application, you would
      // call an API to a language model (like Gemini).
      const responses = [
        "I'm sorry, I'm just a demo bot. I can't process that yet.",
        "Thanks for your message! A real human will get back to you shortly.",
        "Did you know we have a sale on electronics this week?",
        "You can find your order history in the 'My Account' section.",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      addMessage(randomResponse, "bot");
    }
  }
});
