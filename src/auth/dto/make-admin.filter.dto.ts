import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class MakeAdminFilterDto {
  @IsBoolean()
  @ApiProperty({
    type: Boolean,
  })
  isAdmin: Boolean;
}
