import { DataSource, DataSourceOptions } from "typeorm";

// export const dataSourceOptions: DataSourceOptions = {
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "123456",
//     database: "de-vinc-back-end",
//     entities: ['dist/**/*.entity.js'],
//     migrations: ['dist/db/migrations/*.js'],
//     migrationsTableName: "custom_migration_table",
//     synchronize: false
// }

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: true, // Bắt buộc với cloud
    },
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    migrationsTableName: "custom_migration_table",
    synchronize: true, // Tự tạo bảng
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;