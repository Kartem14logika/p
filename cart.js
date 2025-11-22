document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
  calculateTotal();
});

function getCartItems() {
  const cart = localStorage.getItem("cartItems");
  return cart ? JSON.parse(cart) : [];
}

function displayCartItems() {
  const container = document.getElementById("cart-container");
  const items = getCartItems();

  if (items.length === 0) {
    container.innerHTML = "<p>Кошик порожній.</p>";
    return;
  }

  container.innerHTML = "";

  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
            <img src="${item.imageUrl}" style="width: 120px">
            <div>
                <h3>${item.description}</h3>
                <p>Ціна: ${item.price.toFixed(2)} грн</p>
                <button onclick="removeFromCart(${index})">Видалити</button>
            </div>
        `;

    container.appendChild(div);
  });
}

function calculateTotal() {
  const total = getCartItems().reduce((s, i) => s + i.price, 0);
  document.getElementById(
    "total-price-display"
  ).innerText = `Загальна сума: ${total.toFixed(2)} грн`;
}

function removeFromCart(index) {
  const items = getCartItems();
  items.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(items));
  displayCartItems();
  calculateTotal();
}
