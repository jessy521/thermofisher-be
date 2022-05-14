import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authProviders } from './provider/auth.provider';
import { UserRepository } from './user.repository';
import { AuthStrategy } from './strategy/auth.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { otpProviders } from './otp/otp.provider';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_ACCESS_KEY ,
      signOptions: {
        expiresIn: 10000,
      },
    }),
    DatabaseModule,
    MailModule
  ],

  controllers: [AuthController],

  providers: [
    ...authProviders,
    AuthService,
    UserRepository,
    AuthStrategy,
    ...otpProviders,
  ],

  exports: [PassportModule],
})
export class AuthModule {}
