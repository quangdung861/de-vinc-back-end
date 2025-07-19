import { DataSource, DataSourceOptions } from 'typeorm';

const isLocal = process.env.NODE_ENV !== 'production'; // hoặc check biến khác nếu dùng custom

const localConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST_DEV,
  port: +process.env.DB_PORT_DEV,
  username: process.env.DB_USERNAME_DEV,
  password: process.env.DB_PASSWORD_DEV,
  database: process.env.DB_NAME_DEV,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'custom_migration_table',
  synchronize: false,
};

const cloudConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    rejectUnauthorized: true, // bắt buộc với cloud
  },
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'custom_migration_table',
  synchronize: true,
};

// 👇 export riêng config
export const dataSourceOptions = isLocal ? localConfig : cloudConfig;

// 👇 instance cho CLI hoặc nơi khác nếu cần
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;