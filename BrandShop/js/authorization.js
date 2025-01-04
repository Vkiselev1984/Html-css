document.addEventListener('DOMContentLoaded', function () {
    const openAuthPopupButton = document.getElementById('open-auth-popup');
    const authPopup = document.getElementById('auth-popup');
    const authForm = document.getElementById('auth-form');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username');
    const closePopupButton = document.getElementById('close-popup');
    const logoutButton = document.getElementById('logout-button'); // Кнопка выхода

    // Проверка на наличие информации о пользователе в localStorage
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        userInfo.style.display = 'block'; // Показать информацию о пользователе
        usernameDisplay.textContent = user.name; // Отобразить имя пользователя
        authForm.style.display = 'none'; // Скрыть форму входа
    } else {
        authForm.style.display = 'block'; // Показать форму входа, если пользователь не авторизован
        userInfo.style.display = 'none'; // Скрыть информацию о пользователе
    }

    if (openAuthPopupButton && authPopup) {
        openAuthPopupButton.addEventListener('click', function () {
            authPopup.style.display = 'block'; // Открыть попап
        });
    } else {
        console.error('Popup button or popup element not found.');
    }

    if (authForm) {
        authForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission

            const email = this[0].value; // Get the email input value
            const password = this[1].value; // Get the password input value

            fetch('users.csv')
                .then(response => response.text())
                .then(data => {
                    const users = parseCSV(data); // Parse the CSV data
                    const user = users.find(user => user.email === email && user.password === password);

                    if (user) {
                        alert('Login successful!');
                        localStorage.setItem('loggedInUser', JSON.stringify(user)); // Сохранить информацию о пользователе в localStorage
                        authPopup.style.display = 'none'; // Close the popup
                        authForm.style.display = 'none'; // Скрыть форму входа
                        userInfo.style.display = 'block'; // Показать информацию о пользователе
                        usernameDisplay.textContent = user.name; // Отобразить имя пользователя
                    } else {
                        alert('Invalid email or password.'); // Show error message
                    }
                })
                .catch(error => console.error('Error fetching users:', error));
        });
    } else {
        console.error('Auth form not found.');
    }

    // Обработчик для закрытия попапа при клике на крестик
    if (closePopupButton) {
        closePopupButton.addEventListener('click', function () {
            authPopup.style.display = 'none'; // Close the popup
        });
    } else {
        console.error('Close popup button not found.');
    }

    // Обработчик для закрытия попапа при клике вне области содержимого
    window.addEventListener('click', function (event) {
        if (event.target === authPopup) {
            authPopup.style.display = 'none'; // Close the popup
        }
    });

    // Обработчик для выхода из системы
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('loggedInUser'); // Удалить информацию о пользователе из localStorage
            authForm.style.display = 'block'; // Показать форму входа
            userInfo.style.display = 'none'; // Скрыть информацию о пользователе
        });
    }
});

function parseCSV(data) {
    const lines = data.split('\n');
    const users = [];

    for (let line of lines) {
        const fields = line.split(',');
        if (fields.length >= 5) { // Убедитесь, что есть как минимум 5 полей
            const name = fields[0].trim(); // Имя находится на 1-м месте
            const email = fields[3].trim(); // Email находится на 4-м месте
            const password = fields[4].trim(); // Пароль находится на 5-м месте
            console.log(`Parsed user: ${name}, ${email}, ${password}`); // Отладочное сообщение
            users.push({ name, email, password });
        } else {
            console.warn(`Invalid line in CSV: ${line}`); // Отладочное сообщение
        }
    }
    return users;
}