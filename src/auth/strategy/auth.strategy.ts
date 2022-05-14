import { Strategy } from 'passport-jwt';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../interface/user.interface';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('USER_MODEL')
    private authModel: Model<User>,
  ) {
    super({
      jwtFromRequest: (req) => {
        if (!req || !req.cookies) return null;
        return req.cookies['access_token'];
      },
      ignoreExpiration: false,
      secretOrKey: 'abcdefghijklmnop',
    });
  }

  async validate(payload: JwtPayload) {
    const { email } = payload;
    const user = await this.authModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('error in jwt-strategy');
    }

    return user;
    // return { username: payload.username , role: payload.roles }
  }
}
