// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB подключена'))
.catch(err => console.log('Ошибка MongoDB:', err));

// Обработчик WebSocket
io.on('connection', (socket) => {
    console.log('Новый игрок подключился:', socket.id);
    
    socket.on('disconnect', () => {
        console.log('Игрок отключился:', socket.id);
    });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
