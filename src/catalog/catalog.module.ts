import { Module } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CatalogController } from './catalog.controller';
import { catalogProvider } from './catalog.provider';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CatalogController],
  providers: [CatalogService, ...catalogProvider]
})
export class CatalogModule {}
