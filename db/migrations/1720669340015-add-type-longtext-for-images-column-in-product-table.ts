import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTypeLongtextForImagesColumnInProductTable1720669340015 implements MigrationInterface {
    name = 'AddTypeLongtextForImagesColumnInProductTable1720669340015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`images\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`images\` longtext NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_ff0c0301a95e517153df97f6812\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_ff0c0301a95e517153df97f6812\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`images\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`images\` varchar(255) NOT NULL`);
        await queryRunner.query(`CREATE INDEX \`FK_ff0c0301a95e517153df97f6812\` ON \`product\` (\`categoryId\`)`);
    }

}
