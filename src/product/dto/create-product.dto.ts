import { Type } from 'class-transformer';
import {
    IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class SizeDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;
}

class OptionDto {
  @IsString()
  color: string;

  @IsNumber()
  price: number;

  @IsNumber()
  quantity: number;

  @ValidateNested({ each: true })
  @Type(() => SizeDto)
  sizes: SizeDto[];
}

export class CreateProductDto {
  categoryId: number;

  @IsNotEmpty()
  cost: number;

  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsString({ each: true })
  highlights: string[];

  images: string[];

  isOptions: boolean;

  @IsNotEmpty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => OptionDto)
  options: OptionDto[];

  @IsNotEmpty()
  price: number;

  quantity: number;

  reducedPrice: number;

  @IsNotEmpty()
  status: number;
}
