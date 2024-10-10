import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Product from "../../entities/Product";
import { ProductDTO } from "./ProductDTO";

@Entity({name:'client'})
export class ClientDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    username: string;

    @ManyToMany(() => ProductDTO)
    @JoinTable()
    products: ProductDTO[];



}