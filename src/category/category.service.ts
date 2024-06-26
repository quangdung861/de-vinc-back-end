import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const res = await this.categoryRepository.save(createCategoryDto)

      return await this.categoryRepository.findOneBy({ id: res.id });
    } catch (error) {
      throw new HttpException('Can not create product', HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(): Promise<{ data: Category[] }> {
    try {
      const result = await this.categoryRepository.find({
        order: {
          created_at: 'DESC',
        },
      })
      return ({
        data: result,
      })
    } catch (error) {
      throw new HttpException('Can not find all Category', HttpStatus.BAD_REQUEST)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
