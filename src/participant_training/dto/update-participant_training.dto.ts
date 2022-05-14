import { ApiPropertyOptional } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class UpdateParticipantTrainingDto {
  @ApiPropertyOptional({
    description: 'Enter item id',
    default: [],
  })
  curriculamId: [ObjectId];

  @ApiPropertyOptional({
    description: 'Enter item id',
    default: [],
  })
  participantId: [ObjectId];

  @ApiPropertyOptional({
    description: 'Enter item id',
    default: 'vapi',
  })
  location: string;

  @ApiPropertyOptional({
    description: 'Enter the year',
    default: 2012,
  })
  year: number;

  @ApiPropertyOptional({
    description: 'Enter the quater',
    default: 4,
  })
  quater: number;
}
