import { Product } from "src/product/entities/product.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";

@Entity()
export class Size {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column()
  description: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Product, { nullable: true })
  @JoinColumn({ name: 'productId' })
  product: Product[] | null;
}