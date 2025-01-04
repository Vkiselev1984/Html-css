const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5500;

// Middleware для обработки JSON
app.use(bodyParser.json());

// Обработчик POST-запроса на /register
app.post('/register', (req, res) => {
    const userData = req.body; // Получаем данные пользователя из тела запроса
    console.log(userData); // Выводим данные в консоль (для отладки)

    // Здесь вы можете добавить логику для сохранения пользователя в базу данных

    res.send('User registered successfully'); // Отправляем ответ клиенту
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});