import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateCatalogDto {
  @ApiProperty({
    description: 'Enter the CurriculumId',
    default: [],
  })
  curriculamId: [ObjectId];

  @ApiProperty({
    description: 'Enter item id',
    default: [],
  })
  items: [ObjectId];

  @ApiProperty({
    description: 'Enter the type',
    default: '',
  })
  type: string;
}
