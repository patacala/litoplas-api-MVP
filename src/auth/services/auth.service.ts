import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService){}



    public async validateUser(username: string, password: string) {
        
    }


}
