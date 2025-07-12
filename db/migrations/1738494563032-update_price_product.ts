import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePriceProduct1738494563032 implements MigrationInterface {
    name = 'UpdatePriceProduct1738494563032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "priceAfterDiscount" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "totalPriceAfterDiscount" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart" ALTER COLUMN "totalPriceAfterDiscount" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "priceAfterDiscount" DROP DEFAULT`);
    }

}
