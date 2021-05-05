import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1620200557962 implements MigrationInterface {
    name = 'initial1620200557962'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" character varying(255), "createdById" character varying(36), "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updatedBy" character varying(255), "updatedById" character varying(36), "deletedAt" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying(255), "deletedById" character varying(36), "username" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying, "lastName" character varying, "email" character varying, "displayName" character varying, "isActive" boolean NOT NULL DEFAULT true, "registeredAt" TIMESTAMP WITH TIME ZONE, "lastLogin" TIMESTAMP WITH TIME ZONE, "status" character varying(10) NOT NULL DEFAULT 'activate', CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_meta" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying(30) NOT NULL, "value" text NOT NULL, "userId" uuid, CONSTRAINT "UQ_c238a90c9ef4198d6aeafc91e60" UNIQUE ("userId", "key"), CONSTRAINT "PK_2b45acc20c0a71d613f9ed6d9e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_meta" ADD CONSTRAINT "FK_f6c72c83c1787aee12530dbcd05" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_meta" DROP CONSTRAINT "FK_f6c72c83c1787aee12530dbcd05"`);
        await queryRunner.query(`DROP TABLE "user_meta"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
