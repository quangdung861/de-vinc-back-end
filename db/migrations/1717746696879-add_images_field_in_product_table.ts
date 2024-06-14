import { MigrationInterface, QueryRunner } from "typeorm";

export class AddImagesFieldInProductTable1717746696879 implements MigrationInterface {
    name = 'AddImagesFieldInProductTable1717746696879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`images\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`images\``);
    }

}
