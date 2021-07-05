import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {

    constructor( 
        private  userService :UsersService ,
        private jwtService: JwtService){}
    

    async register(name : string ,email : string ,password : string ,age : number ){

        const saltOrRounds = 10;
            
        const hash = await bcrypt.hash(password, saltOrRounds);
            
        const user = this.userService.createUser(name,email,hash,age) ;
    
        return user ; 
    }
    
    async login(email:string,password:string){
        
        const user = await  this.userService.getUserByEmail(email) ;
        const match = await bcrypt.compare(password, user.password);
        console.log(match);
        if(match){
            const jwt = this.jwtService.signAsync({id : user.id})
            return jwt ;
        }
        return false
    }

    async getUserById(userId:string){
        return this.userService.getUser(userId)
    }

}