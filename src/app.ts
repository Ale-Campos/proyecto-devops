import express from 'express';
import indexRouter from "./routes/index.routes";
import "reflect-metadata"
const  dotenv = require('dotenv')
dotenv.config()

const app = express();

app.use(express.json());
app.use("/", indexRouter);

export default app;