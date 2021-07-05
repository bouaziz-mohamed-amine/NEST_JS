import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';




@Injectable()
export class UsersService {

    constructor(@InjectModel('User') private readonly userModel :Model<UserDocument>){}


    async createUser(name : string ,email : string ,password : string ,age : number ) {

        const user = new this.userModel({name : name ,email : email ,password : password ,age : age}) ;
            
        const res =  await user.save();

        return res ;
    
    }
    async getAllUser () {

        const users = await this.userModel.find().exec()  ;

        return [...users] ; 
    }

    async getUser(id :string){
        
        const user = await this.userModel.findById(id) ;
        
        return user  ;
    }
    
    async deleteUser( id :string){

        await this.userModel.deleteOne( { _id : id } ).exec() ;
        
    }
    
    async updateUser ( id : string ,name : string ,email : string ,password : string ,age : number ) {

        const user = await  this.userModel.findById(id) ;

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = password;
        if(age) user.age = age ; 

        const res = await user.save() ;

        return res ;
        
    }
    
    async getUserByName (name:string) {
        
        // const user = await user/s.find(user => user.name === name) ;
        const user= await this.userModel.findOne({name}) ; 
        //const user = await this.userModel.findById(name);
        return user ; 
    }

    async getUserByEmail (email){

        const user= await this.userModel.findOne({email});

        return user ; 
    }

}
