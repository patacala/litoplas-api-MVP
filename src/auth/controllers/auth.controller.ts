import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async Login(@Req() req: Request ){
        const user = req.user;
        console.log(user)
        return this.authService.generateJWT(user);
    }
}
