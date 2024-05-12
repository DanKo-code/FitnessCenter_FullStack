import express from 'express';
const app = express();
import http from 'http'
import {Server} from "socket.io";
import cors from 'cors';
import * as yup from "yup";
import TokenService from "../backend/services/Token.js";
import {Forbidden, Unauthorized} from "../backend/utils/Errors.js";
import jwt from "jsonwebtoken";
import prismaClient from "../prisma/Clients.js";

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

const validationSchema = yup.object().shape({
    orderId:
        yup.
        string().
        required('orderId is required').
        uuid('orderId must be in uuid format'),
    abonementTitle:
        yup.
        string().
        required('abonementTitle is required').
        min(2, 'abonementTitle must be at least 2 characters').
        max(40, 'abonementTitle must be at most 40 characters').
        matches(/^[A-Za-zА-Яа-яЁё\s]*$/, 'Please enter valid abonementTitle. ' +
            'Only english and russian upper and lower case symbols are allowed'),
    abonementValidity:
        yup.
        number().
        positive().
        integer().
        required('abonementValidity is required').
        min(1).
        max(12),
});

const validateParams = (socket, next) => {
    return async (data) => {
        try {
            await validationSchema.validate(data);
            next(data);
        } catch (error) {
            console.error('Validation error:', error.message);
            socket.emit('error', error.message); // Отправка сообщения об ошибке клиенту
            return next(new Error());
        }
    };
};

function checkAbonnements() {
    const currentDate = new Date(); // Текущая дата и время

    console.log('enter checkAbonnements');
    console.log('clientsAbonnements.length: '+JSON.stringify(clientsAbonnements.length, null, 2))

    let expiredOrders = [];

    clientsAbonnements.forEach(async (item, index) => {
        const expirationDate = new Date(item.expirationDate);

        console.log('currentDate: '+currentDate);
        console.log('expirationDate: '+expirationDate);

        if (currentDate >= expirationDate) {

            expiredOrders.push(item.orderId);

            await prismaClient.order.update({
                where: {
                    Id: item.orderId
                },
                data: {
                    Status: 0
                }
            })

            io.to(item.socketId).emit('expiration', `Abonement "${item.abonementTitle}" has expired`);

            clientsAbonnements.splice(index, 1);
        }
    })

    /*const stringIds = expiredOrders.map(id => id.toString());

    if(expiredOrders.length > 0){
        await prismaClient.order.update({
            where: {
                Id: {
                    in: stringIds
                },
            },
            data: {
                Status: 0
            }
        })
    }*/
}

io.use(async (socket, next)=>{

    const authHeader = socket.handshake.headers.authorization;

    const token = authHeader?.split(" ")?.[1];

    if (!token) {
        console.log('error: No token')
        return next(new Error());
    }

    try{
        socket.user = await jwt.verify(token, 'access_danila')
    }catch (error){
        console.log('error: '+JSON.stringify(error, null, 2));
        return next(new Error());
    }
    next()
})

io.on('connection', (socket) => {
    console.log(`User connected:' ${socket.id}`);

    const clientId = socket.user.id;

    clientsAbonnements.forEach(item => {
        if (item.clientId === clientId) {
            item.socketId = socket.id;
        }
    })

    if (!intervalId) {
        console.log('setInterval')
        intervalId = setInterval(checkAbonnements, 1000 * 5);
    }

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);

    });

    //TestMode
    const expirationDateConst = 1000

    //RealMode
    //const expirationDateConst = 1000 * 60 * 60 * 30

    socket.on('startTimer',
        validateParams(socket, async (data) => {
        try {
            const {orderId, abonementTitle} = data;

            const orderWithAbonement = await prismaClient.order.findUnique({
                where: {
                    Id: orderId
                },
                include:{
                    Abonement: true
                }
            })

            let abonementValidity;
            if(orderWithAbonement.Abonement.Title === abonementTitle){
                abonementValidity = orderWithAbonement.Abonement.Validity;

                clientsAbonnements.push({
                    socketId: socket.id,
                    orderId: orderId,
                    clientId: clientId,
                    abonementTitle: abonementTitle,
                    expirationDate: new Date(Date.now() + abonementValidity * expirationDateConst)
                })
            }
            else{
                socket.emit('error', 'no such abonement')
            }
        } catch (err) {
            console.log('Socket err: ' + JSON.stringify(err, null, 2))
            socket.emit('error', err)
        }
    }))
})

server.listen(3002, ()=>{
    console.log('SERVER IS RUNNING IN PORT 3002');
});