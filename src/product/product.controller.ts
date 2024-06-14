import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query, Req, UploadedFile, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Post()
  @UseInterceptors(FileInterceptor('images', {
    storage: storageConfig('product'), fileFilter: (req, file, cb) => {
      const ext = extname(file.originalname);
      const allowedExtArr = ['.jpg', '.png', '.jpeg'];
      if (!allowedExtArr.includes(ext)) {
        req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`
        cb(null, false)
      } else {
        const fileSize = parseInt(req.headers['content-length']);
        if (fileSize > 1024 * 1024 * 5) {
          req.fileValidationError = 'File size is too large. Accepted file size is less than 5 MB';
          cb(null, false);
        } else {
          cb(null, true);
        }
      }
    }
  }))
  create(@Req() req: any, @Body() createProductDto: CreateProductDto, @UploadedFile() file: Express.Multer.File) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!file) {
      throw new BadRequestException('File is required');
    }

    return this.productService.create({ ...createProductDto, images: 'product' + '/' + file.filename });
  }

  @Get()
  findAll(@Query() query: FilterProductDto): Promise<any> {
    return this.productService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
