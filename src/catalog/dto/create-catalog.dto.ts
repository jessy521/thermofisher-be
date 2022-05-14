import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateCatalogDto {
  @ApiProperty({
    description: 'Enter the CurriculumId',
    default: [],
  })
  curricullumId: [ObjectId];

  @ApiProperty({
    description: 'Enter item id',
    default: [],
  })
  itemId: [ObjectId];
}
