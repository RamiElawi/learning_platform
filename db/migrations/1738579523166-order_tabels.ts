import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderTabels1738579523166 implements MigrationInterface {
    name = 'OrderTabels1738579523166'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_paymentmethodtype_enum" AS ENUM('cash', 'card')`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "taxPrice" integer NOT NULL DEFAULT '0', "shippinPrice" integer NOT NULL DEFAULT '0', "totalOrderPrice" integer NOT NULL, "paymentMethodType" "public"."order_paymentmethodtype_enum" NOT NULL, "isPaid" boolean NOT NULL DEFAULT false, "paidAt" TIMESTAMP NOT NULL, "isDeliverd" boolean NOT NULL DEFAULT false, "deliverdAt" TIMESTAMP NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "color" character varying NOT NULL, "productId" integer NOT NULL, "orderId" integer NOT NULL, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TYPE "public"."order_paymentmethodtype_enum"`);
    }

}
