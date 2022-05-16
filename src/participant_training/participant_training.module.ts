import { Module } from '@nestjs/common';
import { ParticipantTrainingService } from './participant_training.service';
import { ParticipantTrainingController } from './participant_training.controller';
import { DatabaseModule } from 'src/database/database.module';
import { participantTrainingProviders } from './participant-training.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ParticipantTrainingController],
  providers: [ParticipantTrainingService, ...participantTrainingProviders]
})
export class ParticipantTrainingModule {}
