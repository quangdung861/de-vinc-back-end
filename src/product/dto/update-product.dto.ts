import { IsNotEmpty } from "class-validator";

export class UpdateProductDto {
    name: string;

    description: string;

    reducedPrice: number;

    price: number;

    cost: number;

    status: number;

    images: string[];

    categoryId: number;
}