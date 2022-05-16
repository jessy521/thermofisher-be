import { ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCurriculumDto {
  @ApiPropertyOptional({
    type: String,
    description: 'title of the curriculum',
    default: '',
  })
  title: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'no of the curriculum',
    default: 23,
  })
  curriculumNo: Number;

  @ApiPropertyOptional({
    type: String,
    description: 'enter the technology',
    default: '',
  })
  technology: string;

  @ApiPropertyOptional({
    type: String,
    description: 'enter the status',
    default: '',
  })
  status: string;

  @ApiPropertyOptional({
    type: String,
    description: 'enter the owner-name',
    default: '',
  })
  owner: string;

  @ApiPropertyOptional({
    type: String,
    description: 'enter the emeaTrainer',
    default: '',
  })
  emeaTrainer: string;

  @ApiPropertyOptional({
    type: String,
    description: 'enter the apjTrainer',
    default: '',
  })
  apjTrainer: string;

  @ApiPropertyOptional({
    type: String,
    description: 'enter the natTrainer',
    default: '',
  })
  natTrainer: string;

  @ApiPropertyOptional({
    type: String,
    description: 'enter the sme',
    default: '',
  })
  sme: string;

  @ApiPropertyOptional({
    type: [String],
    description: 'enter the itemIds',
    default: '',
  })
  item: [string];
}
