import { MigrationInterface, QueryRunner } from "typeorm";

export class CouponCartTable1738084040907 implements MigrationInterface {
    name = 'CouponCartTable1738084040907'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coupon_cart" ("id" SERIAL NOT NULL, "cartId" integer NOT NULL, "couponId" integer NOT NULL, CONSTRAINT "PK_f1fab982606f334fd20157cfffe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coupon_cart" ADD CONSTRAINT "FK_6bd1c67bbd5331e58fa1a39a385" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupon_cart" ADD CONSTRAINT "FK_14748f27f3758986ccf18b33225" FOREIGN KEY ("couponId") REFERENCES "coupon"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupon_cart" DROP CONSTRAINT "FK_14748f27f3758986ccf18b33225"`);
        await queryRunner.query(`ALTER TABLE "coupon_cart" DROP CONSTRAINT "FK_6bd1c67bbd5331e58fa1a39a385"`);
        await queryRunner.query(`DROP TABLE "coupon_cart"`);
    }

}
