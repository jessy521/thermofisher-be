import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ParticipantModule } from './participant/participant.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, ParticipantModule, CurriculumModule, ItemModule],
})
export class AppModule {}
