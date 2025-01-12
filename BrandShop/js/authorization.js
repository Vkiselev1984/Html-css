document.addEventListener('DOMContentLoaded', function () {
    const openAuthPopupButton = document.getElementById('open-auth-popup');
    const authPopup = document.getElementById('auth-popup');
    const authForm = document.getElementById('auth-form');
    const userInfo = document.getElementById('user-info');
    const usernameDisplay = document.getElementById('username');
    const closePopupButton = document.getElementById('close-popup');
    const logoutButton = document.getElementById('logout-button');

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        userInfo.style.display = 'block';
        usernameDisplay.textContent = user.name;
        authForm.style.display = 'none';
    } else {
        authForm.style.display = 'block';
        userInfo.style.display = 'none';
    }

    if (openAuthPopupButton && authPopup) {
        openAuthPopupButton.addEventListener('click', function () {
            authPopup.style.display = 'block';
        });
    } else {
        console.error('Popup button or popup element not found.');
    }

    if (authForm) {
        authForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = this[0].value;
            const password = this[1].value;

            // Отправляем POST-запрос на сервер для аутентификации
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Invalid email or password.');
                    }
                })
                .then(user => {
                    alert('Login successful!');
                    localStorage.setItem('loggedInUser', JSON.stringify(user));
                    authPopup.style.display = 'none';
                    authForm.style.display = 'none';
                    userInfo.style.display = 'block';
                    usernameDisplay.textContent = user.name;
                })
                .catch(error => {
                    alert(error.message);
                    console.error('Error during login:', error);
                });
        });
    } else {
        console.error('Auth form not found.');
    }

    if (closePopupButton) {
        closePopupButton.addEventListener('click', function () {
            authPopup.style.display = 'none';
        });
    } else {
        console.error('Close popup button not found.');
    }

    window.addEventListener('click', function (event) {
        if (event.target === authPopup) {
            authPopup.style.display = 'none';
        }
    });

    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('loggedInUser');
            authForm.style.display = 'block';
            userInfo.style.display = 'none';
        });
    }
});

// Функция для парсинга CSV
function parseCSV(data) {
    const lines = data.split('\n');
    const users = [];

    for (let line of lines) {
        line = line.trim();
        if (line.length === 0) {
            continue;
        }

        const fields = line.split(',');
        if (fields.length >= 5) {
            const name = fields[0].trim();
            const email = fields[3].trim();
            const password = fields[4].trim();
            console.log(`Parsed user: ${name}, ${email}, ${password}`);
            users.push({ name, email, password });
        } else {
            console.warn(`Invalid line in CSV: ${line}`);
        }
    }
    return users;
}