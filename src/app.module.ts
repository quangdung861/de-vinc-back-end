import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { SizeModule } from './size/size.module';
import { ColorModule } from './color/color.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true, // Đặt module này thành global để không cần import lại trong các module khác
    }),
    CategoryModule,
    UserModule,
    ProductModule,
    SizeModule,
    ColorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
