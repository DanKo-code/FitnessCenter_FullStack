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

let intervalId;
let clientsAbonnements = [];

// Функция для проверки статуса абонементов
function checkAbonnements() {
    const currentDate = new Date(); // Текущая дата и время

    console.log('enter checkAbonnements');
    console.log('clientsAbonnements.length: '+JSON.stringify(clientsAbonnements.length, null, 2))

    clientsAbonnements.forEach((item, index) => {
        const expirationDate = new Date(item.expirationDate);

        console.log('currentDate: '+currentDate);
        console.log('expirationDate: '+expirationDate);

        if (currentDate >= expirationDate) {
            io.to(item.socketId).emit('expiration', `Abonement "${item.abonement.Title}" has expired`);

            clientsAbonnements.splice(index, 1);
        }
    })
}

io.on('connection', (socket) => {
    console.log(`Пользователь подключен: ${socket.id}`);

    if(!intervalId){
        console.log('setInterval')
        intervalId = setInterval(checkAbonnements, 1000 * 5);
    }

    socket.on('disconnect', () => {
        console.log(`Пользователь отключен: ${socket.id}`);

        /*if(clientsAbonnements.length === 0){
            clearInterval(intervalId);
        }*/
    });

    socket.on('startTimer', (data) => {
        const { abonnement, user } = data;

        console.log('user: '+JSON.stringify(user, null, 2))
        console.log('abonnement: '+JSON.stringify(abonnement, null, 2))

        clientsAbonnements.forEach(item => {
            if(item.clientId === user.Id){
                item.socketId = socket.id;
            }
        })

        clientsAbonnements.push({
            socketId: socket.id,
            clientId: user.Id,
            abonement: abonnement,
            expirationDate: new Date(Date.now() + abonnement.Validity * 1000)
        })
    });
});

server.listen(3002, ()=>{
    console.log('SERVER IS RUNNING IN PORT 3002');
});