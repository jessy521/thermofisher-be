import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { AuthCredentials } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { User } from './interface/user.interface';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_MODEL')
    private authModel: Model<User>,
  ) {}

  async validateUser(authCredentials): Promise<boolean> {
    const { email } = authCredentials;

    const userExistWithEmail = await this.authModel.findOne({ email });

    if (userExistWithEmail === null) {
      return true;
    } else {
      return false;
    }
  }

  async validateUserPassword(authCredentials: AuthCredentials): Promise<any> {
    const { email, password } = authCredentials;

    const user = await this.authModel.findOne({ email });

    if (user === null) {
      throw new UnauthorizedException('Invalid credentials');
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      } else {
        throw new BadRequestException('Invalid credentials');
      }
    }
  }
}
