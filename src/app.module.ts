import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsModule } from './permissions/permissions.module';


@Module({
  imports: [UserModule, TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    port: 5432,
    username: 'admin',
    password: 'my-weak-password',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
  }), PermissionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
