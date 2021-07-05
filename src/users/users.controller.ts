import { Delete, Param, Patch } from '@nestjs/common';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddUserDto } from './user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService :UsersService){}
    
    @Post()
    async addUser(@Body() body :AddUserDto){

        const {name ,email  ,password  ,age } = body ;

        const user = await  this.usersService.createUser(name ,email,password,age);

        return { user} ;
    }

    

    @Get()
    async getUsers(){
        
        const users = await this.usersService.getAllUser() ; 

        return users ; 
    }

    @Get(':id')
    async getUser(@Param('id') id :string){
        
        const user = await this.usersService.getUser(id) ;
        if(user) return user ;
        else return {message :"not found"}  
    }

    @Delete(':id')
    async deleteUser(@Param('id') id :string){

        await  this.usersService.deleteUser(id) ; 

        return { message : "ok"} ;
    }

    @Patch(':id')
    async updateUser(@Body() body : AddUserDto , @Param('id') id:string ){

        const {name ,email,password,age} = body ;

        const user= await this.usersService.updateUser(id,name,email,password,age) ;

        return user ; 
    }
    
    @Get('user/:name')
    async getUserByName (@Param('name') name :string) {

        const user= await this.usersService.getUserByName(name) ;
        //console.log(user.name);
        return user ;
    }
    

}
