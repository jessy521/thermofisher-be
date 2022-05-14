import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { AuthCredentials } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { User } from './interface/user.interface';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { MakeAdminFilterDto } from './dto/make-admin.filter.dto';
import { UserOTP } from './otp/userOtp';
import { MailService } from 'src/mail/mail.service';

enum OTPType {
  Signup = 'signup',
  ResetPassword = 'reset',
  Login = 'login',
}
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_MODEL')
    private authModel: Model<User>,
    private userRepository: UserRepository,
    private jwtService: JwtService,
    @Inject('OTP_MODEL')
    private readonly otpModel: Model<UserOTP>,
    private mailService: MailService,
  ) {}

  async signUp(request, authCredentials: CreateAuthDto) {
    const { password, confirmPassword } = authCredentials;

    if (password === confirmPassword) {
      const regularUser = await this.userRepository.validateUser(
        authCredentials,
      );

      if (regularUser) {
        const user = new this.authModel(authCredentials);
        const rId = Date.now() + Math.round(Math.random() * 100).toString();
        const rIdHash = await bcrypt.hash(rId, 2);
        // console.log('rIdHash:', rIdHash);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        // let a;
        // if (!request.session.adminToken) {
        const otp = await this.generateOTP({
          userId: user._id,
          email: user.email,
          type: OTPType.Signup,
          rId,
        });
        // a = otp;
        request.r = rIdHash;
        // }

        await this.mailService.sendUserVerfication(user, otp);
        // return [user, otp];
        return user;
      } else {
        throw new ConflictException('user already exist');
      }
    } else {
      throw new BadRequestException('password mimsmatched');
    }
  }

  async signIn(authCredentials: AuthCredentials): Promise<string> {
    const user = await this.userRepository.validateUserPassword(
      authCredentials,
    );

    const payload: JwtPayload = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };
    const accessToken = await this.jwtService.sign(payload);
    return accessToken;
  }

  async findOne(email: string): Promise<User> {
    const user = this.authModel.findOne({ email });

    return user.select({ password: 0 });
  }


  async generateOTP(userRequest) {
    try {
      // console.log('userRequest:', userRequest);
      const otp = Math.floor(100000 + Math.random() * 900000);
      await this.otpModel.deleteOne({ userId: userRequest.userId });
      // console.log(otp);
      const userObject = await this.otpModel.create({
        userId: userRequest.userId,
        email: userRequest.email,
        otp,
        type: userRequest.type,
        rId: userRequest.rId,
      });
      // console.log('generateOTP:', otp);
      return otp;
    } catch (err) {
      throw err;
    }
  }
  async verifyOtp(userRequest) {
    try {
      const userObject = await this.otpModel.findOne({
        userId: userRequest.userId,
        type: userRequest.type,
      });
      const passwordValid = await bcrypt.compare(
        userRequest.otp,
        userObject.otp,
      );
      if (passwordValid) {
        return userObject.rId ? userObject.rId : true;
      } else {
        return false;
      }
    } catch (err) {
      // console.log(err);
      throw new Error(err.message);
    }
  }
  async verifyFGOtp(userRequest) {
    try {
      const userObject = await this.otpModel.findOne({
        email: userRequest.email,
        type: userRequest.type,
      });
      const passwordValid = await bcrypt.compare(
        userRequest.otp,
        userObject.otp,
      );
      if (passwordValid) {
        return userObject.rId ? userObject.rId : true;
      } else {
        return false;
      }
    } catch (err) {
      // console.log(err);
      throw new Error(err.message);
    }
  }

  async verifyUser(userRequest) {
    try {
      const userAuthObj = await this.authModel.findOneAndUpdate(
        { _id: userRequest.userId },
        { isEmailConfirmed: true },
        {
          new: true,
        },
      );
      return userAuthObj;
    } catch (err) {
      throw err;
    }
  }

  async getUser(userId) {
    try {
      return await this.authModel
        .findOne({ userId }, { _id: 0, metadata: 0, __v: 0 })
        .lean();
    } catch (err) {
      throw new Error('User search failed due to ' + err);
    }
  }

  async forgotPassword(request, filterDto) {
    try {
      const { email } = filterDto;
      const userExist = await this.authModel.findOne({ email });
      if (!userExist) {
        throw new NotFoundException({
          message: 'Please enter a valid email address',
        });
      } else {
        const rId = Date.now() + Math.round(Math.random() * 100).toString();
        const rIdHash = await bcrypt.hash(rId, 2);
        const otp = await this.generateOTP({
          userId: userExist._id,
          email,
          type: OTPType.ResetPassword,
          rId,
        });
        request.r = rIdHash;
        // console.log(otp);
        await this.mailService.sendForgotPassword(userExist, otp);
        return 'message: "OTP successfully generated" ';
      }
    } catch (err) {
      throw new ForbiddenException({ message: 'unable to generate OTP' });
    }
  }
  async updatePassword(id: string, updatepPasswordDto) {
    try {
      const { password, confirmPassword } = updatepPasswordDto;
      if (password === confirmPassword) {
        const userExist = await this.authModel.findById({ _id: id });
        // console.log(userExist);
        if (userExist) {
          const passwordToStore = await bcrypt.hash(password, 10);
          userExist.password = passwordToStore;
          await userExist.save();
          return 'Password updated successfully! Log-in with new password!';
        }
      } else {
        throw new ForbiddenException({ message: "password didn't matched!" });
      }
    } catch (error) {
      // console.log(error.message);
      throw new ForbiddenException({
        message: 'Failed to update the password!',
      });
    }
  }
}
