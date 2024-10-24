import Product from "./Product";

export default class Client {
    name: string;
    lastname: string;
    username: string;
    products: Product[];

    constructor(name: string, lastname: string, username: string) {
        this.name = name;
        this.lastname = lastname;
        this.username = username;
        this.products = [];
    }

    getFullName(): string {
        return `${this.name} ${this.lastname}`;
    }

    getProducts(): Product[] {
        return this.products;
    }

    buyProduct(product:Product): void {
        const existingProduct = this.products.find(product => product.code === product.code);
        if (existingProduct) {
            return;
        }
        this.products.push(product);
    }

}