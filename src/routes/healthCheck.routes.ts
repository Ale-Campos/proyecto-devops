import { Router } from "express";
import { Database } from "../database/database";
import { ClientEntity } from "../database/entities/ClientEntity";
import { ProductEntity } from "../database/entities/ProductEntity";

const healthCheckRouter = Router();

healthCheckRouter.get("/", async (req, res) => {
  res.sendStatus(200);
});

healthCheckRouter.get("/db", async (req, res) => {
  try {
    const clients = await Database.em.getRepository(ClientEntity).find();
    const products = await Database.em.getRepository(ProductEntity).find();
    
    res.json({ clients, products });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

export default healthCheckRouter;
