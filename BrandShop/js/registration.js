document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');

    if (!form) {
        console.error('Form element not found.');
        return;
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Предотвращаем стандартное поведение формы

        // Собираем данные формы
        const firstName = document.getElementById('first-name');
        const lastName = document.getElementById('last-name');
        const gender = document.querySelector('input[name="gender"]:checked');
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        if (!firstName || !lastName || !gender || !email || !password) {
            console.error('One or more form elements are missing.');
            return;
        }

        const userData = {
            firstName: firstName.value,
            lastName: lastName.value,
            gender: gender.value,
            email: email.value,
            password: password.value
        };

        console.log('User data to be sent:', userData);

        fetch('http://127.0.0.1:5500/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                alert(data);
                form.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });
});