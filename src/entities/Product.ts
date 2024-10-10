export default class Product {
    code: number;
    name: string;
    price: number;
    description: string;

    constructor(code:number, name: string, price: number, description: string) {
        this.code = code;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}