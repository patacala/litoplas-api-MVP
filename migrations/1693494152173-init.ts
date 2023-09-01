import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1693494152173 implements MigrationInterface {
    name = 'Init1693494152173'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying(150) NOT NULL, "phone" character varying NOT NULL, "role" character varying NOT NULL, "password" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permission" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "is_active" boolean NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_permission_entity" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "access_level" character varying NOT NULL, "user_id" integer, "permission_id" integer, CONSTRAINT "PK_3de4c7b6438eef6a659b236d228" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_permission_entity" ADD CONSTRAINT "FK_ddec9e639d68fcfc26ff4b3f626" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_permission_entity" ADD CONSTRAINT "FK_7ce5580d6b1d9a5de10c456a250" FOREIGN KEY ("permission_id") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_permission_entity" DROP CONSTRAINT "FK_7ce5580d6b1d9a5de10c456a250"`);
        await queryRunner.query(`ALTER TABLE "user_permission_entity" DROP CONSTRAINT "FK_ddec9e639d68fcfc26ff4b3f626"`);
        await queryRunner.query(`DROP TABLE "user_permission_entity"`);
        await queryRunner.query(`DROP TABLE "permission"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
