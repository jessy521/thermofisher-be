import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth-credential.dto';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { User } from './interface/user.interface';
import { MakeAdminFilterDto } from './dto/make-admin.filter.dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { otpVerifyDto } from './otp/otpVerify.dto';
import { UserOTP } from './otp/userOtp';
import { otpVerifyForgotPasswordDto } from './otp/otpVerifyForgotPassword.dto';
import { emailDto, passwordDto } from './dto/password.dto';

enum OTPType {
  Signup = 'signup',
  ResetPassword = 'reset',
  Login = 'login',
}
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('/signup')
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async signUp(
    @Req() request: Request,
    @Body(new ValidationPipe()) authCredentials: CreateAuthDto,
  ) {
    return this.authService.signUp(request, authCredentials);
  }

  @Post('/otp/verify')
  async otpVerify(
    @Req() request: Request,
    @Res() response: Response,
    @Body() filterDto: otpVerifyDto,
  ) {
    const userRequest = filterDto as UserOTP;
    userRequest.type = OTPType.Signup;
    // console.log(userRequest);
    try {
      const otpValid = await this.authService.verifyOtp(userRequest);
      if (otpValid) {
        // Write code to verify user in document
        const userAuthObj = await this.authService.verifyUser(userRequest);
        const userObj = await this.authService.getUser(userAuthObj._id);
        const { role, password, ...userRoleObj } = userObj;
        request['userId'] = userObj._id;
        // request['user'] = userRoleObj;
        // request['authenticated'] = true;

        response.send({
          message: 'OTP successfully verified',
          userDetails: userRoleObj,
        });
      } else {
        response.statusCode = 401;
        response.send({ message: 'Invalid OTP' });
      }
    } catch (err) {
      // console.log(err);
      response.statusCode = 503;
      response.send({
        message: 'Service not available',
      });
    }
  }

  @Post('/signin')
  @ApiOkResponse({ description: 'The resource has been successfully returned' })
  @ApiForbiddenResponse({ description: 'Invalid credentials' })
  async signin(
    @Body(ValidationPipe) authCredentials: AuthCredentials,
    @Res() response: Response,
  ): Promise<string> {
    const token = await this.authService.signIn(authCredentials);
    // console.log(token);

    response
      .cookie('access_token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      })
      .send(token);

    return token;
  }

  @Get('/cookies')
  findAll(@Req() request: Request) {
    console.log(request);
    console.log(request.cookies['access_token']);
  }

  // to verify the user's token
  @Get('/user')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ description: 'User verified Successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorised User' })
  async user(@Req() request: Request) {
    try {
      const cookies = request.cookies['access_token'];
      const data = await this.jwtService.verifyAsync(cookies);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.authService.findOne(data.email);

      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  // to logout by delelting the token
  @ApiOkResponse({ description: 'User verified Successfully' })
  @ApiBadRequestResponse({ description: 'login failed' })
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token');

    return {
      message: 'Logged out successfully',
    };
  }

  // @Put(':id')
  // @UseGuards(JwtAuthGuard)
  // @ApiOkResponse({ description: 'User verified Successfully' })
  // @ApiBadRequestResponse({ description: 'login failed' })
  // @UseGuards(JwtAuthGuard, PoliciesGuard)
  // @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, User))
  // update(
  //   @Param('id') id: string,
  //   @Body() filterDto: MakeAdminFilterDto,
  // ): Promise<User> {
  //   return this.authService.update(id, filterDto);
  // }

  @Post('/forgot-password')
  forgotPassword(@Req() request: Request, @Body() filterDto: emailDto) {
    return this.authService.forgotPassword(request, filterDto);
  }

  @Post('/otp/forgot-password/verify')
  async otpVerifyForgotPassword(
    @Req() request: Request,
    @Res() response: Response,
    @Body() filterDto: otpVerifyForgotPasswordDto,
  ) {
    const userRequest = filterDto as UserOTP;
    userRequest.type = OTPType.ResetPassword;
    try {
      const otpValid = await this.authService.verifyFGOtp(userRequest);
      if (otpValid) {
        // Write code to verify user in document
        const userAuthObj = await this.authService.findOne(userRequest.email);
        // request['userId'] = userObj._id;
        // request['user'] = userRoleObj;
        // request['authenticated'] = true;

        response.send({
          message: 'OTP successfully verified',
          userDetails: userAuthObj,
        });
      } else {
        response.statusCode = 401;
        response.send({ message: 'Invalid OTP' });
      }
    } catch (err) {
      // console.log(err);
      response.statusCode = 503;
      response.send({
        message: 'Service not available',
      });
    }
  }

  @Patch(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatepPasswordDto: passwordDto,
  ) {
    return this.authService.updatePassword(id, updatepPasswordDto);
  }
}
