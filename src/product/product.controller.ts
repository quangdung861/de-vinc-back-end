import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Query, Req, UploadedFile, UploadedFiles, BadRequestException, Put } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product';
import { storageConfig } from 'helpers/config';
import { extname } from 'path';
import { SearchProductDto } from './dto/search-product.dto';
import { cloudinaryStorage } from '../cloudinary/cloudinary-storage.config';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: any) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query: FilterProductDto): Promise<any> {
    return this.productService.findAll({query});
  }

  @Get('search')
  search(@Query() query: SearchProductDto): Promise<any> {
    return this.productService.findAll({query, isSearch: true});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  upload(@Param('id') id: string, @Body() updateProductDto: any) {
    const body = updateProductDto;
    return this.productService.update(+id, body);
  }

  // @Post('uploads')
  // @UseInterceptors(FilesInterceptor('images', 20, {
  //   storage: storageConfig('product'), fileFilter: (req, file, cb) => {
  //     const ext = extname(file.originalname);
  //     const allowedExtArr = ['.jpg', '.png', '.jpeg'];
  //     if (!allowedExtArr.includes(ext)) {
  //       req.fileValidationError = `Wrong extension type. Accepted file ext are: ${allowedExtArr.toString()}`
  //       cb(null, false)
  //     } else {
  //       const fileSize = parseInt(req.headers['content-length']);
  //       if (fileSize > 1024 * 1024 * 5) {
  //         req.fileValidationError = 'File size is too large. Accepted file size is less than 5 MB';
  //         cb(null, false);
  //       } else {
  //         cb(null, true);
  //       }
  //     }
  //   }
  // }))
  // uploadImages(@Req() req: any, @UploadedFiles() files: Express.Multer.File[]) {
  //   if (req.fileValidationError) {
  //     throw new BadRequestException(req.fileValidationError);
  //   }
  //   if (!files) {
  //     throw new BadRequestException('File is required');
  //   }
  //   const images = files.map(file => `product/${file.filename}`);
  //   return images;
  // }

  @Post('uploads')
  @UseInterceptors(FilesInterceptor('images', 20, {
    storage: cloudinaryStorage,
    fileFilter: (req, file, cb) => {
      const ext = file.originalname.split('.').pop();
      const allowedExtArr = ['jpg', 'png', 'jpeg'];
      if (!allowedExtArr.includes(ext)) {
        cb(new BadRequestException('Invalid file type'), false);
      } else {
        cb(null, true);
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  }))
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('File is required');
    }

    // Trả về danh sách URL ảnh đã upload lên Cloudinary
    return files.map(file => file.path); // file.path là URL Cloudinary
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
