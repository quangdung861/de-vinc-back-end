import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
  path: `.env.${process.env.NODE_ENV || 'development'}`,
});

export default new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
});
