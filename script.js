// Додавання товару вручну
function addProductPrompt() {
  const imageUrl = prompt("Введіть URL зображення:");
  if (!imageUrl) return;

  const description = prompt("Введіть опис:");
  if (!description) return;

  const price = prompt("Введіть ціну (наприклад, 150):");
  if (!price) return;

  addProductCard(imageUrl, description, price);
  saveProductToStorage(imageUrl, description, price);
}

// Завантаження товарів після перезавантаження
document.addEventListener("DOMContentLoaded", () => {
  loadProductsFromStorage();
});

// Додавання товару на сторінку
function addProductCard(imageUrl, description, price) {
  const container = document.getElementById("product-container");
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.innerHTML = `
        <img src="${imageUrl}">
        <h3>${description}</h3>
        <p>Ціна: ${price} грн</p>
        <button onclick="addToCart('${encodeURIComponent(
          imageUrl
        )}', '${encodeURIComponent(
    description
  )}', '${price}')">Додати в кошик</button>
    `;

  container.appendChild(card);
}

// LocalStorage
function getStoredProducts() {
  const products = localStorage.getItem("shopProducts");
  return products ? JSON.parse(products) : [];
}

function saveProductToStorage(imageUrl, description, price) {
  const products = getStoredProducts();
  products.push({ imageUrl, description, price });
  localStorage.setItem("shopProducts", JSON.stringify(products));
}

function loadProductsFromStorage() {
  getStoredProducts().forEach((product) => {
    addProductCard(product.imageUrl, product.description, product.price);
  });
}

// Кошик
function getCartItems() {
  const cart = localStorage.getItem("cartItems");
  return cart ? JSON.parse(cart) : [];
}

function addToCart(imageUrl, description, price) {
  const cart = getCartItems();
  cart.push({
    imageUrl: decodeURIComponent(imageUrl),
    description: decodeURIComponent(description),
    price: parseFloat(price),
  });
  localStorage.setItem("cartItems", JSON.stringify(cart));
  alert("Товар додано до кошика");
}
