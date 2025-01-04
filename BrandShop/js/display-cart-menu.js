document.addEventListener('DOMContentLoaded', function () {
    const cartCount = document.querySelector('.cart__count');
    const cartItemsList = document.getElementById('cart-items');
    const popup = document.getElementById('popup');

    // Функция для обновления счетчика
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0); // Считаем общее количество
        cartCount.textContent = totalCount;
    }

    // Обновляем счетчик при загрузке страницы
    updateCartCount();

    // Функция для открытия попапа
    function openPopup(event) {
        event.preventDefault(); // Prevent the default link behavior
        const cart = JSON.parse(localStorage.getItem('cart')) || []; // Считываем актуальные данные из localStorage
        cartItemsList.innerHTML = ''; // Clear previous items

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<li>Ваша корзина пуста.</li>';
        } else {
            // Limit to 5 items
            const itemsToShow = cart.slice(0, 5);
            itemsToShow.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px;">
                    <span>${item.title} (${item.quantity || 1})</span> <!-- Отображаем количество -->
                    <span>${item.price} руб.</span>
                `;
                cartItemsList.appendChild(listItem);
            });
        }

        popup.style.display = 'block'; // Show the pop-up
    }

    // Обработчик клика по иконке корзины
    const cartIcon = document.querySelector('.nav__link--cart');
    if (cartIcon) {
        cartIcon.addEventListener('click', function (event) {
            console.log('Cart icon clicked'); // Проверка клика
            openPopup(event);
        });
    } else {
        console.error('Cart icon not found');
    }

    // Закрытие попапа при клике на элемент с классом popup
    popup.addEventListener('click', function (event) {
        if (event.target === popup) { // Проверяем, был ли клик именно на элементе popup
            popup.style.display = 'none'; // Скрыть попап
        }
    });

    // Закрытие попапа при нажатии на крестик
    const closeButton = document.querySelector('.close');
    if (closeButton) {
        closeButton.addEventListener('click', function () {
            popup.style.display = 'none'; // Скрыть попап
        });
    } else {
        console.error('Close button not found');
    }
});