import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOnUser31736864345534 implements MigrationInterface {
    name = 'UpdateOnUser31736864345534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "verificationCode" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "verificationCode" SET NOT NULL`);
    }

}
