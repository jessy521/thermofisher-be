import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @ApiPropertyOptional({
    type: String,
    description: 'enter the courceType',
    default: '',
  })
  courceType: string;

  @ApiPropertyOptional({
    type: String,
    description: 'enter the itemNo',
    default: '',
  })
  itemNo: string;

  @ApiPropertyOptional({
    type: String,
    description: 'enter the SFLMS-name',
    default: '',
  })
  sflmsName: string;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'enter the PSG -certificate',
    default: true,
  })
  psgCertificate: Boolean;

  @ApiPropertyOptional({
    type: Boolean,
    description: 'enter the No-Certificate',
    default: true,
  })
  noCertificate: Boolean;

  @ApiPropertyOptional({
    type: Boolean,
    description: '',
    default: true,
  })
  dx: Boolean;

  @ApiPropertyOptional({
    type: String,
    description: 'enter the due date days no',
    default: '',
  })
  dueDateDays: string;

  @ApiPropertyOptional({
    type: String,
    description: 'enter the owner name',
    default: '',
  })
  owner: string;

  @ApiPropertyOptional({
    type: String,
    description: 'enter the curriculum Ids',
    default: '',
  })
  curriculumId: [string];

  @ApiPropertyOptional({
    type: String,
    description: 'enter the launch date',
    default: '',
  })
  launchDate: Date;
}
