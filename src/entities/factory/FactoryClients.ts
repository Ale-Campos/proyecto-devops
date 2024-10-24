import Client from "../Client";
import { Request } from "express";

export class FactoryClients {
    static create(req: Request) {
        const { name, lastname, username } = req.body;
        return new Client(name, lastname, username);
    }
}