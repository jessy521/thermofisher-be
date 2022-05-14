import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class otpVerifyDto {
  @ApiPropertyOptional({
    type: String,
    default: '',
  })
  @IsString()
  userId: string;

  @ApiPropertyOptional({
    type: String,
    default: '',
  })
  @IsString()
  otp: string;

  @ApiPropertyOptional({
    type: String,
    default: '',
  })
  @IsString()
  type: string;

  @ApiPropertyOptional({
    type: String,
    default: '',
  })
  @IsString()
  rId: string;
}
