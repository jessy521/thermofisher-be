import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateParticipantDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Enter the name of the percipant',
    default: '',
  })
  name: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Enter the name of the country',
    default: '',
  })
  country: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Enter the email of the perticipant',
    default: '',
  })
  email: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Enter the type of the perticipant',
    default: '',
  })
  type: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Enter the distributor',
    default: '',
  })
  distributor: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Enter the mentor',
    default: '',
  })
  mentor: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Enter the manager',
    default: '',
  })
  manager: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Enter the reason and justification',
    default: '',
  })
  rNj: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Enter the status',
    default: '',
  })
  status: string;
}
