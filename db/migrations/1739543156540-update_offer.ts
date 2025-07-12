import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOffer1739543156540 implements MigrationInterface {
    name = 'UpdateOffer1739543156540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer_item" DROP CONSTRAINT "FK_8bc958fe14c07c918aed3a96690"`);
        await queryRunner.query(`ALTER TABLE "offer_item" DROP COLUMN "productsId"`);
        await queryRunner.query(`ALTER TABLE "offer_item" ADD CONSTRAINT "FK_bba28649f64683bfa6ab4e51170" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "offer_item" DROP CONSTRAINT "FK_bba28649f64683bfa6ab4e51170"`);
        await queryRunner.query(`ALTER TABLE "offer_item" ADD "productsId" integer`);
        await queryRunner.query(`ALTER TABLE "offer_item" ADD CONSTRAINT "FK_8bc958fe14c07c918aed3a96690" FOREIGN KEY ("productsId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
