import { MigrationInterface, QueryRunner } from "typeorm";

export class SomeUpdate1737359584722 implements MigrationInterface {
    name = 'SomeUpdate1737359584722'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_d796f18db89d9100c60c451af19"`);
        await queryRunner.query(`ALTER TABLE "sub_category" DROP COLUMN "catId"`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sub_category" DROP CONSTRAINT "FK_51b8c0b349725210c4bd8b9b7a7"`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD "catId" integer`);
        await queryRunner.query(`ALTER TABLE "sub_category" ADD CONSTRAINT "FK_d796f18db89d9100c60c451af19" FOREIGN KEY ("catId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
