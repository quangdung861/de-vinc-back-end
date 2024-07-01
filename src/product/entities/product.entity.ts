import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({ default: false })
    bestSelling: boolean;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column()
    categoryId: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
