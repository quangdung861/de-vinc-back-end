import { Category } from "src/category/entities/category.entity";
import { Color } from "src/color/entities/color.entity";
import { Size } from "src/size/entities/size.entity";
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

    @OneToMany(() => Color, (color) => color.product, { nullable: true })
    colors: Color[];

    @OneToMany(() => Size, (size) => size.product, { nullable: true })
    sizes: Size[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
