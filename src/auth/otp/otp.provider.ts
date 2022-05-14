import { Connection } from 'mongoose';
import otpSchema from './userOtp';

export const otpProviders = [
  {
    provide: 'OTP_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('UserOTP', otpSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
