import express from 'express';
import indexRouter from "./routes/index.routes";
import "reflect-metadata"
import { Database } from './database/database';
const  dotenv = require('dotenv')
dotenv.config()

const app = express();
const port = 3000;

app.use("/", indexRouter);


Database.connect()

app.listen(port, () => {
  return console.log(`Express server is listening at http://localhost:${process.env.PORT} 🚀`);
});
