import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import cors from 'cors';
import { usersRouter } from "./userRoutes.js";

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT;

async function createConnection(){
    const client=new MongoClient(process.env.Mongo_URL);
    await client.connect();
    console.log("MongoDB connected");
    return client;
}
const client= await createConnection();

app.get('/',(request,response)=>{
    response.send('Welcome to the Student Dashboard')
})
app.use('/users',usersRouter);

app.listen(PORT,()=>{console.log("Server Connected")});

export {client};
