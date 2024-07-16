import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOptionTableAndAddFkOptionInProductTable1720772385463 implements MigrationInterface {
    name = 'CreateOptionTableAndAddFkOptionInProductTable1720772385463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`option\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`productId\` int NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`option\` ADD CONSTRAINT \`FK_fb065e2130a80961e84e1592d6b\` FOREIGN KEY (\`productId\`) REFERENCES \`product\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`option\` DROP FOREIGN KEY \`FK_fb065e2130a80961e84e1592d6b\``);
        await queryRunner.query(`DROP TABLE \`option\``);
    }

}
