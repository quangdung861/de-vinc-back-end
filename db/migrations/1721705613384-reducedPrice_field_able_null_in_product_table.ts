import { MigrationInterface, QueryRunner } from "typeorm";

export class ReducedPriceFieldAbleNullInProductTable1721705613384 implements MigrationInterface {
    name = 'ReducedPriceFieldAbleNullInProductTable1721705613384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`reducedPrice\` \`reducedPrice\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product\` CHANGE \`reducedPrice\` \`reducedPrice\` int NOT NULL`);
    }

}
