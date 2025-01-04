const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 5500;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/register', (req, res) => {
    console.log('Received request:', req.body); // Логируем полученные данные
    const userData = req.body;

    // Форматируем данные для CSV
    const csvData = `${userData.firstName},${userData.lastName},${userData.gender},${userData.email},${userData.password}\n`;

    // Записываем данные в файл users.csv
    fs.appendFile('users.csv', csvData, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Internal Server Error');
        }

        console.log('User saved successfully:', userData);
        res.send('User registered successfully'); // Отправляем ответ клиенту
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:${port}`);
});