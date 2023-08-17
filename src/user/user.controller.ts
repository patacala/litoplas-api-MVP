import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User, USER_ROLE } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';



@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @Get()
    getUsers(): User[] {
        return this.userService.getUsers()
    }

    @Post()
    addUser(@Body() body: CreateUserDto): User {
        return this.userService.createUser(body);
    }

    @Put(':id')
    updateUser(@Body() body: CreateUserDto, @Param('id') id: string): User {
        const user = this.userService.getUserById(id);
        if(!user) return;
        return this.userService.updateUser(id, body);
    
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        const user = this.userService.getUserById(id);
        if(user){
            this.userService.deleteUser(id);
            return 'Usuario eliminado'
        }
    }


}
