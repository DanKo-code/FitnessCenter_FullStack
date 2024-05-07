import express from 'express';
const app = express();
import http from 'http'
import {Server} from "socket.io";
import cors from 'cors';

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log(`Пользователь подключен: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`Пользователь отключен: ${socket.id}`);
    });

    socket.on('startTimer', (data) => {
        const { abonnement } = data;
        // Для примера используем setTimeout для эмуляции таймера
        setTimeout(() => {
            socket.emit('expiration', 'Ваш абонемент истек'); // Отправка сообщения об истечении срока абонемента
        }, abonnement.Validity * 5000); // Продолжительность абонемента в секундах
    });
});

server.listen(3002, ()=>{
    console.log('SERVER IS RUNNING IN PORT 3002');
});