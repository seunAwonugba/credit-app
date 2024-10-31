import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730409041694 implements MigrationInterface {
  name = 'Migrations1730409041694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`account\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` varchar(255) NOT NULL, \`balance\` decimal(10,2) NOT NULL DEFAULT '0.00', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`accountId\` int NULL`);
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_68d3c22dbd95449360fdbf7a3f\` (\`accountId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_68d3c22dbd95449360fdbf7a3f\` ON \`user\` (\`accountId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_68d3c22dbd95449360fdbf7a3f1\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_68d3c22dbd95449360fdbf7a3f1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_68d3c22dbd95449360fdbf7a3f\` ON \`user\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP INDEX \`IDX_68d3c22dbd95449360fdbf7a3f\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`accountId\``);
    await queryRunner.query(`DROP TABLE \`account\``);
  }
}
