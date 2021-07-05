import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from "./auth.service";
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)  {

    constructor(
        private readonly authService:AuthService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async  validate  (   payload: any){
        console.log('im here  amine')
        const user = await this.authService.getUserById(payload.id)
        if(!user){
            throw new UnauthorizedException()
        }

        return user;
    }
}