import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductTable1717407864655 implements MigrationInterface {
    name = 'CreateProductTable1717407864655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`cost\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`description\` longtext NOT NULL, \`slug\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`product\``);
    }

}
