import express from 'express';
import dotenv from 'dotenv';
import connectToMongo from './config/databaseconnect.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, ()=>{
  connectToMongo();
  console.log(`Listening on Port: ${PORT}`)
});