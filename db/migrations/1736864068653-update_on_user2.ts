import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOnUser21736864068653 implements MigrationInterface {
    name = 'UpdateOnUser21736864068653'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "active" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "verificationCode" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "verificationCode" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "active" DROP DEFAULT`);
    }

}
