import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query, Req, UploadedFile, UploadedFiles, BadRequestException, Put } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FilesInterceptor('images', 20, {
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
  create(@Req() req: any, @Body() createProductDto: CreateProductDto, @UploadedFiles() files: Express.Multer.File[]) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!files) {
      throw new BadRequestException('File is required');
    }

    const images = files.map(file => `product/${file.filename}`);

    return this.productService.create({ ...createProductDto, images });
  }

  @Get()
  findAll(@Query() query: FilterProductDto): Promise<any> {
    return this.productService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  upload(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('images', 20, {
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
  uploadImages(@Req() req: any, @UploadedFiles() files: Express.Multer.File[]) {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }
    if (!files) {
      throw new BadRequestException('File is required');
    }
    const images = files.map(file => `product/${file.filename}`);
    return images;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Post('cke-upload')
  @UseInterceptors(FileInterceptor('upload', {
    storage: storageConfig('ckeditor'), fileFilter: (req, file, cb) => {
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
  ckeUpload(@Body() data: any, @UploadedFile() file: Express.Multer.File) {
    return {
      'url': `ckeditor/${file.filename}`
    }
  }
}
