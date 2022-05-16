import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@ApiTags('Catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Post()
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Body() createCatalogDto: CreateCatalogDto) {
    return this.catalogService.create(createCatalogDto);
  }

  @Get()
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findAll() {
    return this.catalogService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ description: 'this response has return successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findOne(@Param('id') id: string) {
    return this.catalogService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ description: 'this response has updated successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  update(@Param('id') id: string, @Body() updateCatalogDto: UpdateCatalogDto) {
    return this.catalogService.update(id, updateCatalogDto);
  }

  @Delete(':id')
  @ApiCreatedResponse({ description: 'this response has deleted successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  remove(@Param('id') id: string) {
    return this.catalogService.remove(id);
  }
}
