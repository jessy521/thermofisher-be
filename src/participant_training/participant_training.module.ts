import { Module } from '@nestjs/common';
import { ParticipantTrainingService } from './participant_training.service';
import { ParticipantTrainingController } from './participant_training.controller';

@Module({
  controllers: [ParticipantTrainingController],
  providers: [ParticipantTrainingService]
})
export class ParticipantTrainingModule {}
