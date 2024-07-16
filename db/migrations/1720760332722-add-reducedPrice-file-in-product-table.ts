import { MigrationInterface, QueryRunner } from "typeorm";

export class AddReducedPriceFileInProductTable1720760332722 implements MigrationInterface {
    name = 'AddReducedPriceFileInProductTable1720760332722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`reducedPrice\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`reducedPrice\``);
    }

}
