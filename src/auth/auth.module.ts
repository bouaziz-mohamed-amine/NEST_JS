import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';


@Module({

  imports:[
      UsersModule,
      PassportModule,
      JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
      }),
    ],
  providers: [AuthService,JwtStrategy],
  controllers:[AuthController],
  exports : [AuthService , JwtModule]
})
export class AuthModule {}
