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

    console.log('After user check')

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

        console.log('client: '+ JSON.stringify(client, null, 2));

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

        console.log('email: '+JSON.stringify(req.body, null, 2))
        console.log('password: '+JSON.stringify(req.body, null, 2))

        console.log('user: '+JSON.stringify(user, null, 2))

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

