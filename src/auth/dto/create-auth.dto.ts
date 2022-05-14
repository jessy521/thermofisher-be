import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    type: String,
    description: 'First name of the user',
    default: 'abcdef',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'First name of the user',
    default: 'abcdef',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Email of the user',
    default: 'abc@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
    description: 'select the type of user',
    default: 'admin',
  })
  role: string;

  @ApiProperty({
    default: false,
  })
  isEmailConfirmed: boolean;

  @ApiProperty({
    type: String,
    description:
      'Password should not be lesser than 8 or longer than 20 and also use uppercase & lowercase & specialCharecter combination',
    default: 'Abc@@123#',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be atleast 8 characters' })
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is very weak',
  })
  password: string;

  @ApiProperty({
    type: String,
    description:
      'Password should not be lesser than 8 or longer than 20 and also use uppercase & lowercase & specialCharecter combination',
    default: 'Abc@@123#',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be atleast 8 characters' })
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is very weak',
  })
  confirmPassword: string;

}
