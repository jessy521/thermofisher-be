import { Module } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';
import { DatabaseModule } from 'src/database/database.module';
import { curriculumProviders } from './providers/curriculum.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CurriculumController],
  providers: [CurriculumService,...curriculumProviders]
})
export class CurriculumModule {}
