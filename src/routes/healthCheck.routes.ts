import { Router } from "express";
import { ClientDTO } from "../database/entities/ClientDTO";
import { DataSource } from "typeorm";
import { Database } from "../database/database";
import { ProductDTO } from "../database/entities/ProductDTO";

const healthCheckRouter = Router();

healthCheckRouter.get("/", async (req, res) => {
  res.sendStatus(200);
});

healthCheckRouter.get("/db", async (req, res) => {
  try {
    const clients = await Database.em.getRepository(ClientDTO).find();
    const products = await Database.em.getRepository(ProductDTO).find();
    res.json({ clients, products });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

export default healthCheckRouter;
