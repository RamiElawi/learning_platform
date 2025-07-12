import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOnCartTable1738141564994 implements MigrationInterface {
    name = 'UpdateOnCartTable1738141564994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "totalPrice" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "totalPriceAfterDiscount" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "totalPriceAfterDiscount" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "totalPrice" SET NOT NULL`);
    }

}
