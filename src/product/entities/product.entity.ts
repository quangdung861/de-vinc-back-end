import { Category } from "src/category/entities/category.entity";
import { Option } from "src/option/entities/option.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    reducedPrice: number;

    @Column()
    cost: number;

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

    @OneToMany(() => Option, (option) => option.product, { nullable: true })
    options: Option[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
