import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1730409686938 implements MigrationInterface {
  name = 'Migrations1730409686938';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_68d3c22dbd95449360fdbf7a3f1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_68d3c22dbd95449360fdbf7a3f\` ON \`user\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_68d3c22dbd95449360fdbf7a3f\` ON \`user\``,
    );
    await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`accountId\``);
    await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`userId\``);
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD \`userId\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD UNIQUE INDEX \`IDX_60328bf27019ff5498c4b97742\` (\`userId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_60328bf27019ff5498c4b97742\` ON \`account\` (\`userId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD CONSTRAINT \`FK_60328bf27019ff5498c4b977421\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP FOREIGN KEY \`FK_60328bf27019ff5498c4b977421\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_60328bf27019ff5498c4b97742\` ON \`account\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`account\` DROP INDEX \`IDX_60328bf27019ff5498c4b97742\``,
    );
    await queryRunner.query(`ALTER TABLE \`account\` DROP COLUMN \`userId\``);
    await queryRunner.query(
      `ALTER TABLE \`account\` ADD \`userId\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE \`user\` ADD \`accountId\` int NULL`);
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_68d3c22dbd95449360fdbf7a3f\` ON \`user\` (\`accountId\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_68d3c22dbd95449360fdbf7a3f\` ON \`user\` (\`accountId\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD CONSTRAINT \`FK_68d3c22dbd95449360fdbf7a3f1\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
