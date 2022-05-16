import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParticipantTrainingService } from './participant_training.service';
import { CreateParticipantTrainingDto } from './dto/create-participant_training.dto';
import { UpdateParticipantTrainingDto } from './dto/update-participant_training.dto';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetFilterDto } from './dto/get-filter.dto';

@ApiTags('Participant-training')
@Controller('participant-training')
export class ParticipantTrainingController {
  constructor(
    private readonly participantTrainingService: ParticipantTrainingService,
  ) {}

  @Post()
  @ApiOkResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Body() createParticipantTrainingDto: CreateParticipantTrainingDto) {
    return this.participantTrainingService.create(createParticipantTrainingDto);
  }

  @Get()
  @ApiOkResponse({ description: 'this response has returned successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findAll(@Query() filterDto: GetFilterDto) {
    if (filterDto.id !== undefined) {
      return this.participantTrainingService.findOne(filterDto.id);
    } else if (filterDto.curriculumId !== undefined) {
      return this.participantTrainingService.getNumberOfEnrolled(
        filterDto.curriculumId,
      );
    } else if (filterDto.category === 'all') {
      return this.participantTrainingService.getNumberOfEnrolledAll();
    } else {
      return this.participantTrainingService.findAll();
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipantTrainingDto: UpdateParticipantTrainingDto,
  ) {
    return this.participantTrainingService.update(
      id,
      updateParticipantTrainingDto,
    );
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'this response has updated successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  remove(@Param('id') id: string) {
    return this.participantTrainingService.remove(id);
  }
}
