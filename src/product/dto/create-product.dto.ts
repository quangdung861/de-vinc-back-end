import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    cost: number;

    @IsNotEmpty()
    status: number;

    images: string[];

    categoryId: number;
}