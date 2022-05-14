import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('item')
@ApiTags('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto);
  }

  @Get()
  @ApiOkResponse({ description: 'response has returned successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'response has returned successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'this response has updated successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'response has deleted successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  remove(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
