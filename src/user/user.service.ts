import { Injectable } from '@nestjs/common';
import { User, USER_ROLE } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as idGenerator } from 'uuid';

@Injectable()
export class UserService {
  users: User[] = [
    {
      id: '234234fdg345dgf345',
      name: 'pedro',
      email: 'pedro@mail.com',
      phone: 5555555,
      role: USER_ROLE.ADMIN,
    },
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: string): User | null {
    return this.users.find((user) => user.id == id);
  }

  createUser(data: CreateUserDto): User {
    const tempUser: User = {
      ...data,
      id: idGenerator(),
    };
    this.users.push(tempUser);
    return tempUser;
  }

  updateUser(id: string, data: CreateUserDto): User {
    const user = this.users.find((user) => user.id === id);
    const userIndex = this.users.findIndex((user) => user.id == id);
    const userTemp = Object.assign(user, data);
    this.users[userIndex] = userTemp;
    return userTemp;
  }

  deleteUser(id: string): void {
    const temUsers = this.users.filter((user) => user.id !== id);
    this.users = [...temUsers];
  }
}
