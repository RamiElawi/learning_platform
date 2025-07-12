import { MigrationInterface, QueryRunner } from "typeorm";

export class SubCategoryTable1737139749765 implements MigrationInterface {
    name = 'SubCategoryTable1737139749765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sub_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "timestamps" TIMESTAMP NOT NULL DEFAULT now(), "catId" integer, CONSTRAINT "PK_59f4461923255f1ce7fc5e7423c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "category" ADD "categoryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_d796f18db89d9100c60c451af19" FOREIGN KEY ("catId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_d796f18db89d9100c60c451af19"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "categoryId"`);
        await queryRunner.query(`DROP TABLE "sub_category"`);
    }

}
