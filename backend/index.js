const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')
const prismaClient = require('../prisma/Clients')
const { v4: uuidv4 } = require('uuid');


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use(express.json())

app.use(cors());

app.post('/register',  async (req, res)=>{
    const clientId = uuidv4();
    try{
        const clients = await prismaClient.client.create({
            data:{
                Id : clientId, // Генерация UUID
                FirstName : req.body.firstName,
                LastName : req.body.lastName,
                Email : req.body.email,
                Password : req.body.password,
                Role: 1
            }
        });
    }catch (e){
        res.status(400).json({message: 'Client hasn\'t been added'})
    }

    res.status(200).json({message: 'Client added successful'})
})

