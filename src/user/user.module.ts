import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserPermissionEntity } from './entities/user-permission.entity';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { PermissionsService } from 'src/permissions/services/permissions.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PermissionsService],
  imports: [ TypeOrmModule.forFeature([
      User,
      UserPermissionEntity
    ]),
    PermissionsModule
  ],
  exports: [UserService, PermissionsService, TypeOrmModule]
})
export class UserModule {}
