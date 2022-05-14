import { ApiPropertyOptional } from '@nestjs/swagger';

export class otpVerifyForgotPasswordDto {
  @ApiPropertyOptional({
    type: String,
    default: '',
  })
  userId: string;
  @ApiPropertyOptional({
    type: String,
    default: '',
  })
  email: string;

  @ApiPropertyOptional({
    type: String,
    default: '',
  })
  otp: string;

  @ApiPropertyOptional({
    type: String,
    default: '',
  })
  type: string;

  @ApiPropertyOptional({
    type: String,
    default: '',
  })
  rId: string;
}
