import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../auth/interface/user.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserVerfication(user: User, otp: number) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Otp verification',
      template: './otp',
      context: {
        name: user.firstName,
        otp,
      },
    });
  }

  async sendForgotPassword(user: User, otp: number) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Otp verification',
      template: './forgot-password',
      context: {
        name: user.firstName,
        otp,
      },
    });
  }
}
