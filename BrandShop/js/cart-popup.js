document.addEventListener('DOMContentLoaded', function () {
    const cartCount = document.querySelector('.cart__count');
    const cartItemsList = document.getElementById('cart-items');
    console.log('cartItemsList:', cartItemsList); // Лог для проверки

    const popup = document.getElementById('popup');
    console.log('popup:', popup); // Лог для проверки
    const productContainer = document.querySelector('.goods__list');

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        cartCount.textContent = totalCount;
    }

    function openPopup(event) {
        event.preventDefault();
        console.log('openPopup called');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (popup && cartItemsList) {
            cartItemsList.innerHTML = '';

            if (cart.length === 0) {
                cartItemsList.innerHTML = '<li>Ваша корзина пуста.</li>';
            } else {
                const itemsToShow = cart.slice(0, 5);
                itemsToShow.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;">
                        <span>${item.title} (${item.quantity || 1})</span>
                        <span>${item.price} руб.</span>
                    `;
                    cartItemsList.appendChild(listItem);
                });
            }

            popup.style.display = 'block';
        } else {
            console.error('Popup or cart items list not found');
        }
    }

    updateCartCount();

    const cartIcon = document.querySelector('.nav__link--cart');
    if (cartIcon) {
        cartIcon.addEventListener('click', function (event) {
            console.log('Cart icon clicked');
            openPopup(event);
        });
    } else {
        console.error('Cart icon not found');
    }

    popup.addEventListener('click', function (event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });

    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            popup.style.display = 'none';
        });
    } else {
        console.error('Close button not found');
    }

    productContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('product__add')) {
            const productItem = event.target.closest('.goods__item');
            const product = {
                title: productItem.querySelector('.product__title').textContent,
                price: productItem.querySelector('.product__price').textContent,
                image: productItem.querySelector('.product__image').src,
                category: productItem.getAttribute('data-category'),
                trend: productItem.getAttribute('data-trend'),
                size: productItem.getAttribute('data-size'),
                quantity: 1
            };

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(cartItem => cartItem.title === product.title && cartItem.size === product.size);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        }
    });

    updateCartCount();
});