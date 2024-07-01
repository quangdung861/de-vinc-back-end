import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBestSellingFieldInProductTable1719802469804 implements MigrationInterface {
    name = 'AddBestSellingFieldInProductTable1719802469804'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`bestSelling\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`bestSelling\``);
    }

}
