document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.querySelector('.goods__list');
    const cartCount = document.querySelector('.cart__count');
    const cartList = document.getElementById('cart-list'); // Добавляем ссылку на список корзины

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0); // Считаем общее количество
        cartCount.textContent = totalCount;
    }

    function updateCartDisplay() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartList.innerHTML = ''; // Очищаем текущий список

        if (cart.length === 0) {
            cartList.innerHTML = '<li>Ваша корзина пуста</li>';
        } else {
            cart.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <span>${item.title} (${item.quantity || 1})</span> <!-- Отображаем количество -->
                    <span>Цена: ${item.price}</span>
                    <span>Размер: ${item.size}</span>
                    <input type="number" value="${item.quantity || 1}" min="1" style="width: 50px;" />
                `;
                cartList.appendChild(listItem);
            });
        }
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
                quantity: 1 // Устанавливаем начальное количество
            };

            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(cartItem => cartItem.title === product.title && cartItem.size === product.size);

            if (existingItem) {
                existingItem.quantity += 1; // Увеличиваем количество
            } else {
                cart.push(product); // Добавляем новый товар
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay(); // Обновляем отображение корзины
            alert(`${product.title} добавлен!`);

            // Открываем попап после добавления товара
            openPopup(); // Убедитесь, что эта функция доступна в области видимости
        }
    });

    updateCartCount();
    updateCartDisplay(); // Обновляем отображение корзины при загрузке страницы
});