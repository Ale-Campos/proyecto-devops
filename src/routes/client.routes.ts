import { Router } from "express";

const clientRouter = Router();

clientRouter.get("/", (req, res) => {
    res.send("Clientes");
});

export default clientRouter;