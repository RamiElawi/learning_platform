import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOnCategory1737277958415 implements MigrationInterface {
    name = 'UpdateOnCategory1737277958415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD "categoryId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "categoryId" integer NOT NULL`);
    }

}
