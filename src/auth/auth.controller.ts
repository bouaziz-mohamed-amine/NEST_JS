import { Controller, Post, UseGuards, Request, Get, Body, Res } from "@nestjs/common";
import { AddUserDto } from "src/users/user.dto";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LoginDto } from "./login.dto";
import * as bcrypt from 'bcrypt';
import { UsersService } from "src/users/users.service";


@Controller()
export class AuthController {

    constructor(
        private  authservice: AuthService,
        private  usersservice : UsersService) { }

    @Post('register')
    async register(@Body() body :AddUserDto){

        const {name ,email  ,password  ,age } = body ;

        const user = await this.authservice.register(name ,email  ,password  ,age) ;

        return user ;
    }

    @Post('login')
    async login( @Body( ) body:AddUserDto ,@Res() res){

        const {name ,email  ,password  ,age } = body ;

        const token = await  this.authservice.login(email,password)  ;
        console.log(res.body);
        
        if(token){
            return res.status(200).json({status:200,token:token}) ; 
        }
        return res.status(400).json({status:400}) ; 
    }


}