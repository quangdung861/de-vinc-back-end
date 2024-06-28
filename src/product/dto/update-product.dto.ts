import { IsNotEmpty } from "class-validator";

export class UpdateProductDto {
    name: string;

    description: string;

    price: number;

    cost: number;

    status: number;

    images: string[];

    categoryId: number;
}