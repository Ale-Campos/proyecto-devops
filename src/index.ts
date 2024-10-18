import express from 'express';
import indexRouter from "./routes/index.routes";
import "reflect-metadata"
import { Database } from './database/database';
import app from './app';
const  dotenv = require('dotenv')
dotenv.config()

Database.connect()

app.listen(process.env.PORT, () => {
  return console.log(`Express server is listening at http://localhost:${process.env.PORT} 🚀`);
});
