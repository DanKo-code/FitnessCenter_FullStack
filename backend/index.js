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
    console.log(`Server is running on port ${PORT}`);
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