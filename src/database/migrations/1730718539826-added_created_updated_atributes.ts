import { MigrationInterface, QueryRunner } from 'typeorm';

export class addedCreatedUpdatedAtributes1730718539826
  implements MigrationInterface
{
  name = 'addedCreatedUpdatedAtributes1730718539826';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "buyers" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "buyers" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "operators" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "operators" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "manufacturers" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "manufacturers" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "name" character varying(50) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "name" character varying(60) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "manufacturers" DROP COLUMN "updateAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "manufacturers" DROP COLUMN "createdAt"`,
    );
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "operators" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "operators" DROP COLUMN "createdAt"`);
    await queryRunner.query(`ALTER TABLE "buyers" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "buyers" DROP COLUMN "createdAt"`);
  }
}
