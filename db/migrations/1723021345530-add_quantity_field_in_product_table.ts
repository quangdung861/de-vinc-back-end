import { MigrationInterface, QueryRunner } from "typeorm";

export class AddQuantityFieldInProductTable1723021345530 implements MigrationInterface {
    name = 'AddQuantityFieldInProductTable1723021345530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`quantity\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`quantity\``);
    }

}
