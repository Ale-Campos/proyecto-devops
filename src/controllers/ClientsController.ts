import { Database } from "../database/database";
import { ClientEntity } from "../database/entities/ClientEntity";
import { Request, Response } from "express";
import { FactoryClientEntity } from "../database/entities/factories/FactoryClientEntity";

export class ClientsController {
  static async getClients(req: Request, res: Response) {
    const clients = await Database.em.getRepository(ClientEntity).find();

    res.json(clients).status(200);
  }

  static async getClientById(req: Request, res: Response) {
    const clientId = parseInt(req.params.id);

    if (isNaN(clientId)) {
      res.status(400).send("Invalid client id");
      return;
    }

    const client = await Database.em.getRepository(ClientEntity).findOne({
      where: { id: parseInt(req.params.id) },
    });

    res.json(client).status(200);
  }

  static async createClient(req: Request, res: Response) {
    if (!FactoryClientEntity.isValid(req)) {
      res.status(400).send("Invalid data");
      return;
    }

    const client = FactoryClientEntity.create(req);
    await Database.em.getRepository(ClientEntity).save(client);

    res.status(201).send("Client created");
  }
}
