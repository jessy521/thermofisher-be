import {
  Controller,
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

@ApiTags('Participant-Training')
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
  findAll() {
    return this.participantTrainingService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'this response has returned successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findOne(@Param('id') id: string) {
    return this.participantTrainingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipantTrainingDto: UpdateParticipantTrainingDto,
  ) {
    return this.participantTrainingService.update(
      +id,
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
