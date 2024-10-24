import { ClientEntity } from "../ClientEntity";
import { Request } from "express";

export class FactoryClientEntity {

    static isValid = (req: Request) => {
        const { name, lastname, username } = req.body;

        if(!name || !lastname || !username) {
            return false;
        }

        return true
    }

    static create(req: Request) {
        const { name, lastname, username } = req.body;
        let client = new ClientEntity();

        client.name = name;
        client.lastname = lastname;
        client.username = username;

        return client;
    }
}