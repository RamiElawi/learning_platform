import { MigrationInterface, QueryRunner } from "typeorm";

export class RequestProductTable1737396634899 implements MigrationInterface {
    name = 'RequestProductTable1737396634899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "request_product" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "details" character varying NOT NULL, "quantity" integer NOT NULL, "category" character varying NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_c414b20f7c0de73b76ad316fe60" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "request_product" ADD CONSTRAINT "FK_f6ebab444ed05f4e25a87f54dd5" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request_product" DROP CONSTRAINT "FK_f6ebab444ed05f4e25a87f54dd5"`);
        await queryRunner.query(`DROP TABLE "request_product"`);
    }

}
