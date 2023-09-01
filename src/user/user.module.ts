import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserPermissionEntity } from './entity/user-permission.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ TypeOrmModule.forFeature([
    User,
    UserPermissionEntity
  ])]
})
export class UserModule {}
