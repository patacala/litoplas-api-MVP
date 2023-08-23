import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';
import { USER_ROLE } from '../entity/user.entity';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsNumberString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  role: USER_ROLE;
}
