import Product from "./Product";

export default class Client {
    name: string;
    lastname: string;
    username: string;
    products: Product[];

    constructor(name: string, lastname: string, username: string, products: Product[]) {
        this.name = name;
        this.lastname = lastname;
        this.username = username;
        this.products = products;
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
            console.log(`Product ${product.name} already exists in the cart`);
            return;
        }
        this.products.push(product);
    }

}