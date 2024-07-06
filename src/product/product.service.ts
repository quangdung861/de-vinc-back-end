import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) { }

  async create(createProductDto: CreateProductDto) {
    const { categoryId, ...productData } = createProductDto;
    const images = createProductDto.images.join('<&space>');

    const category = await this.categoryRepository.findOneBy({ id: categoryId });

    try {
      const res = await this.productRepository.save({
        ...productData,
        images,
        ...(category && { category: category })
      })

      return await this.productRepository.findOneBy({ id: res.id });
    } catch (error) {
      throw new HttpException('Can not create product', HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(query): Promise<any> {
    const items_per_page = Number(query.items_per_page) || 10;
    const page = Number(query.page) || 1;
    const search = query.search || ``;
    const sortValue = query.sortValue || `created_at`;
    const order = query.order || 'DESC';
    const categoryId = query.categoryId || null;
    const skip = (page - 1) * items_per_page;

    const whereConditions: any[] = [
      {
        name: Like('%' + search + '%')
      },
      {
        description: Like('%' + search + '%')
      },
    ];

    if (categoryId) {
      whereConditions.forEach(item => item['categoryId'] = categoryId);
    }

    const [res, total] = await this.productRepository.findAndCount({
      where: whereConditions,
      relations: ['category'],
      order: {
        [sortValue]: order,
      },
      take: items_per_page,
      skip: skip,
    })

    const lastPage = Math.ceil(total / items_per_page);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data: res,
      total,
      currentPage: page,
      nextPage,
      prevPage,
      lastPage
    }
  }

  async search

  async findOne(id: number) {
    const result = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    })
    return result;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { categoryId, images, ...productData } = updateProductDto;

    const imageFormat = images.join('<&space>');
    let category;
    if (categoryId) {
      category = await this.categoryRepository.findOneBy({ id: categoryId })
    }

    try {
      await this.productRepository.update(id, {
        ...productData,
        images: imageFormat,
        ...(category && { category })
      })
      const updatedProduct = await this.productRepository.findOneBy({ id });
      return updatedProduct;
    } catch (error) {
      throw new HttpException('Can not update product', HttpStatus.BAD_REQUEST)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
