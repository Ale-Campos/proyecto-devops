import { Request } from "express";
import { ProductEntity } from "../ProductEntity";

export class FactoryProductEntity {
  static isValid = (req: Request) => {
    const { code, name, price, description } = req.body;

    if (!code || !name || !price || !description) {
      return false;
    }

    return true;
  };

  static create(req: Request) {
    const { code, name, price, description } = req.body;
    let product = new ProductEntity();

    product.code = code;
    product.name = name;
    product.price = price;
    product.description = description;

    return product;
  }
}
