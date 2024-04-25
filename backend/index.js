/*const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')
const prismaClient = require('../prisma/Clients')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const cookieParser = require("cookie-parser");
const Fingerprint = require("express-fingerprint");*/

import express from 'express';
const PORT = process.env.PORT || 3001;
const app = express();
import cors from 'cors';
import prismaClient from '../prisma/Clients.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import Fingerprint from 'express-fingerprint';
import AuthRootRouter from "./routers/Auth.js";
import ResourcesRootRouter from "./routers/Resources.js";
import TokenService from "./services/Token.js";




app.listen(PORT, ()=>{
    //console.log(`Server is running on port ${PORT}`);
})

app.use(express.json())

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

app.use(cookieParser());

app.use(
    Fingerprint({
        parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
    })
);

app.use("/auth", AuthRootRouter);
app.use("/resources", ResourcesRootRouter);

app.post('/signIn', async (req, res)=>{
    const { email, password } = req.body;

    try {
        // Находим пользователя по адресу электронной почты
        const user = await prismaClient.client.findFirst({
            where: {
                Email: email
            }
        });

        // Если пользователь не найден, отправляем ошибку 404
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Проверяем правильность введенного пароля
        //const passwordMatch = await bcrypt.compare(password, user.Password);

        const passwordMatch = password === user.Password;

        // Если пароль не совпадает, отправляем ошибку 401
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Если все проверки пройдены, отправляем успешный ответ 200
        res.status(200).json(user);
    } catch (error) {
        //console.error('Error signing in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post('/clients', async(req, res) => {

    try{
        if(!req.body.email){
            return res.status(404).json({ message: 'User not exists' });
        }

        const user = await prismaClient.client.findFirst({
            where: {
                Email: req.body.email
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not exists' });
        }

        const client = await prismaClient.client.update({
            where:{
                Id:  user.Id
            },
            data:{
                FirstName: req.body.firstName,
                LastName: req.body.lastName,
                Password: req.body.password,
            }
        })

        res.status(200).json(client)
    }catch (e){
        //console.log(e);

        res.status(400).json({message: 'Client hasn\'t been updated'})
    }
})

app.post('/ordersByUser', async(req, res) =>{
    try{

        if(!req.body.Email){
            return res.status(404).json({ message: 'User not exists' });
        }

        const user = await prismaClient.client.findFirst({
            where: {
                Email: req.body.Email
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not exists' });
        }

        const orders = await prismaClient.order.findMany({
            where:{
                ClientsId:  user.Id
            },
            include: {
                Abonement: {
                    include: {
                        AbonementsService: {
                            include: {
                                Service: true // Включаем информацию о связанном сервисе
                            }
                        }
                    }
                },

            }
        })

        res.status(200).json(orders)
    }catch (e){
        //console.log(e);

        res.status(400).json({message: 'Orders can\'t be retrieved'})
    }
})

app.post('/orders', async(req, res) =>{
    try{

        if(!req.body.user.Email){
            return res.status(404).json({ message: 'User not exists' });
        }

        const user = await prismaClient.client.findFirst({
            where: {
                Email: req.body.user.Email
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not exists' });
        }

        //////////////////////////////

        if(!req.body.abonnement.Title){
            return res.status(404).json({ message: 'Abonnement not exists' });
        }

        const abonnement = await prismaClient.abonement.findFirst({
            where: {
                Title: req.body.abonnement.Title
            }
        });

        if (!abonnement) {
            return res.status(404).json({ message: 'Abonnement not exists' });
        }

        const orderId = uuidv4();
        const order = await prismaClient.order.create({
            data: {
                Id: orderId,
                AbonementsId: abonnement.Id,
                ClientsId: user.Id,
                Status: 1
            }
        })

        res.status(200).json(order)
    }catch (e){
        //console.log(e);

        res.status(400).json({message: 'Orders can\'t be retrieved'})
    }
})
