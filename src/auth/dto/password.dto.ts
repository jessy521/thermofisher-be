import { ApiProperty } from '@nestjs/swagger';

export class passwordDto {
  @ApiProperty({
    type: String,
    default: '',
  })
  password: string;

  @ApiProperty({
    type: String,
    default: '',
  })
  confirmPassword: string;
}

export class emailDto {
  @ApiProperty({
    type: String,
    default: '',
  })
  email: string;
}
