import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetFilterDto {
  @ApiPropertyOptional({
    type: String,
    description: 'particular id',
  })
  id: string;

  @ApiPropertyOptional({
    type: String,
    description: 'particular id',
  })
  curriculumId: string;

  @ApiPropertyOptional({
    type: String,
    description: 'particular id',
  })
  category: string;
}
