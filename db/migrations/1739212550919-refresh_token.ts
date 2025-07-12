import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshToken1739212550919 implements MigrationInterface {
    name = 'RefreshToken1739212550919'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "hashedRt" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hashedRt"`);
    }

}
