import { Category } from "src/category/entities/category.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column({ nullable: true, default: null })
    reducedPrice: number | null;

    @Column()
    cost: number;

    @Column()
    quantity: number;

    @Column({ type: 'int', default: 1 })
    status: number;

    @Column({ type: 'longtext' })
    description: string;

    @Column({ nullable: true, default: null })
    slug: string;

    @Column({ type: 'longtext' })
    images: string;

    @Column({ default: false })
    bestSelling: boolean;

    @ManyToOne(() => Category, { nullable: true }) 
    @JoinColumn({ name: 'categoryId' })
    category: Category | null;

    @Column({ nullable: true, default: null }) 
    categoryId: number | null;

    @Column({ type: 'longtext', nullable: true })
    options: string;

    @Column()
    isOptions: boolean;

    @Column({ type: 'longtext' })
    highlights: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
