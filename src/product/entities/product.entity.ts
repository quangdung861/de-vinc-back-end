import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    cost: number;

    @Column({ type: 'int', default: 1 })
    status: number;
    
    @Column({ type: 'longtext' })
    description: string;
    
    @Column({ nullable: true, default: null })
    slug: string;

    @Column()
    images: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
