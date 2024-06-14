import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const res = await this.productRepository.save({
        ...createProductDto
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
    const skip = (page - 1) * items_per_page;
    
    const [res, total] = await this.productRepository.findAndCount({
      where: [
        { name: Like('%' + search + '%') },
        { description: Like('%' + search + '%') }
      ],
      order: {
        created_at: 'DESC',
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

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
