import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm';
import { Raw } from "typeorm";
import { Like, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(body: any) {
    const { categoryId, ...productData } = body;
    const images = JSON.stringify(productData.images);
    const highlights = JSON.stringify(productData.highlights);
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    const options = JSON.stringify(productData.options);

    try {
      const res = await this.productRepository.save({
        ...productData,
        images,
        highlights,
        options,
        ...(category && { category: category }),
      });

      return await this.productRepository.findOneBy({ id: res.id });
    } catch (error) {
      throw new HttpException('Can not create product', HttpStatus.BAD_REQUEST);
    }
  }

async findAll({ query, isSearch = false }): Promise<any> {
  const itemsPerPage = Number(query.items_per_page) || 10;
  const page = Number(query.page) || 1;
  const skip = (page - 1) * itemsPerPage;

  const q = query.q?.trim() || '';
  const sortValue = query.sortValue || 'created_at';
  const order: 'ASC' | 'DESC' = query.order === 'ASC' ? 'ASC' : 'DESC';
  const categoryId = query.categoryId ? Number(query.categoryId) : null;
  const bestSelling = query.bestSelling !== undefined ? query.bestSelling === 'true' : null;

  if (isSearch && !q) {
    return { data: [], total: 0 };
  }

  // Tạo điều kiện lọc linh hoạt
  const baseCondition: any = {};
  if (categoryId) baseCondition.categoryId = categoryId;
  if (bestSelling !== null) baseCondition.bestSelling = bestSelling;

  const whereConditions: any[] = [];
  if (q) {
    whereConditions.push({
      ...baseCondition,
      name: Raw(
        alias => `LOWER(${alias}) RLIKE CONCAT('(^|[[:space:]])', LOWER(:word), '($|[[:space:]])')`,
        { word: q }
      )
    });
  } else {
    whereConditions.push(baseCondition);
  }

  const [res, total] = await this.productRepository.findAndCount({
    where: whereConditions,
    relations: ['category'],
    order: { [sortValue]: order },
    take: itemsPerPage,
    skip,
  });

  const lastPage = Math.ceil(total / itemsPerPage);
  const newRes = res.map((item) => ({
    ...item,
    highlights: JSON.parse(item.highlights || '[]'),
    images: JSON.parse(item.images || '[]'),
    reducedPercent: item?.reducedPrice
      ? Math.round(((item.price - item.reducedPrice) / item.price) * 100)
      : 0,
  }));
  return {
    data: newRes,
    total,
    currentPage: page,
    nextPage: page + 1 > lastPage ? null : page + 1,
    prevPage: page - 1 < 1 ? null : page - 1,
    lastPage,
  };
}


  async findOne(id: number) {
    const res = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    const options = JSON.parse(res.options);
    const highlights = JSON.parse(res.highlights);
    const images = JSON.parse(res.images);

    const newRes = {
      ...res,
      options,
      images,
      highlights,
      reducedPercent: res?.reducedPrice
        ? Math.round(((res?.price - res?.reducedPrice) / res?.price) * 100)
        : 0,
    };
    return newRes;
  }

  async update(id: number, body: any) {
    const { categoryId, images, ...productData } = body;
    const imageFormat = JSON.stringify(images);
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    const options = JSON.stringify(body.options);
    const highlights = JSON.stringify(body.highlights);

    try {
      await this.productRepository.update(id, {
        ...productData,
        images: imageFormat,
        options,
        highlights,
        ...(category && { category: category }),
      });
      const updatedProduct = await this.productRepository.findOneBy({ id });
      return updatedProduct;
    } catch (error) {
      throw new HttpException('Can not update product', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const result = await this.productRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Product not found');
    }
    return `This action removes a #${id} product`;
  }
}
