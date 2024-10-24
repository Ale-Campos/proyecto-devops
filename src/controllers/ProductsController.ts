import { Database } from "../database/database";
import { FactoryProductEntity } from "../database/entities/factories/FactoryProductEntity";
import { ProductEntity } from "../database/entities/ProductEntity";
import { Request, Response } from "express";

export class ProductsController {
  static async getProducts(req: Request, res: Response) {
    const products = await Database.em.getRepository(ProductEntity).find();
    res.json(products).status(200);
  }

  static async getProductById(req: Request, res: Response) {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      res.status(400).send("Invalid product id");
      return;
    }
    const product = await Database.em.getRepository(ProductEntity).findOne({
      where: { id: parseInt(req.params.id) },
    });
    res.json(product).status(200);
  }

  static async createProduct(req: Request, res: Response) {
    if (!FactoryProductEntity.isValid(req)) {
      res.status(400).send("Invalid data");
      return;
    }
    const product = FactoryProductEntity.create(req);
    await Database.em.getRepository(ProductEntity).save(product);
    res.status(201).send("Product created");
  }

  static async updateProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      res.status(400).send("Invalid product id");
      return;
    }
    if (!FactoryProductEntity.isValid(req)) {
      res.status(400).send("Invalid data");
      return;
    }
    const product = FactoryProductEntity.create(req);
    product.id = productId;
    await Database.em.getRepository(ProductEntity).save(product);
    res.status(200).send("Product updated");
  }

  static async deleteProduct(req: Request, res: Response) {
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
      res.status(400).send("Invalid product id");
      return;
    }
    await Database.em.getRepository(ProductEntity).delete(productId);
    res.status(200).send("Product deleted");
  }
}
