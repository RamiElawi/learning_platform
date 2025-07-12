import { MigrationInterface, QueryRunner } from "typeorm";

export class OfferTables1739542763857 implements MigrationInterface {
    name = 'OfferTables1739542763857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "offer_item" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "offerId" integer NOT NULL, "productsId" integer, CONSTRAINT "PK_9cf0fd59801452942a29e0ecc02" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "offer" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "price" double precision NOT NULL DEFAULT '0', "priceAfterDiscount" double precision NOT NULL DEFAULT '0', "discription" character varying NOT NULL, "image" character varying NOT NULL, "ratingsQuantity" integer NOT NULL DEFAULT '0', "ratingsAverage" double precision NOT NULL DEFAULT '0', "timestamps" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_57c6ae1abe49201919ef68de900" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD "offerId" integer`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a"`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "productId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "offer_item" ADD CONSTRAINT "FK_8bc958fe14c07c918aed3a96690" FOREIGN KEY ("productsId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "offer_item" ADD CONSTRAINT "FK_7ad94f2e91a7d1d41b7197f1cf9" FOREIGN KEY ("offerId") REFERENCES "offer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_7999a8463ba685c03b7581f18b4" FOREIGN KEY ("offerId") REFERENCES "offer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_7999a8463ba685c03b7581f18b4"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a"`);
        await queryRunner.query(`ALTER TABLE "offer_item" DROP CONSTRAINT "FK_7ad94f2e91a7d1d41b7197f1cf9"`);
        await queryRunner.query(`ALTER TABLE "offer_item" DROP CONSTRAINT "FK_8bc958fe14c07c918aed3a96690"`);
        await queryRunner.query(`ALTER TABLE "review" ALTER COLUMN "productId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" DROP COLUMN "offerId"`);
        await queryRunner.query(`DROP TABLE "offer"`);
        await queryRunner.query(`DROP TABLE "offer_item"`);
    }

}
