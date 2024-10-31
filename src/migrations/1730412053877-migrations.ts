import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1730412053877 implements MigrationInterface {
    name = 'Migrations1730412053877'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_60328bf27019ff5498c4b97742\` ON \`account\``);
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`transactionType\` enum ('dit', 'credit') NOT NULL, \`status\` enum ('success', 'failed', 'pending') NOT NULL, \`action\` enum ('fund', 'transfer', 'withdraw') NOT NULL, \`amount\` decimal(10,2) NOT NULL DEFAULT '0.00', \`balanceBefore\` decimal(10,2) NOT NULL DEFAULT '0.00', \`balanceAfter\` decimal(10,2) NOT NULL DEFAULT '0.00', \`referenceId\` varchar(255) NOT NULL, \`metadata\` json NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`accountId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_3d6e89b14baa44a71870450d14d\` FOREIGN KEY (\`accountId\`) REFERENCES \`account\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_3d6e89b14baa44a71870450d14d\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_60328bf27019ff5498c4b97742\` ON \`account\` (\`userId\`)`);
    }

}
