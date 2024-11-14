import {MigrationInterface, QueryRunner} from "typeorm";

export class addedRelationsBuyerOperator1731580529389 implements MigrationInterface {
    name = 'addedRelationsBuyerOperator1731580529389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "operator" ("id" SERIAL NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "role" character varying(20) NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "buyerId" integer, CONSTRAINT "UQ_809228ed8520ca85998fe55165f" UNIQUE ("email"), CONSTRAINT "REL_ca6bdfbf53a9822a9f20999d1f" UNIQUE ("buyerId"), CONSTRAINT "PK_8b950e1572745d9f69be7748ae8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buyer" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "surname" character varying(50) NOT NULL, "phone" character varying(15), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_0480fc3c7289846a31b8e1bc503" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "operator" ADD CONSTRAINT "FK_ca6bdfbf53a9822a9f20999d1f3" FOREIGN KEY ("buyerId") REFERENCES "buyer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "operator" DROP CONSTRAINT "FK_ca6bdfbf53a9822a9f20999d1f3"`);
        await queryRunner.query(`DROP TABLE "buyer"`);
        await queryRunner.query(`DROP TABLE "operator"`);
    }

}
