const express = require('express')
const PORT = process.env.PORT || 3001
const app = express()
const cors = require('cors')
const prismaClient = require('../prisma/Clients')

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

let clients = [];

app.use(express.json())

app.use(cors());

app.get('/api', (req, res) =>{
    res.json({
        message: "Hello from backend express.js"
    })
})

app.post('/register',  async (req, res)=>{
    console.log('req: '+ JSON.stringify(req.body, null, 2))
    console.log('res: ' +JSON.stringify(res.body, null, 2))

    const clients = await prismaClient.abonements.findMany()
    console.log('clients: '+ JSON.stringify(clients, null, 2));

    res.status(200).json({message: 'заебись четко!'})
})