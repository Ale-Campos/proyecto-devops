import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'product'})
export class ProductDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: number;
    
    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    description: string;

}