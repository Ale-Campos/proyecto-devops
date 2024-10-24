import { Router } from "express";
import { Database } from "../database/database";
import { ClientEntity } from "../database/entities/ClientEntity";
import { Request, Response} from "express";
import { ClientsController } from "../controllers/ClientsController";

const clientRouter = Router();

clientRouter.get("/", ClientsController.getClients);
clientRouter.get("/:id", ClientsController.getClientById);

clientRouter.post("/", ClientsController.createClient);


export default clientRouter;