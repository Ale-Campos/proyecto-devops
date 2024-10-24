import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ProductEntity } from "./ProductEntity";

@Entity({ name: "client" })
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  username: string;

  @ManyToMany(() => ProductEntity)
  @JoinTable()
  products: ProductEntity[];
}
