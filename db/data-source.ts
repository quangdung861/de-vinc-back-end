import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "de-vinc-back-end",
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    migrationsTableName: "custom_migration_table",
    synchronize: false
}

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;