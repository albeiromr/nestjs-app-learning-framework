import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1692664094873 implements MigrationInterface {
    name = 'FirstMigration1692664094873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "productName" character varying NOT NULL, "productBrand" character varying NOT NULL, "price" integer NOT NULL, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
