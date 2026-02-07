import * as dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const nodeEnv = configService.get<string>('NODE_ENV');

  /* =======================
     CORS CONFIG
  ======================= */
  const allowedOrigins =
    configService
      .get<string>('CLIENT_ORIGINS')
      ?.split(',')
      .map((o) => o.trim()) ?? [];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Not allowed by CORS`));
      }
    },
    credentials: true,
  });

  /* =======================
     SWAGGER
  ======================= */
  if (nodeEnv !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('De Vinc APIs')
      .setDescription('List APIs for De Vinc')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('Auth')
      .addTag('Users')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  /* =======================
     STATIC FILES
  ======================= */
  app.useStaticAssets(join(__dirname, '../../uploads'));

  /* =======================
     SERVER
  ======================= */
  const port = configService.get<number>('PORT') || 8080;
  await app.listen(port);

  if (nodeEnv !== 'production') {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${nodeEnv}`);
  }
}

bootstrap();
