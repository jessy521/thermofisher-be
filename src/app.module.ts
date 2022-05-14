import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ParticipantModule } from './participant/participant.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { ItemModule } from './item/item.module';
import { CatalogModule } from './catalog/catalog.module';
import { ParticipantTrainingModule } from './participant_training/participant_training.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ParticipantModule, CurriculumModule, ItemModule, CatalogModule, ParticipantTrainingModule],
})
export class AppModule {}
