import { MigrationInterface, QueryRunner } from "typeorm";

export class AddHighlightsColumnToProduct1752767698717 implements MigrationInterface {
    name = 'AddHighlightsColumnToProduct1752767698717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`highlights\` longtext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`highlights\``);
    }

}
