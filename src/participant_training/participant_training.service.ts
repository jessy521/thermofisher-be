import { Injectable } from '@nestjs/common';
import { CreateParticipantTrainingDto } from './dto/create-participant_training.dto';
import { UpdateParticipantTrainingDto } from './dto/update-participant_training.dto';

@Injectable()
export class ParticipantTrainingService {
  create(createParticipantTrainingDto: CreateParticipantTrainingDto) {
    return 'This action adds a new participantTraining';
  }

  findAll() {
    return `This action returns all participantTraining`;
  }

  findOne(id: number) {
    return `This action returns a #${id} participantTraining`;
  }

  update(id: number, updateParticipantTrainingDto: UpdateParticipantTrainingDto) {
    return `This action updates a #${id} participantTraining`;
  }

  remove(id: number) {
    return `This action removes a #${id} participantTraining`;
  }
}
