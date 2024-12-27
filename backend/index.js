// import express from 'express';
import app from './src/app.js';
import { config } from './config/env.js';

app.listen(config.port, ()=>{
  console.log(`Listening At: ${config.port}`)
})