import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: ()=> {
        return {
          secret: 'mySecret',
          signOptions:{
            expiresIn:'10d'
          }
        }
      }
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
