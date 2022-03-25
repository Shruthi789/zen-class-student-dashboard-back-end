import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import {fileRouter} from './fileRoutes.js'

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT;
app.get('/',(request,response)=>{
    response.send('Welcome to Node JS Filesystem!!');
})
app.use('/filesystem',fileRouter);
app.listen(PORT,()=>{console.log("Server Connected")});
