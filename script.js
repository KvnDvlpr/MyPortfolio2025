// Enhanced popup function with device detection
function showImagePopup() {
  const popup = document.getElementById("imagePopup");

  if (window.innerWidth < 300) {
    return;
  }

  setTimeout(() => {
    popup.classList.add("show");
  }, 1000);

  const hideDelay = window.innerWidth < 768 ? 4000 : 5000;
  setTimeout(() => {
    popup.classList.remove("show");
  }, hideDelay);
}

function profileClick() {
  const profileWrapper = document.querySelector(".profile-image-wrapper");

  if (window.innerWidth > 768) {
    profileWrapper.style.transform = "scale(1.1) rotate(5deg)";
    setTimeout(() => {
      profileWrapper.style.transform = "scale(1) rotate(0deg)";
    }, 300);
  } else {
    profileWrapper.style.transform = "scale(1.05)";
    setTimeout(() => {
      profileWrapper.style.transform = "scale(1)";
    }, 200);
  }
}

function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("mobile-active");
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
    document.querySelector(".nav-links").classList.remove("mobile-active");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 }
);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("section").forEach((sec) => observer.observe(sec));
  showImagePopup();
});
