// A $( document ).ready() block.
$(function () {
  // keep track of items in cart
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const checkoutCart = document.querySelector("span.cart-number");
  const updateCartNumber = () => {
    checkoutCart.textContent = cartItems.length;
  };

  const addItemToCart = (event) => {
    const parent = event.target.parentElement;
    const itemName = parent.querySelector("h5").textContent;
    const type = parent.querySelector("p.type").textContent;
    const price = parseFloat(
      parent.querySelector("strong.price").textContent.replace("$", "")
    ).toFixed(2);
    const quantity = 1;
    const id = cartItems.length;
    const imagesEl = parent.parentNode.querySelectorAll("img.img-fluid");
    const images = [];
    imagesEl.forEach((image) => {
      images.push(image.getAttribute("src"));
    });
    cartItems.push({ id, itemName, type, price, quantity, images });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartNumber();
  };
  // select all add to cart buttons
  const addToCart = document.querySelectorAll(
    "button[type='button'].add-to-cart"
  );

  addToCart.forEach((item) => item.addEventListener("click", addItemToCart));
  updateCartNumber();
});
