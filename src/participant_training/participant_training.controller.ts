import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantTrainingService } from './participant_training.service';
import { CreateParticipantTrainingDto } from './dto/create-participant_training.dto';
import { UpdateParticipantTrainingDto } from './dto/update-participant_training.dto';

@Controller('participant-training')
export class ParticipantTrainingController {
  constructor(private readonly participantTrainingService: ParticipantTrainingService) {}

  @Post()
  create(@Body() createParticipantTrainingDto: CreateParticipantTrainingDto) {
    return this.participantTrainingService.create(createParticipantTrainingDto);
  }

  @Get()
  findAll() {
    return this.participantTrainingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantTrainingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParticipantTrainingDto: UpdateParticipantTrainingDto) {
    return this.participantTrainingService.update(+id, updateParticipantTrainingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantTrainingService.remove(+id);
  }
}
