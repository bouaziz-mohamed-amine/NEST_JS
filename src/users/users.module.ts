import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Schema } from 'mongoose';
import { UserSchema } from './user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports : [MongooseModule.forFeature([{name : 'User', schema : UserSchema }])],
    controllers : [UsersController],
    providers : [UsersService] ,
    exports : [UsersService]
})
export class UsersModule {}
