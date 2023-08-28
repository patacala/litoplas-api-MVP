import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permission } from './entity/permissions.entity';
import { CreatePermissionDto } from './dto/crerate-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Controller('permissions')
export class PermissionsController {

    constructor(private permissionService: PermissionsService) {}

  @Get()
  getUsers(): Promise<Permission[]> {
    return this.permissionService.getPermissions();
  }

  @Post()
  addUser(@Body() body: CreatePermissionDto): Promise<Permission> {
    return this.permissionService.createPermission(body);
  }

  @Put(':id')
  updateUser(@Body() body: UpdatePermissionDto, @Param('id') id: number): Promise<Permission> {
    return this.permissionService.updatePermission(id, body);
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number): Promise<string> {
    await this.permissionService.deletePermission(id);
    return 'Usuario eliminado';
  }
}
