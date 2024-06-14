import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeValueFieldCostToNumber1717408724464 implements MigrationInterface {
    name = 'ChangeValueFieldCostToNumber1717408724464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`cost\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`cost\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`cost\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`cost\` varchar(255) NOT NULL`);
    }

}
