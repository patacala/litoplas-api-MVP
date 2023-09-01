import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as idGenerator } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserPermissionDto } from './dto/create-user-permission.dto';
import { UserPermissionEntity } from './entity/user-permission.entity';

@Injectable()
export class UserService {
  // users: any = [
  //   {
  //     id: 3453,
  //     name: 'pedro',
  //     email: 'pedro@mail.com',
  //     phone: 5555555,
  //     role: USER_ROLE.ADMIN,
  //   },
  // ];

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserPermissionEntity) private readonly UserPermissionRepository: Repository<UserPermissionEntity>
  ) {}

  async getUsers(): Promise<User[]> {
    // return await this.userRepository.find({relations:['userToPermission']});
    const users: User[] = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userToPermission', 'userToPermission')
      .leftJoinAndSelect('userToPermission.permission', 'permission')
      .getMany();

    return users
  }

  async getUserById(id: number): Promise<User> {
    const user: User =  await this.userRepository.findOneBy({id});
    if(!user) throw new NotFoundException('Resource not found');
    return user;
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, data: UpdateUserDto): Promise<User> {
    const existUser: User = await this.getUserById(id);
    if(!existUser) throw new NotFoundException('Resource not found');
    const user: User = await this.userRepository.preload({
      id,
      ...data
    });
    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const user: User =  await this.userRepository.findOneBy({id});
    if(!user) throw new NotFoundException('Resource not found');
    this.userRepository.remove(user)
  }

  // USER PERMISSION SECTION

  async createUserPermission(data: CreateUserPermissionDto): Promise<UserPermissionEntity> {
    const userPermission: UserPermissionEntity = this.UserPermissionRepository.create(data);
    return await this.UserPermissionRepository.save(userPermission);
  }

}
