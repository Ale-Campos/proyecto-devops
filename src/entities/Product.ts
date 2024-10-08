export default class Product {
    code: number;
    name: string;
    price: number;
    description: string;

    constructor(name: string, price: number, description: string) {
        this.name = name;
        this.price = price;
        this.description = description;
    }
}