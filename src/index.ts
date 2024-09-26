import express from 'express';
import indexRouter from "./routes/index.routes";

const app = express();
const port = 3000;

app.use("/", indexRouter);

app.listen(port, () => {
  return console.log(`Express server is listening at http://localhost:${port} 🚀`);
});