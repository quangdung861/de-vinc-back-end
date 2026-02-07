import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { FilterProductDto } from './dto/filter-product';
import { SearchProductDto } from './dto/search-product.dto';
import { cloudinaryStorage } from '../cloudinary/cloudinary-storage.config';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Query() query: FilterProductDto): Promise<any> {
    return this.productService.findAll({ query });
  }

  @Get('search')
  search(@Query() query: SearchProductDto): Promise<any> {
    return this.productService.findAll({ query, isSearch: true });
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

  @Post('uploads')
  @UseInterceptors(
    FilesInterceptor('images', 20, {
      storage: cloudinaryStorage,
      fileFilter: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        const allowedExtArr = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];

        if (!allowedExtArr.includes(ext)) {
          cb(new BadRequestException('Invalid file type'), false);
        } else {
          cb(null, true);
        }
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  )
  async uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('File is required');
    }

    return files.map((file) => {
      const original = file.path; // secure_url Cloudinary

      const thumbnail = original.replace(
        '/upload/',
        '/upload/w_400,h_400,c_fill,q_auto,f_auto/',
      );
      
      return {
        original,
        thumbnail,
        size: file.size,
        filename: file.originalname,
      };
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Post('cke-upload')
  @UseInterceptors(
    FileInterceptor('upload', {
      storage: cloudinaryStorage,
      fileFilter: (req, file, cb) => {
        const ext = file.originalname.split('.').pop()?.toLowerCase();
        const allowedExtArr = ['jpg', 'jpeg', 'png', 'JPG', 'JPEG', 'PNG'];
        if (!allowedExtArr.includes(ext)) {
          req.fileValidationError = `Invalid file type. Accepted types: ${allowedExtArr.join(', ')}`;
          cb(null, false);
        } else {
          const fileSize = parseInt(req.headers['content-length']);
          if (fileSize > 5 * 1024 * 1024) {
            req.fileValidationError = 'File size exceeds 5MB';
            cb(null, false);
          } else {
            cb(null, true);
          }
        }
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
    }),
  )
  ckeUpload(@UploadedFile() file: Express.Multer.File, @Body() data: any) {
    if (!file) {
      throw new BadRequestException('No file uploaded or file invalid');
    }

    return {
      url: file.path, // Cloudinary trả về URL tại file.path
    };
  }
}
