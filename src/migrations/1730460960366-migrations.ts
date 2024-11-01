import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1730460960366 implements MigrationInterface {
    name = 'Migrations1730460960366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`referenceId\` varchar(36) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`referenceId\``);
    }

}
