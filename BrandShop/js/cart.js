document.addEventListener('DOMContentLoaded', function () {
    const cartList = document.getElementById('cart-list');
    const cartCount = document.querySelector('.cart__count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotalElement = document.querySelector('.cart__checkout-subtotal');
    const grandtotalElement = document.querySelector('.cart__checkout-grandtotal');

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
    }

    function calculateTotals() {
        let subtotal = 0;
        cart.forEach(item => {
            subtotal += item.price * (item.quantity || 1);
        });

        subtotalElement.innerHTML = `<span>SUB TOTAL</span> $${subtotal.toFixed(2)}`;
        grandtotalElement.innerHTML = `<span>GRAND TOTAL</span> $${subtotal.toFixed(2)}`;
    }

    updateCartCount();

    if (cart.length === 0) {
        cartList.innerHTML = '<li class="empty-cart-message">Your cart is empty</li>';
        subtotalElement.innerHTML = `<span>SUB TOTAL</span> $0.00`;
        grandtotalElement.innerHTML = `<span>GRAND TOTAL</span> $0.00`;
    } else {
        const uniqueItems = {};

        cart.forEach(item => {
            const key = item.id || item.title;
            if (uniqueItems[key]) {
                uniqueItems[key].quantity += item.quantity || 1;
            } else {
                uniqueItems[key] = { ...item, quantity: item.quantity || 1 };
            }
        });

        Object.values(uniqueItems).forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="cart__item">
                    <img src="${item.image}" alt="${item.title}">
                    <span class="cart__item-title">${item.title}</span>
                    <span class="cart__item-price">
                        <span class="price-label">Price:</span> 
                        <span class="price-value">$${item.price}</span>
                    </span>
                    <span class="cart__item-size">Size: ${item.size}</span>
                    <span class="cart__item-size">Quantity: <input type="number" value="${item.quantity}" min="1" /></span>
                    <button class="cart__item-remove" data-id="${item.id || item.title}">✖</button>
                </div>
            `;
            cartList.appendChild(listItem);
        });

        calculateTotals();
    }

    cartList.addEventListener('click', function (event) {
        if (event.target.classList.contains('cart__item-remove')) {
            const itemId = event.target.getAttribute('data-id');
            removeItemFromCart(itemId);
        }
    });

    function removeItemFromCart(itemId) {
        const updatedCart = cart.filter(item => (item.id || item.title) !== itemId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        const itemElement = cartList.querySelector(`.cart__item-remove[data-id="${itemId}"]`).closest('li');
        if (itemElement) {
            cartList.removeChild(itemElement);
        }

        if (updatedCart.length === 0) {
            cartList.innerHTML = '<li class="empty-cart-message">Your cart is empty</li>';
        }

        updateCartCount();
        calculateTotals();
    }
    function clearCart() {
        localStorage.removeItem('cart');
        cartList.innerHTML = '<li class="empty-cart-message">Your cart is empty</li>';
        cartCount.textContent = '0';
        subtotalElement.innerHTML = `<span>SUB TOTAL</span> $0.00`;
        grandtotalElement.innerHTML = `<span>GRAND TOTAL</span> $0.00`;
    }

    const clearButton = document.querySelector('.cart__content-buttons .cart__button');
    clearButton.addEventListener('click', clearCart);

});