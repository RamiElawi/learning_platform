import { MigrationInterface, QueryRunner } from "typeorm";

export class Usretable1736526492071 implements MigrationInterface {
    name = 'Usretable1736526492071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "avatar" character varying, "age" integer NOT NULL, "phoneNumber" character varying NOT NULL, "Address" character varying NOT NULL, "active" boolean NOT NULL, "verificationCode" character varying NOT NULL, "gender" "public"."user_gender_enum" NOT NULL, "timestamps" TIMESTAMP NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
