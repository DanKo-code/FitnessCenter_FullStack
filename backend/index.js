const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')
const prismaClient = require('../prisma/Clients')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');



app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use(express.json())

app.use(cors());



app.post('/signUp',  async (req, res)=>{

    // Находим пользователя по адресу электронной почты
    const user = await prismaClient.client.findFirst({
        where: {
            Email: req.body.email
        }
    });

    // Если пользователь не найден, отправляем ошибку 404
    if (user) {
        return res.status(404).json({ message: 'Email already exists' });
    }

    const clientId = uuidv4();
    // Хэшируем пароль перед сохранением в базу данных
    //const hashedPassword = await bcrypt.hash(req.body.password, 10); // Хэширование пароля с силой хеширования 10
    const hashedPassword = req.body.password;

    try{
        const client = await prismaClient.client.create({
            data:{
                Id : clientId, // Генерация UUID
                FirstName : req.body.firstName,
                LastName : req.body.lastName,
                Email : req.body.email,
                Password : hashedPassword,
                Role: 1
            }
        });

    }catch (e){
        res.status(400).json({message: 'Client hasn\'t been added'})
    }

    res.status(200).json({message: 'Client added successful'})
})

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
        console.error('Error signing in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/abonnements', async (req, res) =>{
    const abonnements = await prismaClient.abonement.findMany({include: {
            AbonementsService: {
                include: {
                    Service: true // Включаем информацию о связанном сервисе
                }
            }
        }});

    res.status(200).json(abonnements);
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

        console.log('req.body.email: '+JSON.stringify(req.body.email, null, 2))
        console.log('req.body.LastName: '+JSON.stringify(req.body.lastName, null, 2))
        console.log('req.body.Password: '+JSON.stringify(req.body.password, null, 2))
        console.log('user.Id: '+JSON.stringify(user.Id, null, 2))
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

        console.log('updated client: '+JSON.stringify(client, null, 2))

        res.status(200).json(client)
    }catch (e){
        console.log(e);

        res.status(400).json({message: 'Client hasn\'t been updated'})
    }
})

app.post('/ordersByUser', async(req, res) =>{
    try{

        console.log('req.body.Email: '+JSON.stringify(req.body.Email, null, 2))
        if(!req.body.Email){
            return res.status(404).json({ message: 'User not exists' });
        }

        const user = await prismaClient.client.findFirst({
            where: {
                Email: req.body.Email
            }
        });

        console.log('user: '+JSON.stringify(user, null, 2))

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
                }, // Включаем связанный объект Abonement для каждого заказа

            }
        })

        console.log('all order: '+JSON.stringify(orders, null, 2))

        res.status(200).json(orders)
    }catch (e){
        console.log(e);

        res.status(400).json({message: 'Orders can\'t be retrieved'})
    }
})

app.post('/orders', async(req, res) =>{
    try{

        console.log('req.body.user.Email: '+JSON.stringify(req.body.user.Email, null, 2))
        if(!req.body.user.Email){
            return res.status(404).json({ message: 'User not exists' });
        }

        const user = await prismaClient.client.findFirst({
            where: {
                Email: req.body.user.Email
            }
        });
        console.log('found user: '+JSON.stringify(user, null, 2))

        if (!user) {
            return res.status(404).json({ message: 'User not exists' });
        }

        //////////////////////////////

        if(!req.body.abonnement.Title){
            return res.status(404).json({ message: 'Abonnement not exists' });
        }
        console.log('found user: '+JSON.stringify(user, null, 2))

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

        console.log('created order: '+JSON.stringify(order, null, 2))

        res.status(200).json(order)
    }catch (e){
        console.log(e);

        res.status(400).json({message: 'Orders can\'t be retrieved'})
    }
})
