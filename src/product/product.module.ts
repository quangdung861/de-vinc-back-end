import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from 'src/user/entities/user.entity';
// import { Post } from './entities/post.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    ConfigModule
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
