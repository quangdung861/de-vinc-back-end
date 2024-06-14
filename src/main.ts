import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const corsOrigin = configService.get<string>('DOMAIN_URL')
  const config = new DocumentBuilder()
    .setTitle('De Vinc APIs')
    .setDescription('List APIs for De Vinc')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: corsOrigin
  });
  app.useStaticAssets(join(__dirname, '../../uploads'));
  await app.listen(4000);
}
bootstrap();
