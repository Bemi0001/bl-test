const menuButton = document.querySelector(".mobile-menu-button");
const closeButton = document.querySelector(".mobile-menu-close");
const mobileMenu = document.querySelector(".mobile-menu");

menuButton.addEventListener("click", () => {
  mobileMenu.classList.add("is-open");
  mobileMenu.setAttribute("aria-hidden", "false");
});

closeButton.addEventListener("click", () => {
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");
});