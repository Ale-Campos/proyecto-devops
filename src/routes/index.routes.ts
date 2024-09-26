import { Router } from "express";
import productRouter from "./product.routes";
import clientRouter from "./client.routes";
import healthCheckRouter from "./healthCheck.routes";

const indexRouter = Router();


indexRouter.use("/products", productRouter);
indexRouter.use("/clients", clientRouter);
indexRouter.use("/health", healthCheckRouter);

export default indexRouter;