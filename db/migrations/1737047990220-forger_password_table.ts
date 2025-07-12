import { MigrationInterface, QueryRunner } from "typeorm";

export class ForgerPasswordTable1737047990220 implements MigrationInterface {
    name = 'ForgerPasswordTable1737047990220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "forgetPassword" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "newPasswordToken" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL, CONSTRAINT "PK_ee55dd603fe4b60bd351f9c64da" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "forgetPassword"`);
    }

}
