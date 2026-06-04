const menuButton = document.querySelector(".mobile-menu-button");
const closeButton = document.querySelector(".mobile-menu-close");
const mobileMenu = document.querySelector(".mobile-menu");

if (menuButton && closeButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
  });

  closeButton.addEventListener("click", () => {
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
  });
}

const addToCartButton = document.querySelector(".add-to-cart");
const cartButton = document.querySelector(".cart-button");
const cartCount = document.querySelector(".cart-count");
const cartSidebar = document.querySelector(".cart-sidebar");
const cartOverlay = document.querySelector(".cart-overlay");
const cartClose = document.querySelector(".cart-close");
const clearCartButton = document.querySelector(".clear-cart-button");

const cartSidebarQuantity = document.querySelector(".cart-sidebar-quantity");
const cartTotalPrice = document.querySelector(".cart-total-price");
const cartItemOption = document.querySelector(".cart-item-option");
const cartItemPrice = document.querySelector(".cart-item-price");

const quantityValue = document.querySelector(".quantity-selector span");
const quantityButtons = document.querySelectorAll(".quantity-selector button");
const purchaseInputs = document.querySelectorAll('input[name="purchase"]');

let quantity = 1;
let cartQuantity = 0;

function getSelectedPurchase() {
  const selectedInput = document.querySelector('input[name="purchase"]:checked');
  const label = selectedInput.closest(".purchase-option");
  const text = label.textContent.trim();

  if (text.includes("Subscribe")) {
    return {
      option: "Subscribe",
      price: 30,
    };
  }

  return {
    option: "Buy Once",
    price: 38,
  };
}

function updateQuantity() {
  quantityValue.textContent = quantity;
}

function updateCartUI() {
  const selectedPurchase = getSelectedPurchase();

  cartCount.textContent = cartQuantity;
  cartSidebarQuantity.textContent = cartQuantity;
  cartItemOption.textContent = selectedPurchase.option;
  cartItemPrice.textContent = `$${selectedPurchase.price}`;
  cartTotalPrice.textContent = selectedPurchase.price * cartQuantity;

  if (cartQuantity > 0) {
    cartButton.classList.remove("is-empty");
    cartButton.classList.add("has-items");
  } else {
    cartButton.classList.add("is-empty");
    cartButton.classList.remove("has-items");
  }
}

function openCart() {
  cartSidebar.classList.add("is-open");
  cartSidebar.setAttribute("aria-hidden", "false");
  cartOverlay.classList.add("is-open");
}

function closeCart() {
  cartSidebar.classList.remove("is-open");
  cartSidebar.setAttribute("aria-hidden", "true");
  cartOverlay.classList.remove("is-open");
}

quantityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent.trim() === "+" && quantity < 10) {
      quantity += 1;
    }

    if (button.textContent.trim() === "-" && quantity > 1) {
      quantity -= 1;
    }

    updateQuantity();
  });
});

addToCartButton.addEventListener("click", () => {
  cartQuantity += quantity;
  updateCartUI();

  addToCartButton.classList.add("added");
  cartButton.classList.add("cart-bump", "cart-spark");

  setTimeout(() => {
    addToCartButton.classList.remove("added");
    cartButton.classList.remove("cart-bump", "cart-spark");
  }, 500);
});

purchaseInputs.forEach((input) => {
  input.addEventListener("change", updateCartUI);
});

cartButton.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

clearCartButton.addEventListener("click", () => {
  cartQuantity = 0;
  updateCartUI();
});

updateQuantity();
updateCartUI();