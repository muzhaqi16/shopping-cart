window.onload = () => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const checkoutCartEl = document.querySelector("span.cart-number");
  const totalPriceEl = document.querySelector("#total-amount");

  let totalPrice = 0;

  const updateCartNumber = () => {
    checkoutCartEl.textContent = cartItems.length;
    cartItems.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    totalPriceEl.textContent = `$${parseFloat(totalPrice).toFixed(2)}`;
    renderCart();
  };

  const updateItemQuatity = (e) => {
    const id = e.target.getAttribute("data-id");
    cartItems[id].quantity += 1;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  };
  $(document).on("click", "button.increase-amount", updateItemQuatity);

  const renderCart = () => {
    const cardBodyEl = document.querySelector(".card-body");
    cardBodyEl.innerHTML = `<h5 class="mb-4">Cart (<span id="item-number">${cartItems.length}</span> items)</h5>`;
    cartItems.forEach((item) => {
      cardBodyEl.innerHTML += ` <div class="row mb-4">
        <div class="col-md-5 col-lg-3 col-xl-3">
            <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
                <img class="img-fluid w-100"
                    src="${item.images[0]}"
                    alt="Sample">
                <a href="#!">
                    <div class="mask waves-effect waves-light">
                        <img class="img-fluid w-100"
                            src="${item.images[1]}">
                        <div class="mask rgba-black-slight waves-effect waves-light"></div>
                    </div>
                </a>
            </div>
        </div>
        <div class="col-md-7 col-lg-9 col-xl-9">
            <div>
                <div class="d-flex justify-content-between">
                    <div>
                        <h5 class="item-name">${item.itemName}</h5>
                        <p class="mb-3 text-muted text-uppercase small">${item.type}</p>
                        <p class="mb-2 text-muted text-uppercase small">Color: blue</p>
                        <p class="mb-3 text-muted text-uppercase small">Size: M</p>
                    </div>
                    <div>
                        <div class="def-number-input number-input safari_only mb-0 w-100">
                            <button
                                onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                                class="minus"></button>
                            <input class="quantity" min="0" name="quantity" value="${item.quantity}"
                                type="number">
                            <button class="increase-amount" data-id="${item.id}"
                                class="plus"></button>
                        </div>
                        <small id="passwordHelpBlock"
                            class="form-text text-muted text-center">
                            (Note, 1 piece)
                        </small>
                    </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <a href="#!" type="button"
                            class="card-link-secondary small text-uppercase mr-3"><i
                                class="fas fa-trash-alt mr-1"></i> Remove item </a>
                        <a href="#!" type="button"
                            class="card-link-secondary small text-uppercase"><i
                                class="fas fa-heart mr-1"></i> Move to wish list </a>
                    </div>
                    <p class="mb-0"><span><strong>$${item.price}</strong></span></p>
                </div>
            </div>
        </div>
    </div>
    <hr class="mb-4">`;
    });
    cardBodyEl.innerHTML += `<p class="text-primary mb-0"><i class="fas fa-info-circle mr-1"></i> Do not delay the
    purchase, adding
    items to your cart does not mean booking them.</p>`;
  };
  updateCartNumber();
};
