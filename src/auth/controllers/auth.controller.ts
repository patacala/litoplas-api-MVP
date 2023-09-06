import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

    //Add auth guard
    @Post('/login')
    async Login(@Req() req: Request ){
        const user = req.user;
        //Agregate token generation

    }
}
