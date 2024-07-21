import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSizeTableAndColorTableAndAddToProductTable1721578052365 implements MigrationInterface {
    name = 'UpdateSizeTableAndColorTableAndAddToProductTable1721578052365'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_543c93b7baac60556979a6ad441\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP FOREIGN KEY \`FK_cb438bae9be6581703010760a6b\``);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`quantity\` \`productId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`colorId\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`colors\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`sizeId\``);
        await queryRunner.query(`ALTER TABLE \`product\` DROP COLUMN \`sizes\``);
        await queryRunner.query(`ALTER TABLE \`size\` ADD \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`size\` ADD \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`productId\` \`productId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`size\` ADD CONSTRAINT \`FK_64bfb35ee164937540622ea7c9e\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`color\` ADD CONSTRAINT \`FK_11620774493e842bd7167f74c10\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`color\` DROP FOREIGN KEY \`FK_11620774493e842bd7167f74c10\``);
        await queryRunner.query(`ALTER TABLE \`size\` DROP FOREIGN KEY \`FK_64bfb35ee164937540622ea7c9e\``);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`productId\` \`productId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`size\` DROP COLUMN \`productId\``);
        await queryRunner.query(`ALTER TABLE \`size\` DROP COLUMN \`quantity\``);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`sizes\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`sizeId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`colors\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD \`colorId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`color\` CHANGE \`productId\` \`quantity\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_cb438bae9be6581703010760a6b\` FOREIGN KEY (\`sizeId\`) REFERENCES \`size\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product\` ADD CONSTRAINT \`FK_543c93b7baac60556979a6ad441\` FOREIGN KEY (\`colorId\`) REFERENCES \`color\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
