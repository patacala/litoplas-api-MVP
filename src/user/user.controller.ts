import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, USER_ROLE } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post()
  addUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Put(':id')
  updateUser(@Body() body: CreateUserDto, @Param('id') id: number): Promise<User> {
    return this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<string> {
    await this.userService.deleteUser(id);
    return 'Usuario eliminado';
  }
}
