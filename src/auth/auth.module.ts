import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService]
})
export class AuthModule {}
