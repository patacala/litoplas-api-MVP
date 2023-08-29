import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';
import { USER_ROLE } from '../entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  email: string;

  @IsNumberString()
  @IsOptional()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsOptional()
  @ApiProperty({enum:[USER_ROLE.ADMIN, USER_ROLE.ROOT, USER_ROLE.USER]})
  role: USER_ROLE;
}
