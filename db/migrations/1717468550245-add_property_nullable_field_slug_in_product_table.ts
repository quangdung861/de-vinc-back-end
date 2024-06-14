import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPropertyNullableFieldSlugInProductTable1717468550245 implements MigrationInterface {
    name = 'AddPropertyNullableFieldSlugInProductTable1717468550245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`slug\` \`slug\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`slug\` \`slug\` varchar(255) NOT NULL`);
    }

}
