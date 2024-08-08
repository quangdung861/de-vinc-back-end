import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsOptionsFieldInProductTable1723089837382 implements MigrationInterface {
    name = 'AddIsOptionsFieldInProductTable1723089837382'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`isOptions\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`isOptions\``);
    }

}
