import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entity/permissions.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/crerate-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {

  constructor(
    @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>
  ) {}

  async getPermissions(): Promise<Permission[]> {
    // return await this.permissionRepository.find();
    const permissions: Permission[] = await this.permissionRepository
      .createQueryBuilder('permission')
      .leftJoinAndSelect('permission.userToPermission', 'userToPermission')
      .leftJoinAndSelect('userToPermission.user', 'user')
      .getMany()

    return permissions;
  }

  async getPermissionById(id: number): Promise<Permission> {
    const permission: Permission =  await this.permissionRepository.findOneBy({id});
    if(!permission) throw new NotFoundException('Resource not found');
    return permission;
  }

  async createPermission(data: CreatePermissionDto): Promise<Permission> {
    const permission: Permission = this.permissionRepository.create(data);
    return await this.permissionRepository.save(permission);
  }

  async updatePermission(id: number, data: UpdatePermissionDto): Promise<Permission> {
    const existPermission: Permission = await this.getPermissionById(id);
    if(!existPermission) throw new NotFoundException('Resource not found');
    const permission: Permission = await this.permissionRepository.preload({
      id,
      ...data
    });
    return await this.permissionRepository.save(permission);
  }

  async deletePermission(id: number): Promise<void> {
    const permission: Permission =  await this.permissionRepository.findOneBy({id});
    if(!permission) throw new NotFoundException('Resource not found');
    this.permissionRepository.remove(permission);
  }

}
