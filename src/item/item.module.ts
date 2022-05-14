import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { DatabaseModule } from 'src/database/database.module';
import { itemProviders } from './provider/item.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [ItemController],
  providers: [ItemService,...itemProviders]
})
export class ItemModule {}
