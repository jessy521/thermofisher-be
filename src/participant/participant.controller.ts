import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('participant')
@ApiTags('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @ApiCreatedResponse({ description: 'this response has created successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(createParticipantDto);
  }

  @Get()
  @ApiOkResponse({ description: 'this response has returned successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'this response has returned successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  findOne(@Param('id') id: string) {
    return this.participantService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'this response has updated successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.update(id, updateParticipantDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'this response has deleted successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  remove(@Param('id') id: string) {
    return this.participantService.remove(id);
  }
}
