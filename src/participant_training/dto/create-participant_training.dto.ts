import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

export class CreateParticipantTrainingDto {
  @ApiProperty({
    description: 'Enter item id',
    default: '',
  })
  curriculamId: ObjectId;

  @ApiProperty({
    description: 'Enter item id',
    default: '',
  })
  participantId: ObjectId;

  @ApiProperty({
    description: 'Enter item id',
    default: 'vapi',
  })
  location: string;

  @ApiProperty({
    description: 'Enter the year',
    default: 2012,
  })
  year: number;

  @ApiProperty({
    description: 'Enter the quater',
    default: 4,
  })
  quater: number;
}
