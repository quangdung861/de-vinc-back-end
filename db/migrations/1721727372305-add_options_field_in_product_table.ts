import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOptionsFieldInProductTable1721727372305 implements MigrationInterface {
    name = 'AddOptionsFieldInProductTable1721727372305'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`options\` longtext NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`options\``);
    }

}
