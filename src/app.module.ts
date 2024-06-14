import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from 'db/data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { OptionModule } from './option/option.module';
import { FavoriteModule } from './favorite/favorite.module';
import { UserModule } from './user/user.module';
import { ReviewModule } from './review/review.module';
import { VoucherModule } from './voucher/voucher.module';
import { OrderModule } from './order/order.module';
import { OrderProductModule } from './order-product/order-product.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ConfigModule.forRoot({
      isGlobal: true, // Đặt module này thành global để không cần import lại trong các module khác
    }),
    AuthModule,
    CategoryModule,
    OptionModule,
    FavoriteModule,
    UserModule,
    ProductModule,
    ReviewModule,
    VoucherModule,
    OrderModule,
    OrderProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
