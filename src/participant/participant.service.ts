import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { Participant } from './interface/participant.interface';

@Injectable()
export class ParticipantService {
  constructor(
    @Inject('PARTICIPANT_MODEL')
    private participantModel: Model<Participant>,
  ) {}

  async create(createParticipantDto: CreateParticipantDto) {
    try {
      const newParticipant = new this.participantModel(createParticipantDto);
      await newParticipant.save();
      return newParticipant;
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  findAll() {
    return this.participantModel.find({});
  }

  async findOne(id: string) {
    try {
      const participantExist = await this.participantModel.findOne({ _id: id });
      if (participantExist !== undefined) {
        return participantExist;
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    try {
      const participantExist = await this.participantModel.findOne({ _id: id });
      if (participantExist !== undefined) {
        return this.participantModel.findByIdAndUpdate(
          { _id: id },
          updateParticipantDto,
          { new: true },
        );
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }

  async remove(id: string) {
    try {
      const participantExist = await this.participantModel.findOne({ _id: id });
      if (participantExist !== undefined) {
        return this.participantModel.findByIdAndDelete({ _id: id });
      } else {
        throw new NotFoundException();
      }
    } catch (e) {
      throw new BadRequestException({ message: e.message });
    }
  }
}
