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
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserPermissionDto } from '../dto/create-user-permission.dto';
import { UserPermissionEntity } from '../entities/user-permission.entity';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post()
  @ApiResponse({ status: 200, description: 'User created'})
  addUser(@Body() body: CreateUserDto): Promise<User> {
    return this.userService.createUser(body);
  }

  @Put(':id')
  @ApiResponse({ status: 404, description: 'Resource not found'})
  @ApiResponse({ status: 200, description: 'User Updated'})
  updateUser(@Body() body: UpdateUserDto, @Param('id') id: number): Promise<User> {
    return this.userService.updateUser(id, body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<string> {
    await this.userService.deleteUser(id);
    return 'Usuario eliminado';
  }

  @Post('create-permission')
  @ApiResponse({ status: 200, description: 'User permission created'})
  addUserPermission(@Body() body: CreateUserPermissionDto): Promise<UserPermissionEntity> {
    return this.userService.createUserPermission(body);
  }

}
