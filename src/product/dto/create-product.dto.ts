import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    name: string;

    description: string;

    price: number;

    cost: number;

    status: number;

    images: string;
}